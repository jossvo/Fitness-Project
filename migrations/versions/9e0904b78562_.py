"""empty message

Revision ID: 9e0904b78562
Revises: 
Create Date: 2023-03-27 18:24:40.164052

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9e0904b78562'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('icon', sa.String(length=250), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('coach',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=250), nullable=False),
    sa.Column('first_name', sa.String(length=250), nullable=False),
    sa.Column('last_name', sa.String(length=250), nullable=False),
    sa.Column('email', sa.String(length=250), nullable=False),
    sa.Column('password', sa.String(length=250), nullable=False),
    sa.Column('gender', sa.String(length=250), nullable=False),
    sa.Column('share_gender', sa.Boolean(), nullable=True),
    sa.Column('location', sa.String(length=250), nullable=True),
    sa.Column('share_location', sa.Boolean(), nullable=True),
    sa.Column('birthday', sa.Date(), nullable=False),
    sa.Column('share_age', sa.Boolean(), nullable=True),
    sa.Column('profile_picture', sa.String(length=250), nullable=True),
    sa.Column('profile_banner_picture', sa.String(length=250), nullable=True),
    sa.Column('bio', sa.String(length=250), nullable=True),
    sa.Column('facebook', sa.String(length=250), nullable=True),
    sa.Column('twitter', sa.String(length=250), nullable=True),
    sa.Column('instagram', sa.String(length=250), nullable=True),
    sa.Column('tiktok', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=250), nullable=False),
    sa.Column('last_name', sa.String(length=250), nullable=False),
    sa.Column('username', sa.String(length=250), nullable=False),
    sa.Column('email', sa.String(length=250), nullable=False),
    sa.Column('gender', sa.String(length=250), nullable=False),
    sa.Column('share_gender', sa.Boolean(), nullable=True),
    sa.Column('password', sa.String(length=250), nullable=False),
    sa.Column('location', sa.String(length=250), nullable=True),
    sa.Column('share_location', sa.Boolean(), nullable=True),
    sa.Column('birthday', sa.Date(), nullable=False),
    sa.Column('share_age', sa.Boolean(), nullable=True),
    sa.Column('weight', sa.String(length=250), nullable=True),
    sa.Column('share_weight', sa.Boolean(), nullable=True),
    sa.Column('height', sa.String(length=250), nullable=True),
    sa.Column('share_height', sa.Boolean(), nullable=True),
    sa.Column('profile_picture', sa.String(length=250), nullable=True),
    sa.Column('profile_banner_picture', sa.String(length=250), nullable=True),
    sa.Column('bio', sa.String(length=600), nullable=True),
    sa.Column('facebook', sa.String(length=250), nullable=True),
    sa.Column('twitter', sa.String(length=250), nullable=True),
    sa.Column('instagram', sa.String(length=250), nullable=True),
    sa.Column('tiktok', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('coach_review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('coach_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('review', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['coach_id'], ['coach.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('exercise_library',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('description', sa.String(length=750), nullable=False),
    sa.Column('coach_id', sa.Integer(), nullable=True),
    sa.Column('video', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['coach_id'], ['coach.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workout',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('coach_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('weeks', sa.Integer(), nullable=True),
    sa.Column('days_per_week', sa.Integer(), nullable=True),
    sa.Column('difficulty', sa.String(length=30), nullable=False),
    sa.Column('description', sa.String(length=250), nullable=False),
    sa.Column('isfree', sa.Boolean(), nullable=True),
    sa.Column('exercise_count', sa.Integer(), nullable=True),
    sa.Column('wk_image', sa.String(length=250), nullable=True),
    sa.Column('is_public', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['coach_id'], ['coach.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('exercise_assign',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('workout_id', sa.Integer(), nullable=True),
    sa.Column('week', sa.Integer(), nullable=True),
    sa.Column('day', sa.Integer(), nullable=True),
    sa.Column('order', sa.Integer(), nullable=True),
    sa.Column('exercise_id', sa.Integer(), nullable=True),
    sa.Column('sets', sa.Integer(), nullable=True),
    sa.Column('reps', sa.Integer(), nullable=True),
    sa.Column('rest_between_sets', sa.Float(), nullable=True),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercise_library.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['workout_id'], ['workout.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workout_categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('workout_id', sa.Integer(), nullable=True),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['category.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['workout_id'], ['workout.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workout_review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('workout_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('review', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['workout_id'], ['workout.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('workout_user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('workout_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['workout_id'], ['workout.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('exercise_status',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('exercise_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercise_assign.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('exercise_status')
    op.drop_table('workout_user')
    op.drop_table('workout_review')
    op.drop_table('workout_categories')
    op.drop_table('exercise_assign')
    op.drop_table('workout')
    op.drop_table('exercise_library')
    op.drop_table('coach_review')
    op.drop_table('user')
    op.drop_table('coach')
    op.drop_table('category')
    # ### end Alembic commands ###
