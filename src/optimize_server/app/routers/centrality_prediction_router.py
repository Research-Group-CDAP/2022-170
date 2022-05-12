from fastapi import APIRouter
from ..services import history_centrality_start,make_centrality_prediction_start
router = APIRouter(
    prefix="/model-prdiction-centrality",
    tags=['Centrality_prediction']
)

# endpoint to start prediction process
@router.get('/generate_history-graphs')
async def generate_history_graphs():
    result = await history_centrality_start()
    return result

# endpoint to start prediction process
@router.get('/make-prediction_single-pod')
async def make_pod_predictions(dep_name:str):
    result = await make_centrality_prediction_start(dep_name)    
    return result
    