import requests
from bs4 import BeautifulSoup
import json

def get_iframe_content(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    iframe_content = []

    for iframe in soup.find_all('iframe'):
        src = iframe.attrs.get('src')
        if src:
            if src.startswith('//'):
                src = 'https:' + src
            response = requests.get(src)
            iframe_content.append(response.content)

    return iframe_content

def print_pretty_json(json_ld_data):
    if json_ld_data:
        print(json.dumps(json_ld_data, indent=4))

        # Check if "description" field exists, then print it
        if "description" in json_ld_data:
            print("\nExtracted Overview:\n")
            print(json_ld_data["description"])

        # Check if "responsibilities" field exists, then print it
        if "responsibilities" in json_ld_data:
            print("\nExtracted Responsibilities:\n")
            print(json_ld_data["responsibilities"])

def main():
    url = input("Enter the URL: ")
    iframe_contents = get_iframe_content(url)

    for content in iframe_contents:
        soup = BeautifulSoup(content, 'html.parser')
        json_ld_data = soup.find('script', type='application/ld+json')
        if json_ld_data:
            json_data = json.loads(json_ld_data.string)
            print_pretty_json(json_data)

if __name__ == "__main__":
    main()
