from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer(), primary_key=True)
    first_name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    username = db.Column(db.String(250))
    email = db.Column(db.String(250), unique=True,nullable=False)
    gender = db.Column(db.String(250), nullable=False)
    share_gender = db.Column(db.Boolean())
    password = db.Column(db.String(250), nullable=False)
    location = db.Column(db.String(250))
    share_location = db.Column(db.Boolean())
    birthday = db.Column(db.Date(), nullable=False)
    share_age = db.Column(db.Boolean())
    weight = db.Column(db.String(250))
    share_weight = db.Column(db.Boolean())
    height = db.Column(db.String(250))
    share_height = db.Column(db.Boolean())
    profile_picture = db.Column(db.String(250))
    bio = db.Column(db.String(250))
    facebook = db.Column(db.String(250))
    twitter = db.Column(db.String(250))
    instagram = db.Column(db.String(250))
    tiktok = db.Column(db.String(250))
    # workouts - done by table Workout_User
    # reviews:
    #   -wk reviews - done by table Workout_Review
    #   coach reviews - done by table Coach_Review
    # wk progress - in progress

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.first_name.capitalize() + " "+ self.last_name.capitalize(),
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    def serialize_account_details(self):
        return {
            "first_name" : self.first_name, 
            "last_name" : self.last_name, 
            "username" : self.username, 
            "email": self.email,
            "gender" : self.gender,
            "share_gender" : self.share_gender,
            "date_of_birth" : self.birthday,
            "share_age" : self.share_age,
            "weight" : self.weight,
            "share_weight" : self.share_weight,
            "height" : self.height,
            "share_height" : self.share_height,
            "bio": self.bio
        }

class Coach(db.Model):
    __tablename__ = 'coach'
    id = db.Column(db.Integer(), primary_key=True)
    first_name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    bio = db.Column(db.String(250))
    facebook = db.Column(db.String(250))
    twitter = db.Column(db.String(250))
    instagram = db.Column(db.String(250))
    tiktok = db.Column(db.String(250))
    # custom exercise videos library - done by table Exercise_Assign
    # custom exercises library - done by table Exercise_Assign
    # wks library - done by table Workout
    # general - done by table Coach_Review
    
    # no. wks bought
    # no. custom plans bought
    # general rating

class Workout(db.Model):
    __tablename__ = "workout"
    id = db.Column(db.Integer(),primary_key=True)
    coach_id = db.Column(db.Integer(),db.ForeignKey("coach.id"))
    coach = db.relationship(Coach)
    name = db.Column(db.String(250), nullable=False)
    weeks = db.Column(db.Integer())
    days_per_week = db.Column(db.Integer())
    difficulty = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(250), nullable=False) #summary
    isfree = db.Column(db.Boolean())
    exercise_count = db.Column(db.Integer())
    wk_image = db.Column(db.String(250))
    is_public = db.Column(db.Boolean())
    # classifications - done by table Workout_Categories
    # reviews - done by table Workout_Review

    def serialize_library(self):
        return {
            "coach_name": self.coach.first_name.capitalize() + " "+ self.coach.last_name.capitalize(),
            "name": self.name,
            "weeks" : self.weeks , 
            "days_per_week" : self.days_per_week , 
            "difficulty" : self.difficulty , 
            "description" : self.description , 
            "isfree" : self.isfree ,  
            "wk_image" : self.wk_image , 
        }
    
class Category(db.Model):
    __tablename__ = "category"
    id = db.Column(db.Integer(),primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    icon = db.Column(db.String(250), nullable=False)

class Workout_Categories(db.Model):
    __tablename__ = "workout_categories"
    id = db.Column(db.Integer(),primary_key=True)
    workout_id = db.Column(db.Integer(),db.ForeignKey("workout.id",ondelete="cascade"))
    workout = db.relationship(Workout)
    category_id = db.Column(db.Integer(),db.ForeignKey("category.id",ondelete="cascade"))
    category = db.relationship(Category)

class Exercise_Library(db.Model): #Library with public and private exercises
    __tablename__ = "exercise_library"
    id = db.Column(db.Integer(),primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    coach_id = db.Column(db.Integer(),db.ForeignKey("coach.id",ondelete="cascade"))
    video = db.Column(db.String(250), nullable=False)

class Exercise_Assign(db.Model): #Exercise_Assigned_to_Workout
    __tablename__ = "exercise_assign"
    id = db.Column(db.Integer(),primary_key=True)
    workout_id = db.Column(db.Integer(),db.ForeignKey("workout.id",ondelete="cascade"))
    workout = db.relationship(Workout,backref="workout",lazy=True)
    week = db.Column(db.Integer())
    day = db.Column(db.Integer())
    order = db.Column(db.Integer())
    exercise_id = db.Column(db.Integer(),db.ForeignKey("exercise_library.id",ondelete="cascade"))
    exercise = db.relationship(Exercise_Library)
    sets = db.Column(db.Integer())
    reps = db.Column(db.Integer())
    rest_between_sets = db.Column(db.Float())
    description = db.Column(db.String(250))
    
class Exercise_Status(db.Model):
    id = db.Column(db.Integer(),primary_key=True)
    exercise_id = db.Column(db.Integer(),db.ForeignKey("exercise_assign.id",ondelete="cascade"))
    user_id = db.Column(db.Integer(),db.ForeignKey("user.id",ondelete="cascade"))
    completed = db.Column(db.Boolean())

class Workout_User(db.Model): #User_Purchased_Workouts
    __tablename__ = "workout_user"
    id = db.Column(db.Integer(),primary_key=True)
    workout_id = db.Column(db.Integer(),db.ForeignKey("workout.id",ondelete="cascade"))
    workout = db.relationship(Workout)
    user_id = db.Column(db.Integer(),db.ForeignKey("user.id",ondelete="cascade"))
    user = db.relationship(User)


class Workout_Review(db.Model):
    __tablename__ = "workout_review"
    id = db.Column(db.Integer(),primary_key=True)
    workout_id = db.Column(db.Integer(),db.ForeignKey("workout.id",ondelete="cascade"))
    workout = db.relationship(Workout)
    user_id = db.Column(db.Integer(),db.ForeignKey("user.id",ondelete="cascade"))
    user = db.relationship(User)
    rating = db.Column(db.Integer())
    review = db.Column(db.String(250))

class Coach_Review(db.Model):
    __tablename__ = "coach_review"
    id = db.Column(db.Integer(),primary_key=True)
    coach_id = db.Column(db.Integer(),db.ForeignKey("coach.id",ondelete="cascade"))
    coach = db.relationship(Coach)
    user_id = db.Column(db.Integer(),db.ForeignKey("user.id",ondelete="cascade"))
    user = db.relationship(User)
    rating = db.Column(db.Integer())
    review = db.Column(db.String(250))