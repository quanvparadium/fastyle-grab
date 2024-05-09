import os
from fastapi import HTTPException
from schemas.input import MetadataSearch, TextSearch, ImageSearch
import requests
from requests.structures import CaseInsensitiveDict

headers = CaseInsensitiveDict()
headers["Accept"] = "application/json"
async def metadata_search_controller(item: MetadataSearch):
    expressUrl = f"http://{os.getenv('HOST')}:{os.getenv('EXPRESS_PORT')}"
    print(expressUrl)
    response = requests.get(f'{expressUrl}/api/clothes/{item.cloth_type}/{item.cloth_id}', headers=headers)
    return response.json()