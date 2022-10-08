from fastapi import APIRouter
from ..services import return_podname_MEMORY,make_pod_predictions_MEMORY
router = APIRouter(
    prefix="/model-prdiction-memory",
    tags=['MEMORY_prediction']
)

# endpoint to return all the pods
@router.get('/get-podfiles')
async def return_pod_names_memory():
    result = await return_podname_MEMORY()
    return result

# endpoint to start prediction process
@router.get('/make-prediction_singlepod')
async def make_podpredictions_cpu(pod_name:str):
    result = await make_pod_predictions_MEMORY(pod_name)    
    print(result)
    return result

# endpoint to return all the pods
# @router.get('/get-pods')
# async def return_pods():
#     result = await return_pods_start()
#     return result

# endpoint to start generating graphs
# @router.get('/generate_history-graphs')
# async def generate_history_graphs():
#     result = await history_cpu_start()
#     return result

# # endpoint to start prediction process
# @router.get('/make-prediction_single-pod')
# async def make_pod_predictions(pod_name:str):
#     result = await make_single_pod_predictions_start(pod_name)    
#     return result
