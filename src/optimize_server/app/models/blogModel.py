from unicodedata import name
import uuid
from typing import Optional
from pydantic import BaseModel,Field

class BlogModel(BaseModel):
    id:str=Field(default_factory=uuid.uuid4,alias="_id")
    title:str= Field(...)
    message:str= Field(...)

class UpdateBlogModel(BaseModel):
    title:Optional[str]
    message:Optional[str]

