"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Coach, Workout, Exercise_Assign, Workout_User,Workout_Review,Coach_Review, Category, Workout_Categories, Exercise_Library, Exercise_Status
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, create_refresh_token, get_jwt, JWTManager 
from api.utils import generate_sitemap, APIException
from api.user_routes import upload_image, update_image
from firebase_admin import storage
from datetime import timedelta
from flask_bcrypt import Bcrypt
import re

app = Flask(__name__)
api_workout = Blueprint('apiWorkout', __name__)
crypto = Bcrypt(app)


@api_workout.route('/workouts')
def get_workouts():
    workouts = Workout.query.all()

    response_body = list(map(lambda w: w.serialize_library() ,workouts))
    return jsonify(response_body), 200

@api_workout.route('/workouts/<workout_id>')
def get_single_workout(workout_id):
    workout = Workout.query.get(workout_id)
    if workout is None:
        return jsonify({"msg": "Program not found"}), 404

    response_data=workout.serialize_library()

    bucket = storage.bucket(name='fit-central-7cf8b.appspot.com')
    resource = bucket.blob(workout.wk_image)
    profile_pic_url=resource.generate_signed_url(version="v4",expiration=timedelta(seconds=7*86400), method="GET")
    response_data["wk_image"] = profile_pic_url
    return jsonify(response_data), 200

@api_workout.route('/workouts', methods=['POST'])
@jwt_required()
def new_workout():
    user_id=get_jwt_identity()
    class_keys = ['name', 'days_per_week', 'description', 'weeks', 'difficulty']

    new_workout=Workout()
    for key in class_keys:
        setattr(new_workout,key,request.form.get(key))

    setattr(new_workout,'coach_id',user_id)

    boolArr = {"true":True,"false":False}
    new_workout.is_public = boolArr[request.form.get('is_public')]

    db.session.add(new_workout)
    db.session.flush()
    
    file=request.files['file']
    extension = "jpg"
    filename="workout_pics/"+str(new_workout.id)+"."+extension
    upload_image(filename,file,extension)
    setattr(new_workout,'wk_image',filename)

    db.session.commit()

    return({"msg":"Workout created","id":new_workout.id})

    # user = Workout.query.get(1)
    # class_keys = list(vars(user).keys())
    # print(class_keys)
    # return "ok", 200

@api_workout.route('/workouts/<workout_id>',methods=['PATCH'])
@jwt_required()
def update_workout(workout_id):
    workout = Workout.query.get(workout_id)
    coach_id=get_jwt_identity()
    if workout is None:
        return jsonify({"msg": "Program not found"}), 404

    if workout.coach_id is not coach_id:
        return jsonify({"msg": "Current coach can't modify this workout"}), 401

    class_keys = ['name', 'days_per_week', 'description', 'weeks', 'difficulty']
    for key in class_keys:
        setattr(workout,key,request.form.get(key))

    boolArr = {"true":True,"false":False}
    workout.is_public = boolArr[request.form.get('is_public')]
    
    if request.form.get('file'):
        file=request.files['file']
        extension = file.filename.split('.')[1]
        filename="workout_pics/"+str(workout.id)+"."+extension
        old_file = workout.wk_image
        update_image(old_file,filename,file,extension)
        setattr(workout,'wk_image',filename)

    db.session.add(workout)
    db.session.commit()

    return jsonify(workout.serialize_library())

@api_workout.route('/my_workouts/<workout_id>')
@jwt_required()
def get_user_workout(workout_id):
    user_id=get_jwt_identity()
    workout = Workout_User.query.filter(Workout_User.workout_id==workout_id,Workout_User.user_id==user_id).first()
    if workout is None:
        return jsonify({"msg": "Unauthorized access"}), 403
    
    return workout.serialize_details(),200