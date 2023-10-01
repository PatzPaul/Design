# Recipe Dezigns :mage:
A Recipe App built under react and flask


## Running the Project 
- For the `backend` and `frontend` set up and launch you can go through these steps.

### Backend
- python version 3 recommended or higher
- make sure pip3 is installed 
- Install the necessary dependencies with requirements.txt
```bash
pip install -r requirements.txt
```

In the backend directory start a python virtual environment with the `pipenv command`.
```bash
pipenv shell
```
- Finally start the server with this command :
```bash
python run.py
```
- You should see info similar to the following :

``` bash
(backend) bash-3.2$ python run.py
 * Serving Flask app 'main'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 157-059-692
```
<strong>This will signify the `backend` server is running </strong>

### Frontend
- proceed to the frontend folder named `client` 
- Once you're in the Client directory make sure you have a node installed in the terminal by typing the following command 
```zsh
node --version
```
- Make sure you have node installed `node version => 17 `if not you can proceed to the [Node js platform](https://nodejs.org/en/download) and follow the procedure from there.

- Once installed and the right node version is verified you will have to employ the node package manager npm and use it to install our node modules 
- Run the following command
```zsh
npm install 
```
- use the hyphen tag `--legacy-peer-deps` for depreciated dependencies

```zsh
npm install --legacy-peer-deps
```
- Upon complete installation you should see the node_modules folder in your client directory 
- To start the frontend client run this command

```zsh
npm start
```

You should see this message upon completion the port will be acessible 

```zsh 
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.0.6.12:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully

```
<br>

## Backend Setup

### install dependencies for Backend
<p>proceed to the backend directory on the terminal</p>
<p>This will generate a Pipfile and a Pipfile.lock that has the required dependencies installed</p>

```bash 
pipenv install flask flask_restx flask_sqlalchemy flask_jwt_extended 
```

- Export the main.py file as flask app in terminal

```bash 
export FLASK_APP=main.py
```
<p>Then run the `flask shell` command to start the python IDE </p>

```bash
flask shell
```

### Creating a file for app's configurations
- Create a new file config.py and generate a class withing the file config for all our global declarations

- install python-decouple for locating our secret key 
```bash 
pipenv install python_decouple
```
and proceed to import in the config.py file as follows 
```python
from decouple import config

class Config:
    SECRET_KEY=config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = config(
        'SQLALCHEMY_TRACK_MODIFICATIONS', cast=bool) # decouple will read this and cast into a boolean

```
The secret key will be a generated random string by making use of python secrets 
- open a new terminal and type the command 
```bash
python
```
<p>If succesful will launch a python IDE where we will add further commands</p>
- Proceed with generating a random hexadecimal string with the following 

```python
import secrets
secrets.token_hex(12)
``` 
- Make a .env file in the backend directory and add our env vars as seen in the .env.example file 

### Development config for app
- Making use of sqlite SQLAlchemy database, Feel free to intergrate with this or PostgreSQL continue in the config.py file

```python

class DevConfig(Config):
    """
    Development configuration settings
    """
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, 'dev_db')
    DEBUG = True
    SQLALCHEMY_ECHO = True
```

### Production config for app


### Testing config for app

### Create `main.py` file for our App Instance flask
Create a new `main.py` file in the backend directory that will handle the flask instance and add the necessary code 
- Use postman or insomnia for testing the app routes and 

```python 
```
### Create a `models.py` file for our sqlite 
This will house our models import for use in models file for database schema
Use this code below to create a recipe model
```python
from exts import db

"""
class Recipe:
    id:int primary key
    title : str 
    description : str (text)
"""

class Recipe(db.Model):
    """This is the recipe class for the database model"""
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<Recipe {self.title}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title, description):
        self.title = title
        self.description = description

        db.session.commit()
```
### DB Connected strings
<p>Run the `flask shell` command to start the python shell</p>

```bash
flask shell
```
<p>Something similar to below should appear on termial</p>

```
Python V 0.0.0 (default, MM DD YY,00:00:00 )
[GCC V0.0.0 ] on linux
App: main [production]
Instance: /home/directory/../../backend/instance
```
- Once the shell is open typing 
```python 
db
```
- Terminal should now show info on the connected string for our sqlite.
- provided every model is set up type the following command 
```python
db.create_all()
```

### creating a Serializer 
- Using flask rest to handle serialization for our model 
- Import fields library from flask_restx 

```python

from flask_restx import fields
 
```
- Add the following code after imports
```python
# Model (serializer)
recipe_model = recipe_ns.model(
    "Recipe",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String()
    }
)
```

### Generate a `requirements.txt` file to keep track of our requirements.
- Use the following command 
```bash
pip freeze > requirements.txt
```

- The `requirements.txt` file should look this :
```txt
aniso8601==9.0.1
attrs==23.1.0
click==8.1.3
Flask==2.2.3
Flask-JWT-Extended==4.4.4
flask-restx==1.1.0
Flask-SQLAlchemy==3.0.3
greenlet==2.0.2
itsdangerous==2.1.2
Jinja2==3.1.2
jsonschema==4.17.3
MarkupSafe==2.1.2
PyJWT==2.6.0
pyrsistent==0.19.3
python-decouple==3.8
python-dotenv==1.0.0
pytz==2023.3
SQLAlchemy==2.0.9
typing_extensions==4.5.0
Werkzeug==2.2.3
```

### Creating login and signup functionality 
- Using jwt extended library 
- We will start by generating our model schema 
- Add the following code to `models.py` file
```python
# user model
"""

class User:
    id:integer
    username:string
    email:string
    password:string
"""
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
```
- We will proceed to the terminal to install flask migrate to help create this model in the DB.

- Use the following command to install flask migrate in our virtual environvent

```bash
pipenv install flask_migrate
```
- open the python shell with this command 
```bash
flask shell
```
- create a migration repo that will log all updates and migrations done in the database

```flask
flask db init
```

- creates a migration repo within our project and keeps track of all versions of the database
```flask
flask db migrate -m "add user table"
```
- This will create the table and its migration (version)

```flask
flask db upgrade
```
- The above command makes use of current  DB version 

