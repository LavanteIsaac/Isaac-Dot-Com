from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db, bcrypt



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-created_at', '-updated_at', '-_password_hash')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        byte_object = password.encode('utf-8')
        bcrypt_hash = bcrypt.generate_password_hash(byte_object)
        hash_object_as_string = bcrypt_hash.decode('utf-8')
        self._password_hash = hash_object_as_string

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User id={self.id} username={self.username} >'

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
    __tablename__ = 'comments'

    serialize_rules = ('-media.comments', '-user.comments')

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, unique=True, nullable=False)


    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

  
    
    media_id = db.Column(db.Integer, db.ForeignKey('medias.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
   
  
    media = db.relationship('Media', back_populates='comments')
    user = db.relationship('User', back_populates='comments')
