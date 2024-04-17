from flask import request, make_response, jsonify, session
from config import app, db, api
from models import User, Media, Comment, FanMail
from flask_restful import Resource
from sqlalchemy_serializer import SerializerMixin  # Assuming SerializerMixin is defined in a separate module

import ipdb 


class FanMailResource(Resource):
    def get(self, id=None):
        if id:
            fan_mail = FanMail.query.get_or_404(id)
            return fan_mail.to_dict(), 200
        else:
            fan_mail_list = [fan.to_dict() for fan in FanMail.query.all()]
            return fan_mail_list, 200

    def post(self):
        content = request.json.get('content', '')
        if content:
            fan_mail = FanMail(content=content)
            db.session.add(fan_mail)
            db.session.commit()
            return fan_mail.to_dict(), 201
        else:
            return {'error': 'Content is required'}, 400

    def put(self, id):
        fan_mail = FanMail.query.get_or_404(id)
        content = request.json.get('content', '')
        if content:
            fan_mail.content = content
            db.session.commit()
            return fan_mail.to_dict(), 200
        else:
            return {'error': 'Content is required'}, 400

    def delete(self, id):
        fan_mail = FanMail.query.get_or_404(id)
        db.session.delete(fan_mail)
        db.session.commit()
        return {'message': 'Fan mail deleted successfully'}, 200

api.add_resource(FanMailResource, '/fanmail', '/fanmail/<int:id>')


class Medias(Resource):
    def post(self):
        data = request.json
        try:
            media = Media(description=data['description'], image_url=data['image_url'])
            db.session.add(media)
            db.session.commit()

            session['media_id'] = media.id
            return make_response(jsonify(media.to_dict()), 201)
        except Exception as e:
            return make_response({'error': str(e)}, 400)

    def get(self):
        medias = Media.query.all()
        medias_list = [media.to_dict() for media in medias]
        return make_response(jsonify(medias_list))

    def delete(self):
        session['media_id'] = None
        return make_response({}, 204)

api.add_resource(Medias, '/medias')

class Comments(Resource):
    def get(self):
        comments = Comment.query.all()
        comments_list = [comment.to_dict() for comment in comments]
        return make_response(jsonify(comments_list))

    def post(self):
        data = request.json
        try:
            comment = Comment(content=data['description'])
            db.session.add(comment)
            db.session.commit()
            return make_response(jsonify(comment.to_dict()), 201)
        except Exception as e:
            return make_response({'error': str(e)}, 400)

    def patch(self, comment_id):
        data = request.json
        try:
            comment = Comment.query.get(comment_id)
            if comment:
                comment.content = data.get('description', comment.content)
                db.session.commit()
                return make_response(jsonify(comment.to_dict()), 200)
            else:
                return make_response({'error': 'Comment not found'}, 404)
        except Exception as e:
            return make_response({'error': str(e)}, 400)

    def delete(self, comment_id):
        try:
            comment = Comment.query.get(comment_id)
            if comment:
                db.session.delete(comment)
                db.session.commit()
                return make_response(jsonify({'message': 'Comment deleted successfully'}), 200)
            else:
                return make_response({'error': 'Comment not found'}, 404)
        except Exception as e:
            return make_response({'error': str(e)}, 400)

api.add_resource(Comments, '/comments', '/comments/<int:comment_id>')


class Users(Resource):
    def get(self):
        users = User.query.all()
        users_list = [user.to_dict() for user in users]
        return make_response(jsonify(users_list))

    def post(self):
        data = request.json
        
        try:
            user = User(username=data['username'])
            user.password_hash = data['password']  # Hash the password
           
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            response = make_response(user.to_dict(), 201)
            return response
        except Exception as e:  # Handle specific exceptions
            return make_response({'error': str(e)}, 400)
        

    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(Users, '/users')

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    

    user = User.query.filter_by(username=data['username']).first()
    if user and user.authenticate(data['password']):
        session['user_id'] = user.id
        return make_response(user.to_dict(), 200)
    else:
        return make_response({'error': 'Invalid username or password'}, 401)

@app.route('/authorized', methods=['GET'])
def authorized():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.filter_by(id=user_id).first()
        if user:
            return make_response(user.to_dict())
    return make_response({'error': 'Unauthorized'}, 401)

@app.route('/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)
    return make_response({}, 204)

@app.before_request
def check_authorized():
    if request.endpoint == 'mediabyid' and not session.get('user_id'):
        return make_response({'error': 'Unauthorized.'}, 401)

if __name__ == '__main__':
    app.run(port=5555, debug=True)