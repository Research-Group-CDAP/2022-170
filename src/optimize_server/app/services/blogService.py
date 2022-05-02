from fastapi import status,HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

def get_all(request):
    blogs = []
    for doc in list(request.app.mongodb["blogs"].find()):
        blogs.append(doc)
    return blogs


def get_one(request,id):
    if(task:= request.app.mongodb["blogs"].find_one({"_id":id}) is not None):
        return task
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail={"Task {id} not found"})

def create(request,blog):    
    blog =  jsonable_encoder(blog)
    new_blog =  request.app.mongodb["blogs"].insert_one(blog)
    created_blog =  request.app.mongodb["blogs"].find_one({"_id":new_blog.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED,content=created_blog)

# def update(request,blog)
