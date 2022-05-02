from fastapi import APIRouter, Body , HTTPException,Request,status
from models.blogModel import BlogModel
from services import blogService

router = APIRouter(
    prefix="/blog",
    tags=['Blogs']
)

@router.get('/')
def getAllBlogs(request:Request):
    return blogService.get_all(request)


@router.post('/')
def createBlog(request:Request,blog:BlogModel=Body(...)):
    return blogService.create(request,blog)

 