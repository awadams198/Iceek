from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    demoImage = Image(
        url="https://i.ibb.co/Q9gBtWR/seth-hoffman-Hw-ZTYUk-IP6c-unsplash.jpg",
       arenaId=1
        )
    demoImageTwo = Image(
        url="https://i.ibb.co/1zcwxMB/tim-trad-3-Pd-OKrfzr-YM-unsplash.jpg",
       arenaId=1
        )
    demoImageThree = Image(
        url="https://i.ibb.co/thHgjVC/klim-musalimov-x-Sb-NGLSTLk0-unsplash.jpg",
       arenaId=1
        )
    demoImageFour = Image(
        url="https://i.ibb.co/x3k1QQr/klim-musalimov-qn76-So6-OKPc-unsplash.jpg",
       arenaId=2
        )
    demoImageFive = Image(
        url="https://i.ibb.co/zZsnKvT/klim-musalimov-cy-SFWKt56-TU-unsplash.jpg",
       arenaId=2
        )
    demoImageSix = Image(
        url="https://i.ibb.co/Z1sxb44/damir-kopezhanov-VA28-GZi-Bc-Rg-unsplash.jpg",
       arenaId=2
        )
    demoImageSeven = Image(
        url="https://i.ibb.co/kM7Zh2Y/francis-bouffard-gkkm-D3vs-E98-unsplash.jpg",
       arenaId=3
        )
    demoImageEight = Image(
        url="https://i.ibb.co/Q9gBtWR/seth-hoffman-Hw-ZTYUk-IP6c-unsplash.jpg",
       arenaId=3
        )
    demoImageNine = Image(
        url="https://i.ibb.co/1zcwxMB/tim-trad-3-Pd-OKrfzr-YM-unsplash.jpg",
       arenaId=3
        )
    demoImageTen = Image(
        url="https://i.ibb.co/x3k1QQr/klim-musalimov-qn76-So6-OKPc-unsplash.jpg",
       arenaId=4
        )
    demoImageEleven = Image(
        url="https://i.ibb.co/thHgjVC/klim-musalimov-x-Sb-NGLSTLk0-unsplash.jpg",
       arenaId=4
        )
    demoImageTwelve = Image(
        url="https://i.ibb.co/zZsnKvT/klim-musalimov-cy-SFWKt56-TU-unsplash.jpg",
       arenaId=4
        )
    demoImageThirteen = Image(
        url="https://i.ibb.co/Z1sxb44/damir-kopezhanov-VA28-GZi-Bc-Rg-unsplash.jpg",
       arenaId=5
        )
    demoImageFourteen = Image(
        url="https://i.ibb.co/Q9gBtWR/seth-hoffman-Hw-ZTYUk-IP6c-unsplash.jpg",
       arenaId=5
        )
    demoImageFifteen = Image(
        url="https://i.ibb.co/1zcwxMB/tim-trad-3-Pd-OKrfzr-YM-unsplash.jpg",
       arenaId=5
        )


    db.session.add(demoImage)
    db.session.add(demoImageTwo)
    db.session.add(demoImageThree)
    db.session.add(demoImageFour)
    db.session.add(demoImageFive)
    db.session.add(demoImageSix)
    db.session.add(demoImageSeven)
    db.session.add(demoImageEight)
    db.session.add(demoImageNine)
    db.session.add(demoImageTen)
    db.session.add(demoImageEleven)
    db.session.add(demoImageTwelve)
    db.session.add(demoImageThirteen)
    db.session.add(demoImageFourteen)
    db.session.add(demoImageFifteen)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()