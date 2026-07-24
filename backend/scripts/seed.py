import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models import User, Agendamento

app = create_app()

def seed_database():
    with app.app_context():
        print("Criando tabelas no banco de dados SQLite...")
        db.create_all()
        
        # Criação do Usuário
        admin_email = "admin@timesaver.com"
        if not User.query.filter_by(email=admin_email).first():
            user = User(username="admin", email=admin_email)
            user.set_password("123456")
            db.session.add(user)
            print("Usuário de teste criado com sucesso.")

        # Inserção de Agendamentos Reais
        if Agendamento.query.count() == 0:
            agendamentos_iniciais = [
                Agendamento(paciente="Carlos Andrade", cpf="111.111.111-11", medico="Dr. Roberto", especialidade="Ortopedia", data="2026-07-24", horario="10:00", convenio="Unimed", status="Confirmado"),
                Agendamento(paciente="Mariana Costa", cpf="222.222.222-22", medico="Dra. Silvia", especialidade="Cardiologia", data="2026-07-24", horario="14:30", convenio="Bradesco", status="Pendente"),
                Agendamento(paciente="Felipe Mendes", cpf="333.333.333-33", medico="Dr. Roberto", especialidade="Ortopedia", data="2026-07-25", horario="09:00", convenio="Particular", status="Cancelado")
            ]
            db.session.bulk_save_objects(agendamentos_iniciais)
            print("Agendamentos inseridos com sucesso no banco de dados.")

        db.session.commit()
        print("Operação finalizada.")

if __name__ == "__main__":
    seed_database()