from __main__ import app,request
import json
import requests


from configs import CONFIGS

@app.route('/')
def index():
    return 'Hello World'

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

      # resp = requests.post(url, json = message,headers= headers)     
      log_email_result_to_email_logging_service(data)
      

            

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
      
      
def log_email_result_to_email_logging_service(data):
  
  headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json" 
  }  
  try:
    resp =requests.post(
      CONFIGS['endpoints']['contact/submit'],
      json.dumps({
        'email':data['email'],
        'emailSentSucessfully': CONFIGS['endpointMsgCodes']["success"]
      }),
      headers=headersList
    );
    print(resp.text)
  except BaseException as e:
    print(e); 
    try:
      requests.post(
        CONFIGS['endpoints']['contact/submit'],
      json.dumps({
        'email':data['email'],
        'emailSentSucessfully': CONFIGS['endpointMsgCodes']["success"]
      }),
      headers=headersList
      )
    except BaseException as e:
      print(e); 
      None  
