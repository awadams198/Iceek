from app.models import db, Review


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    demoReview1 = Review(
        review='This arena was awesome!',
        userId=1,
        arenaId=1
    )
    demoReview2 = Review(
        review='We had a blast, and will definitely be coming back!',
        userId=1,
        arenaId=2
    )
    demoReview3 = Review(
        review='I had my birthday party here and loved it!',
        userId=1,
        arenaId=1
    )
    demoReview4 = Review(
        review='My experience was ok',
        userId=1,
        arenaId=1
    )
    demoReview5 = Review(
        review='The customer service was great!',
        userId=1,
        arenaId=1
    )


    db.session.add(demoReview1)
    db.session.add(demoReview2)
    db.session.add(demoReview3)
    db.session.add(demoReview4)
    db.session.add(demoReview5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()