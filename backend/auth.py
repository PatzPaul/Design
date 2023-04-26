from flask import Flask, request, jsonify, make_response
from flask_restx import Resource, Namespace, fields
from models import User , db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required


auth_ns=Namespace('auth',description="A namespace for our Authentification")



signup_model =auth_ns.model(
    'SignUp',
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)

login_model= auth_ns.model(
    'Login',
    {
    'username':fields.String(),
    'password':fields.String()
    }
)


@auth_ns.route('/signup')
class Signup(Resource):
    auth_ns.expect(signup_model)
    def post(self):
        """User account sign up"""
        data = request.get_json()

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        db_user = User.query.filter_by(username=username).first()

        if db_user is not None:
            return make_response(jsonify({"message": f"User with username {username} already exists"}), 400)

        new_user = User(username=username, email=email, password=generate_password_hash(password))
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify({"message": "User created successfully"}), 201)

@auth_ns.route('/login')
class Login(Resource):
    auth_ns.expect(login_model)
    def post(self):
        """User authentication when logging in"""
        data=request.get_json()

        username=data.get('username')
        password=data.get('password')
        
        db_user=User.query.filter_by(username=username).first()

        if db.user and check_password_hash(db_user.password, password ):

            access_token=create_access_token(identity=db.user.username)
            refresh_token=create_refresh_token(identity=db.user.username)

            return jsonify (
                {"access token":access_token,"refresh token":refresh_token}
            )
