from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt, JWTError

from app.utils.database import get_database
from app.schemas.auth import Token, LoginRequest, RefreshTokenRequest
from app.schemas.user import UserCreate, UserResponse
from app.services.auth import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
    create_session,
    delete_session_by_token,
    get_current_active_user,
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user_data: UserCreate):
    """
    Register a new user
    """
    print(f"Registering user with data: {user_data}")
    db = get_database()

    # Check if email already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash the password
    hashed_password = get_password_hash(user_data.password)

    # Create user document
    user_dict = {}
    user_dict["email"] = user_data.email
    user_dict["first_name"] = user_data.first_name
    user_dict["last_name"] = user_data.last_name

    # Explicitly set the role from user_data, maintaining the case sensitivity
    selected_role = user_data.role
    print(f"Selected role from user_data: {selected_role}")

    # Validate role
    allowed_roles = ['employee', 'manager', 'admin']
    if selected_role not in allowed_roles:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid role: {selected_role}. Must be one of: {', '.join(allowed_roles)}"
        )

    # Preserve the original role value sent by the user
    user_dict["role"] = selected_role
    print(f"Setting user role to: {selected_role}")
    user_dict["hashed_password"] = hashed_password
    user_dict["created_at"] = datetime.utcnow()
    user_dict["updated_at"] = datetime.utcnow()
    user_dict["is_active"] = True

    print(f"Final user_dict before insertion: {user_dict}")

    # Insert user into database
    result = await db.users.insert_one(user_dict)

    # Get the created user
    created_user = await db.users.find_one({"_id": result.inserted_id})
    print(f"Created user from database: {created_user}")

    # Convert ObjectId to string for response
    created_user["id"] = str(created_user["_id"])

    return created_user

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Authenticate a user and return JWT tokens
    """
    db = get_database()

    # Find user by email
    user = await db.users.find_one({"email": form_data.username})

    # Check if user exists and password is correct
    if not user or not verify_password(form_data.password, user.get("hashed_password", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Check if user is active
    if not user.get("is_active", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )

    # Create access and refresh tokens
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    access_token = create_access_token(
        data={"sub": str(user["_id"]), "role": user["role"]},
        expires_delta=access_token_expires
    )

    refresh_token = create_refresh_token(
        data={"sub": str(user["_id"]), "role": user["role"]}
    )

    # Create session record
    await create_session(str(user["_id"]), access_token, refresh_token)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/refresh", response_model=Token)
async def refresh_token(refresh_data: RefreshTokenRequest):
    """
    Refresh access token using refresh token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Decode refresh token
        payload = jwt.decode(refresh_data.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        role: str = payload.get("role")

        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # Check if user exists and is active
    db = get_database()
    from bson import ObjectId
    user = await db.users.find_one({"_id": ObjectId(user_id)})

    if user is None or not user.get("is_active", False):
        raise credentials_exception

    # Create new access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_id, "role": role},
        expires_delta=access_token_expires
    )

    # Create new refresh token
    refresh_token = create_refresh_token(
        data={"sub": user_id, "role": role}
    )

    # Remove old session and create new
    await delete_session_by_token(refresh_data.refresh_token)
    await create_session(user_id, access_token, refresh_token)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.get("/me", response_model=UserResponse)
async def get_me(current_user = Depends(get_current_active_user)):
    """
    Get current user information
    """
    # Convert ObjectId to string for response
    current_user["id"] = str(current_user["_id"])

    return current_user
