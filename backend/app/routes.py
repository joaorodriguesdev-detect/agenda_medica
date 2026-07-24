from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from .models import User
from . import db, login_manager
from .services import fetch_agendamentos

main = Blueprint('main', __name__)

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

@main.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "Dados não enviados"}), 400

    identificador = data.get('identificador')
    senha = data.get('senha')
    
    user = User.query.filter((User.email == identificador) | (User.username == identificador)).first()
    
    if user and user.check_password(senha):
        login_user(user)
        return jsonify({"status": "success", "message": "Login realizado com sucesso", "user": user.username}), 200
    else:
        return jsonify({"status": "error", "message": "Credenciais inválidas. Verifique seu usuário/e-mail e senha."}), 401

@main.route('/api/logout', methods=['POST'])
@login_required
def api_logout():
    logout_user()
    return jsonify({"status": "success", "message": "Logout realizado"})

@main.route('/api/agendamentos', methods=['GET'])
# @login_required # Remova o comentário desta linha após testar a integração inicial
def api_get_agendamentos():
    result = fetch_agendamentos()
    # Se o status for de erro (ex: API indisponível), repassamos o erro HTTP correspondente
    status_code = 200 if result['status'] == 'success' else 503
    return jsonify(result), status_code

@main.route('/api/mock/agendamentos')
def mock_api():
    from .models import Agendamento
    
    # Consulta real ao banco de dados SQLite
    agendamentos_db = Agendamento.query.all()
    dados_formatados = [ag.to_dict() for ag in agendamentos_db]
    
    # Simulação intencional de um registro com campos ausentes para avaliação de tratamento de falhas
    dados_formatados.append({"paciente": "Registro Incompleto", "cpf": "000.000.000-00", "medico": "Dr. Fantasma"})
    
    # A resposta deve conter paciente, CPF, médico, especialidade, data, horário, convênio e status[cite: 1]
    return jsonify({
        "agendamentos": dados_formatados
    })