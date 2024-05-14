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

def return_number(filepath: str):
    return int(filepath.split('.')[0])

def check_diff(subfolder): 
    for style in tqdm(subfolder[0]):
        if not style.endswith('.json'): 
            continue
        image = style[:-5] + '.jpg'
        if (image not in subfolder[1]):
            print("Image not found: ", image)

def create_json_file():
    total_images = None
    try: 
        list_dir = os.listdir(DATABASE)
        print(list_dir[:10])
        subfolder = []
        for folder in list_dir:
            if (folder.endswith('.csv')): continue
            subfolder.append(sorted(os.listdir(os.path.join(DATABASE, folder)), key=return_number))
            print(f"Folder {folder} has ", len(subfolder[-1]))
        check_diff(subfolder=subfolder)
        total_images = subfolder[1]
    except: 
        raise Exception('Database not found')
    dictionary = dict({})
    for image in tqdm(total_images):
        id_img = int(image.split('.')[0])
        key = (id_img - 1) // 1000
        if key not in dictionary:
            dictionary[key] = [image]
        else:
            dictionary[key].append(image)
    try:
        with open('dict.json', 'w') as f:
            f.write(json.dumps(dictionary))
        print('Writing dictionary successfully')
    except:
        raise Exception('Error while creating json file')

if __name__ == "__main__":
    check_exist()