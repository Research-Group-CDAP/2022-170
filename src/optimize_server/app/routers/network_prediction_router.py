from fastapi import APIRouter
from ..services import return_pod_names_NETWORK,make_pod_predictions_NETWORK
router = APIRouter(
    prefix="/model-prdiction-network",
    tags=['NETWORK_prediction']
)

# endpoint to return all the pods
@router.get('/get-podfiles')
async def return_pod_names_network():
    result = await return_pod_names_NETWORK()
    return result

# endpoint to start prediction process
@router.get('/make-prediction_singlepod')
async def make_podpredictions_network(pod_name:str):
    result = await make_pod_predictions_NETWORK(pod_name)    
    return result

