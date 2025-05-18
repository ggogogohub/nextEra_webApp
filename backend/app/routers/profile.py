from datetime import datetime
from typing import List
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.user import UserUpdate, UserResponse
from app.schemas.schedule import AvailabilityResponse, AvailabilityUpdate
from app.utils.database import get_database
from app.services.auth import get_current_active_user

router = APIRouter()

@router.get("", response_model=UserResponse)
async def get_profile(current_user = Depends(get_current_active_user)):
    """
    Get current user's profile
    """
    user = current_user
    user["id"] = str(user["_id"])
    return user

@router.put("", response_model=UserResponse)
async def update_profile(
    profile_data: UserUpdate,
    current_user = Depends(get_current_active_user)
):
    """
    Update current user's profile
    """
    user_id = current_user["_id"]
    # Regular users cannot change role
    if profile_data.role is not None and current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to change role"
        )
    db = get_database()
    update_data = {k: v for k, v in profile_data.dict(exclude_unset=True).items() if v is not None}
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
        await db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
    updated_user = await db.users.find_one({"_id": ObjectId(user_id)})
    updated_user["id"] = str(updated_user["_id"])
    return updated_user

@router.get("/availability", response_model=List[AvailabilityResponse])
async def get_profile_availability(
    current_user = Depends(get_current_active_user)
):
    """
    Get availability for the current user
    """
    db = get_database()
    avail = await db.availability.find({"employee_id": str(current_user["_id"]) }).to_list(length=7)
    return avail

@router.put("/availability", response_model=List[AvailabilityResponse])
async def upsert_profile_availability(
    avail_list: List[AvailabilityUpdate],
    current_user = Depends(get_current_active_user)
):
    """
    Bulk upsert availability for the current user
    """
    db = get_database()
    emp_id = str(current_user["_id"])
    results = []
    for item in avail_list:
        existing = await db.availability.find_one({"employee_id": emp_id, "day_of_week": item.day_of_week})
        doc = item.dict()
        doc["employee_id"] = emp_id
        doc["updated_at"] = datetime.utcnow()
        if existing:
            await db.availability.update_one({"_id": ObjectId(existing["_id"])}, {"$set": doc})
            updated = await db.availability.find_one({"_id": ObjectId(existing["_id"])})
            results.append(updated)
        else:
            doc["created_at"] = datetime.utcnow()
            res = await db.availability.insert_one(doc)
            new_doc = await db.availability.find_one({"_id": res.inserted_id})
            results.append(new_doc)
    # Convert documents to response models
    final = []
    for d in results:
        d["id"] = str(d["_id"])
        final.append(AvailabilityResponse.model_validate(d))
    return final
