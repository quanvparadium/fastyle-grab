import os
from fastapi import HTTPException
from schemas.input import MetadataSearch, TextSearch, ImageSearch
import requests
from requests.structures import CaseInsensitiveDict
import sys
from models.myfaiss import load_bin_file, load_json_path

headers = CaseInsensitiveDict()
headers["Accept"] = "application/json"

"""Add LAVIS path"""
current_dir = os.path.dirname(os.getcwd())
print("Current directory: %s" % current_dir)
# Xác định đường dẫn tới thư mục LAVIS
lavis_dir = os.path.join(current_dir, 'LAVIS')
print("Has", os.listdir(lavis_dir))
# Thêm đường dẫn tương đối của thư mục LAVIS vào sys.path
sys.path.append(lavis_dir)
from lavis.models import load_model_and_preprocess


# LOAD MODEL
__device = "cuda" if torch.cuda.is_available() else "cpu"
model, vis_processors_blip, text_processors_blip = load_model_and_preprocess("blip_image_text_matching", 
                                                                            "base", 
                                                                            device=__device, 
                                                                            is_eval=True)

async def metadata_search_controller(item: MetadataSearch):
    expressUrl = f"http://{os.getenv('HOST')}:{os.getenv('EXPRESS_PORT')}"
    print(expressUrl)
    response = requests.get(f'{expressUrl}/api/clothes/{item.cloth_type}/{item.cloth_id}', headers=headers)
    return response.json()

async def text_search_controller(item: TextSearch):
    txt = text_processor.text_search(item)