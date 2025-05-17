from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.services.auth import get_current_user, blacklist_token
from app.schemas.auth import Token

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(current_user = Depends(get_current_user), token: str = Depends(oauth2_scheme)):
    """Invalidate the current access token (logout)"""
    if not token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Token missing")

    # Blacklist token for remainder of its lifetime (assumed max 30 min)
    expires_at = datetime.utcnow() + timedelta(minutes=30)
    await blacklist_token(token, expires_at)

    return
