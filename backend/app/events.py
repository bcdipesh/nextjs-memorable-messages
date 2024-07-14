from app import db, scheduler
from app.models import Occasion
from apscheduler.events import EVENT_JOB_EXECUTED


def update_delivery_status(event):
    with scheduler.app.app_context():
        occasion = Occasion.query.get(event.job_id)
        occasion.status = "Sent"

        db.session.add(occasion)
        db.session.commit()


scheduler.add_listener(update_delivery_status, EVENT_JOB_EXECUTED)
