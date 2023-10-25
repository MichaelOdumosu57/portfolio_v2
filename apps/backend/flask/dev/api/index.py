# import os
# import sys
# import my_util
# my_util.local_deps()
from flask import Flask, request, redirect,Response
from pyngrok import ngrok
# from flask_socketio import SocketIO


# dev additions
# import sqlalchemy
# import pprint
# import json
# import requests
# import time

app = Flask(__name__)

# app.config.update(
#     # SERVER_NAME="127.0.0.1:5000",
    
#     USE_NGROK=False,
#     FLASK_ENV = 'development',
#     SECRET_KEY=os.environ.get("FLASK_SOCKET_IO_SECRET_KEY")
# )
# import contact
#
import os

CONFIGS= {
  'endpointMsgCodes':{
    'success':'OK',
    'error':'ERROR',
  },
  'env_vars':{
    'RESTDBIO_API_KEY':os.getenv("RESTDBIO_API_KEY")
  }
}




import requests

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
        'msg':'Email Sent',
        'code': CONFIGS['endpointMsgCodes']['success']
      }
    else:
      return {
        'data':dict_variable,
        'code':CONFIGS['endpointMsgCodes']['error']
      },400 





@app.after_request
def after_request(response):
  response.headers.set('Access-Control-Allow-Origin', 'https://my-portfolio-5907b.web.app')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'POST') 
  return response



