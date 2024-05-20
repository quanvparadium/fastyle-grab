class CrawlCoolmate:
    def __init__(self):
        self.root = []
    
    def crawl(self, url: str):
        import requests
        import json
        response = requests.get(url)
        # Kiểm tra phản hồi từ API
        if response.status_code == 200:
            # Chuyển đổi dữ liệu JSON thành đối tượng Python
            data = response.json()

            # Xử lý dữ liệu JSON như mong muốn
            # Ví dụ: In ra tên của các đối tượng trong dữ liệu
            for idx, item in enumerate(data['data']):
                print(idx, item["_id"])
            print(data.keys())
        else:
            print("Lỗi trong quá trình tải dữ liệu từ API.")
        pass

def load_json_path(json_path: str):
    import json
    with open(json_path, 'r') as f:
        js = json.loads(f.read())
    # return {int(k):v for k,v in js.items()}
    return js

if __name__ == "__main__":
    category = "coolmate-activewear"
    category = "ao-nam"
    category = "mu-non-nam"
    category = ""
    url = f"https://www.coolmate.me/collection/products-data?hide_banner=true&show_variant_color=false&random_focus=true&flatten=false&page=1&limit=1000&last_page=1&seo_alias={category}"
    mycrawl =CrawlCoolmate()
    mycrawl.crawl(url)
    f = load_json_path(f'infos/coolmate/coolmate/{category}.json')
    print(len(f['data']))