import smtpd
import asyncore

# expects a pair of tuples, passing in None for the second
server = smtpd.SMTPServer(('localhost', 10356), None)

asyncore.loop()