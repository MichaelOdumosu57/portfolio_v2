import smtplib, ssl

port = 1025  # For SSL

# Create a secure SSL context
context = ssl.create_default_context()
sender_email = "my@yahoo.com"
receiver_email = "michaelodumosu57@gmail.com"
message = """\
Subject: Hi there

This message is sent from Python."""  


with smtplib.SMTP("smtp.gmail.com", port) as server:
    # server.ehlo()
    # server.starttls(context=context)
    server.ehlo()
    server.sendmail(sender_email, receiver_email, message)
    # TODO: Send email here 