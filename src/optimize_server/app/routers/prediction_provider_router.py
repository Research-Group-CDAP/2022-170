from fastapi import APIRouter
from fastapi.responses import FileResponse
from ..services import service_send_cpu_pred_png,service_send_cpu_pred_csv_bilstm,service_send_cpu_pred_csv_gru,service_send_dep_pred_png,service_send_dep_pred_csv_bilstm,service_send_dep_pred_csv_gru
router = APIRouter(
    prefix="/prediction-provider",
    tags=['prediction_provider']
)

@router.get('/send-cpu_pred-graph')
async def send_cpu_pred_png():
    result = await service_send_cpu_pred_png()
    return result

@router.get('/send-cpu_pred-bilstm')
async def send_cpu_pred_csv_bilstm():
    result = await service_send_cpu_pred_csv_bilstm()
    return result

@router.get('/send-cpu_pred-gru')
async def send_cpu_pred_csv_gru():
    result = await  service_send_cpu_pred_csv_gru()
    return result

@router.get('/send-dep_pred-graph')
async def send_dep_pred_png():
    result = await service_send_dep_pred_png()
    return result

@router.get('/send-dep_pred-bilstm')
async def send_dep_pred_csv_bilstm():
    result = await service_send_dep_pred_csv_bilstm()
    return result

@router.get('/send-dep_pred-gru')
async def send_dep_pred_csv_gru():
    result = await service_send_dep_pred_csv_gru()
    return result
    