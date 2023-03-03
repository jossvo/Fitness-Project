"""empty message

Revision ID: f73757d92089
Revises: 14b829f5fd0c
Create Date: 2023-03-02 02:03:56.902689

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f73757d92089'
down_revision = '14b829f5fd0c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('exercise_library', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.VARCHAR(length=250),
               type_=sa.String(length=750),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('exercise_library', schema=None) as batch_op:
        batch_op.alter_column('description',
               existing_type=sa.String(length=750),
               type_=sa.VARCHAR(length=250),
               existing_nullable=False)

    # ### end Alembic commands ###
