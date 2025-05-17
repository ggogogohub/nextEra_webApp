from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId
from app.models.user import PyObjectId

class ScheduleModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    employee_id: str = Field(...)
    start_time: datetime = Field(...)
    end_time: datetime = Field(...)
    location: str = Field(...)
    role: str = Field(...)
    status: str = Field(default="pending")  # pending, approved, completed, cancelled
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "employee_id": "60d5ec9af682dbd12a0a9fb8",
                "start_time": datetime.utcnow(),
                "end_time": datetime.utcnow(),
                "location": "Main Office",
                "role": "Cashier",
                "status": "pending",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        }

class TimeOffRequestModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    employee_id: str = Field(...)
    start_date: datetime = Field(...)
    end_date: datetime = Field(...)
    reason: str = Field(...)
    status: str = Field(default="pending")  # pending, approved, rejected
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "employee_id": "60d5ec9af682dbd12a0a9fb8",
                "start_date": datetime.utcnow(),
                "end_date": datetime.utcnow(),
                "reason": "Vacation",
                "status": "pending",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        }

class AvailabilityModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    employee_id: str = Field(...)
    day_of_week: int = Field(...)  # 0 = Sunday, 1 = Monday, etc.
    start_time: str = Field(...)  # Format: "HH:MM"
    end_time: str = Field(...)  # Format: "HH:MM"
    is_available: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "employee_id": "60d5ec9af682dbd12a0a9fb8",
                "day_of_week": 1,
                "start_time": "09:00",
                "end_time": "17:00",
                "is_available": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        }
