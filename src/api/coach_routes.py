"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Coach, Workout, Exercise_Assign, Workout_User,Workout_Review,Coach_Review, Category, Workout_Categories, Exercise_Library, Exercise_Status
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt, JWTManager 
from flask_bcrypt import Bcrypt
from api.user_routes import check_email
from api.user_routes import upload_image, update_image
from flask_bcrypt import Bcrypt
from firebase_admin import storage
from datetime import timedelta
import secrets
import tempfile
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
        return jsonify({"status":"Wrong email","msg": "Couldn't find a Fit Central account associated with this email. Please try again"}), 401
        
    #Validar la clave
    if not crypto.check_password_hash(coach.password,password):
        return jsonify({"status":"Wrong password","msg": "That's not the right password. Please try again"}), 401

    token = create_access_token(identity=coach.id)
    refresh_token=create_refresh_token(identity=coach.id)
    return jsonify({"access_token":token,"refresh_token":refresh_token,"id":coach.id,"type":"c"})

@api_coach.route('/coaches', methods=['GET'])
def coaches():
    users = User.query.all()

    response_body = list(map(lambda p: p.serialize_account_details() ,users))
    return jsonify(response_body), 200

@api_coach.route('/coachinfo')
@jwt_required()
def get_coach_info():
    coach_id=get_jwt_identity()
    coach=Coach.query.get(coach_id)
    if coach is None:
        return jsonify({"msg":"Coach no encontrado"}), 404

    response_data=coach.serialize_account_details()
    # Se obtiene el bucket
    bucket = storage.bucket(name='fit-central-7cf8b.appspot.com')
    # Generar el recurso en el bucket
    resource = bucket.blob(coach.profile_picture)
    profile_pic_url=resource.generate_signed_url(version="v4",expiration=timedelta(seconds=7*86400), method="GET")
    response_data["profile_picture"] = profile_pic_url
    return jsonify(response_data)

@api_coach.route('/coachpublicinfo/<coach_id>')
def get_coach_info_public(coach_id):
    coach=Coach.query.get(coach_id)
    if coach is None:
        return jsonify({"msg":"Coach no encontrado"}), 404
    
    #users=Workout_User.query.filter(Workout_User.workout.coach_id==coach_id).all() 

    #users=Workout_User.query.filter(Workout_User.workout.coach_id==coach_id).all()
   
    reviews=Coach_Review.query.filter(Coach_Review.coach_id==coach_id).all()
    reviews = list(map(lambda c: c.serialize_review_rating() ,reviews))
    
    
    workouts=Workout.query.filter(Workout.coach_id==coach_id).all()
    response_data=coach.serialize_account_details()
    # Se obtiene el bucket
    bucket = storage.bucket(name='fit-central-7cf8b.appspot.com')
    # Generar el recurso en el bucket
    resource = bucket.blob(coach.profile_picture)
    profile_pic_url=resource.generate_signed_url(version="v4",expiration=timedelta(seconds=7*86400), method="GET")
    response_data["profile_picture"] = profile_pic_url
    response_data["workouts"] = len(workouts)
    users=coach.serialize_workouts_users()
    users= list(map(lambda u:len(u),users))
    response_data["users"] = sum(users) #Esto genera el error (revisar mas tarde)
    
    if reviews:
        response_data['rating'] = sum(reviews)/len(reviews)
    return jsonify(response_data)




@api_coach.route('/coach/signup', methods=['POST'])
def new_coach():
    msg = {}
    email = request.form.get('email').lower()
    username = request.form.get('username').lower()
    email_exists= Coach.query.filter(Coach.email==email).first()
    if email_exists is not None: 
        msg["email_msg"]="Email adress is already in use"
    username_exists= Coach.query.filter(Coach.username==username).first()
    if username_exists is not None: 
        msg["username_msg"]="Username is already in use"
    if email_exists is not None or username_exists is not None: 
        return jsonify(msg) , 409

    class_keys = ['first_name','last_name','email', 'password','birthday','gender',"username"]

    new_coach=Coach()
    for key in class_keys:
        if key == 'password':
            password = request.form.get('password')
            password = crypto.generate_password_hash(password).decode("utf-8")
            setattr(new_coach,key,password)
        elif isinstance(request.form.get(key), str): 
            setattr(new_coach,key,request.form.get(key).lower())
        else:setattr(new_coach,key,request.form.get(key))


    db.session.add(new_coach)
    db.session.flush()
    coach_id = new_coach.id
    seed = secrets.token_hex(nbytes=16)
    db.session.commit()

    return jsonify({"msg":"Coach created","id":coach_id,"seed":seed,"type":"coach"})

@api_coach.route('/updatecoachprofile', methods=['PATCH'])
@jwt_required()
def update_coach():
    coach_id=get_jwt_identity()
    coach=Coach.query.get(coach_id)

    email = request.form.get('email').lower()
    username = request.form.get('username').lower()
    email_exists= Coach.query.filter(Coach.email==email).first()
    username_exists= Coach.query.filter(Coach.username==username).first()

    msg = {}
    if email_exists is not None and email_exists.email is not coach.email: 
        msg["email_msg"]="Email adress is already in use"
    if username_exists is not None and username_exists.username is not coach.username:  
        msg["username_msg"]="Username is already in use"
    if  msg: 
        return jsonify(msg) , 409

    if coach is None:
        return jsonify({"msg":"Usuario no encontrado"}), 404
    class_keys=['last_name', 'birthday', 'facebook', 'username', 'share_age', 'twitter', 'email', 'instagram', 'gender', 'tiktok', 'share_gender', 'first_name', 'location', 'profile_picture', 'share_location', 'bio']

    for key in class_keys:
        if request.form.get(key) is not None :
            if 'share' not in key:
                if isinstance(request.form.get(key), str): 
                    setattr(coach,key,request.form.get(key).lower())
                else:setattr(coach,key,request.form.get(key))
    
    boolArr = {"true":True,"false":False}
    coach.share_age = boolArr[request.form.get('share_age')]
    coach.share_gender = boolArr[request.form.get('share_gender')]
    
    db.session.add(coach)
    db.session.commit()
    return "ok",200

    # user = User.query.get(1)
    # class_keys = list(vars(user).keys())
    # print(class_keys)
    # return "ok", 200

@api_coach.route('/setcoachprofilepic/<coach_id>',methods=['POST'])
def set_profile_pic(coach_id):
    file=request.files['file']
    extension = "jpg"
    filename="coach_profile_pics/"+str(coach_id)+"."+extension
    upload_image(filename,file,extension)

    coach=Coach.query.get(coach_id)
    setattr(coach,'profile_picture',filename)
    db.session.add(coach)
    db.session.commit()


    return jsonify({"msg":"Porfile picture set"})

@api_coach.route('/setcoachprofilepic',methods=['PATCH'])
@jwt_required()
def update_coach_profile_pic():
    coach_id=get_jwt_identity()
    coach=Coach.query.get(coach_id)

    file=request.files['file']
    extension = file.filename.split('.')[1]
    filename="coach_profile_pics/"+str(coach_id)+"."+extension
    old_file = coach.profile_picture

    if coach.profile_picture is None:upload_image(filename,file,extension)
    else:update_image(old_file,filename,file,extension)

    setattr(coach,'profile_picture',filename)
    db.session.add(coach)
    db.session.commit()

    return jsonify({"msg":"Profile picture updated"})

@api_coach.route('/coach/my_programs')
@jwt_required()
def get_coach_programs():
    coach_id=get_jwt_identity()
    workouts = Workout.query.filter(Workout.coach_id==coach_id).all()

    response_body = list(map(lambda w: w.serialize_library() ,workouts))
    return jsonify(response_body), 200
