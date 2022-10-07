import os
from fastapi.responses import FileResponse

async def service_send_cpu_pred_png():
    path = os.getcwd() + '/app/results/prediction/cpu/future_step_pred.png'
    res = FileResponse(path)
    return res
    
async def service_send_cpu_pred_csv_bilstm():
    path = os.getcwd() + '/app/results/prediction/cpu/future_step_pred_bilstm.csv'
    res = FileResponse(path)
    return res

async def service_send_cpu_pred_csv_gru():
    path = os.getcwd() + '/app/results/prediction/cpu/future_step_pred_gru.csv'
    return FileResponse(path)

async def service_send_dep_pred_png():
    path = os.getcwd() + '/app/results/prediction/dependency/future_step_pred.png'
    return FileResponse(path)

async def service_send_dep_pred_csv_bilstm():
    path = os.getcwd() + '/app/results/prediction/dependency/future_step_pred_bilstm.csv'
    return FileResponse(path)

async def service_send_dep_pred_csv_gru():
    path = os.getcwd() + '/app/results/prediction/dependency/future_step_pred_gru.csv'
    return FileResponse(path)
