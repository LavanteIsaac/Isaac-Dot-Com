
from flask import Flask, request, make_response, jsonify
# from flask_restful import Resource
from flask_migrate import Migrate 
from config import app, db, api
from models import User, Media, Comment


# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

