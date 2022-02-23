from flask import Blueprint, request, jsonify
from app.models import Arena, Image, User, Review, db
from sqlalchemy import desc, or_
import os;

arena_routes = Blueprint('arenas', __name__)

# GET ALL ARENAS WITH IMAGES AND USERS
@arena_routes.route("/")
def view_arenas():
    arenas = (Arena.query.join(User, User.id == Arena.userId)
    .add_columns(User.username).order_by(desc(Arena.created_at)).all()
    )
    returnList = []
    for arena in arenas:
        newDict = arena[0].to_dict()
        newDict["User"] = arena[1]
        image = Image.query.filter(Image.arenaId == arena[0].id).all()
        newDict["images"] = [img.to_dict() for img in image]
        review = Review.query.filter(Review.arenaId == arena[0].id).order_by(desc(Review.created_at)).all()
        newDict["reviews"] = [rev.to_dict() for rev in review]
        returnList.append(newDict)
    return jsonify(returnList)


# POST NEW ARENA
@arena_routes.route("/new/", methods=["POST"])
def new_arena_post():
    new_arena = Arena(
        userId=request.json["userId"],
        city=request.json["city"],
        country=request.json["country"],
        name=request.json["name"],
        price=request.json["price"],
        state=request.json["state"],
        address=request.json["address"]
    )

    db.session.add(new_arena)
    db.session.commit()

    new_images1 = Image(
        url=request.json["url"]["1"],
        arenaId=new_arena.to_dict()["id"]
    )
    new_images2 = Image(
        url=request.json["url"]["2"],
        arenaId=new_arena.to_dict()["id"]
    )
    new_images3 = Image(
        url=request.json["url"]["3"],
        arenaId=new_arena.to_dict()["id"]
    )
    db.session.add(new_images1)
    db.session.add(new_images2)
    db.session.add(new_images3)
    db.session.commit()

    return new_arena.to_dict()

#GET ARENA BY ID
@arena_routes.route("/<int:id>")
def one_arena(id):
    oneArena = Arena.query.get(id).to_dict()
    user = User.query.filter(User.id == oneArena["userId"])
    images = Image.query.filter(Image.arenaId == id)
    review = Review.query.filter(Review.arenaId == id)
    oneArena["reviews"] = [rev.to_dict() for rev in review]
    oneArena["images"] = [image.to_dict() for image in images]
    oneArena["user"] = [one.to_dict() for one in user]
    return oneArena

#UPDATE ARENA POST
@arena_routes.route("/<int:id>/edit", methods=["PUT"])
def updateArena(id):
    arenaToUpdate = Arena.query.get(id)
    arenaToUpdate.price = request.json["price"]
    arenaToUpdate.name = request.json["name"]

    db.session.commit()
    updatedArena = Arena.query.get(id)
    return jsonify(updatedArena.to_dict())

#DELETE ARENA POSTS
@arena_routes.route("/<int:id>", methods=["GET", "DELETE"])
def deletePost(id):
    arenaToDelete = Arena.query.get(id)

    db.session.delete(arenaToDelete)
    db.session.commit()
    return jsonify(arenaToDelete.to_dict())

    