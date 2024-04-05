
from flask import Flask, request, make_response, jsonify
# from flask_restful import Resource
from flask_migrate import Migrate 
from config import app, db
from models import User, Media, Comment





@app.route('/users', methods=['GET', 'POST'])
def all_users():
    users = User.query.all()
    users_list = [user.to_dict(rules= ('-medias')) for user in users]
    if request.method == 'GET':
       
        return make_response(users_list)
   
    
    elif request.method == 'POST':
        data = request.get_json()
        user = User(
            username=data['username'],
        )
        db.session.add(user)
        db.session.commit()

        response = make_response(
            jsonify(user.to_dict()),
            201,
        )
    return response


@app.route('/users/<int:id>', methods=['PATCH', 'DELETE'])
def user_by_id(id):
    user = User.query.get(id)
  
    if request.method == 'PATCH':
        params = request.json
        for attr in params:
            setattr(user, attr, params[attr])

        db.session.add(user)
        db.session.commit()

        return make_response(user.to_dict())

    elif request.method =='DELETE':
        db.session.delete(user)
        db.session.commit()

        return make_response( ' ', 204) 

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

