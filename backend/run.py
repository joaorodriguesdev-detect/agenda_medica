from app import create_app

app = create_app()

if __name__ == '__main__':
    # O host 0.0.0.0 é necessário para que a aplicação seja acessível de fora do container Docker
    app.run(host='0.0.0.0', port=5000, debug=True)