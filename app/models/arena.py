from .db import db
from sqlalchemy import DateTime
import datetime

class Arena(db.Model):
    __tablename__ = 'arenas'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.datetime.utcnow)

    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", back_populates="arenas")

    images = db.relationship("Image", back_populates="arenas", cascade="all,delete")
    reviews = db.relationship("Review", back_populates="arenas")
    bookings = db.relationship("Booking", back_populates="arenas")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "userId": self.userId,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "address": self.address
        }