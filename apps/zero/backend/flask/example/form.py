from __main__ import app,request

@app.route('/form/submit',methods=['POST'])
def submit_form():
    data = request.json['data']
    print(data)
    return {
        'message':{
            'message':'OK'
        }
    },200