from . import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Agendamento(db.Model):
    __tablename__ = 'agendamentos'
    
    id = db.Column(db.Integer, primary_key=True)
    paciente = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.String(14), nullable=False)
    medico = db.Column(db.String(100), nullable=False)
    especialidade = db.Column(db.String(100), nullable=False)
    data = db.Column(db.String(10), nullable=False)
    horario = db.Column(db.String(5), nullable=False)
    convenio = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "paciente": self.paciente,
            "cpf": self.cpf,
            "medico": self.medico,
            "especialidade": self.especialidade,
            "data": self.data,
            "horario": self.horario,
            "convenio": self.convenio,
            "status": self.status
        }

class Convenio(db.Model):
    __tablename__ = 'convenios'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    cobertura = db.Column(db.String(100), nullable=False)
    pacientes = db.Column(db.Integer, default=0)
    status = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "cobertura": self.cobertura,
            "pacientes": self.pacientes,
            "status": self.status
        }

class Paciente(db.Model):
    __tablename__ = 'pacientes'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    cpf = db.Column(db.String(20), unique=True, nullable=False)
    rg = db.Column(db.String(20))
    data_nascimento = db.Column(db.String(20))
    telefone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    endereco = db.Column(db.String(200))
    convenio = db.Column(db.String(100))
    numero_convenio = db.Column(db.String(50))

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "cpf": self.cpf,
            "rg": self.rg,
            "data_nascimento": self.data_nascimento,
            "telefone": self.telefone,
            "email": self.email,
            "endereco": self.endereco,
            "convenio": self.convenio,
            "numero_convenio": self.numero_convenio
        }

class Medico(db.Model):
    __tablename__ = 'medicos'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    crm = db.Column(db.String(20), unique=True, nullable=False)
    especialidade = db.Column(db.String(100), nullable=False)
    telefone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    dias_atendimento = db.Column(db.String(100))

    def to_dict(self):
        return{
            "id": self.id,
            "nome": self.nome,
            "crm": self.crm,
            "especialidade": self.especialidade,
            "telefone": self.telefone,
            "email": self.email,
            "dias_atendimento": self.dias_atendimento
        }
        