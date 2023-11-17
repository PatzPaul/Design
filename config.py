"""
This module contains configuration settings for the application.
"""
import os
from decouple import config


BASE_DIR = os.path.dirname(os.path.realpath(__file__))


class Config:
    """
    This is the general configuration settings for the application.
    """
    SECRET_KEY = config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = config(
        'SQLALCHEMY_TRACK_MODIFICATIONS', cast=bool)


class DevConfig(Config):
    """
    Development configuration settings
    """
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, 'dev_db')
    DEBUG = True
    SQLALCHEMY_ECHO = True


class ProdConfig(Config):
    """
    Production environment configuration settings
    """
    SQLALCHEMY_DATABASE_URI =  "sqlite:///" + os.path.join(BASE_DIR, 'dev_db')
    DEBUG = config('DEBUG')
    SQLALCHEMY_ECHO = config('ECHO')
    SQLALCHEMY_TRACK_MODIFICATIONS = config(
        'SQLALCHEMY_TRACK_MODIFICATIONS', cast=bool)





class TestConfig(Config):
    """
    Test environment configuration settings
    """
    SQLALCHEMY_DATABASE_URI='sqlite:///test.db'
    SQLALCHEMY_ECHO=False
    TESTING = True