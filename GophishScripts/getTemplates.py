import urllib.request, json 
import requests
import time
from gophish import Gophish
from gophish.models import *

api = Gophish("ea2c3b73d56626bcb7e50367e23b1d111966d722cc0ceb29c764df2c260488c3", host='https://127.0.0.1:3333/', verify = False)
lastPos = 0
print("Iniciando listener de plantillas")
while(True):
    with urllib.request.urlopen("http://192.168.1.58:4000/template") as url:
        data = json.loads(url.read().decode())
        
        for i in range(lastPos, len(data)):
            if(data[i]['status_usable'] == False):
                data[i]['status_usable'] = True
                sCreator = data[i]['creator'].split('.')
                smtp = SMTP(name=data[i]['name'] + "-" + sCreator[0])
                smtp.host = "smtp.gmail.com:465"
                smtp.from_address = data[i]['name'] + " <tfgresco@gmail.com>"
                smtp.interface_type = "SMTP"
                smtp.username = 'tfgresco@gmail.com'
                smtp.password = 'tfgtfgtfg8765'
                smtp.ignore_cert_errors = True
                smtp = api.smtp.post(smtp)
                template = Template(name=data[i]['name'] + "-" +sCreator[0],
                html=data[i]['html'])
                template = api.templates.post(template)
                print("Creada plantilla con el id" + str(template.id) + " y el nombre " + sCreator[0])
                data[i]['gophish_id'] = template.id
                data[i]['gophish_profile_id'] = smtp.id
                r = requests.put('http://192.168.1.58:4000/template/'+data[i]['_id'], json = data[i]) 

               
                

        lastPos = len(data)
            
time.sleep(5)

        