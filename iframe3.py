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
        
        # Check if "description" field exists, then extract job info
        if "description" in json_ld_data:
            print("\nExtracted Job Information:\n")
            job_info = extract_job_info(json_ld_data["description"])
            for key, value in job_info.items():
                print(f"{key}: {value}\n")

def extract_job_info(description_html):
    soup = BeautifulSoup(description_html, 'html.parser')
    
    job_info = {}
    
    # Extract Overview
    overview_header = soup.find('h2', text='Overview')
    if overview_header:
        overview_content = overview_header.find_next('p').text
        job_info['Overview'] = overview_content

    
    # Extract Responsibilities
    responsibilities_header = soup.find('h2', text='Responsibilities')
    if responsibilities_header:
        for sibling in responsibilities_header.find_all_next():
            if sibling.name == 'h2':
                break
            if sibling.name == 'p':
                detail_title = sibling.find('u')
                if detail_title:
                    key = detail_title.text
                    value = sibling.text.replace(key, '').strip(": ")
                    job_info[key] = value
                else:
                    job_info.setdefault('Other Responsibilties', []).append(sibling.text)
        if 'Other Responsibilites' in job_info:
            job_info['Other Responsibilities'] = "\n".join(job_info['Other Responsibilities'])

    return job_info




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

