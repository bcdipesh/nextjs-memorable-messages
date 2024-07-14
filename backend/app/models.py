# models.py
import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db
from sqlalchemy.orm import relationship


class User(db.Model):
    __tablename__ = "User"

    id = sa.Column(sa.String, primary_key=True, default=sa.text("uuid_generate_v4()"))
    kindeUserId = sa.Column(sa.String, unique=True)
    email = sa.Column(sa.String, unique=True)
    name = sa.Column(sa.String)
    imageUrl = sa.Column(sa.String)
    createdAt = sa.Column(sa.DateTime, server_default=sa.func.now())
    updatedAt = sa.Column(
        sa.DateTime, server_default=sa.func.now(), onupdate=sa.func.now()
    )

    occasions = relationship("Occasion", back_populates="user")

    def to_dict(self):
        return {
            "id": self.id,
            "kindeUserId": self.kindeUserId,
            "email": self.email,
            "name": self.name,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }


class Occasion(db.Model):
    __tablename__ = "Occasion"

    id = sa.Column(sa.String, primary_key=True, default=sa.text("uuid_generate_v4()"))
    occasionType = sa.Column(sa.String)
    message = sa.Column(sa.String)
    receiverEmail = sa.Column(sa.String)
    deliveryMethod = sa.Column(sa.String)
    deliveryDate = sa.Column(sa.DateTime)
    status = sa.Column(sa.String, default="Pending")
    createdAt = sa.Column(sa.DateTime, server_default=sa.func.now())
    updatedAt = sa.Column(
        sa.DateTime, server_default=sa.func.now(), onupdate=sa.func.now()
    )

    userId = sa.Column(sa.String, sa.ForeignKey("User.kindeUserId"))
    user = relationship("User", back_populates="occasions")

    def to_dict(self):
        return {
            "id": self.id,
            "occasionType": self.occasionType,
            "message": self.message,
            "receiverEmail": self.receiverEmail,
            "deliveryMethod": self.deliveryMethod,
            "deliveryDate": self.deliveryDate,
            "status": self.status,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
