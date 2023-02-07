"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Coach, Workout, Exercise_Assign, Workout_User,Workout_Review,Coach_Review, Category, Workout_Categories, Exercise_Library, Exercise_Status
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt
from flask_bcrypt import Bcrypt
import re
app = Flask(__name__)
api_user = Blueprint('apiUser', __name__)
crypto = Bcrypt(app)

#Function to validate valid email
def check_email(email):
    regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    # pass the regular expression
    # and the string into the fullmatch() method
    if(re.fullmatch(regex, email)): return True
    else: return False


@api_user.route('/users')
def users():
    users = User.query.all()

    response_body = list(map(lambda p: p.serialize() ,users))
    return jsonify(response_body), 200

@api_user.route('/users/signup', methods=['POST'])
def new_user():
    class_keys = ['first_name','last_name','email', 'password','date_of_birth','gender']
    
    new_user=User()
    for key in class_keys:
        if key is 'email':
            email = request.json.get(key).lower().strip()
            if check_email(email):setattr(new_user,key,email.lower())
            else: return({"msg":"Invalid email, please verify!"})
        if key is 'password':
            password = request.json.get('password')
            password = crypto.generate_password_hash(password).decode("utf-8")
            setattr(new_user,key,password)
        else: setattr(new_user,key,request.json.get(key).lower())

    db.session.add(new_user)
    db.session.commit()

    return({"msg":"User created"})

    # user = User.query.get(1)
    # class_keys = list(vars(user).keys())
    # print(class_keys)

    return "ok", 200

@api_user.route('/userinfo')
@jwt_required()
def get_user_info():
    user_id=get_jwt_identity()
    user=User.query.get(user_id)

    return jsonify(user.serialize())