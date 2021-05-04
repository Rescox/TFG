from test import telegram_chatbot
import time

bot = telegram_chatbot("config.cfg")


def make_reply(msg):
    reply = None
    if msg is not None:
        reply = msg
    return reply


filename = 'users.txt'
usersId = {}
with open(filename, 'r', encoding='UTF-8') as f:
    sCadena = f.read()
    if(len(sCadena)):
        usersId = eval(sCadena)
update_id = None
lastNew = ""
while True:
    
    with open('./scrapy/tutorial/hola.html', 'r', encoding='UTF-8') as f:
        sNew = f.read()
        if lastNew != sNew:
            lastNew = sNew
    updates = bot.get_updates()
    updates = updates["result"]
    if updates:
        for item in updates:
            update_id = item["update_id"]
            usersId.setdefault(item["message"]["from"]["id"],[])

    for id in usersId:
        if usersId[item["message"]["from"]["id"]] != lastNew:
            print(lastNew)
            print(usersId[item["message"]["from"]["id"]])
            try:
                message = lastNew #Mensaje del usuario = str(item["message"]["text"])
                usersId[item["message"]["from"]["id"]] = lastNew
            except:
                message = None
            from_ = item["message"]["from"]["id"]
            reply = make_reply(message)
            bot.send_message(reply, from_)
            with open(filename, 'w+', encoding='UTF-8') as f:
                f.write(str(usersId))
        time.sleep(30)