from email.policy import default
from sqlite3 import Date
from turtle import update
from .db import db
from sqlalchemy import DateTime
import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    startDate = db.Column(db.String)
    endDate = db.Column(db.String)
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.datetime.utcnow)

    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="bookings")

    arenaId = db.Column(db.Integer, db.ForeignKey('arenas.id'))
    arenas = db.relationship('Arena', back_populates='bookings')

    def to_dict(self):
        return {
            "id": self.id,
            "arenaId": self.arenaId,
            "userId": self.userId,
            "startDate": self.startDate,
            "endDate": self.endDate
        }