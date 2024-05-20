import numpy as np
from schemas.recommend_schema import RecommendedInput
from utils.utils import load_json_path, outfit_recommend,topk_outfit_various

image_id = load_json_path('../infos/image_id.json')

async def recommended_controller(input: RecommendedInput):
    global image_id
    dictionary = dict()
    features = dict()
    is_dress = False
    is_top_bottom = False

    # Lấy ra giá trị category và ảnh tương ứng với nó từ INPUT
    for category in input:
        if category[1] is None:
            continue
        if category[0] == 'dress': is_dress = True
        if category[0] in ['topwear', 'bottomwear']: is_top_bottom = True
        dictionary[category[0]] = category[1]
        # print("Catefgory", category)        


    order_category = list(dictionary.keys())
    # print("Order category", order_category)

    #Loại bỏ dress hoăc (topwear, bottomwear) để tạo các bộ outfit khác nhau
    dress_idx_feat = dict()
    dress_order_category = [item for item in order_category if ((item != 'topwear') & (item != 'bottomwear'))]
    dress_weight = [2 if item == 'dress' else 1 for item in dress_order_category]
    # print("Dress weight: {} - dress order: {}".format(dress_weight, dress_order_category))
    
    nodress_idx_feat = dict()
    nodress_order_category = [item for item in order_category if (item != 'dress')]
    nodress_weight = [2 if item in ['topwear', 'bottomwear'] else 1 for item in nodress_order_category]
    # print("Nodress weight: {} - Nodress order: {}".format(nodress_weight, nodress_order_category))


    for category in order_category:
        values = dictionary[category]
        for idx, value in enumerate(values):
            index_of_image = image_id['{}.npy'.format((value - 1)//1000)].index('{}.jpg'.format(value))
            data = np.load('../features/BLIP_raw_features/{}.npy'.format((value - 1)//1000))
            if category in features:
                features[category].append(data[index_of_image])
                if category == 'dress':
                    dress_idx_feat[category].append(idx)
                elif category in ['topwear', 'bottomwear']:
                    nodress_idx_feat[category].append(idx)
                else:
                    dress_idx_feat[category].append(idx)
                    nodress_idx_feat[category].append(idx)
            else:
                features[category] = [data[index_of_image]]
                if category == 'dress':
                    dress_idx_feat[category] = [0]
                elif category in ['topwear', 'bottomwear']:
                    nodress_idx_feat[category] = [0]
                else:
                    dress_idx_feat[category] = [0]
                    nodress_idx_feat[category] = [0]
    # print(nodress_idx_feat)

    from itertools import product
    nodress_combinations = [list(combo) for combo in product(*nodress_idx_feat.values())]

    # print(dress_idx_feat)

    dress_combinations = [list(combo) for combo in product(*dress_idx_feat.values())]
    # print("Total combination: ", len(dress_combinations))
    # print(features.keys())
    for key, value in features.items():
        print("Key {} - Value: ".format(key), len(value))

    topk_dress = None
    topk_nodress = None

    outfit_nodress = []
    outfit_dress = []
    outfit_others = []
    if is_top_bottom:
        topk_nodress = outfit_recommend(features=features, combinations=nodress_combinations, order=nodress_order_category)
        # print("Before: ", topk_nodress)
        topk_nodress_index = topk_outfit_various(topk_nodress, nodress_weight)
        for id, index_outfit in enumerate(topk_nodress_index):
            scores = topk_nodress[index_outfit]
            # print("Scores: ", scores)
            outfit = dict()
            for (idx, category) in enumerate(nodress_order_category):
                outfit[category] = dictionary[category][scores[idx]]
            outfit_nodress.append(outfit)
        # print("Outfit nodress output: ", outfit_nodress)
    if is_dress:
        topk_dress = outfit_recommend(features=features, combinations=dress_combinations, order=dress_order_category)
        # print("Before: ", topk_dress)
        topk_dress_index = topk_outfit_various(topk_dress, dress_weight)
        for id, index_outfit in enumerate(topk_dress_index):
            scores = topk_dress[index_outfit]
            # print("Scores: ", scores)
            outfit = dict()
            for (idx, category) in enumerate(dress_order_category):
                outfit[category] = dictionary[category][scores[idx]]
            outfit_dress.append(outfit)
        # print("Outfit dress output: ", outfit_dress)

    if (is_dress == False and is_top_bottom == False):
        topk_others = outfit_recommend(features=features, combinations=dress_combinations, order=order_category)
        # print("Before: ", topk_others)
        topk_others_index = topk_outfit_various(topk_others, dress_weight)
        for id, index_outfit in enumerate(topk_others_index):
            scores = topk_others[index_outfit]
            # print("Scores: ", scores)
            outfit = dict()
            for (idx, category) in enumerate(dress_order_category):
                outfit[category] = dictionary[category][scores[idx]]
            outfit_others.append(outfit)
        # print("Outfit others output: ", outfit_others)

    if (is_top_bottom & is_dress):
        return [item for pair in zip(outfit_nodress, outfit_dress) for item in pair][:5]
    elif is_top_bottom:
        return outfit_nodress
    elif is_dress:
        return outfit_dress
    else:
        return outfit_others


