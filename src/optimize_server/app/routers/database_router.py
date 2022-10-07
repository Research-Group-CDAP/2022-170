from fastapi import APIRouter
from ..util import getDBCPU
router = APIRouter(
    prefix="/db",
    tags=['DB']
)

@router.get('/')
async def getDB():
    result = await getDBCPU()
    return result
