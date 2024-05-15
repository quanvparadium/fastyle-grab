# Retrieval System Python Services
## 1. Download resources

- **Download** database ở link dưới đây: **[Database](https://www.kaggle.com/code/basel99/fashion-products-recommendation-system/input?select=fashion-dataset)**, sau đó giải nén và để trong thư mục **services**. 
- Sau đó download thư mục [features](https://drive.google.com/drive/folders/1MNaNt3TaTnKQgH0qfg9LEFgYMShPkDBL?usp=sharing) chứa features của Clothes và chuyển vô thư mục **features** (nếu chưa có, hãy tạo nó), tương tự download thư mục [infos](https://drive.google.com/drive/folders/1uPzcOxsNNivxvRfUoukGUBKj7xDX-Id2?usp=sharing) chứa thông tin của Clothes và chuyển vô thư mục **infos** (nếu chưa có, hãy tạo nó):
- **Cấu trúc thư mục** sẽ có dạng như sau:

        .
        ├──────────────────────────────────────────────────────────────────── 
        ├── frontend                      # front folder
        ├── backend             # Backend folder
        │   ├── src             # Navigate to the src directory and start the development server by running npm run dev.
        │   ├── ...   
        ├── fashion-dataset                 # DATASET
        │   ├── images                      # Fashion images
        │   │   ├── 1530.jpg                # My dataset starts from 1163.jpg
        │   │   ├── 1532.jpg   
        │   │   └── ...
        │   ├── styles                      # Fashion metadata
        │   │   ├── 1530.json               # My dataset starts from 1163.json
        │   │   ├── 1532.json   
        │   │   └── ...
        │   ├── images.csv                  
        │   └── styles.csv 
        ├── services                          # Python services folder
        │   ├── LAVIS                         # Please clone the LAVIS repository first, then navigate to the 'app' directory to run the backend service.    
        │   ├── process 
        │   ├── app 
        │   │   ├── app.py                    # Run app.py to to start the backend service.
        │   │   └── ...
        │   ├── features                      # Extracted features folder
        │   │   ├── BLIP                      # Binary file extracted by BLIP model
        │   │   │   ├── topwear_blip_L2.bin   
        │   │   │   ├── headwear_blip_L2.bin   
        │   │   │   ├── bottomwear_blip_L2.bin   
        │   │   │   ├── footwear_blip_L2.bin   
        │   │   │   ├── dress_blip_L2.bin   
        │   │   │   └── others_blip_L2.bin   
        │   │   ├── BLIP_raw_features         # Raw features extracted by BLIP model
        │   │   │   ├── 1.npy
        │   │   │   ├── 2.npy   
        │   │   │   ├── ...   
        │   │   │   └── 59.npy   
        │   │   ├── FashionCLIP               # Binary file extracted by FashionCLIP model
        │   │   │   └── Update later ... 
        │   │   └── ...   
        │   ├── infos                         # Information folder
        │   │   │   ├── clothIDs.json
        │   │   │   ├── image_id.json   
        │   │   │   ├── topwear_id2path.json   
        │   │   │   ├── headwear_id2path.json   
        │   │   │   ├── bottomwear_id2path.json   
        │   │   │   ├── footwear_id2path.json   
        │   │   │   ├── dress_id2path.json   
        │   │   │   └── others_id2path.json  
        │   │   └──────
        │   ├── .gitignore
        │   └── README.md
        ├── .gitignore
        └──────────────────────────────────────────────────────────────────── 
