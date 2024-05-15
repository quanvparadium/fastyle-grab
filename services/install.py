import os
import sys
import torch

"""Add LAVIS path"""
current_dir = os.path.dirname(os.path.abspath(__file__))
# Xác định đường dẫn tới thư mục LAVIS
lavis_dir = os.path.join(current_dir, 'LAVIS')
print(sys.path)
# Thêm đường dẫn tương đối của thư mục LAVIS vào sys.path
sys.path.append(lavis_dir)
print(os.listdir(lavis_dir))
from lavis.models import load_model_and_preprocess

# LOAD MODEL
print("\033[92m>>> Initialize AI model ...\033[0m")
_device = "cuda" if torch.cuda.is_available() else "cpu"
model, vis_processors_blip, text_processors_blip = load_model_and_preprocess("blip_image_text_matching", 
                                                                            "base", 
                                                                            device=_device, 
                                                                            is_eval=True)
print("\033[92m>>> Initialize AI model successfully!\033[0m")