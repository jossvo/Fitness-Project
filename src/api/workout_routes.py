"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Coach, Workout, Exercise_Assign, Workout_User,Workout_Review,Coach_Review, Category, Workout_Categories, Exercise_Library, Exercise_Status
from api.utils import generate_sitemap, APIException
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

@api_workout.route('/workouts', methods=['POST'])
def new_workout():
    class_keys = ['name', 'coach_id', 'days_per_week', 'description', 'exercise_count', 'weeks', 'difficulty', 'isfree']

    new_workout=Workout()
    for key in class_keys:
        setattr(new_workout,key,request.json.get(key))

    db.session.add(new_workout)
    db.session.commit()

    return({"msg":"Workout created"})

    # user = Workout.query.get(1)
    # class_keys = list(vars(user).keys())
    # print(class_keys)

    return "ok", 200