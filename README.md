# Recipe Dezigns
A Recipe App built under react and flask


## Backend
- python version 3 recommended or higher
- make sure pip3 is installed 
In the backend directory start a python virtual environment with the `pipenv command` 
```bash
pipenv shell
```

### install dependencies
<p>This will generate a Pipfile and a Pipfile.lock that has the required dependencies installed</p>

```bash 
pipenv install flask flask_restx flask_sqlalchemy flask_jwt_extended 
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
### C