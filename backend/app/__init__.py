from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS # Importamos o CORS
from .config import Config

db = SQLAlchemy()
login_manager = LoginManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Habilitamos o CORS permitindo envio de cookies/credenciais entre o Next.js e o Flask
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

    db.init_app(app)
    login_manager.init_app(app)

    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app