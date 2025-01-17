import smtplib
from email.mime.text import MIMEText
from backend.db_connection import connect_db
from backend.db_manager import get_user_email

async def send_alert_email(subject, message):
    user_email = await get_user_email()
    if not user_email:
        print("No user email found. Please set a user email in the database.")
        return

    smtp_server = 'smtp.example.com'
    smtp_port = 587
    sender_email = 'your_email@example.com'
    sender_password = 'your_password'

    mime_message = MIMEText(message)
    mime_message['Subject'] = subject
    mime_message['From'] = sender_email
    mime_message['To'] = user_email

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, user_email, mime_message.as_string())
        server.quit()
        print(f"Alert email sent to {user_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")
