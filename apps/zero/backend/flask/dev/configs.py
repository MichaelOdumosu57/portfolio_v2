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
