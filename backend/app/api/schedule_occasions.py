import sqlalchemy as sa
from app import db
from app.api import bp
from app.models import Occasion, User
from flask import request
from app.email import schedule_email


@bp.route("/occasions/schedule", methods=["POST"])
def get_occasions():
    action = request.args.get("action")
    occasion_id = request.args.get("occasionId")
    data = request.get_json()
    message = ""

    if action == "CREATE":
        schedule_email(occasion=data, job_id=data["id"])
        message = "Occasion successfully scheduled."
    elif action == "UPDATE":
        schedule_email(occasion=data, job_id=data["id"], action="UPDATE")
        message = "Occasion schedule successfully updated."

    return {"message": message}


@bp.route("/occasions/schedule/<string:id>", methods=["DELETE"])
def delete_occasion(id):
    schedule_email(occasion="", job_id=id, action="DELETE")

    return {"message": "Occasion schedule successfully removed."}
