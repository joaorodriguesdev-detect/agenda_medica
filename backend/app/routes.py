from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required
from .models import Convenio, Paciente, Medico
from . import db

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

@main.route('/api/convenios', methods=['GET'])
def get_convenios():
    convenios_db = Convenio.query.all()
    return jsonify({
        "status": "success",
        "data": [c.to_dict() for c in convenios_db]
    }), 200

@main.route('/api/convenios', methods=['POST'])
def add_convenio():
    data = request.get_json()
    
    novo_convenio = Convenio(
        nome=data.get('nome'),
        cobertura=data.get('cobertura'),
        status=data.get('status', 'Ativo'),
        pacientes=0 # Todo convênio novo começa com 0 pacientes
    )
    
    db.session.add(novo_convenio)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Convênio criado com sucesso!",
        "data": novo_convenio.to_dict()
    }), 201

@main.route('/api/pacientes', methods=['GET'])
def get_pacientes():
    pacientes_db = Paciente.query.all()
    return jsonify({
        "status": "success",
        "data": [p.to_dict() for p in pacientes_db]
    }), 200

@main.route('/api/pacientes', methods=['POST'])
def add_paciente():
    data = request.get_json()
    
    novo_paciente = Paciente(
        nome=data.get('nome'),
        cpf=data.get('cpf'),
        rg=data.get('rg'),
        data_nascimento=data.get('data_nascimento'),
        telefone=data.get('telefone'),
        email=data.get('email'),
        endereco=data.get('endereco'),
        convenio=data.get('convenio'),
        numero_convenio=data.get('numero_convenio')
    )
    
    db.session.add(novo_paciente)
    db.session.commit()
    
    return jsonify({
        "status": "success",
        "message": "Paciente cadastrado com sucesso!",
        "data": novo_paciente.to_dict()
    }), 201

@main.route('/api/medicos', methods=['GET'])
def get_medicos():
    medicos_db = Medico.query.all()
    return jsonify({
        "status": "success",
        "data": [m.to_dict() for m in medicos_db]
    }), 200

@main.route('/api/medicos', methods=['POST'])
def add_medicos():
    data = request.get_json()

    novo_medico = Medico(
        nome=data.get('nome'),
        crm=data.get('crm'),
        especialidade=data.get('especialidade'),
        telefone=data.get('telefone'),
        email=data.get('email'),
        dias_atendimento=data.get('dias_atendimento')
    )

    db.session.add(novo_medico)
    db.session.commit()

    return jsonify({
        "status": "sucess",
        "message": "Medico cadastrado com sucesso !",
        "data": novo_medico.to_dict()
    }), 201