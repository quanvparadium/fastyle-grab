from fastapi import APIRouter
from schemas.recommend_schema import RecommendedInput
from utils.utils import load_json_path, outfit_recommend
from controllers.recommendedControllers import recommended_controller
import numpy as np

recommendedRouter = APIRouter(prefix="/recommended")

@recommendedRouter.post('/')
async def recommend(input: RecommendedInput):

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
    # for category in features:
    #     for feat in features[category]:
    #         print(f"Category {category} shape: ", feat.shape)
    from itertools import product
    combinations = [list(combo) for combo in product(*index_features.values())]
    top_3_scores = outfit_recommend(features=features, combinations=combinations, order=order_category)
    top_3_outfit = []
    for scores in top_3_scores:
        outfit = dict()
        for idx, order in enumerate(order_category):
            outfit[order] = dictionary[order][scores[idx]]
        top_3_outfit.append(outfit)
    return { 
        "message": "Outfit is recommended successfully" ,
        "outfit": top_3_outfit
    }

@recommendedRouter.post('/test')
async def recommend(input: RecommendedInput):
    result = await recommended_controller(input=input)
    return {
        result
    }