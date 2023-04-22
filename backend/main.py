"""
This module contains the Flask application for our project.
"""


from flask import Flask
from flask_restx import Api, Resource
from config import DevConfig
from models import Recipe
from exts import db

app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)

api = Api(doc='/docs', app=app)


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

@app.shell_context_processor
def make_shell_context():
    return {
        "db":db,
        "Recipe":Recipe
    }



if __name__ == '__main__':
    app.run()
