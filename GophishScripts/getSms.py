from twilio.rest import Client
import os
import urllib.request, json 
import requests
import time

account_sid = "AC4c1c7241ea7179ed6f998321ea9347c4" #os.environ['TWILIO_ACCOUNT_SID']
auth_token = "f8cd10fa47a9c0aa565fec3d8629015a" #os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)
print("Iniciando listener de SMS")


while(True):
    with urllib.request.urlopen("http://192.168.1.58:4000/sms") as url:
        data = json.loads(url.read().decode())
        for campaign in data:
            if campaign['state'] == "Created":
                campaign['state'] = "InProgress"
                for group in campaign['group']:
                    sCadena = campaign['body'][0]
                    sCadena = sCadena.replace("{.FirstName}", group["First Name"])
                    sCadena = sCadena.replace("{.LastName}", group["Last Name"])
                    sCadena = sCadena.replace("{.URL}", "192.168.1.58:8080" + "?nSms=644186074&id=" +campaign['_id'])
                    message = client.messages.create(
                            body= sCadena,
                            from_='+12512368663',
                            to= '+34' + group['Telephone']
                    )
                    print(sCadena)
                    
                    
                r = requests.put('http://192.168.1.58:4000/sms/'+campaign['_id'], json = campaign)

    time.sleep(5)


#nombre y apellidos