import numpy as np
from schemas.recommend_schema import RecommendedInput
from utils.utils import load_json_path, outfit_recommend


async def recommended_controller(input: RecommendedInput):
    dictionary = dict()
    features = dict()
    index_features = dict()
    order_category = []
    for category in input:
        if category[1] is None:
            continue
        dictionary[category[0]] = category[1]
        # print(category)
    image_id = load_json_path('../infos/image_id.json')
    for category in dictionary.keys():
        values = dictionary[category]
        for idx, value in enumerate(values):
            index_val = image_id['{}.npy'.format((value - 1)//1000)].index('{}.jpg'.format(value))
            # print("Index value: ", index_val)
            data = np.load('../features/BLIP_raw_features/{}.npy'.format((value - 1)//1000))
            # print(data[index_val].shape)
            if category in features:
                features[category].append(data[index_val])
                index_features[category].append(idx)
            else:
                features[category] = [data[index_val]]
                index_features[category] = [0]
                order_category.append(category)    
    
    from itertools import product
    # print(dress)
    # dress_outfit_features = index_features.keys()
    # Tách ra dictionary mà không chứa key 'dress'
    nodress_index_features = {k: v for k, v in index_features.items() if k != 'dress'}
    nodress_combinations = [list(combo) for combo in product(*nodress_index_features.values())]

# Tách ra dictionary mà không chứa key 'topwear' và 'bottomwear'
    dress_index_features = {k: v for k, v in index_features.items() if k not in ['topwear', 'bottomwear']}
    dress_combinations = [list(combo) for combo in product(*dress_index_features.values())]
    dress_order_category = [item for item in order_category if ((item != 'topwear') & (item != 'bottomwear'))]
    nodress_order_category = [item for item in order_category if (item != 'dress')]

    top_3_scores = outfit_recommend(features=features, combinations=nodress_combinations, order=nodress_order_category)
    top_3_scores_dress = outfit_recommend(features=features, combinations=dress_combinations, order=dress_order_category)
    # print(top_3_scores)
    # print(top_3_scores_dress)
    top_3_outfit = []
    # print(index_features)
    # print(*index_features.values())

