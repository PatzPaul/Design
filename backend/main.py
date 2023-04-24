"""
This module contains the Flask application for our project.
"""


from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
from config import DevConfig
from models import Recipe, User
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token

app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)


migrate = Migrate(app, db)
JWTManager(app)

api = Api(doc='/docs', app=app)

# Model (serializer)
recipe_model = api.model(
    "Recipe",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String()
    }
)
signup_model = api.model(
    'SignUp',
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)

login_model=api.model(
    'Login',
    {
    'username':fields.String(),
    'password':fields.String()
    }
)
@api.route('/hello')
class HelloResource(Resource):
    """
    A resource class that handles the 'hello' endpoint.
    """

    def get(self):
        """
        Handles a GET request to the 'hello' endpoint.

        Returns:
            A dictionary containing a message.
        """
        return {"message": "Hello World"}


@api.route('/signup')
class Signup(Resource):
    @api.expect(signup_model)
    def post(self):
        """User account sign up"""
        data = request.get_json()

        username = data.get('username')

        db_user = User.query.filter_by(username=username).first()

        if db_user is not None:
            return jsonify({"message": f"User with username {username} already exists"})

        new_user = User(
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )
        new_user.save()
        return jsonify ({"message":"user has been created succesfully"})


@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
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


@api.route('/recipes')
class RecipesResource(Resource):
    """
    A resource class that handles the various http'recipes' endpoint.
    """
    @api.marshal_list_with(recipe_model)
    def get(self):
        """get all recipes"""
        recipes = Recipe.query.all()

        return recipes

    @api.marshal_with(recipe_model)
    @api.expect(recipe_model)
    def post(self):
        """create a new recipe"""
        data = request.get_json()

        new_recipe = Recipe(
            title=data.get('title'),
            description=data.get('description')
        )
        new_recipe.save()
        return new_recipe, 201


@api.route('/recipe/<int:id>')
class RecipeResource(Resource):
    def get(self, id):
        """get a recipe by id"""
        recipe = Recipe.query.get_or_404(id)

        return recipe

    @api.marshal_with(recipe_model)
    def put(self, id):
        """update a recipe by id"""

        recipe_to_update = Recipe.query.get_or_404(id)

        data = request.json()

        recipe_to_update.update(data.get(''), data.get('description'))

        return recipe_to_update

    @api.marshal_with(recipe_model)
    def delete(self, id):
        """delete a recipe by id"""
        recipe_to_delete = Recipe.query.get_or_404(id)

        return recipe_to_delete


@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Recipe": Recipe
    }


if __name__ == '__main__':
    app.run()
