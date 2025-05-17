import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection settings
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "nextera_workforce")

# Global database client and connection objects
client = None
db = None

async def connect_to_mongo():
    """
    Connect to MongoDB when the application starts
    """
    global client, db
    
    try:
        client = AsyncIOMotorClient(MONGODB_URL)
        db = client[DB_NAME]
        
        # Verify connection
        await client.admin.command('ping')
        print(f"Connected to MongoDB at {MONGODB_URL}")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
        raise e

async def close_mongo_connection():
    """
    Close MongoDB connection when the application shuts down
    """
    global client
    
    if client:
        client.close()
        print("MongoDB connection closed")

def get_database():
    """
    Return database instance
    """
    return db
