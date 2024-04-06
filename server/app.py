
from flask import request, make_response, session
from config import app, db, api
from models import User, Media, Comment
from flask_restful import Resource





class Users(Resource):
    def post(self):
        data = request.json
        try:
            user = User(username=data['username'])
            user.password_hash = data['password']

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id
            response = make_response(user.to_dict(), 201)
        except:
            return make_response({'error': "something went wrong"}, 400)

        return response

api.add_resource(Users, '/users')

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return make_response({'error': 'invalid username'}, 404)

    if user.authenticate(data['password']):
        # session['user_id'] = user.id
        return make_response(user.to_dict(), 200)
    else:
        return make_response({'error': 'invalid username or password'}, 401)


@app.route('/authorized', methods=['GET'])
def authorized():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.filter_by(id=user_id).first()
        return make_response(user.to_dict())
    else:
        return make_response({'error': 'Unauthorized'}, 401)

@app.route('/logout', methods=['DELETE'])
def logout():
    session['user_id'] = None
    return make_response({}, 204)


@app.before_request
def check_authorized():
    if request.endpoint == 'projectbyid' and not session.get('user_id'):
        return make_response({'error': 'Unauthorized.'}, 401)



@app.route('/medias', methods=['GET', 'POST'])
def all_medias():
    if request.method == 'GET':
        medias = Media.query.all()
        medias_list = [media.to_dict() for media in medias]
        return make_response(medias_list)
   
    
    if request.method == 'POST':
        data = request.get_json()
       
        media = Media(
            discription=data['discription'],
            image_url = data.get('image_url')
        )
        db.session.add(media)
        db.session.commit()


        response = make_response(
            jsonify(media.to_dict()),
            201,
        )
    return response

@app.route('/medias/<int:id>', methods=['PATCH', 'DELETE'])
def media_by_id(id):
    media = Media.query.get(id)
    
    if request.method == 'PATCH':
        params = request.json
        for attr in params:
            setattr(media, attr, params[attr])

        db.session.add(media)
        db.session.commit()

        return make_response(media.to_dict())

    elif request.method =='DELETE':
        db.session.delete(media)
        db.session.commit()

        return make_response("Media was deleted.", 204) 
    



    @app.route('/comments', methods=['GET', 'POST'])
    def all_comments():
        if request.method == 'GET':
            comments = Comment.query.all()
            comments_list = [comment.to_dict() for comment in comments]
            return make_response(comments_list)
   
    
    if request.method == 'POST':
        data = request.get_json()
       
        comment = Comment(
            discription=data['discription'],
            
        )
        db.session.add(comment)
        db.session.commit()

        response = make_response(
                jsonify(comment.to_dict()),
                201,
            )
      
      
    return response

@app.route('/comments/<int:id>', methods=['PATCH', 'DELETE'])
def comment_by_id(id):
    comment = Comment.query.get(id)
    
    if request.method == 'PATCH':
        params = request.json
        for attr in params:
            setattr(comment, attr, params[attr])

        db.session.add(comment)
        db.session.commit()

        return make_response(comment.to_dict())

    elif request.method =='DELETE':
        db.session.delete(comment)
        db.session.commit()

        return make_response("message:" "Comment was deleted.", 204) 


if __name__ == '__main__':
    app.run(port=5555, debug=True)

