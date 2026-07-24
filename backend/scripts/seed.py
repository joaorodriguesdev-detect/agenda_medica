import os
import sys

# Adiciona o diretório raiz ao path para conseguir importar a app
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models import User

app = create_app()

def seed_database():
    with app.app_context():
        print("Criando tabelas no banco de dados SQLite...")
        db.create_all()
        
        admin_email = "admin@timesaver.com"
        admin_user = "admin"
        
        if not User.query.filter_by(email=admin_email).first():
            print("Criando usuário de teste...")
            user = User(username=admin_user, email=admin_email)
            user.set_password("123456")
            db.session.add(user)
            db.session.commit()
            print(f"Usuário criado com sucesso! Login: {admin_email} | Senha: {user.password_hash[:6]}...")
        else:
            print("Usuário de teste já existe no banco.")

if __name__ == "__main__":
    seed_database()