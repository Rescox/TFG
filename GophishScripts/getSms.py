from twilio.rest import Client
import os
import urllib.request, json 
import requests
import time

account_sid = "Cuenta de Twilio" #os.environ['TWILIO_ACCOUNT_SID']
auth_token = "Token de cuenta de Twilio" #os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)
print("Iniciando listener de SMS")


while(True):
    with urllib.request.urlopen(UrlBaseDeDatosSMS) as url:
        data = json.loads(url.read().decode())
        for campaign in data:
            if campaign['state'] == "Created":
                campaign['state'] = "InProgress"
                for group in campaign['group']:
                    sCadena = campaign['body'][0]
                    sCadena = sCadena.replace("{.FirstName}", group["First Name"])
                    sCadena = sCadena.replace("{.LastName}", group["Last Name"])
                    sCadena = sCadena.replace("{.URL}", URLTwilioScript + "?nSms=644186074&id=" +campaign['_id'])
                    message = client.messages.create(
                            body= sCadena,
                            from_=Numero proporcionado por Twilio,
                            to= '+34' + group['Telephone']
                    )
                    print(sCadena)
                    
                    
                r = requests.put(UrlBaseDeDatosSMS + '+campaign['_id'], json = campaign)

    time.sleep(5)


#nombre y apellidos
