import json
def load_json_path(json_path: str):
    with open(json_path, 'r') as f:
        js = json.loads(f.read())
    # return {int(k):v for k,v in js.items()}
    return js

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def mean_cosine_similarity(outfit):
    length = len(outfit)
    cosine_metrics = []
    for i in range(length):
        for j in range(i + 1, length):
            cosine_metrics.append(cosine_similarity(outfit[i], outfit[j]))
            assert cosine_similarity(outfit[i], outfit[j]) == cosine_similarity(outfit[j], outfit[i]), "Fault cosine similarity"
    return np.mean(cosine_metrics)

def outfit_recommend(features, combinations, order, topk=10):
    scores = []
    for id, combine in enumerate(combinations):
        outfit = []
        for idx, category in enumerate(order):
            outfit.append(features[category][combine[idx]])
        score = mean_cosine_similarity(outfit=outfit)
        scores.append(score)
        # print("Score outfit: ", score, id)
    top_k_score = np.argsort(scores)[-topk:][::-1]
    print(f"Top {topk} score index: ", top_k_score)
    print(np.sort(scores)[-topk:][::-1])
    print(f"Top {topk} combination index: ", np.array(combinations)[top_k_score])
    return np.array(combinations)[top_k_score]
    # return (combinations, order)
