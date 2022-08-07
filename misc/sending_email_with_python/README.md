# Resource
## 1. https://realpython.com/python-send-email/
* start up local smtp server
```ps1
python -m smtpd -c DebuggingServer -n localhost:1025

```

* plan text email
```py
import smtplib, ssl

port = 465  # For SSL
password = input("Type your password and press enter: ")

# Create a secure SSL context
context = ssl.create_default_context()

with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
    server.login("my@gmail.com", password)
    # TODO: Send email here
```


* create a server then secure it later with server.starttls(
  * To identify yourself to the server, .helo() (SMTP) or .ehlo() (ESMTP) should be called after creating an .SMTP() object
)
```py
import smtplib, ssl

smtp_server = "smtp.gmail.com"
port = 587  # For starttls
sender_email = "my@gmail.com"
password = input("Type your password and press enter: ")

# Create a secure SSL context
context = ssl.create_default_context()

# Try to log in to server and send email
try:
    server = smtplib.SMTP(smtp_server,port)
    server.ehlo() # Can be omitted
    server.starttls(context=context) # Secure the connection
    server.ehlo() # Can be omitted
    server.login(sender_email, password)
    # TODO: Send email here
except Exception as e:
    # Print any error messages to stdout
    print(e)
finally:
    server.quit() 
```

* send mail
```py
sender_email = "my@gmail.com"
receiver_email = "your@gmail.com"
message = """\
Subject: Hi there

This message is sent from Python."""

server.sendmail(sender_email, receiver_email, message)

```