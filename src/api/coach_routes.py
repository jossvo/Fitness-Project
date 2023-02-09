"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Coach, Workout, Exercise_Assign, Workout_User,Workout_Review,Coach_Review, Category, Workout_Categories, Exercise_Library, Exercise_Status
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt, JWTManager 
from flask_bcrypt import Bcrypt
from api.user_routes import check_email
import re

api_coach = Blueprint('apiCoach', __name__)
app = Flask(__name__)
crypto = Bcrypt(app)

@api_coach.route('/coach/login', methods=['POST'])
def coach_login():
    email = request.json.get('email')
    password = request.json.get('password')

    coach=Coach.query.filter(Coach.email==email).first()
    if coach is None:
        return jsonify({"msg": "Login failed: Wrong email"}), 401
        
    #Validar la clave
    if not crypto.check_password_hash(coach.password,password):
        return jsonify({"msg": "Login failed: Wrong password"}), 401

    token = create_access_token(identity=coach.id)
    refresh_token=create_refresh_token(identity=coach.id)
    return jsonify({"access_token":token,"refresh_token":refresh_token,"id":coach.id,"type":"c"})

@api_coach.route('/coach/signup', methods=['POST'])
def new_coach():
    class_keys = ['first_name','last_name','email', 'password','birthday','gender']
    
    new_coach=Coach()
    for key in class_keys:
        if key == 'email':
            email = request.json.get(key).lower().strip()
            if check_email(email):setattr(new_coach,key,email.lower())
            else: return({"msg":"Invalid email, please verify!"})
        if key == 'password':
            password = request.json.get('password')
            password = crypto.generate_password_hash(password).decode("utf-8")
            setattr(new_coach,key,password)
        else: 
            setattr(new_coach,key,request.json.get(key).lower())

    db.session.add(new_coach)
    db.session.commit()

    return({"msg":"Coach created"})