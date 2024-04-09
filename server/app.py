from flask import request, make_response, jsonify, session
from config import app, db, api
from models import User, Media, Comment, FanMail
from flask_restful import Resource

@app.route('/api/fanmail', methods=['POST'])
def create_fan_mail():
    content = request.json.get('content', '')
    if content:
        fan_mail = FanMail(content=content)
        db.session.add(fan_mail)
        db.session.commit()
        return jsonify(fan_mail.to_dict()), 201  # Return dictionary representation
    return jsonify({'error': ' is required'}), 400

@app.route('/api/fanmail', methods=['GET'])
def get_all_fan_mail():
    fan_mail = FanMail.query.all()
    fan_mail_list = [fan.to_dict() for fan in fan_mail]  # Use 'to_dict()' method
    return jsonify(fan_mail_list)

@app.route('/api/fanmail/<int:id>', methods=['DELETE'])
def delete_fan_mail(id):
    fan_mail = FanMail.query.get_or_404(id)
    db.session.delete(fan_mail)
    db.session.commit()
    return jsonify({'message': 'Fan mail deleted successfully'})

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
        except Exception as e:  # Handle specific exceptions
            return make_response({'error': str(e)}, 400)
        return response

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
            comment = Comment(description=data['description'])  # Correct the key
            db.session.add(comment)
            db.session.commit()
            return make_response(jsonify(comment.to_dict()), 201)
        except Exception as e:
            return make_response({'error': str(e)}, 400)

api.add_resource(Comments, '/comments')

if __name__ == '__main__':
    app.run(port=5555, debug=True)