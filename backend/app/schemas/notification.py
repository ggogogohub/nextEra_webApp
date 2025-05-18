from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class NotificationBase(BaseModel):
    message: str

class NotificationCreate(NotificationBase):
    pass

class NotificationUpdate(BaseModel):
    is_read: bool

class NotificationInDB(NotificationBase):
    id: str = Field(..., alias="_id")
    employee_id: str
    is_read: bool
    created_at: datetime

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

class NotificationResponse(NotificationBase):
    id: str
    employee_id: str
    is_read: bool
    created_at: datetime

    class Config:
        orm_mode = True
