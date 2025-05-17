from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

from app.routers import auth, users, schedules, roles, logout
from app.utils.database import connect_to_mongo, close_mongo_connection

# Load environment variables
load_dotenv()

def create_app() -> FastAPI:
    """
    Create and configure the FastAPI application
    """
    app = FastAPI(
        title="NextEra Workforce API",
        description="API for NextEra Workforce - AI-Driven Employee Management System",
        version="1.0.0",
    )

    # Configure CORS
    origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Event handlers for database connection
    app.add_event_handler("startup", connect_to_mongo)
    app.add_event_handler("shutdown", close_mongo_connection)

    # Include routers
    api_prefix = os.getenv("API_PREFIX", "/api/v1")
    app.include_router(auth.router, prefix=f"{api_prefix}/auth", tags=["Authentication"])
    app.include_router(logout.router, prefix=f"{api_prefix}/auth", tags=["Authentication"])
    app.include_router(users.router, prefix=f"{api_prefix}/users", tags=["Users"])
    app.include_router(schedules.router, prefix=f"{api_prefix}/schedules", tags=["Schedules"])
    app.include_router(roles.router, prefix=f"{api_prefix}/roles", tags=["Roles"])

    @app.get("/")
    async def root():
        return {"message": "Welcome to NextEra Workforce API"}

    return app
