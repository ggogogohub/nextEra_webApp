from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status, Path
from bson import ObjectId

from app.utils.database import get_database
from app.schemas.schedule import (
    ScheduleCreate,
    ScheduleUpdate,
    ScheduleResponse,
    TimeOffRequestCreate,
    TimeOffRequestUpdate,
    TimeOffRequestResponse,
    AvailabilityCreate,
    AvailabilityUpdate,
    AvailabilityResponse
)
from app.services.auth import get_current_active_user

router = APIRouter()

# Schedule endpoints
@router.get("", response_model=List[ScheduleResponse])
async def get_schedules(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    status: Optional[str] = None,
    location: Optional[str] = None,
    current_user = Depends(get_current_active_user)
):
    """
    Get schedules for the current user
    """
    db = get_database()

    # Build query
    query = {"employee_id": str(current_user["_id"])}

    if start_date and end_date:
        query["start_time"] = {
            "$gte": datetime.fromisoformat(start_date),
            "$lte": datetime.fromisoformat(end_date)
        }
    elif start_date:
        query["start_time"] = {"$gte": datetime.fromisoformat(start_date)}
    elif end_date:
        query["start_time"] = {"$lte": datetime.fromisoformat(end_date)}

    if status:
        query["status"] = status

    if location:
        query["location"] = location

    schedules = await db.schedules.find(query).to_list(length=100)

    return schedules

@router.get("/{schedule_id:regex('^[0-9a-fA-F]{24}$')}", response_model=ScheduleResponse)
async def get_schedule(
    schedule_id: str = Path(..., regex="^[0-9a-fA-F]{24}$"),
    current_user = Depends(get_current_active_user)
):
    """
    Get a specific schedule by ID
    """
    db = get_database()

    # Validate ObjectId
    if not ObjectId.is_valid(schedule_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid schedule ID"
        )

    schedule = await db.schedules.find_one({
        "_id": ObjectId(schedule_id),
        "employee_id": str(current_user["_id"])
    })

    if schedule is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Schedule not found"
        )

    return schedule

# Time-off request endpoints
@router.get("/time-off", response_model=List[TimeOffRequestResponse])
async def get_time_off_requests(
    current_user = Depends(get_current_active_user)
):
    """
    Get time-off requests for the current user
    """
    db = get_database()

    raw_requests = await db.time_off_requests.find({
        "employee_id": str(current_user["_id"])
    }).to_list(length=100)
    # Convert Mongo documents to Pydantic models with string id
    results: List[TimeOffRequestResponse] = []
    for doc in raw_requests:
        # prepare dict for model
        data = {**doc, 'id': str(doc['_id'])}
        results.append(TimeOffRequestResponse.model_validate(data))
    return results

@router.post("/time-off", response_model=TimeOffRequestResponse)
async def create_time_off_request(
    request_data: TimeOffRequestCreate,
    current_user = Depends(get_current_active_user)
):
    """
    Create a new time-off request
    """
    db = get_database()

    # Validate dates
    try:
        start_date = datetime.fromisoformat(request_data.start_date.replace('Z', ''))
        end_date = datetime.fromisoformat(request_data.end_date.replace('Z', ''))

        if start_date < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Start date cannot be in the past"
            )

        if end_date < start_date:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="End date must be after start date"
            )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid date format. Use ISO format (YYYY-MM-DDTHH:MM:SS)"
        )

    # Create request document
    request_dict = request_data.dict()
    request_dict["employee_id"] = str(current_user["_id"])
    request_dict["status"] = "pending"
    request_dict["created_at"] = datetime.utcnow()
    request_dict["updated_at"] = datetime.utcnow()

    # Insert request into database
    result = await db.time_off_requests.insert_one(request_dict)

    # Get the created request
    created_request = await db.time_off_requests.find_one({"_id": result.inserted_id})
    # Map Mongo document to Pydantic model
    data = {**created_request, 'id': str(created_request['_id'])}
    return TimeOffRequestResponse.model_validate(data)

@router.delete("/time-off/{request_id}", response_model=TimeOffRequestResponse)
async def cancel_time_off_request(
    request_id: str,
    current_user = Depends(get_current_active_user)
):
    """
    Cancel a time-off request
    """
    db = get_database()

    # Validate ObjectId
    if not ObjectId.is_valid(request_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid request ID"
        )

    # Check if request exists and belongs to the current user
    request = await db.time_off_requests.find_one({
        "_id": ObjectId(request_id),
        "employee_id": str(current_user["_id"])
    })

    if request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Time-off request not found"
        )

    # Check if request is pending
    if request["status"] != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only pending requests can be cancelled"
        )

    # Update request status
    await db.time_off_requests.update_one(
        {"_id": ObjectId(request_id)},
        {"$set": {"status": "cancelled", "updated_at": datetime.utcnow()}}
    )

    # Get updated request
    updated_request = await db.time_off_requests.find_one({"_id": ObjectId(request_id)})
    # Map Mongo document to Pydantic model
    data = {**updated_request, 'id': str(updated_request['_id'])}
    return TimeOffRequestResponse.model_validate(data)

# Availability endpoints
@router.get("/availability", response_model=List[AvailabilityResponse])
async def get_availability(
    current_user = Depends(get_current_active_user)
):
    """
    Get availability for the current user
    """
    db = get_database()

    availability = await db.availability.find({
        "employee_id": str(current_user["_id"])
    }).to_list(length=7)  # Maximum 7 days in a week

    return availability

@router.post("/availability", response_model=AvailabilityResponse)
async def create_availability(
    availability_data: AvailabilityCreate,
    current_user = Depends(get_current_active_user)
):
    """
    Create a new availability record
    """
    db = get_database()

    # Check if availability for this day already exists
    existing = await db.availability.find_one({
        "employee_id": str(current_user["_id"]),
        "day_of_week": availability_data.day_of_week
    })

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Availability for day {availability_data.day_of_week} already exists"
        )

    # Create availability document
    availability_dict = availability_data.dict()
    availability_dict["employee_id"] = str(current_user["_id"])
    availability_dict["created_at"] = datetime.utcnow()
    availability_dict["updated_at"] = datetime.utcnow()

    # Insert availability into database
    result = await db.availability.insert_one(availability_dict)

    # Get the created availability
    created_availability = await db.availability.find_one({"_id": result.inserted_id})

    return created_availability

@router.put("/availability/{day_of_week}", response_model=AvailabilityResponse)
async def update_availability(
    day_of_week: int,
    availability_data: AvailabilityUpdate,
    current_user = Depends(get_current_active_user)
):
    """
    Update availability for a specific day
    """
    db = get_database()

    # Validate day of week
    if day_of_week < 0 or day_of_week > 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Day of week must be between 0 (Sunday) and 6 (Saturday)"
        )

    # Check if availability exists
    existing = await db.availability.find_one({
        "employee_id": str(current_user["_id"]),
        "day_of_week": day_of_week
    })

    if not existing:
        # Create new availability if it doesn't exist
        availability_dict = availability_data.dict()
        availability_dict["employee_id"] = str(current_user["_id"])
        availability_dict["day_of_week"] = day_of_week
        availability_dict["created_at"] = datetime.utcnow()
        availability_dict["updated_at"] = datetime.utcnow()

        result = await db.availability.insert_one(availability_dict)
        updated_availability = await db.availability.find_one({"_id": result.inserted_id})
    else:
        # Update existing availability
        update_data = availability_data.dict()
        update_data["updated_at"] = datetime.utcnow()

        await db.availability.update_one(
            {"employee_id": str(current_user["_id"]), "day_of_week": day_of_week},
            {"$set": update_data}
        )

        updated_availability = await db.availability.find_one({
            "employee_id": str(current_user["_id"]),
            "day_of_week": day_of_week
        })

    return updated_availability
