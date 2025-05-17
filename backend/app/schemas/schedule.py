from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, validator
from bson import ObjectId

class ScheduleBase(BaseModel):
    start_time: datetime
    end_time: datetime
    location: str
    role: str

class ScheduleCreate(ScheduleBase):
    employee_id: str

    @validator('end_time')
    def end_time_must_be_after_start_time(cls, v, values):
        if 'start_time' in values and v <= values['start_time']:
            raise ValueError('End time must be after start time')
        return v

class ScheduleUpdate(BaseModel):
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    location: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None

    @validator('end_time')
    def end_time_must_be_after_start_time(cls, v, values):
        if v and 'start_time' in values and values['start_time'] and v <= values['start_time']:
            raise ValueError('End time must be after start time')
        return v

class ScheduleInDB(ScheduleBase):
    id: str = Field(..., alias="_id")
    employee_id: str
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

class ScheduleResponse(ScheduleBase):
    id: str
    employee_id: str
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class TimeOffRequestBase(BaseModel):
    start_date: str
    end_date: str
    reason: str

    @validator('start_date', 'end_date')
    def validate_date_format(cls, v):
        try:
            # Try to parse the date string to ensure it's valid
            datetime.fromisoformat(v.replace('Z', '+00:00'))
            return v
        except ValueError:
            raise ValueError('Date must be in ISO format (YYYY-MM-DDTHH:MM:SS)')

class TimeOffRequestCreate(TimeOffRequestBase):
    @validator('end_date')
    def end_date_must_be_after_start_date(cls, v, values):
        if 'start_date' in values and v < values['start_date']:
            raise ValueError('End date must be after start date')
        return v

class TimeOffRequestUpdate(BaseModel):
    status: str

class TimeOffRequestInDB(TimeOffRequestBase):
    id: str = Field(..., alias="_id")
    employee_id: str
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

class TimeOffRequestResponse(TimeOffRequestBase):
    id: str
    employee_id: str
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AvailabilityBase(BaseModel):
    day_of_week: int
    start_time: str
    end_time: str
    is_available: bool

    @validator('day_of_week')
    def day_of_week_must_be_valid(cls, v):
        if v < 0 or v > 6:
            raise ValueError('Day of week must be between 0 (Sunday) and 6 (Saturday)')
        return v

    @validator('start_time', 'end_time')
    def time_format_must_be_valid(cls, v):
        try:
            hours, minutes = v.split(':')
            if not (0 <= int(hours) <= 23 and 0 <= int(minutes) <= 59):
                raise ValueError()
        except:
            raise ValueError('Time must be in format HH:MM')
        return v

class AvailabilityCreate(AvailabilityBase):
    pass

class AvailabilityUpdate(AvailabilityBase):
    pass

class AvailabilityInDB(AvailabilityBase):
    id: str = Field(..., alias="_id")
    employee_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
        allow_population_by_field_name = True

class AvailabilityResponse(AvailabilityBase):
    id: str
    employee_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
