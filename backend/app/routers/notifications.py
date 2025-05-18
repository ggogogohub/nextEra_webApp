from datetime import datetime
from typing import List
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.notification import NotificationUpdate, NotificationResponse
from app.services.auth import get_current_active_user
from app.utils.database import get_database

router = APIRouter()

@router.get("", response_model=List[NotificationResponse])
async def get_notifications(current_user=Depends(get_current_active_user)):
    """
    Get notifications for the current user
    """
    db = get_database()
    raw = await db.notifications.find({"employee_id": str(current_user["_id"])})\
                  .sort("created_at", -1)\
                  .to_list(length=100)
    # Convert ObjectId to string for each notification
    for n in raw:
        n["id"] = str(n["_id"])
    return raw

@router.put("/{notification_id}", response_model=NotificationResponse)
async def mark_notification_read(
    notification_id: str,
    update_data: NotificationUpdate,
    current_user=Depends(get_current_active_user)
):
    """
    Mark a notification as read
    """
    db = get_database()

    if not ObjectId.is_valid(notification_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid notification ID"
        )

    notif = await db.notifications.find_one({
        "_id": ObjectId(notification_id),
        "employee_id": str(current_user["_id"])
    })

    if notif is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )

    # Update is_read
    await db.notifications.update_one(
        {"_id": ObjectId(notification_id)},
        {"$set": {"is_read": update_data.is_read}}
    )

    updated = await db.notifications.find_one({"_id": ObjectId(notification_id)})
    updated["id"] = str(updated["_id"])
    return NotificationResponse.model_validate(updated)
