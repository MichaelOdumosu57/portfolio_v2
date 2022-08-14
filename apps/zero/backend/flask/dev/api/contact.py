from index import app,request
import json
import requests


from configs import CONFIGS


@app.route('/contact/submit',methods=['POST'])
def send_email_to_portfolio_owner():
    data = request.json['data']

    dict_variable =  {
      key:{
        "errorMsg":"Please Provide a value for "+key,
      } for (key,value) in data.items() if value == ""
    }
    

    if len(dict_variable) == 0:
      
      url = 'https://myportfoliov2-e00d.restdb.io/mail'
      message = {
        "to":"michaelodumosu57@gmail.com",
        "subject":"Email from your portfolio website from {}".format(data['email']),
        "html": data['message'],
        "company": "WindmillCode",
        "sendername": "My Portfolio v2 Drive Manager"
      }
      headers = {
        "Content-Type": "application/json",
        "x-apikey":CONFIGS['env_vars']['RESTDBIO_API_KEY'],
        "Cache-Control": "no-cache"
      }      

      resp = requests.post(url, json = message,headers= headers)     
      print(resp.content) 
      return {
        'data':{
          'msg':'Email Sent',
          'code': CONFIGS['endpointMsgCodes']['success']
        }
      }
    else:
      return {
        'data':dict_variable,
        'code':CONFIGS['endpointMsgCodes']['error']
      },400 