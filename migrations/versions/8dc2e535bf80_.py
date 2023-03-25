"""empty message

Revision ID: 8dc2e535bf80
Revises: 71d317e545d2
Create Date: 2023-03-25 04:44:18.762700

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8dc2e535bf80'
down_revision = '71d317e545d2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('exercise_status',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('exercise_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercise_assign.id'], ondelete='cascade'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='cascade'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('exercise__status')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('exercise__status',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('exercise_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('completed', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercise_assign.id'], name='exercise__status_exercise_id_fkey', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='exercise__status_user_id_fkey', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name='exercise__status_pkey')
    )
    op.drop_table('exercise_status')
    # ### end Alembic commands ###
