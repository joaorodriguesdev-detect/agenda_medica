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
    return jsonify({
        "agendamentos": [
            {"paciente": "Carlos Andrade", "cpf": "111.111.111-11", "medico": "Dr. Roberto", "especialidade": "Ortopedia", "data": "2026-07-24", "horario": "10:00", "convenio": "Unimed", "status": "Confirmado"},
            {"paciente": "Mariana Costa", "cpf": "222.222.222-22", "medico": "Dra. Silvia", "especialidade": "Cardiologia", "data": "2026-07-24", "horario": "14:30", "convenio": "Bradesco", "status": "Pendente"},
            {"paciente": "Felipe Mendes", "cpf": "333.333.333-33", "medico": "Dr. Roberto", "especialidade": "Ortopedia", "data": "2026-07-25", "horario": "09:00", "convenio": "Particular", "status": "Cancelado"},
            {"paciente": "Registro Incompleto", "cpf": "000.000.000-00", "medico": "Dr. Fantasma"} 
        ]
    })