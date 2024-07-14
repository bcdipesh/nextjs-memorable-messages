from config import Config
from flask_cors import CORS
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_apscheduler import APScheduler
from flask_mail import Mail
import logging

db = SQLAlchemy()
cors = CORS()
mail = Mail()
scheduler = APScheduler()


def log():
    print("Logged from scheduler")


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    mail.init_app(app)
    cors.init_app(app)
    logging.basicConfig()
    logging.getLogger("apscheduler").setLevel(logging.DEBUG)

    from app.api import bp as api_bp

    app.register_blueprint(api_bp, url_prefix="/api/v1")

    scheduler.init_app(app)
    scheduler.start()

    return app


from app import events, models
