import requests as r
from bs4 import BeautifulSoup
import re
import json

headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203',
}

def get(id):
    try:
        url = "https://book.douban.com/subject/" + id;
        res = r.get(url, headers = headers)
        soup = BeautifulSoup(res.text, "html.parser")
    except:
        print("读取网页失败")
        return {}

    json = {}
    json["id"] = id
    json["url"] = url

    try:
        json["img"] = soup.find("div", id="mainpic").a.img.get('src')
    except:
        json["img"] = ""
    try:
        json["name"] = soup.find("div", id="wrapper").h1.span.get_text()
    except:
        json["name"] = ""
        

    try:
        info = soup.find("div", id="info")
        authors = []
        for a in info.span.find_all("a", class_=""):
            authors.append(a.get_text())
        json["author"] = " / ".join(authors)        
        json["press"] = info.find("a", recursive=False).get_text()

        p1 = re.compile("出版年:</span>\s*[\d\-]*\s*<br")
        json["date"] = p1.search(str(info)).group()[11:-3]
    except:
        json["date"] = ""

    try:
        report = soup.find("div", id="link-report")
        intro = report.find("div", class_="intro")
        content = []
        
        for p in intro.find_all("p"):
            if p.get_text() == "(展开全部)":
                break
            content.append(p.get_text())
        json["intro"] = '\n'.join(content)
    except:
        print(intro)
        json["intro"] = ""

    return json



#p2 = re.compile("[\d\-]*")
#print(p2.search(year).group())



if __name__ == "__main__":
    file = []
    lst = ["33428928", "25708312", "35288857", "3674537", "26880667"]

    for id in lst:
        file.append(get(id))
    #file["list"] = lst

    print(json.dumps(file, ensure_ascii=False))
    #for i in file:
       # print(i)
