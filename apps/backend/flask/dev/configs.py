import os

CONFIGS= {
  'endpointMsgCodes':{
    'success':'OK',
    'error':'ERROR',
  },
  'env_vars':{
    'RESTDBIO_API_KEY':os.getenv("RESTDBIO_API_KEY")
  },
  'endpoints':{
    'contact/submit':"http://localhost:4000/contact/submit"
  }
}
