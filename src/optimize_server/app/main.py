from sqlite3 import connect
from fastapi import FastAPI
from routers import blog
from .config import settings
from motor.motor_asyncio import AsyncIOMotorClient
import pymongo



# from .util.database import connect_db,disconnect_db
import uvicorn  
app = FastAPI()

app.include_router(blog.router)
# app.include_router(prediction.router)


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = pymongo.MongoClient(settings.DB_URL)
    app.mongodb = app.mongodb_client[settings.DB_NAME]
    # connect_db(app)


@app.on_event("shutdown")
async def startup_db_client():
    app.mongodb_client.close()
    # disconnect_db(app)

@app.get('/')
def index():
    return 'Backend api running'


# if __name__ == "__main__":
#     uvicorn.run(app,host="127.0.0.1",port=9000)