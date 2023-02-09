"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Coach, Workout, Exercise_Assign, Workout_User,Workout_Review,Coach_Review, Category, Workout_Categories, Exercise_Library, Exercise_Status
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt, JWTManager 
from flask_bcrypt import Bcrypt
import re

api_user = Blueprint('apiUser', __name__)
app = Flask(__name__)
crypto = Bcrypt(app)

#Function to validate valid email
def check_email(email):
    regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    # pass the regular expression
    # and the string into the fullmatch() method
    if(re.fullmatch(regex, email)): return True
    else: return False

@api_user.route('/login', methods=['POST'])
def user_login():
    email = request.json.get('email')
    password = request.json.get('password')
    print(email,password)
    user=User.query.filter(User.email==email).first()
    if user is None:
        return jsonify({"msg": "Login failed: Wrong email"}), 401
        
    #Validar la clave
    if not crypto.check_password_hash(user.password,password):
        return jsonify({"msg": "Login failed: Wrong password"}), 401

    token = create_access_token(identity=user.id)
    refresh_token=create_refresh_token(identity=user.id)
    return jsonify({"access_token":token,"refresh_token":refresh_token,"id":user.id,"type":"u"})

@api_user.route('/users', methods=['GET'])
def users():
    users = User.query.all()

    response_body = list(map(lambda p: p.serialize() ,users))
    return jsonify(response_body), 200

# Get single user, simple without jwt, then with jwt
@api_user.route('/users/<user_id>')
# @jwt_required()
def get_user_info(user_id):
    # user_id=get_jwt_identity()
    # user=User.query.get(user_id)
    user=User.query.get(user_id)
    if user is None:
        return jsonify({"msg":"Usuario no encontrado"}), 404

    return jsonify(user.serialize_account_details())

@api_user.route('/users/signup', methods=['POST'])
def new_user():
    class_keys = ['first_name','last_name','email', 'password','birthday','gender']
    
    new_user=User()
    for key in class_keys:
        if key == 'email':
            email = request.json.get(key).lower().strip()
            if check_email(email):setattr(new_user,key,email.lower())
            else: return({"msg":"Invalid email, please verify!"})
        if key == 'password':
            password = request.json.get('password')
            password = crypto.generate_password_hash(password).decode("utf-8")
            setattr(new_user,key,password)
        else: setattr(new_user,key,request.json.get(key).lower())

    db.session.add(new_user)
    db.session.commit()

    return({"msg":"User created"})


@api_user.route('/users/<user_id>', methods=['PATCH'])
def update_person(user_id):
    user=User.query.get(user_id)
    if user is None:
        return jsonify({"msg":"Usuario no encontrado"}), 404
    class_keys=['last_name', 'birthday', 'facebook', 'username', 'share_age', 'twitter', 'email', 'weight', 'instagram', 'gender', 'share_weight', 'tiktok', 'share_gender', 'height', 'share_height', 'first_name', 'location', 'profile_picture', 'share_location', 'bio']

    for key in class_keys:
        if request.form.get(key) is not None :
            if 'share' not in key:
                setattr(user,key,request.form.get(key).lower())
            # else: print("request.form.get(key)")
    
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize_account_details()),200

    # user = User.query.get(1)
    # class_keys = list(vars(user).keys())
    # print(class_keys)
    # return "ok", 200