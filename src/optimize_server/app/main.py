from fastapi import FastAPI
from .routers import BlogRouter
from .routers import PredictionRouter
import uvicorn  
app = FastAPI()

app.include_router(BlogRouter)
app.include_router(PredictionRouter)

@app.get('/')
def index():
    return 'Backend api running'

# if __name__ == "__main__":
#     uvicorn.run(app,host="127.0.0.1",port=9000)