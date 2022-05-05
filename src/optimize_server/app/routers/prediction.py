from fastapi import APIRouter, Body , HTTPException,Request,status
from ..prediction_models.prediction_models import json_load_prediction

router = APIRouter(
    prefix="/load-prediction",
    tags=['Blogs']
)

@router.get('/')
async def startLoadPrediction():
    dataset_path = ''
    split_size = 0.7
    past_history = 12
    batch_size_train = 1
    batch_size_test =  1
    num_epochs = 100
    num_pred = 12
    num_features = 1
    json_load_prediction(dataset_path,split_size,past_history,batch_size_train,batch_size_test,num_epochs,num_pred,num_features)
    return 'Executed successfully'

