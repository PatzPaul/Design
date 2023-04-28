from flask import Flask, request, jsonify, make_response
from flask_restx import Resource, Namespace, fields
from models import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token, get_jwt_identity, jwt_required)


auth_ns = Namespace('auth')


user_model = auth_ns.model('user', {
    'username': fields.String(required=True),
    'password': fields.String(required=True),
})


@auth_ns.route('/register')
class Register(Resource):
    @auth_ns.expect(user_model)
    def post(self):
        data = request.json
        if not data:
            return {'message': 'No input data provided'}, 400

        email = data.get('email')
        password = data.get('password')
        if not email:
            return {'message': 'Email is required'}, 400
        if not password:
            return {'message': 'Password is required'}, 400

        user = User.query.filter_by(email=email).first()
        if user:
            return {'message': 'User already exists'}, 400

        new_user = User(email=email, password=password)
        db.session.add(new_user)
        db.session.commit()

        return {'message': 'User created successfully'}, 201


@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(user_model)
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')

        if not username:
            return {'message': 'username is required'}, 400
        if not password:
            return {'message': 'password is required'}, 400

        user = User.query.filter_by(username=username).first()

        if not user or not check_password_hash(user.password, password):
            return {'message': 'invalid credentials'}, 401

        access_token = create_access_token(identity=user.username)
        refresh_token = create_refresh_token(identity=user.username)

        return {
            'message': 'login successful',
            'access_token': access_token,
            'refresh_token': refresh_token
        }, 200


@auth_ns.route('/refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):

        current_user = get_jwt_identity()

        new_access_token = create_access_token(identity=current_user)

        return make_response(jsonify({"access_token": new_access_token}), 200)
