import glob
import numpy as np
import re
import os
import json
import faiss
from collections import defaultdict

DATABASE_PATH = '../../fashion-dataset'
JSON_PATH = '../infos/image_id.json'

def load_bin_file(bin_file: str):
    return faiss.read_index(bin_file) 

def load_json_path(json_path: str):
    with open(json_path, 'r') as f:
        js = json.loads(f.read())
    # return {int(k):v for k,v in js.items()}
    return js


class MyFaiss:
    def __init__(self, root_database: str):
        self.root_database = root_database

    def write_bin_file(self, clothes_category, clothes_json_path: str, method='L2', feature_shape=256, feature_path = '../features'):
        count = 0
        build_index = faiss.IndexFlatL2(feature_shape) if method == 'L2' else faiss.IndexFlatIP(feature_shape)
        data = load_json_path('../infos/clothIDs.json')
        image_id = load_json_path(clothes_json_path)
        clothes_id2path = dict({})
        print('===================================================================')
        print(len(data[clothes_category]))
        clothes = data[clothes_category]
        opened_bin_file = ''
        feat_data_npy = None
        for idx, cloth in enumerate(clothes):
            check_file = '{}.npy'.format((cloth - 1)//1000)
            try: 
                index_cloth = image_id[check_file].index('{}.jpg'.format(cloth))

                # print("Index: ",cloth, index_cloth)
                if check_file != opened_bin_file:
                    # print(idx, cloth)
                    opened_bin_file = check_file
                    # print("Path file: ", os.path.join(feature_path, check_file))
                    feat_data_npy = np.load(os.path.join(feature_path, check_file))
                
                # for feat in feat_data_npy:
                    # feat = feat.astype(np.float32)
                if feat_data_npy is None:
                    print('FAULT')
                # print("feat", feat_data_npy[index_cloth])
                clothes_id2path[count] = '{}.jpg'.format(cloth)
                count += 1
                feat = (feat_data_npy[index_cloth]).astype(np.float32)
                build_index.add(feat)
            except:
                continue
        # print("Total: ", count)
        print("CLOTHES has", len(clothes))
        faiss.write_index(build_index, os.path.join(feature_path, '{}_blip_{}.bin'.format(clothes_category, method)))
        with open(os.path.join('../infos', '{}_id2path.json'.format(clothes_category)), 'w') as f:
            f.write(json.dumps(clothes_id2path))
        print('Saved ', os.path.join(feature_path, '{}_blip_{}.bin'.format(clothes_category, method)))
        print("Number of index: ", count)


if __name__ == "__main__":
    create_file = MyFaiss(DATABASE_PATH)
    create_file.write_bin_file('topwear',clothes_json_path=JSON_PATH)
    create_file.write_bin_file('headwear',clothes_json_path=JSON_PATH)
    create_file.write_bin_file('footwear',clothes_json_path=JSON_PATH)
    create_file.write_bin_file('bottomwear',clothes_json_path=JSON_PATH)
    create_file.write_bin_file('dress',clothes_json_path=JSON_PATH)
    create_file.write_bin_file('others',clothes_json_path=JSON_PATH)

