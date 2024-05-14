import os
import requests
from fastapi import APIRouter, HTTPException
from controllers.search import metadata_search_controller, text_search_controller
from schemas.input import MetadataSearch, TextSearch
from dotenv import load_dotenv
load_dotenv()

searchRouter = APIRouter()

"""
    Dùng để lấy ảnh theo id
"""
@searchRouter.get("/{cloth_type}/{cloth_id}")
async def search(cloth_type: str, cloth_id: str):
    cloth_input = MetadataSearch(cloth_type=cloth_type, cloth_id=cloth_id)
    result = await metadata_search_controller(cloth_input)
    return {
        'message': cloth_id,
        'response': result
    }

@searchRouter.post("/")
async def text_search(item: TextSearch):
    result = await text_search_controller(item)
    return {
        "result": result
    }