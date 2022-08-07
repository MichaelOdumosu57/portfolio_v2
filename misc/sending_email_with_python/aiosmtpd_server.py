import asyncio
def local_deps():
    import sys
    if sys.platform == "win32":
        sys.path.append(sys.path[0] + ".\\site-packages\\windows")
    elif sys.platform =="linux":
        sys.path.append(sys.path[0] + "./site-packages/linux")    
local_deps()
class ExampleHandler:
     async def handle_RCPT(self, server, session, envelope, address, rcpt_options):
         if address.endswith('@example.com'):
             return '550 not relaying to that domain'
         envelope.rcpt_tos.append(address)
         return '250 OK'

     async def handle_DATA(self, server, session, envelope):
         print('Message from %s' % envelope.mail_from)
         print('Message for %s' % envelope.rcpt_tos)
         print('Message data:\n')
         for ln in envelope.content.decode('utf8', errors='replace').splitlines():
             print(f'> {ln}'.strip())
         print()
         print('End of message')
         return '250 Message accepted for delivery'
       
from aiosmtpd.controller import Controller
controller = Controller(ExampleHandler(),ready_timeout=3000)
controller.start()


from smtplib import SMTP as Client
client = Client(controller.hostname, controller.port)
r = client.sendmail('a@example.com', ['michaelodumosu57@outlook.com'], """\
From: Anne Person <anne@example.com>
To: Bart Person <bart@example.com>
Subject: A test
Message-ID: <ant>
Hi Bart, this is Anne.
""")