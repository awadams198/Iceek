# ICEEK

 Iceek is an Airbnb clone but for ice skating. This app allows you
 to host ice arenas, find ice arenas and also leave reviews on ice
 arenas.


## Tech Stack

Client: JavaScript, NodeJS, React, Redux

Server: PostgreSQL, Python, Flask, SQLAlchemy

## Live site

https://iceek.herokuapp.com/

## Getting started

1. Clone this repository

https://github.com/awadams198/Iceek.git

2. CD into the /app directory and install dependencies

pipenv install

3. CD into the /react-app directory and install dependencies

npm install

4. Create a .env file based on the .env.example given

5. Create a user in psql based on your .env DATABASE_URL app_name

psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"

6. Create a databse in psql based on your.env DATABASE_URL app_db_name

7. Start your shell, migrate your database, seed your database, and run the flask app

pipenv shell

flask db upgrade

flask seed all

flask run

8. Open another terminal and change directory into /react-app and run the React app

npm start

## Screenshots
homepage

![image](https://user-images.githubusercontent.com/86488501/155614574-29fa5efb-a0d2-4d12-aa19-61225077b885.png)

Arenas page
![image](https://user-images.githubusercontent.com/86488501/155616450-f671cbfa-c7c1-434f-9084-c761baeefbc9.png)

Host Arena page
![image](https://user-images.githubusercontent.com/86488501/155616542-c1f7be44-03fe-4325-b720-47738a926e70.png)
![image](https://user-images.githubusercontent.com/86488501/155616642-b3734531-4eb9-4a00-b202-7d9b4b421856.png)
 
 ## Documentation
 
- [Feature List](https://github.com/awadams198/Iceek/wiki/Feature-List)
- [User Stories](https://github.com/awadams198/Iceek/wiki/User-Stories)
- [Database Schema](https://github.com/awadams198/Iceek/wiki/Database-Schema)
 


 
