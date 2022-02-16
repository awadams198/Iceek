from app.models import db, Arena


# Adds a demo user, you can add other users here if you want
def seed_arenas():
    demoArena = Arena(
        name='Tmobile Arena',
        price=250,
        address='1320 Ice St.',
        city='Minneapolis',
        state='Minnesota',
        country='USA',
        userId=1
        )

    demoArenaTwo = Arena(
        name='Ice Arena',
        price=235,
        address='4167 Puck St.',
        city='Portland',
        state='Oregon',
        country='USA',
        userId=1
        )
    
    demoArenaThree = Arena(
        name='Hockey Arena',
        price=220,
        address='7429 Ny St.',
        city='New York',
        state='New York',
        country='USA',
        userId=1
        )

    demoArenaFour = Arena(
        name='Ice Arena',
        price=235,
        address='4167 Puck St.',
        city='Portland',
        state='Oregon',
        country='USA',
        userId=2
        )

    demoArenaFive = Arena(
        name='Tmobile Arena',
        price=250,
        address='1320 Ice St.',
        city='Minneapolis',
        state='Minnesota',
        country='USA',
        userId=2
        )


    db.session.add(demoArena)
    db.session.add(demoArenaTwo)
    db.session.add(demoArenaThree)
    db.session.add(demoArenaFour)
    db.session.add(demoArenaFive)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_arenas():
    db.session.execute('TRUNCATE arenas RESTART IDENTITY CASCADE;')
    db.session.commit()