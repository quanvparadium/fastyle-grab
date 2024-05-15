import os
import sys
import torch
import requests
from fastapi import HTTPException
from schemas.input import MetadataSearch, TextSearch, ImageSearch
from requests.structures import CaseInsensitiveDict
from models.myfaiss import load_bin_file, load_json_path

headers = CaseInsensitiveDict()
headers["Accept"] = "application/json"

"""Add LAVIS path"""
current_dir = os.path.dirname(os.getcwd())
# Xác định đường dẫn tới thư mục LAVIS
lavis_dir = os.path.join(current_dir, 'LAVIS')
# Thêm đường dẫn tương đối của thư mục LAVIS vào sys.path
sys.path.append(lavis_dir)
print(lavis_dir)
from lavis.models import load_model_and_preprocess


# LOAD MODEL
print("\033[92m>>> Loading AI model ...\033[0m")
_device = "cuda" if torch.cuda.is_available() else "cpu"
model, vis_processors_blip, text_processors_blip = load_model_and_preprocess("blip_image_text_matching", 
                                                                            "base", 
                                                                            device=_device, 
                                                                            is_eval=True)
print("\033[92m>>> Load model successfully!\033[0m")

async def metadata_search_controller(item: MetadataSearch):
    expressUrl = f"http://{os.getenv('HOST')}:{os.getenv('EXPRESS_PORT')}"
    print(expressUrl)
    response = requests.get(f'{expressUrl}/api/clothes/{item.cloth_type}/{item.cloth_id}', headers=headers)
    return response.json()

async def text_search_controller(item: TextSearch, extract_model = 'BLIP'):
    pass
    txt = text_processors_blip["eval"](item.query)
    text_features = model.encode_text(txt, _device).cpu().detach().numpy()
    if not os.path.exists('../features/{}/{}_blip_L2.bin'.format(extract_model, item.category)):
        raise Exception("Category feature not found")
    faiss_model = load_bin_file('../features/{}/{}_blip_L2.bin'.format(extract_model, item.category))
    id2path = load_json_path('../infos/{}_id2path.json'.format(item.category))
    scores, idx_images = faiss_model.search(text_features, k = item.topk)

    idx_images = idx_images.flatten()
    scores = scores.flatten()
    total_img_path = [id2path[str(idx)] for idx in idx_images]
    print(total_img_path)
    return total_img_path