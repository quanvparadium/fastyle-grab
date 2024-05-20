import os
import sys
import json
import torch
import numpy as np
from PIL import Image
from tqdm import tqdm

DATABASE = '../fashion-dataset'
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

if not os.path.exists('infos'):
    os.mkdir('infos')

class ExtractFeature:
    def __init__(self, model, data_source, feat_dest):
        assert model in ["BLIP", "FashionCLIP"], "Invalid value for the 'model' variable"
        self.model = model
        if not os.path.exists(feat_dest):
            os.mkdir(feat_dest)
        self.data_source = data_source
        self.feat_dest = feat_dest
        self.device = DEVICE
    
    def _extract_helper(self, model, vis_processors, images_list, feature_dest_path):
        image_feats = []
        dict_result = []
        for image in tqdm(images_list):
            image_path = (os.path.join(self.data_source, 'images', image))
            print(image_path)
            raw_image = Image.open(image_path).convert('RGB')
            img = vis_processors['eval'](raw_image).unsqueeze(0).to(DEVICE)
            image_features = model.encode_image(img).detach().cpu().numpy()
            image_feats.append(image_features)
            dict_result.append(image)
        print("Feature dest path: ", feature_dest_path)
        np.save(feature_dest_path, np.asarray(image_feats))
        print("Save dones")
        return {
            feature_dest_path: dict_result
        }

    def extract_feature(self):
        if self.model == "BLIP":
            print("Extract feature using BLIP ...")
            """Add LAVIS path"""
            current_dir = os.path.dirname(os.path.abspath(__file__))
            # Xác định đường dẫn tới thư mục LAVIS
            lavis_dir = os.path.join(current_dir, 'LAVIS')
            # Thêm đường dẫn tương đối của thư mục LAVIS vào sys.path
            sys.path.append(lavis_dir)
            from lavis.models import load_model_and_preprocess
            # from lavis.processors import load_processor

            self.model_blip, self.vis_processors_blip, self.text_processors_blip = load_model_and_preprocess("blip_image_text_matching", 
                                            "base", 
                                            device=self.device, 
                                            is_eval=True)
            with open('infos/dict.json', 'r') as f:
                data = json.loads(f.read())
            dictionary = dict({})
            for key in tqdm(data.keys()):
                dest_path = os.path.join(self.feat_dest, key + '.npy')
                result = self._extract_helper(self.model_blip, self.vis_processors_blip, data[key], feature_dest_path=dest_path)
                dictionary.update(result)
                # if key == '3': break
            with open("infos/image_id.json", 'w') as f:
                f.write(json.dumps(dictionary))
        else:
            print("Extract feature using FashionCLIP ...")


if __name__ == "__main__":
    print("\033[91mPlease read the instructions below carefully before use.\033[0m")
    # etf = ExtractFeature("BLIP", DATABASE, './features2')
    # etf.extract_feature()


        