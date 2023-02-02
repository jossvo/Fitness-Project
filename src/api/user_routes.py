"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Coach, Workout, Exercise_Assign, Workout_User,Workout_Review,Coach_Review, Category, Workout_Categories, Exercise_Library, Exercise_Status
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt

app = Flask(__name__)
api_user = Blueprint('apiUser', __name__)
crypto = Bcrypt(app)

@api_user.route('/users')
def users():
    users = User.query.all()

    response_body = list(map(lambda p: p.serialize() ,users))
    return jsonify(response_body), 200

@api_user.route('/users', methods=['POST'])
def new_user():
    class_keys = ['FirstName','LastName','email', 'password','date_of_birth','gender']

    new_user=User()
    for key in class_keys:
        if key is 'password':
            password = request.json.get('password')
            password = crypto.generate_password_hash(password).decode("utf-8")
            setattr(new_user,key,password)
        else: setattr(new_user,key,request.json.get(key))

    db.session.add(new_user)
    db.session.commit()
    #First Name, Last Name, Email,Date of Bith, Gender 

    return({"msg":"User created"})

    # user = User.query.get(1)
    # class_keys = list(vars(user).keys())
    # print(class_keys)

    return "ok", 200