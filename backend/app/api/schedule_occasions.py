import sqlalchemy as sa
from app import db
from app.api import bp
from app.models import Occasion, User
from flask import request
from app.email import schedule_email


@bp.route("/occasions/schedule", methods=["POST"])
def get_occasions():
    data = request.get_json()

    schedule_email(data)

    return {"message": "Occasion successfully scheduled."}
