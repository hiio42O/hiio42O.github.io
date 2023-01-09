
import requests
import zipfile
import os
import pandas as pd
import json
import math




def download(url, filepath, timeout=2, retries=5):
    tries = 1
    while tries < retries:
        try:
            r = requests.get(url, timeout=timeout)
            f = open(filepath, 'wb')
            f.write(r.content)
            f.close()
            break
        except:
            tries += 1
            print("retries=", tries)

def unzip(zipPath,unzipPath):
    with zipfile.ZipFile(zipPath,"r") as z:
        z.extractall(unzipPath)

if __name__ =="__main__":
    url = "https://www.data.go.kr/cmm/cmm/fileDownload.do?atchFileId=FILE_000000002634767&fileDetailSn=1"
    basePath = "F:\\[01]project\\[100000]hiio420\\hiio420\\src\\Widget\\Weather\\WeatherDisplay\\data"
    filepath = os.path.join(basePath,"place.zip")
    unzipfilePath = os.path.join(basePath,"place")
    download(url,filepath)
    unzip(filepath,unzipfilePath)
    xlsxPath = [os.path.join(unzipfilePath,file) for file in os.listdir(unzipfilePath) if file.split(".")[-1] =="xlsx"]
    df = pd.read_excel(xlsxPath[0]).fillna("")
    result = {}
    for i in range(len(df)):
        d = df.iloc[i]
        k = f"{d['1단계']} {d['2단계']} {d['3단계']}".strip()
        result[k] ={"nx":int(d["격자 X"]),"ny":int(d["격자 Y"]),"lon":float(d["경도(초/100)"]),"lat":float(d['위도(초/100)']),"lonStr":f"{d['경도(시)']}{str(d['경도(분)']).zfill(2)}","latStr":f"{d['위도(시)']}{str(d['위도(분)']).zfill(2)}"}
    
    with open(os.path.join(basePath,"place.json"),'w',encoding="UTF-8") as f:
        json.dump(result,f)
        
        
        
        
        
        
        
        
        
        
        
        




