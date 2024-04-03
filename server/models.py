from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-cooments.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(2), unique=True, nullable=False)
    age = db.Column(db.Integer)
    sign = db.Column(db.String)
    # email
    # password

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    

    comments = db.relationship('Comment', back_populates='user')
    comments_medias = association_proxy('Comments', 'media')

    __table_args__ = (
        db.CheckConstraint('age > 18'),
    )

    @validates('username')
    def validate_username(self, key, new_username):
        if len(new_username) <= 5:
            raise ValueError('Username must be greater than 5 characters')
        return new_username
    

class Media(db.Model, SerializerMixin):
    __tablename__ = 'medias'

    serialize_rules = ('-comments.media',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    body = db.Column(db.String)
    category = db.Column(db.String)
    url = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    comments = db.relationship('Comment', back_populates='media', cascade='all, delete-orphan')
    users = association_proxy('comments,', 'user')


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'commentss'

    serialize_rules = ('-media.comments', '-user.comments')

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, unique=True, nullable=False)


    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

  
    
    media_id = db.Column(db.Integer, db.ForeignKey('medias.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
   
  
    media = db.relationship('Media', back_populates='comments')
    user = db.relationship('User', back_populates='comments')
