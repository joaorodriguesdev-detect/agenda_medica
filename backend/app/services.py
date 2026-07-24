import requests
import logging
from flask import current_app

# Configuração básica de log para facilitar a identificação da causa de problemas
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fetch_agendamentos():
    url = current_app.config['API_MOCK_URL']
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status() 
        
        data = response.json()
        
        # Tratamento: resposta vazia ou inválida da API[cite: 1]
        if not data or 'agendamentos' not in data:
            logger.warning("Resposta da API vazia ou com formato estrutural inválido.")
            return {"status": "error", "message": "Os dados da agenda não estão disponíveis no momento.", "data": []}
        
        agendamentos = data.get('agendamentos', [])
        
        # Tratamento: campos obrigatórios ausentes na resposta[cite: 1]
        required_fields = ['paciente', 'cpf', 'medico', 'especialidade', 'data', 'horario', 'convenio', 'status']
        valid_agendamentos = []
        
        for ag in agendamentos:
            if all(field in ag and ag[field] for field in required_fields):
                valid_agendamentos.append(ag)
            else:
                logger.warning(f"Agendamento ignorado por falta de campos obrigatórios: {ag}")
        
        return {"status": "success", "data": valid_agendamentos}

    except requests.exceptions.ConnectionError:
        # Tratamento: indisponibilidade temporária da API[cite: 1]
        logger.error("Erro de conexão: Indisponibilidade temporária da API.")
        return {"status": "error", "message": "A API de agendamentos está temporariamente indisponível. Tente novamente em breve.", "data": []}
    except ValueError:
        logger.error("Erro de Parse: A resposta da API não é um JSON válido.")
        return {"status": "error", "message": "Erro de comunicação com o sistema de agendamentos.", "data": []}
    except Exception as e:
        logger.error(f"Erro inesperado: {str(e)}")
        return {"status": "error", "message": "Ocorreu um erro interno ao processar sua solicitação.", "data": []}