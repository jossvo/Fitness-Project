"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Coach, Workout,Workout_User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/coachworkouts/<coach_id>', methods=['POST', 'GET'])
def handle_coachworkouts(coach_id):
    coach=Coach.query.get(coach_id)
    if coach is None:
        return "Not found", 404

    response_body = {
        "workouts": coach.serialize_workouts()
    }

    return jsonify(response_body), 200

@api.route('/coachusers/<coach_id>', methods=['POST', 'GET'])
def handle_coachusers(coach_id):
    coach=Coach.query.get(coach_id)
    if coach is None:
        return "Not found", 404
    users=coach.serialize_workouts_users()
    response_body = {
        "workouts": users
    }
    print(users)

    return response_body, 200