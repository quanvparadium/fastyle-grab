# Retrieval System Python Services
## 1. Download resources

- **Download** database ở link dưới đây: **[Database](https://www.kaggle.com/datasets/paramaggarwal/fashion-product-images-dataset)**, sau đó giải nén, lấy folder **fashion-dataset** và đặt cùng cấp với thư mục **backend**, **frontend**. 
- Sau đó, chuyển hướng tới thư mục **services**, 
  - download thư mục [features](https://drive.google.com/drive/folders/1MNaNt3TaTnKQgH0qfg9LEFgYMShPkDBL?usp=sharing) chứa features của Clothes và chuyển vô thư mục **features** (nếu chưa có, hãy tạo nó), 
  - Tương tự, download thư mục [infos](https://drive.google.com/drive/folders/1uPzcOxsNNivxvRfUoukGUBKj7xDX-Id2?usp=sharing) chứa thông tin của Clothes và chuyển vô thư mục **infos** (nếu chưa có, hãy tạo nó):
  - Tương tự, download thư mục [crawl](https://drive.google.com/file/d/1e6XNk9RTTCLMy8ghGfA3X4cXxsMSKvkL/view?usp=drive_link) chứa thông tin của hai shop **YAME** và **YODY** và chuyển vô thư mục **crawl** (nếu chưa có, hãy tạo nó):
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
        │   ├── crawl                         # Crawl image file folder
        │   │   ├── yame  
        │   │   │   ├── yame_0.jpg  
        │   │   │   ├── yame_1.jpg   
        │   │   │   ├── ...   
        │   │   │   └── yame_999.jpg   
        │   │   ├── yody  
        │   │   │   ├── yody_0.jpg  
        │   │   │   ├── yody_1.jpg   
        │   │   │   ├── ...   
        │   │   │   └── yody_3414.jpg
        │   │   └──────
        │   ├── features                      # Extracted features folder
        │   │   ├── BLIP                      # Binary file extracted by BLIP model
        │   │   │   ├── topwear_blip_L2.bin   
        │   │   │   ├── headwear_blip_L2.bin   
        │   │   │   ├── bottomwear_blip_L2.bin   
        │   │   │   ├── footwear_blip_L2.bin   
        │   │   │   ├── dress_blip_L2.bin   
        │   │   │   ├── others_blip_L2.bin 
        │   │   │   ├── yame_blip_L2.bin   
        │   │   │   └── yody_blip_L2.bin   
        │   │   ├── BLIP_raw_features         # Raw features extracted by BLIP model
        │   │   │   ├── 1.npy
        │   │   │   ├── 2.npy   
        │   │   │   ├── ...   
        │   │   │   └── 59.npy   
        │   │   ├── yame                      # Binary file Yame Shop extracted by BLIP model
        │   │   │   └── yame.npy   
        │   │   ├── yody                      # Binary file Yody Shop extracted by BLIP model
        │   │   │   └── yody.npy
        │   │   ├── FashionCLIP               # Binary file extracted by FashionCLIP model
        │   │   │   └── Update later ... 
        │   │   └── ...   
        │   ├── infos                         # Information folder
        │   │   │   ├── clothIDs.json
        │   │   │   ├── image_id.json 
        │   │   │   ├── yame_id.json   
        │   │   │   ├── yody_id.json   
        │   │   │   ├── topwear_id2path.json   
        │   │   │   ├── headwear_id2path.json   
        │   │   │   ├── bottomwear_id2path.json   
        │   │   │   ├── footwear_id2path.json   
        │   │   │   ├── dress_id2path.json   
        │   │   │   └── others_id2path.json  
        │   │   ├── yame                      # Metadata Yame Shop collected by Beautiful Soup
        │   │   │   └── yame.json   
        │   │   ├── yody                      # Metadata Yody Shop collected by YODY API
        │   │   │   └── yody.json        
        │   │   └──────
        │   ├── .gitignore
        │   └── README.md
        ├── .gitignore
        └──────────────────────────────────────────────────────────────────── 
