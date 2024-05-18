import os
import requests
from PIL import Image
from io import BytesIO
from tqdm import tqdm
def load_json_path(json_path: str):
    import json
    with open(json_path, 'r') as f:
        js = json.loads(f.read())
    # return {int(k):v for k,v in js.items()}
    return js

def download_image(url, file_name):
    """
    Tải ảnh từ URL và lưu vào file.
    
    Args:
        url (str): URL của ảnh.
        file_name (str): Tên file để lưu ảnh.
    """

    try:
        
        # Tải dữ liệu ảnh từ URL
        response = requests.get(url)
        
        # Tạo đối tượng ảnh từ dữ liệu
        image = Image.open(BytesIO(response.content))
        
        # Lưu ảnh vào file
        image.save(file_name)
        print(f"Đã lưu ảnh vào file: {file_name}")
    except requests.exceptions.RequestException as e:
        print(f"Lỗi khi tải ảnh: {e}")
    except IOError as e:
        print(f"Lỗi khi lưu ảnh: {e}")

class ExtractFeature: 
    def __init__(self, json_file, feat_dest):
        import torch
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        if not os.path.exists(feat_dest):
            os.makedirs(feat_dest)
        self.json_file = json_file
        self.feat_dest = feat_dest

    def _extract_helper(self):
        pass

    def extract_feature(self):
        pass

class BLIPExtractFeature(ExtractFeature):
    def __init__(self, model_name: str, json_file: str, feat_dest: str, image_path: str):
        super().__init__(json_file, feat_dest)
        assert model_name == "BLIP", "Invalid value for the 'model' variable"

        self.model_name = model_name
        self.image_path = image_path

        if not os.path.exists(image_path):
            os.makedirs(image_path)
        # """Add LAVIS path"""
        current_dir = os.path.dirname(os.getcwd())
        # Xác định đường dẫn tới thư mục LAVIS
        lavis_dir = os.path.join(current_dir, 'crawl')
        # Thêm đường dẫn tương đối của thư mục LAVIS vào sys.path
        import sys
        sys.path.append(lavis_dir)
        from lavis.models import load_model_and_preprocess

        self.model, self.vis_processors_blip, self.text_processors_blip = \
            load_model_and_preprocess("blip_image_text_matching", 
                                      "base", 
                                      device=self.device, 
                                      is_eval=True)

    def download_yame(self):
        from tqdm import tqdm
        json_data = load_json_path(self.json_file)
        data = json_data['data']
        print("Length data:", len(data))
        for idx, garment in tqdm(enumerate(data)):
            try: 
                garment['view']
            except:
                print("Fault nhé")
                continue
            if len(garment['view']) == 1:
                download_image(garment['view'][0], os.path.join(self.image_path, 'yody_{}.jpg'.format(idx)))
            else:
                download_image(garment['view'][0], os.path.join(self.image_path, 'yody_{}.jpg'.format(idx)))
            # break
            
    def extract_feature(self):
        super().extract_feature()
        images_path = sorted(os.listdir(self.image_path), key=getImage)
        image_feats = []
        dict_result = dict()
        for idx, image_path in tqdm(enumerate(images_path)):
            raw_image = Image.open(os.path.join(self.image_path, image_path)).convert('RGB')
            img = self.vis_processors_blip['eval'](raw_image).unsqueeze(0).to(self.device)
            image_encoded = self.model.encode_image(img).detach().cpu().numpy()
            image_feats.append(image_encoded)
            if idx < 2: print(image_encoded)
            dict_result[idx] = image_path
        feature_dest_path = os.path.join(self.feat_dest, 'yody.npy')
        print("Feature dest path: ", os.path.join(self.feat_dest, 'yody.npy'))
        import numpy as np
        import json
        np.save(feature_dest_path, np.asarray(image_feats))
        with open("infos/yody_id.json", 'w') as f:
            f.write(json.dumps(dict_result))
        print("Save dones")

    
def getImage(image_file: str):
    try:
        # print("Image file: ", image_file)
        return int((image_file.split('.')[0]).split('_')[-1])
    except:
        raise Exception("Incorrect format image file")
if __name__ == "__main__":
    blip_ext = BLIPExtractFeature("BLIP", "infos/yody/yody.json", "features/yody", image_path= "crawl/yody" )
    blip_ext.extract_feature()
    # blip_ext.download_yame()
    pass
