  
import os
from flask_admin import Admin
from .models import db, User, Coach, Workout, Exercise_Assign, Workout_User,Workout_Review,Coach_Review, Category, Workout_Categories, Exercise_Library, Exercise_Status
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Coach, db.session))
    admin.add_view(ModelView(Workout, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(Workout_Categories, db.session))
    admin.add_view(ModelView(Workout_User, db.session))
    admin.add_view(ModelView(Exercise_Library, db.session))
    admin.add_view(ModelView(Exercise_Assign, db.session))
    admin.add_view(ModelView(Exercise_Status, db.session))
    admin.add_view(ModelView(Workout_Review, db.session))
    admin.add_view(ModelView(Coach_Review, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))