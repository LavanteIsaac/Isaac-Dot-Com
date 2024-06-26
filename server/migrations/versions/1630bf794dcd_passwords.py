"""passwords

Revision ID: 1630bf794dcd
Revises: 58e95c2bdd5a
Create Date: 2024-04-05 11:43:42.127248

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1630bf794dcd'
down_revision = '58e95c2bdd5a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=False))
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(length=2),
               type_=sa.String(length=20),
               existing_nullable=False)
        batch_op.create_unique_constraint(batch_op.f('uq_users_email'), ['email'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_users_email'), type_='unique')
        batch_op.alter_column('username',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=2),
               existing_nullable=False)
        batch_op.drop_column('_password_hash')
        batch_op.drop_column('email')

    # ### end Alembic commands ###
