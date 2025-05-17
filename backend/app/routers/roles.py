from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId

from app.utils.database import get_database
from app.schemas.user import RoleCreate, RoleUpdate, RoleResponse
from app.services.auth import get_current_active_user

router = APIRouter()

@router.get("/", response_model=List[RoleResponse])
async def get_roles(current_user = Depends(get_current_active_user)):
    """List all roles (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    db = get_database()
    roles = await db.roles.find().to_list(length=100)
    # Convert ObjectId to string
    for role in roles:
        role["id"] = str(role["_id"])
    return roles

@router.post("/", response_model=RoleResponse)
async def create_role(role_data: RoleCreate, current_user = Depends(get_current_active_user)):
    """Create a new role (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")

    db = get_database()
    # Check if role name already exists
    existing_role = await db.roles.find_one({"name": role_data.name})
    if existing_role:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Role already exists")

    role_dict = role_data.dict()
    role_dict["created_at"] = datetime.utcnow()
    role_dict["updated_at"] = datetime.utcnow()

    result = await db.roles.insert_one(role_dict)

    created_role = await db.roles.find_one({"_id": result.inserted_id})
    created_role["id"] = str(created_role["_id"])
    return created_role

@router.get("/{role_id}", response_model=RoleResponse)
async def get_role(role_id: str, current_user = Depends(get_current_active_user)):
    """Get a specific role by ID (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")

    if not ObjectId.is_valid(role_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid role ID")

    db = get_database()
    role = await db.roles.find_one({"_id": ObjectId(role_id)})
    if role is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Role not found")

    role["id"] = str(role["_id"])
    return role

@router.put("/{role_id}", response_model=RoleResponse)
async def update_role(role_id: str, role_data: RoleUpdate, current_user = Depends(get_current_active_user)):
    """Update an existing role (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")

    if not ObjectId.is_valid(role_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid role ID")

    db = get_database()
    existing_role = await db.roles.find_one({"_id": ObjectId(role_id)})
    if not existing_role:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Role not found")

    update_data = {k: v for k, v in role_data.dict(exclude_unset=True).items() if v is not None}
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
        await db.roles.update_one({"_id": ObjectId(role_id)}, {"$set": update_data})

    updated_role = await db.roles.find_one({"_id": ObjectId(role_id)})
    updated_role["id"] = str(updated_role["_id"])
    return updated_role

@router.delete("/{role_id}", response_model=RoleResponse)
async def delete_role(role_id: str, current_user = Depends(get_current_active_user)):
    """Delete a role (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")

    if not ObjectId.is_valid(role_id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid role ID")

    db = get_database()
    existing_role = await db.roles.find_one({"_id": ObjectId(role_id)})
    if not existing_role:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Role not found")

    # For safety, prevent deleting built-in roles
    built_in_roles = ["employee", "manager", "admin"]
    if existing_role["name"] in built_in_roles:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot delete built-in role")

    # Perform soft delete by setting is_active to False (if field exists) or hard delete
    await db.roles.delete_one({"_id": ObjectId(role_id)})

    existing_role["id"] = str(existing_role["_id"])
    return existing_role
