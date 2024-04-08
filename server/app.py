from flask import request, make_response, jsonify, session
from config import app, db, api
from models import User, Media, Comment
from flask_restful import Resource

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_list = [user.to_dict() for user in users]
        return make_response(jsonify(users_list))

    def post(self):
        data = request.json
        try:
            user = User(username=data['username'])
            user.password_hash = data['password']

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            return make_response(jsonify(user.to_dict()), 201)
        except Exception as e:
            return make_response({'error': str(e)}, 400)

    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(Users, '/users')

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
            comment = Comment(discription=data['discription'])
            db.session.add(comment)
            db.session.commit()
            return make_response(jsonify(comment.to_dict()), 201)
        except Exception as e:
            return make_response({'error': str(e)}, 400)

api.add_resource(Comments, '/comments')

@app.before_request
def check_authorized():
    if request.endpoint in ['users', 'medias', 'comments']:
        user_id = session.get('user_id')
        if not user_id:
            return make_response(jsonify({'error': 'Unauthorized'}), 401)

if __name__ == '__main__':
    app.run(port=5555, debug=True)