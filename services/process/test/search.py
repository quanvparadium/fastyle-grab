import sys
import os
import torch
from fastapi import HTTPException
import json
import faiss
from collections import defaultdict
import numpy as np

DATABASE_PATH = '../Database'
JSON_PATH = './features/keyframe_id.json'

def load_bin_file(bin_file: str):
    return faiss.read_index(bin_file) 

def load_json_path(json_path: str):
    with open(json_path, 'r') as f:
        js = json.loads(f.read())
    # return {int(k):v for k,v in js.items()}
    return js

"""Add LAVIS path"""
current_dir = os.path.dirname(os.path.abspath(__file__))
# Xác định đường dẫn tới thư mục LAVIS
lavis_dir = os.path.join(current_dir, 'LAVIS')
# Thêm đường dẫn tương đối của thư mục LAVIS vào sys.path
sys.path.append(lavis_dir)
print(lavis_dir)
from lavis.models import load_model_and_preprocess

def build_index():
    count = 0
    feature_shape = 256
    my_index = faiss.IndexFlatL2(feature_shape)
    data = load_json_path('infos/image_id.json')
    feats = np.load('features/1.npy')
    for id in range(len(feats)):
        feat = feats[id]
        feat = feat.astype(np.float32)
        print(feat.shape)
        my_index.add(feat)
    return my_index

# LOAD MODEL
print("LOADING MODEL...")
__device = "cuda" if torch.cuda.is_available() else "cpu"
model, vis_processors_blip, text_processors_blip = load_model_and_preprocess("blip_image_text_matching", 
                                                                            "base", 
                                                                            device=__device, 
                                                                            is_eval=True)

print(model)

query = "red shirt"
txt = text_processors_blip["eval"](query)
text_features = model.encode_text(txt, __device).cpu().detach().numpy()
# model.encod

my_index = build_index()
my_index.search(text_features, k=10)
print(query)
print(text_features.shape)

