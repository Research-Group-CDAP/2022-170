from fastapi import FastAPI
from .routers import CPUPredictionRouter,MemoryPredictionRouter,NetworkPredictionRouter,PredictionProviderRouter,DatabaseRouter
import uvicorn  
app = FastAPI()

app.include_router(CPUPredictionRouter)
app.include_router(MemoryPredictionRouter)
app.include_router(NetworkPredictionRouter)
# app.include_router(CentralityPredictionRouter)
app.include_router(PredictionProviderRouter)
app.include_router(DatabaseRouter)

@app.get('/')
def index():
    return 'Backend api running'

# if __name__ == "__main__":
#     uvicorn.run(app,host="127.0.0.1",port=9000)