from flask import Blueprint

bp = Blueprint("api", __name__)


@bp.route("/health")
def health_check():
    return {"status": "ok"}


from app.api import schedule_occasions
