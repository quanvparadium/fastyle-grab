import json
import requests
from tqdm import tqdm

# Đọc file JSON
with open('testcase_1280.json', 'r') as file:
    data = json.load(file)

# Lặp qua từng key-value và gửi request
for key, payload in tqdm(data.items()):
    url = 'http://localhost:4001/api/recommended'
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        # print(f"Sent data for key '{key}': {response.json()}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending data for key '{key}': {e}")
        # break
    # break