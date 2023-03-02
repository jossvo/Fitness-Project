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
api_exercise = Blueprint('apiExercise', __name__)
crypto = Bcrypt(app)

@api_exercise.route('/exercise_library')
@jwt_required()
def get_exercises():
    coach_id=get_jwt_identity()
    exercises = Exercise_Library.query.filter(Exercise_Library.coach_id==coach_id).all()

    response_body = list(map(lambda e: e.serialize_library() ,exercises))
    return jsonify(response_body), 200

@api_exercise.route('/exercise_assigned/<workout_id>')
@jwt_required()
def get_exercises_assigned(workout_id):
    coach_id=get_jwt_identity()
    exercises = Exercise_Assign.query.filter(Exercise_Assign.workout_id==workout_id).all()

    response_body = list(map(lambda e: e.serialize_list() ,exercises))
    return jsonify(response_body), 200

@api_exercise.route('/exercise', methods=['POST'])
@jwt_required()
def new_exercise():
    coach_id=get_jwt_identity()
    class_keys = ['name', 'description']

    new_exercise=Exercise_Library()
    for key in class_keys:
        setattr(new_exercise,key,request.form.get(key))

    setattr(new_exercise,'coach_id',coach_id)

    db.session.add(new_exercise)
    db.session.flush()
    
    file=request.files['file']
    extension = file.filename.split(".")[1]
    filename="exercise_videos/"+str(new_exercise.id)+"."+extension
    upload_image(filename,file,extension)
    setattr(new_exercise,'video',filename)

    db.session.commit()

    return({"msg":"Workout created","id":new_exercise.id})

@api_exercise.route('/assign_exercise', methods=['POST'])
@jwt_required()
def new_exercise_assign():
    class_keys = ['workout_id', 'week', 'day', 'order', 'exercise_id', 'sets', 'reps', 'rest_between_sets', 'description']

    new_exercise_assign=Exercise_Assign()
    for key in class_keys:
        setattr(new_exercise_assign,key,request.form.get(key))

    db.session.add(new_exercise_assign)
    db.session.commit()

    return({"msg":"Exercise succesfully assigned"})

@api_exercise.route('/assign_exercise_order/<exercise_id>',methods=['PATCH'])
@jwt_required()
def update_exercise_order(exercise_id):
    exercise_assigned = Exercise_Assign.query.get(exercise_id)
    if exercise_assigned is None:
        return jsonify({"msg": "Exercise not found"}), 404

    setattr(exercise_assigned,key,request.form.get('order'))

    db.session.add(exercise_assigned)
    db.session.commit()

    return({"msg":"Exercise order updated"})

@api_exercise.route('/assign_exercise/<exercise_id>',methods=['PATCH'])
@jwt_required()
def update_exercise(exercise_id):
    exercise_assigned = Exercise_Assign.query.get(exercise_id)
    if exercise_assigned is None:
        return jsonify({"msg": "Exercise not found"}), 404

    class_keys = ['week', 'day', 'order', 'sets', 'reps', 'rest_between_sets','exercise_id']
    for key in class_keys:
        setattr(exercise_assigned,key,request.form.get(key))

    db.session.add(exercise_assigned)
    db.session.commit()

    return({"msg":"Exercise updated"})