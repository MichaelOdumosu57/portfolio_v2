import os
import sys
import my_util
my_util.local_deps()
from flask import Flask, request, redirect
from pyngrok import ngrok
from flask_socketio import SocketIO


# dev additions
import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import pprint
import json
import my_util
import requests
import time

app = Flask(__name__)
app.config.update(
    SERVER_NAME="127.0.0.1:5000",
    USE_NGROK=False,
    FLASK_ENV = 'production',
    SECRET_KEY=os.environ.get("FLASK_SOCKET_IO_SECRET_KEY")
)




@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH')
  return response



if __name__ == "__main__":
    port = 5000
    if app.config['USE_NGROK']:
        public_url = ngrok.connect(port).public_url
        print(" * ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))
        app.config["BASE_URL"] = public_url
    app.run(debug=True)

