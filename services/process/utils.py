import os
from tqdm import tqdm
DATABASE = '../fashion-dataset'

def check_exist(datapath = DATABASE):
    def getName (file_json): 
        try: 
            return int(file_json.split('.')[0])
        except:
            raise Exception("Validation Type")
    stylepath = os.path.join(datapath, 'styles')
    styles = sorted(os.listdir(stylepath), key=getName)
    imagepath = os.path.join(datapath, 'images')
    images = sorted(os.listdir(imagepath), key=getName)
    exist = dict({})
    for image in tqdm(images):
        exist[image.split('.')[0]] = 1
    for style in tqdm(styles):
        try:
            exist[style.split('.')[0]]
        except:
            print(style)
            print("Fault")

if __name__ == "__main__":
    check_exist()