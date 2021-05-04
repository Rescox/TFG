import urllib.request, json 
import requests
import time
from gophish import Gophish
from gophish.models import *

api = Gophish("ea2c3b73d56626bcb7e50367e23b1d111966d722cc0ceb29c764df2c260488c3", host='https://127.0.0.1:3333/', verify = False)
lastPos = 0
print("Iniciando listener de Campañas")
while(True):
    with urllib.request.urlopen("http://192.168.1.58:4000/campaign") as url:
        data = json.loads(url.read().decode())
        
        for i in range(lastPos, len(data)):
            if data[i]['state'] != "InProgress":
                target = []
                campaignIds = []
                data[i]['state'] = "InProgress"
                for pInfo in data[i]['group']:
                    target.append(User(first_name=pInfo['First Name'], last_name=pInfo['Last Name'], email=pInfo['Email']))
                group = Group(name=data[i]['name'] + "--" + str(data[i]['_id']), targets=target)
                group = api.groups.post(group)
                try:
                    print("Grupo con el nombre " + data[i]['name'] + " creado")
                except Exception:
                    print("Grupo ya creado") 

                #Creating the campaign
                groupCampaign = [Group(name=data[i]['name'] + "--" + str(data[i]['_id']))]
                page = Page(name='google')
                smtp = SMTP(name='Resco')
                url = 'http://127.0.0.1:80/'
                for template in data[i]['template']:
                    print(template)
                    try:
                        s = json.loads(template)
                        templateName= api.templates.get(template_id=s["id"])
                        campaign = Campaign(name=data[i]['name'], groups=groupCampaign, page=page,template=templateName, smtp=templateName, url=url, launch_date=data[i]['launchDate'], send_by_date=data[i]['endDate'])
                        campaign = api.campaigns.post(campaign)
                        print(campaign.id)
                        campaignIds.append(campaign.id)
                    except Exception as e: print(e)
                data[i]['gophish_id'] = campaignIds
                r = requests.put('http://192.168.1.58:4000/campaign/'+data[i]['_id'], json = data[i]) 

        lastPos = len(data)
            
    time.sleep(5)

        