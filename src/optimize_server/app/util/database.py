from ..config import settings
from motor.motor_asyncio import AsyncIOMotorClient

async def connect_db(app):
    app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
    app.mongodb = app.mongodb_client(settings.DB_NAME)

async def disconnect_db(app):
    app.mongodb_client.close