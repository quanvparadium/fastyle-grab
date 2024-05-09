from pydantic import BaseModel

class MetadataSearch(BaseModel):
    cloth_type: str
    cloth_id: str

class TextSearch(BaseModel):
    query: str
    topk: int

class ImageSearch(BaseModel):
    pass