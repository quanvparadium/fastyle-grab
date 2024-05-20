import json
def load_json_path(json_path: str):
    with open(json_path, 'r') as f:
        js = json.loads(f.read())
    # return {int(k):v for k,v in js.items()}
    return js
def image2id():
    data = load_json_path('infos/image_id.json')
    print(data.keys())
    result = dict({})
    for file in data.keys():
        images = data[file]
        indexOf = dict({})
        for idx, image in enumerate(images):
            pass

# image2id()