import pytest
from app import create_app
from app.services import fetch_agendamentos

@pytest.fixture
def app_context():
    app = create_app()
    app.config['TESTING'] = True
    # Forçamos uma URL inexistente para forçar a indisponibilidade da API[cite: 1]
    app.config['API_MOCK_URL'] = 'http://localhost:9999/api/inexistente'
    with app.app_context():
        yield app

def test_falha_api_agendamentos(app_context):
    """Testa se a aplicação lida corretamente com a indisponibilidade temporária da API[cite: 1]."""
    resultado = fetch_agendamentos()
    
    # A aplicação não deve quebrar, mas retornar um dicionário tratado com status de erro e data vazia[cite: 1]
    assert resultado['status'] == 'error'
    assert resultado['data'] == []
    assert 'temporariamente indisponível' in resultado['message']