import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default_dev_key')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', f"sqlite:///{os.path.join(BASE_DIR, '../agenda.db')}")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    API_MOCK_URL = os.environ.get('API_MOCK_URL', 'http://localhost:5000/api/mock/agendamentos')