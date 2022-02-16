from .db import db
from sqlalchemy import DateTime
import datetime

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    created_at = db.Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.datetime.utcnow)
 
    arenaId = db.Column(db.Integer, db.ForeignKey('arenas.id'))
    arenas = db.relationship("Arena", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "arenaId": self.arenaId,
            "url": self.url,
        }