from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required

main = Blueprint('main', __name__)

# Base de dados oficial em memória para a API
DADOS_REAIS = [
    {"data": "2026-09-28", "horario": "10:00", "paciente": "Carlos Andrade", "cpf": "111.111.111-11", "medico": "Dr. Roberto Alves", "especialidade": "Ortopedia", "convenio": "Unimed", "status": "Confirmado"},
    {"data": "2026-09-28", "horario": "14:30", "paciente": "Mariana Costa", "cpf": "222.222.222-22", "medico": "Dra. Silvia", "especialidade": "Cardiologia", "convenio": "Bradesco Saúde", "status": "Confirmado"},
    {"data": "2026-09-29", "horario": "08:00", "paciente": "Ana Souza", "cpf": "333.333.333-33", "medico": "Dra. Ana Souza", "especialidade": "Dermatologia", "convenio": "Particular", "status": "Pendente"},
    {"data": "2026-09-29", "horario": "11:00", "paciente": "Felipe Mendes", "cpf": "444.444.444-44", "medico": "Dr. Roberto Alves", "especialidade": "Ortopedia", "convenio": "Particular", "status": "Cancelado"},
    {"data": "2026-09-30", "horario": "15:00", "paciente": "Roberto Alves", "cpf": "555.555.555-55", "medico": "Dr. Carlos", "especialidade": "Clínico Geral", "convenio": "SulAmérica", "status": "Concluído"}
]

@main.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    if data and data.get('identificador') == 'admin@timesaver.com' and data.get('senha') == '123456':
        return jsonify({"status": "success", "message": "Login realizado", "user": "admin"}), 200
    return jsonify({"status": "error", "message": "Credenciais inválidas."}), 401

@main.route('/api/logout', methods=['POST'])
def api_logout():
    return jsonify({"status": "success", "message": "Logout realizado"})

@main.route('/api/agendamentos', methods=['GET'])
def api_get_agendamentos():
    try:
        # Entrega os dados consolidados sem provocar erro interno[cite: 1]
        return jsonify({
            "status": "success",
            "data": DADOS_REAIS
        }), 200
    except Exception as e:
        # Tratamento de exceção de alto nível para proteger a integridade da aplicação[cite: 1]
        return jsonify({
            "status": "error",
            "message": "Erro interno no servidor ao buscar dados.",
            "data": []
        }), 500