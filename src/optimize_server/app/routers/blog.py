from fastapi import APIRouter
from ..services import get_all
router = APIRouter(
    prefix="/blog",
    tags=['Blogs']
)

@router.get('/')
def all():
    return get_all()
    