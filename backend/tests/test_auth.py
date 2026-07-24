import pytest
from app import create_app, db
from app.models import User

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            # Adicionamos uma checagem rápida para evitar duplicidade
            if not User.query.filter_by(email='teste@admin.com').first():
                user = User(username='admin_teste', email='teste@admin.com')
                user.set_password('senha123')
                db.session.add(user)
                db.session.commit()
                
        yield client
        
        # Limpa o banco de dados em memória após cada teste
        with app.app_context():
            db.session.remove()
            db.drop_all()

def test_login_valido(client):
    """Testa se um login com credenciais corretas funciona e redireciona."""
    response = client.post('/login', data={
        'identificador': 'teste@admin.com',
        'senha': 'senha123'
    }, follow_redirects=True)
    
    assert response.status_code == 200
    assert b'Sair' in response.data

def test_login_invalido(client):
    """Testa se um login com senha incorreta exibe a mensagem de falha."""
    response = client.post('/login', data={
        'identificador': 'teste@admin.com',
        'senha': 'senha_errada'
    }, follow_redirects=True)
    
    assert response.status_code == 200
    assert b'Credenciais inv\xc3\xa1lidas' in response.data