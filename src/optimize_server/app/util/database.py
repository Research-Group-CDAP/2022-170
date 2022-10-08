import os
from dotenv import load_dotenv
import pymongo
load_dotenv()

async def getDBCPU():
    myclient = pymongo.MongoClient(os.environ.get("MONGO_URL"))
    mydb = myclient["Cluster"]
    mycol = mydb["CPU"]
    x = list(mycol.find({}, {'_id': False}))
    print(x) 
    return "connection success"           
