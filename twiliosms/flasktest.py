from http.server import BaseHTTPRequestHandler, HTTPServer
import logging
from urllib.parse import urlparse
import urllib.request
import json
import requests

class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        logging.info("GET request,\nPath: %s\nHeaders:\n%s\n", str(self.path), str(self.headers))
        self._set_response()
        print(self.path)
        dictQuery = {}
        if(urlparse(self.path).query == ""):
            print("Empty query")
        else:
            query = urlparse(self.path).query
            for qc in query.split("&"):
                query_components = qc.split("=")
                dictQuery[query_components[0]] = query_components[1]
            if(dictQuery.get('id') and dictQuery.get('nSms')):
                updateSmsState(dictQuery['id'], dictQuery['nSms'])
            else:
                print("Nada")
        print(dictQuery)
        self.wfile.write("GET request for {}".format(self.path).encode('utf-8'))

def updateSmsState(id, nSms):
    print(id)
    with urllib.request.urlopen("http://192.168.1.58:4000/sms/details/" + id) as url:
        data = json.loads(url.read().decode())
        print(type(data))
        for groups in data: 
            index = 0
            for group in groups:
                if  groups['group'][index]['Telephone'] == nSms:
                    groups['group'][index]['SMS State'] = 'Opened link'
                    break
                index = index + 1
        requests.put('http://localhost:4000/sms/details/' + id, json = data)

def run(server_class=HTTPServer, handler_class=S, port=8080):
    logging.basicConfig(level=logging.INFO)
    server_address = ('localhost', port)
    httpd = server_class(server_address, handler_class)
    logging.info('Starting httpd...\n')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    logging.info('Stopping httpd...\n')

if __name__ == '__main__':
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()