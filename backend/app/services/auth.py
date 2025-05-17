from datetime import datetime, timedelta
from typing import Optional
import os
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv

from app.utils.database import get_database
from app.schemas.auth import TokenPayload

# Load environment variables
load_dotenv()

# JWT settings
SECRET_KEY = os.getenv("JWT_SECRET", "your_super_secret_key_change_in_production")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))
SESSION_TIMEOUT_MINUTES = 30  # inactivity timeout

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

# --------------------
# Token blacklist utils
# --------------------

async def is_token_blacklisted(token: str) -> bool:
    """Check if a token is in the blacklist collection"""
    db = get_database()
    blk = await db.token_blacklist.find_one({"token": token})
    return blk is not None

async def blacklist_token(token: str, expires_at: datetime):
    """Add a token to the blacklist so it can't be used again"""
    db = get_database()
    await db.token_blacklist.insert_one({
        "token": token,
        "expires_at": expires_at,
        "created_at": datetime.utcnow()
    })

async def create_session(user_id: str, access_token: str, refresh_token: str):
    db = get_database()
    await db.sessions.insert_one({
        "user_id": user_id,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "last_activity": datetime.utcnow(),
        "created_at": datetime.utcnow()
    })

async def delete_session_by_token(token: str):
    db = get_database()
    await db.sessions.delete_one({"access_token": token})

async def touch_session(token: str):
    db = get_database()
    await db.sessions.update_one({"access_token": token}, {"$set": {"last_activity": datetime.utcnow()}})

async def is_session_expired(token: str) -> bool:
    db = get_database()
    sess = await db.sessions.find_one({"access_token": token})
    if not sess:
        return False
    last = sess.get("last_activity")
    if not last:
        return False
    return datetime.utcnow() - last > timedelta(minutes=SESSION_TIMEOUT_MINUTES)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a password against a hash
    """
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """
    Hash a password
    """
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a new access token
    """
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt

def create_refresh_token(data: dict) -> str:
    """
    Create a new refresh token
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Get the current user from the token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception

        token_data = TokenPayload(sub=user_id, exp=payload.get("exp"), role=payload.get("role"))
    except JWTError:
        raise credentials_exception

    # Check if token is blacklisted (e.g., after logout)
    if await is_token_blacklisted(token):
        raise credentials_exception

    # Check session timeout
    if await is_session_expired(token):
        await blacklist_token(token, datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        await delete_session_by_token(token)
        raise credentials_exception

    await touch_session(token)

    db = get_database()
    # Convert string ID to ObjectId for MongoDB query
    from bson import ObjectId
    user = await db.users.find_one({"_id": ObjectId(user_id)})

    if user is None:
        raise credentials_exception

    if not user.get("is_active", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )

    return user

async def get_current_active_user(current_user = Depends(get_current_user)):
    """
    Get the current active user
    """
    if not current_user.get("is_active", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )
    return current_user
