import json
import time
from requests import Request, Session
url = 'http://127.0.0.1:8000/api/client';
loginUrl = 'http://127.0.0.1:8000/login';
s = Session()
r = Request('POST',loginUrl, data = {'username':'admin','password':'admin123'})

preppend = r.prepare()


resp = s.send(preppend)

for i in range(1):
    for j in range(1):
        ele = {
            'identifier': 'popa_'+str(i)+'_'+str(j),
            'lang': 'en',
            'name': 'popa_'+str(i)+'_'+str(j),
            'type': 'demo',

        }
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
      
        
        resp = s.post(url, data =json.dumps(ele), headers=headers)
        print(resp)


