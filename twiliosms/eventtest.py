import http.client
 
conn = http.client.HTTPSConnection('enhkijkeasiwokj.m.pipedream.net')
conn.request("POST", "/", '{ "mock_data": "true", "sms": "644ffffff", "email": "user@example.com", "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_4) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.100 Safari/534.30", "url": "http://example.com/" }', {'Content-Type': 'application/json'})