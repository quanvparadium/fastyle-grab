import numpy as np
import os
import json
import faiss

def load_bin_file(bin_file: str):
    return faiss.read_index(bin_file) 

def load_json_path(json_path: str):
    with open(json_path, 'r') as f:
        js = json.loads(f.read())
    # return {int(k):v for k,v in js.items()}
    return js    
def write_bin_file(clothes_category, clothes_json_path: str, method='L2', feature_shape=256, feature_path = '../features'):
    count = 0
    build_index = faiss.IndexFlatL2(feature_shape) if method == 'L2' else faiss.IndexFlatIP(feature_shape)
    data = load_json_path('infos/yody_id.json')
    # clothes_id2path = dict({})
    print('===================================================================')
    # print(len(data[clothes_category]))
    feat_data_npy = np.load('features/yody/yody.npy')
    print(feat_data_npy)
    if feat_data_npy is None:
        print('FAULT')    
    for idx in range(len(feat_data_npy)):
        feat = feat_data_npy[idx]
        if idx <= 2: print(feat)
        feat = feat.astype(np.float32)
        build_index.add(feat)
        count += 1
    faiss.write_index(build_index, os.path.join('features/BLIP', '{}_blip_{}.bin'.format('yody', method)))
    print('Saved ',  os.path.join('features/BLIP', '{}_blip_{}.bin'.format('yody', method)))
    print("Number of index: ", count)    

if __name__ == "__main__":
    write_bin_file('','')

