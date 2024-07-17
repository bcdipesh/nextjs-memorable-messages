from app import mail, scheduler
from flask import current_app
from flask_mail import Message
import resend


def send_email(app, subject, sender, recipients, text_body, html_body):
    """
    Send an email with both text and HTML bodies.

    Args:
    - app: The Flask application instance.
    - subject: The subject of the email.
    - sender: The sender's email address.
    - recipients: List of recipient email addresses.
    - text_body: The plain text body of the email.
    - html_body: The HTML body of the email.
    """
    resend.api_key = "re_ZBWFQhJf_EQmoQigbuYeaRfjJEgbBBUsR"
    # with app.app_context():
    #     msg = Message(subject=subject, sender=sender, recipients=recipients)
    #     msg.body = text_body
    #     msg.html = html_body
    #     mail.send(msg)
    r = resend.Emails.send(
        {
            "from": "onboarding@resend.dev",
            "to": "bcdipeshwork@gmail.com",
            "subject": "Hello World",
            "html": "<p>Congrats on sending your <strong>first email</strong>!</p>",
        }
    )


def schedule_email(occasion, job_id, action="CREATE"):
    """
    Schedule or update an email job based on the occasion's details and action.

    Args:
    - occasion: The Occasion model instance representing the scheduled email.
    - job_id: The id of the job.
    - action: The action to perform (CREATE, UPDATE, DELETE).
    """

    if action == "UPDATE" and scheduler.get_job(job_id) is not None:
        scheduler.modify_job(
            func=send_email,
            trigger="date",
            run_date=occasion["deliveryDate"],
            args=[
                current_app._get_current_object(),
                occasion["occasionType"],
                occasion["receiverEmail"],
                [occasion["receiverEmail"]],
                occasion["message"],
                occasion["message"],
            ],
            id=job_id,
            misfire_grace_time=86400,
        )
    elif action == "DELETE" and scheduler.get_job(job_id) is not None:
        scheduler.remove_job(id=job_id)
    else:
        scheduler.add_job(
            func=send_email,
            trigger="date",
            run_date=occasion["deliveryDate"],
            args=[
                current_app._get_current_object(),
                occasion["occasionType"],
                occasion["receiverEmail"],
                [occasion["receiverEmail"]],
                occasion["message"],
                occasion["message"],
            ],
            id=job_id,
            misfire_grace_time=86400,
        )
