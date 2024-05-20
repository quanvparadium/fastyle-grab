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
    return (np.array(combinations)[top_k_score])
    # return (combinations, order)

from collections import defaultdict

def get_equal_outfit(array1, array2, weight = None):
    if (weight is None): 
        weight = [1] * len(array1)
    assert len(array1) == len(array2), "2 array must be equal length"
    assert len(array1) == len(weight), "Weight length must be equal array length"
    return sum([int(a == b) * weight[idx] for (idx, (a, b)) in enumerate(zip(array1, array2))])

def topk_outfit_various(array: np.ndarray, weight, nodress=False):
    count = 0
    if len(array[0].tolist()) < 3:
        return list(range(len(array)))[:5]
    min_outfit = [0, 0, 0]
    min_score = 1000       
    print("Topk outfit weight: ", weight)
    for i in range(len(array) - 2):
        for j in range(i+1, len(array) - 1):
            for k in range(j+1, len(array)):
                ij = get_equal_outfit(array[i], array[j], weight)
                jk = get_equal_outfit(array[j], array[k], weight)
                ki = get_equal_outfit(array[k], array[i], weight)  
                count += 1
                score = ij + jk + ki
                if score < min_score:
                    min_score = score
                    min_outfit = [i, j, k]
                # print("Outfit {} - outfit {} - outfit {}: ".format(i, j, k), score)
    import random
    random.seed(42)
    random_count = 0
    for _ in range(len(array) * 3):
        if random_count == 2:
            print("BREAK")
            break
        number = random.randint(0, len(array) - 1)
        if number in min_outfit:
            continue
        else:
            min_outfit.append(number)
            random_count += 1
    print("Min outfit: ", min_outfit)
    # min
    # Trường hợp ban đầu gửi user input không đòi hỏi dress thì trả về 5 (thay vì 3)
    # if nodress:


    return min_outfit


if __name__ == "__main__":
    array1 = [0, 1, 1, 1]
    array2 = [0, 1, 1, 2]
    array3 = [0, 0, 1, 1]
    array = [[0, 1, 1, 1], [0, 1, 1, 2], [0, 0, 1, 1], [0, 0, 1, 2], [0, 1, 1, 0], [1, 0, 1, 2], [0, 0, 1, 0], [1, 1, 1, 2], [1, 1, 1, 1], [1, 0, 1, 1]]
    dress_array = [[1, 1, 1], [1, 0, 1], [0, 0, 1], [0, 1, 1], [1, 2, 1], [0, 2, 1], [1, 1, 0], [0, 1, 0], [1, 0, 0], [0, 0, 0]]
    count = 0
    min_outfit = [0, 0, 0]
    min_score = 1000
    for i in range(len(array) - 2):
        for j in range(i+1, len(array) - 1):
            for k in range(j+1, len(array)):
                ij = get_equal_outfit(array[i], array[j])
                jk = get_equal_outfit(array[j], array[k])
                ki = get_equal_outfit(array[k], array[i])   
                count += 1
                score = ij + jk + ki
                if score < min_score:
                    min_score = score
                    min_outfit = [i, j, k]
                print("Outfit {} - outfit {} - outfit {}: ".format(i, j, k), score)
    print(count)
    print("Min outfit: ", [array[idx_outfit] for idx_outfit in min_outfit])

    count = 0
    min_outfit = [0, 0]                
    for i in range(len(dress_array) - 2):
        for j in range(i+1, len(dress_array) - 1):
                ij = get_equal_outfit(dress_array[i], dress_array[j])
                count += 1
                score = ij
                if score < min_score:
                    min_score = score
                    min_outfit = [i, j]
                print("Outfit {} - outfit {}: ".format(i, j), score)                
    print(count)
    print("Min outfit: ", [dress_array[idx_outfit] for idx_outfit in min_outfit])
