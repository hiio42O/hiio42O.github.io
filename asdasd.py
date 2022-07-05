import subprocess
import os
import requests
import bs4
import xmltodict
import json
from tqdm.auto import tqdm
numRow = 999

def xml_to_json(resp):
    resp = resp.encode('utf-8')
    xmlobj = bs4.BeautifulSoup(resp, 'lxml-xml')
    xmlstr = str(xmlobj)
    parsed_dict = xmltodict.parse(xmlstr)
    data = json.dumps(parsed_dict)
    return json.loads(data)

def get_open_api_data(page=1):
    url = 'http://apis.data.go.kr/B552584/EvCharger/getChargerInfo'
    params ={'serviceKey' : '85SVNYrwH8xXJbjJgkYoSQsBQqzKtn7WO1JdYfXeeMT37b9Br6ClP7F4gnruv/N4aY6wdkDHWNvzieim1yz98A==', 'pageNo' : page, 'numOfRows' :numRow}
    return requests.get(url, params=params).text
    
def get_code(item):
    addr = item['addr']
    url ='https://www.juso.go.kr/addrlink/addrLinkApi.do'
    params={
        'confmKey':'U01TX0FVVEgyMDIyMDcwNTIyMTQxNDExMjc2NjM=',
        "keyword":addr,
        'resultType':'json'
    }
    resp = requests.get(url, params=params)
    data = resp.json()
    juso_list = data['results']['juso']
    admCd = '00000'
    if juso_list:
        filtered_juso_list = list(filter(lambda x:addr in x['roadAddr'] ,juso_list))
        if filtered_juso_list:
            
            admCd = filtered_juso_list[0]['admCd'][:5]
        else:
            admCd = juso_list[0]['admCd'][:5]
    if admCd=='00000':
        params['keyword'] = item['statNm']
        resp = requests.get(url, params=params)
        data = resp.json()
        juso_list = data['results']['juso']
        print(juso_list)
    item['zcode'] = admCd
    return item       
    
    
        
    

resp = get_open_api_data()
json_data=xml_to_json(resp)
header = json_data['response']['header']
totalCount = json_data['response']['header']['totalCount']
totalCount = int(totalCount)
iter_size = int(totalCount/numRow) +1 if totalCount%numRow >0 else totalCount//numRow
data = {}
record = []
result = json_data["response"]['body']['items']['item']
for item in result:
    zscode = item['zscode']
    if zscode not in data.keys():
        data[zscode] = []
    if item['statId'] not in record:
        data[zscode] += [item]

for i in tqdm(range(2,iter_size+1)):
    resp = get_open_api_data()
    json_data=xml_to_json(resp)
    result = json_data["response"]['body']['items']['item']
    if result:
        for item in result:
            zscode = item['zscode']
            if zscode not in data.keys():
                data[zscode] = [item]
            if item['statId'] not in record:
                data[zscode] += [item]
for k,v in data.items():
    with open(f'.\\json\\{k}.json','w',encoding='utf-8') as f:
        json.dump(v,f)

d = subprocess.check_output(f'cd {os.path.abspath(os.path.dirname(__file__))} && git checkout test && git add * && git commit -m "Update" && git push origin test',shell=True)
print(d)
