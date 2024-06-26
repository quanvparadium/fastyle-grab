from pydantic import BaseModel

class MetadataSearch(BaseModel):
    cloth_type: str
    cloth_id: str

class TextSearch(BaseModel):
    query: str
    category: str
    topk: int

class ImageSearch(BaseModel):
    imageUrl: str
    category: str
    topk: int