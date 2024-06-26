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

async def image_search_controller(item: ImageSearch, extract_model = 'BLIP'):
    from PIL import Image
    raw_image = Image.open('../../fashion-dataset/images/{}'.format(item.imageUrl)).convert('RGB')
    img = vis_processors_blip['eval'](raw_image).unsqueeze(0).to(_device)
    image_feature = model.encode_image(img).detach().cpu().numpy()    

    if not os.path.exists('../features/{}/{}_{}_L2.bin'.format(extract_model, item.category, extract_model.lower())):
        raise Exception("Category feature not found")
    faiss_model = load_bin_file('../features/{}/{}_{}_L2.bin'.format(extract_model, item.category, extract_model.lower()))
    id2path = load_json_path('../infos/{}_id2path.json'.format(item.category))
    scores, idx_images = faiss_model.search(image_feature, k = item.topk // 2)

    # print("Score, index: ", faiss_model.search(image_feature, k = item.topk))
    
    # Search from original database
    idx_images = idx_images.flatten()
    scores = scores.flatten()

    # Yame score 
    if not os.path.exists('../features/{}/{}_{}_L2.bin'.format(extract_model, 'yame', extract_model.lower())):
        raise Exception("Yame feature not found")
    else:
        yame_faiss_model = load_bin_file('../features/{}/{}_{}_L2.bin'.format(extract_model, 'yame', extract_model.lower()))
        yame_id2path = load_json_path('../infos/yame_id.json')
        yame_scores, yame_idx_images = yame_faiss_model.search(image_feature, k = item.topk // 4)
        yame_idx_images = yame_idx_images.flatten()
        yame_scores = yame_scores.flatten()
        total_yame_img_path = [(yame_id2path[str(imageId)]) for idx, imageId in enumerate(yame_idx_images)]
        print(total_yame_img_path)
        print(yame_scores)

    # Yody score 
    if not os.path.exists('../features/{}/{}_{}_L2.bin'.format(extract_model, 'yody', extract_model.lower())):
        raise Exception("Yody feature not found")
    else:
        yody_faiss_model = load_bin_file('../features/{}/{}_{}_L2.bin'.format(extract_model, 'yody', extract_model.lower()))
        yody_id2path = load_json_path('../infos/yody_id.json')
        yody_scores, yody_idx_images = yody_faiss_model.search(image_feature, k = item.topk // 4)
        yody_idx_images = yody_idx_images.flatten()
        yody_scores = yody_scores.flatten()
        total_yody_img_path = [(yody_id2path[str(imageId)]) for idx, imageId in enumerate(yody_idx_images)]
        print(total_yody_img_path)
        print(yody_scores)


    total_img_path = [(id2path[str(imageId)]) for idx, imageId in enumerate(idx_images)]
    print(total_img_path)
    print(scores)
    return [*total_img_path, *total_yame_img_path, *total_yody_img_path]
