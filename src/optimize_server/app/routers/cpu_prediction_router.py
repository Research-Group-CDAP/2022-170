from fastapi import APIRouter
from ..services import prediction_start
router = APIRouter(
    prefix="/model-prdiction-cpu",
    tags=['Prediction']
)

# endpoint to start prediction process
@router.get('/predict')
async def all():
    return prediction_start()
    