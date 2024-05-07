import os
import json
from tqdm import tqdm

DATABASE = '../fashion-dataset'

def eda(datapath = DATABASE):
    def getName (file_json): 
        try: 
            return int(file_json.split('.')[0])
        except:
            raise Exception("Validation Type")
    stylepath = os.path.join(datapath, 'styles')
    print(len(os.listdir(stylepath)))
    styles = sorted(os.listdir(stylepath), key=getName)
    count = 0
    count2 = 0
    category = dict({})
    dictionary = dict({})
    mainType = dict({})
    rating = dict({})
    usage = dict({})
    season = dict({})
    viewOption = dict({})
    ageGroup = dict({})
    gender = dict({})
    for style in tqdm(styles):
        with open(os.path.join(stylepath, style), 'r') as f:
            metadata = json.load(f)
        try:
            # if metadata['data']['subCategory']:
            #     cat = metadata['data']['subCategory']
            #     if cat in category:
            #         category[cat] += 1
            #     else:
            #         category[cat] = 1
            # count += 1
            if metadata['data']['productDisplayName']:
                count+= 1
            if metadata['data']['subCategory']:
                typeName = metadata['data']['subCategory']['typeName']
                if typeName in category:
                    category[typeName] += 1
                else:
                    category[typeName] = 1
                if typeName == "Topwear":
                    articleName = metadata['data']['articleType']['typeName']
                    if articleName in dictionary:
                        dictionary[articleName] += 1
                    else:
                        mainType[articleName] = style
                        dictionary[articleName] = 1
                # count += 1
            

            if metadata['data']['season']:
                seasonName = metadata['data']['season']
                if seasonName in season:
                    season[seasonName] += 1
                else:
                    season[seasonName] = 1
                

            if metadata['data']['myntraRating']:
                rate = metadata['data']['myntraRating']
                if rate in rating:
                    rating[rate] += 1
                else:
                    rating[rate] = 1
            
            if metadata['data']['usage']:
                typeFash = metadata['data']['usage']
                if typeFash in usage:
                    usage[typeFash] += 1
                else:
                    usage[typeFash] = 1

            if metadata['data']['styleImages']:
                stylesView = metadata['data']['styleImages']
                for key in stylesView.keys():
                    if key in viewOption:
                        viewOption[key] += 1
                    else:
                        viewOption[key] = 1
            if metadata['data']['ageGroup']:
                age = metadata['data']['ageGroup']
                if age in ageGroup:
                    ageGroup[age] += 1
                else:
                    ageGroup[age] = 1
            if metadata['data']['gender']:
                gend = metadata['data']['gender']
                if gend in gender:
                    gender[gend] += 1
                else:
                    gender[gend] = 1
        except: 
            print("Fault")
            continue
    print("product Display Name: ", count)

    for key in dictionary.keys():
        print(f'{key}: ', dictionary[key], mainType[key])
    
    print("Category: ", category)
    print("Rating", rating)
    print("Usage: ", usage)
    print("Season: ", season)
    print("View: ", viewOption)
    print("Age Group: ", ageGroup)
    print("Gender: ", gender)

if __name__ == "__main__":
    eda()