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
            for item in data['data']:
                print(item["_id"])
            print(data.keys())
        else:
            print("Lỗi trong quá trình tải dữ liệu từ API.")
        pass
if __name__ == "__main__":
    url = "https://www.coolmate.me/collection/products-data?hide_banner=true&show_variant_color=false&random_focus=true&flatten=false&page=1&limit=25&last_page=1&seo_alias=ao-nam"
    mycrawl =CrawlCoolmate()
    mycrawl.crawl(url)