<div align="center">

<br>

```
╔══════════════════════════════════════════════════════════════╗
║                                                               ║
║    ███████  █████  ██    ██ ████████ ███████  ██████  ██   ██ ║
║    ██      ██   ██ ██    ██    ██    ██      ██    ██ ██   ██ ║
║    ███████ ███████ ██    ██    ██    █████   ██    ██ ███████ ║
║         ██ ██   ██ ██    ██    ██    ██      ██    ██ ██   ██ ║
║    ███████ ██   ██  ██████     ██    ███████  ██████  ██   ██ ║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝
```

<br>

# 🏥 **SauTech — Agenda Médica Inteligente**

[![Stack](https://img.shields.io/badge/Stack-Docker%20%7C%20Flask%20%7C%20Next.js%20%7C%20TypeScript-0FA0EE?style=for-the-badge)](https://github.com)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2016%20%7C%20React%2019%20%7C%20Tailwind%204-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Backend](https://img.shields.io/badge/Backend-Flask%203.0%20%7C%20SQLAlchemy%20%7C%20SQLite-16324F?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com)
[![Infra](https://img.shields.io/badge/Infra-Docker%20Compose%20%7C%20Multi--Service-2496ED?style=for-the-badge&logo=docker)](https://docker.com)

### ✨ *Tecnologia que simplifica a gestão da sua clínica.* ✨

<br>
</div>

---

## 📋 **Sumário**

- [🎯 Visão Geral](#-visão-geral)
- [🏗️ Arquitetura do Projeto](#️-arquitetura-do-projeto)
- [🛠️ Stack Tecnológica](#️-stack-tecnológica)
- [📁 Estrutura de Diretórios](#-estrutura-de-diretórios)
- [🐳 Docker — Orquestração Completa](#-docker--orquestração-completa)
- [⚙️ Backend — Flask (API REST)](#️-backend--flask-api-rest)
- [🎨 Frontend — Next.js + TypeScript](#-frontend--nextjs--typescript)
- [🖥️ Dashboard Interativo — O Coração do Sistema](#️-dashboard-interativo--o-coração-do-sistema)
- [📅 Calendário Visual vs. Tabela Tabulator](#-calendário-visual-vs-tabela-tabulator)
- [🧭 Navegação por Sidebar](#-navegação-por-sidebar)
- [🔐 Autenticação & Sessão](#-autenticação--sessão)
- [🧪 Testes Automatizados](#-testes-automatizados)
- [🌱 Seed de Dados](#-seed-de-dados)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [📸 Demonstração Visual](#-demonstração-visual)
- [💡 Tomada de Decisões Técnicas](#-tomada-de-decisões-técnicas)
- [🧰 Comandos Úteis](#-comandos-úteis)
- [📄 Licença](#-licença)

---

## 🎯 **Visão Geral**

O **SauTech** é uma aplicação web full-stack para **gestão de agendas médicas**, combinando uma experiência de usuário premium com arquitetura enterprise moderna.

### ✨ **O que fazemos**

- ✅ **Dashboard duplo** — alternância entre **Calendário Visual** (cards coloridos) e **Tabela Interativa Tabulator** (dados estruturados)
- ✅ **Sidebar inteligente** com menu de navegação, mini calendário e "Novo Agendamento"
- ✅ **Filtros em tempo real** por paciente, CPF e médico
- ✅ **Autenticação segura** com sessões gerenciadas por cookies (Flask-Login)
- ✅ **Tolerância a falhas** — tratamento robusto de erros de API em 3 camadas
- ✅ **Containerização completa** com Docker para deploy simplificado
- ✅ **Design system próprio** com paleta azul `#0FA0EE` + tons neutros

> 🔑 **Login de demonstração:** `admin@timesaver.com` | Senha: `123456`

---

## 🏗️ **Arquitetura do Projeto**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        🌐 ARQUITETURA GERAL                              │
│                                                                          │
│    ┌─────────────────────────────────────────────────────────────┐      │
│    │                    DOCKER COMPOSE                             │      │
│    │  ┌────────────────────────┐      ┌────────────────────────┐  │      │
│    │  │                        │      │                        │  │      │
│    │  │   🐍 Flask Backend     │◄────►│   ⚛️  Next.js Frontend │  │      │
│    │  │   Container:           │      │   Container:           │  │      │
│    │  │   timesaver_backend    │      │   timesaver_frontend   │  │      │
│    │  │                        │      │                        │  │      │
│    │  │   Porta :5000 (API)    │      │   Porta :3000 (SSR)    │  │      │
│    │  │                        │      │                        │  │      │
│    │  └──────────┬─────────────┘      └───────────┬────────────┘  │      │
│    │             │                                │                │      │
│    │             ▼                                ▼                │      │
│    │    ┌───────────────┐              ┌────────────────────┐      │      │
│    │    │   SQLite DB    │              │  Navegador (UX)    │      │      │
│    │    │  (agenda.db)   │              │  ┌──────────────┐  │      │      │
│    │    └───────────────┘              │  │ 🗺️ Sidebar   │  │      │      │
│    │                                  │  │ 📅 Calendário │  │      │      │
│    │                                  │  │ 📊 Tabulator  │  │      │      │
│    │                                  │  └──────────────┘  │      │      │
│    └────────────────────────────────────────────────────────┘      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 🔄 **Fluxo de Dados**

```
┌──────────┐     HTTP/JSON      ┌──────────┐     SQLAlchemy     ┌──────────┐
│          │   ◄────────────►   │          │   ◄────────────►   │          │
│   Next   │   credentials:     │  Flask   │                    │  SQLite   │
│   (UI)   │     "include"      │  (API)   │                    │   (DB)    │
│          │                    │          │                    │          │
└──────────┘                    └────┬─────┘                    └──────────┘
                                     │
                                     │ requests.get(timeout=5)
                                     ▼
                            ┌────────────────┐
                            │   Mock API     │
                            │ (endpoint      │
                            │  interno)      │
                            └────────────────┘
```

---

## 🛠️ **Stack Tecnológica**

### 🐳 **Infraestrutura & Deploy**

```
📦 Docker
├── 🐳 Docker Compose (Orquestração multi-container)
│   ├── 🏗️ Dockerfile (Backend — Python 3.11-slim)
│   └── 🏗️ Dockerfile (Frontend — Node 20-alpine)
```

### ⚙️ **Backend**

```
🐍 Python 3.11
├── 🌶️ Flask 3.0.3 (Micro-framework web)
├── 🗄️ Flask-SQLAlchemy 3.1.1 (ORM)
├── 🔐 Flask-Login 0.6.3 (Gerenciamento de sessão)
├── 🔗 Flask-Cors 4.0.0 (Cross-Origin Resource Sharing)
├── 🔑 Werkzeug 3.0.3 (Password hashing com pbkdf2:sha256)
├── 🌐 Requests 2.32.3 (HTTP client para API externa)
└── 🧪 Pytest 8.2.2 (Testes automatizados)
```

### 🎨 **Frontend**

```
⚛️ Next.js 16.2.11 (React framework — App Router)
├── 🟦 TypeScript 5.x (Tipagem estática — strict mode)
├── 🎭 React 19.2.4 (UI library)
├── 🎨 Tailwind CSS 4 (Utility-first CSS — engine @tailwindcss/postcss)
├── 📊 React-Tabulator 0.21.0 (Tabela interativa profissional)
├── 🔤 Geist Font (Tipografia padrão — otimizada via next/font)
├── 🔤 Space Grotesk (Display — títulos e branding)
├── 🔤 Inter (Body — texto corrido e labels)
└── 🔤 IBM Plex Mono (Dados tabulares — CPF, datas, horários)
```

### 🎨 **Design System — Paleta de Cores**

```
🎯 Paleta SauTech
──────────────────────────────────────────────
🔵 #0FA0EE  — Azul primário (ações, sidebar, destaque)
🔵 #16324F  — Azul petróleo (login panel, headers de tabela)
🟡 #C9992F  — Dourado (marca, glow, eixos do relógio)
⚪ #F6F7F9  — Background principal
⚪ #FFFFFF  — Cards, sidebar, tabela
⚫ #1C2530  — Texto principal
🔘 #5B6472  — Texto secundário
🔘 #8A93A0  — Placeholder, ícones inativos
──────────────────────────────────────────────

🟢 #2E9E6D  — Confirmado
🟡 #C9992F  — Pendente
🔴 #C0463C  — Cancelado
🔵 #3B6EA5  — Concluído
```

---

## 📁 **Estrutura de Diretórios**

```
📦 sautech/
├── 🐳 docker-compose.yml           # Orquestração dos containers
│
├── 🐍 backend/                      # API Flask
│   ├── 🏗️ Dockerfile               # Imagem Docker do backend
│   ├── 📄 requirements.txt          # Dependências Python
│   ├── ▶️ run.py                    # Ponto de entrada da aplicação
│   ├── 🗄️ agenda.db                # Banco SQLite (gerado)
│   │
│   ├── 📁 app/                      # Pacote principal
│   │   ├── __init__.py             # Factory pattern (create_app)
│   │   ├── config.py               # Configurações (SECRET_KEY, DB, API)
│   │   ├── models.py               # Modelo User (ORM)
│   │   ├── routes.py               # Blueprint de rotas (login, agenda)
│   │   └── services.py             # Lógica de negócio (fetch_agendamentos)
│   │
│   ├── 📁 scripts/                  # Utilitários
│   │   └── seed.py                 # Popula banco com dados iniciais
│   │
│   ├── 📁 tests/                    # Suíte de testes
│   │   ├── test_auth.py            # Testes de autenticação
│   │   └── test_agenda.py          # Testes de consumo de API
│   │
│   └── 📄 .env                      # Variáveis de ambiente
│
└── ⚛️ frontend/                     # Next.js Application
    ├── 🏗️ Dockerfile               # Imagem Docker do frontend
    ├── 📄 package.json              # Dependências npm
    ├── 📄 next.config.ts            # Configuração Next.js
    ├── 📄 tsconfig.json             # Configuração TypeScript (strict)
    ├── 📄 postcss.config.mjs        # PostCSS + Tailwind v4
    ├── 📄 eslint.config.mjs         # ESLint + Next.js core-web-vitals
    │
    ├── 📁 app/                      # App Router (Next.js 16)
    │   ├── globals.css             # Estilos globais + Tailwind
    │   ├── layout.tsx              # Root layout (fonts, metadata)
    │   ├── page.tsx                # 🆕 Dashboard (sidebar + calendário + tabela)
    │   │
    │   └── 📁 login/               # Rota /login
    │       └── page.tsx            # Tela de login rebranded
    │
    └── 📁 public/                   # Assets estáticos
```

---

## 🐳 **Docker — Orquestração Completa**

### 📄 `docker-compose.yml`

```yaml
services:
  backend:
    build: ./backend
    container_name: timesaver_backend
    ports: ["5000:5000"]
    env_file: ./backend/.env
    volumes:
      - ./backend:/app          # Hot-reload em desenvolvimento
    restart: unless-stopped     # Auto-healing

  frontend:
    build: ./frontend
    container_name: timesaver_frontend
    ports: ["3000:3000"]
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000
    depends_on:
      - backend
```

### 🏗️ **Dockerfile — Backend (Python 3.11-slim)**

```dockerfile
FROM python:3.11-slim
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1     # Sem .pyc
ENV PYTHONUNBUFFERED=1            # Logs em tempo real

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 5000
CMD ["python", "run.py"]
```

### 🏗️ **Dockerfile — Frontend (Node 20-alpine)**

```dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

---

## ⚙️ **Backend — Flask (API REST)**

> *(Backend permanece inalterado — mesmo código robusto de antes!)*

### 🧠 **Application Factory Pattern**

```python
# app/__init__.py
db = SQLAlchemy()
login_manager = LoginManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
    db.init_app(app)
    login_manager.init_app(app)
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    return app
```

### 🗄️ **Modelo User — Segurança por Design**

```python
# app/models.py
class User(UserMixin, db.Model):
    __tablename__ = 'users'
    
    id            = db.Column(db.Integer, primary_key=True)
    username      = db.Column(db.String(64), unique=True, nullable=False)
    email         = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)  # pbkdf2:sha256

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
```

### 🛣️ **Rotas da API**

| Método | Rota                    | Descrição                            | Auth |
|--------|------------------------|--------------------------------------|:----:|
| POST   | `/api/login`           | Autenticação (e-mail OU username)    |  ❌  |
| POST   | `/api/logout`          | Encerramento de sessão               |  ✅  |
| GET    | `/api/agendamentos`    | Lista de agendamentos com fallback   |  ❌* |
| GET    | `/api/mock/agendamentos` | Mock interno para testes           |  ❌  |

### 🛡️ **Services — Tolerância a Falhas em 3 Camadas**

```python
# app/services.py
def fetch_agendamentos():
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        # 🛡️ Camada 1: Resposta vazia ou formato inválido
        if not data or 'agendamentos' not in data:
            return {"status": "error", "message": "...", "data": []}
        
        # 🛡️ Camada 2: Validação de campos obrigatórios
        valid = [ag for ag in data['agendamentos'] 
                if all(f in ag and ag[f] for f in required_fields)]
        
        return {"status": "success", "data": valid}
        
    except ConnectionError:
        # 🛡️ Camada 3: API indisponível
        return {"status": "error", "message": "API temporariamente indisponível"}
    except ValueError:
        return {"status": "error", "message": "Erro de parse JSON"}
```

---

## 🎨 **Frontend — Next.js + TypeScript**

### 🚀 **Next.js 16 App Router**

```typescript
// frontend/app/layout.tsx

export const metadata: Metadata = {
  title: "Sautech Agendamento",
  description: "Joao Detect",
};

// Fontes otimizadas com next/font (Google Fonts → arquivos estáticos)
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
```

### 📐 **Sistema Tipográfico**

```typescript
// page.tsx — Hierarquia de 3 níveis
const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });
const body    = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono    = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"] });

// Uso:
// 🏷️ Títulos → Space Grotesk (personalidade)
// 📝 Textos → Inter (legibilidade)
// 🔢 Dados  → IBM Plex Mono (alinhamento tabular)
```

---

## 🖥️ **Dashboard Interativo — O Coração do Sistema**

O dashboard foi totalmente refatorado para uma experiência **tipo SaaS profissional**, com layout de aplicação desktop.

### 🧭 **Layout Geral**

```
┌──────┬────────────┬──────────────────────────────────────────────────┐
│      │            │  ┌──────────────────────────────────────────┐   │
│  🔵  │   BUSCAR   │  │  [📅 Calendário]  [📊 Lista Tabulator]   │   │
│  70px │  + NOVO    │  └──────────────────────────────────────────┘   │
│      │  AGENDA.   │  ┌──────────────────────────────────────────┐   │
│  🗺️  │            │  │                                          │   │
│  Íco- │  📅 Mini  │  │     ÁREA PRINCIPAL (flex-1)              │   │
│  nes  │  Calend.  │  │                                          │   │
│      │            │  │   Alterna entre:                          │   │
│      │  Set/2026  │  │   • 📅 Calendário Visual (cards)          │   │
│      │            │  │   • 📊 Tabela Tabulator (dados)           │   │
│      │            │  │                                          │   │
│      │  🏥       │  │                                          │   │
│      │  SauTech  │  │                                          │   │
├──────┴────────────┴──────────────────────────────────────────────────┤
│                                                                      │
│  🔵 Sidebar Primário (70px) │ ⚪ Sidebar Secundário (280px) │ 📋 Main│
└──────────────────────────────────────────────────────────────────────┘
```

### 🗺️ **Sidebar Primária (70px) — Navegação Principal**

```
┌────────────┐
│   ≡ Menu   │  ← Abre/fecha navegação
│            │
│  📅 Cal.   │  ← Agenda
│  ❤️        │  ← Favoritos
│  📊        │  ← Relatórios
│  ⚙️        │  ← Configurações
│            │
│     TS     │  ← Avatar do usuário
└────────────┘

Cor: #0FA0EE (azul SauTech)
```

### ⚪ **Sidebar Secundária (280px) — Ações Contextuais**

```
┌────────────────────────────────┐
│  ┌──────────────────────────┐  │
│  │  ＋ Novo Agendamento    │  │  ← CTA principal
│  └──────────────────────────┘  │
│                                │
│  🔍 Buscar consultas...       │  ← Filtro global
│                                │
│  📅 SETEMBRO      2026        │
│  D  S  T  Q  Q  S  S          │
│        1  2  3  4  5          │  ← Mini calendário
│  6  7  8  🔵10 11 12          │
│  13 14 15 16 17 18 19         │
│                                │
│  🏥 SauTech                   │  ← Branding
│  AGENDAMENTOS                 │
└────────────────────────────────┘
```

### 💡 **Sistema de Ícones SVG — Zero Dependências**

```typescript
// Todos os ícones são SVGs inline — sem bibliotecas externas!
const Icons = {
  Menu: () => <svg>...</svg>,
  Calendar: () => <svg>...</svg>,
  Heart: () => <svg>...</svg>,
  Chart: () => <svg>...</svg>,
  Settings: () => <svg>...</svg>,
  Search: () => <svg>...</svg>,
  Plus: () => <svg>...</svg>,
};

// ✅ Bundle menor (sem react-icons, heroicons, etc)
// ✅ Controle total sobre tamanho, cor, stroke
// ✅ Performance — sem runtime overhead
```

---

## 📅 **Calendário Visual vs. Tabela Tabulator**

O grande diferencial do SauTech é o **toggle entre duas visões**:

```
┌──────────────────────────────────────────────────────────────────────┐
│  [📅 Visualização de Calendário]  [📊 Lista Tabulator (Oficial)]    │
│                                    ▲                                 │
│                    Botão toggle no header (bg-[#F1F2F4])            │
└──────────────────────────────────────────────────────────────────────┘
```

### 📅 **Visão Calendário**

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│     28       │     29       │     30       │     31       │
│              │              │              │              │
│  ┌────────┐  │  ┌────────┐  │              │              │
│  │10:00   │  │  │08:00   │  │              │              │
│  │Carlos  │  │  │Ana     │  │  ┌────────┐  │              │
│  │Andrade │  │  │Souza   │  │  │15:00   │  │              │
│  │Ortopedia│  │  │Dermato │  │  │Roberto │  │              │
│  └────────┘  │  └────────┘  │  │Alves   │  │              │
│              │              │  │Clínico │  │              │
│  ┌────────┐  │  ┌────────┐  │  └────────┘  │              │
│  │14:30   │  │  │11:00   │  │              │              │
│  │Mariana │  │  │Felipe  │  │              │              │
│  │Costa   │  │  │Mendes  │  │              │              │
│  │Cardio  │  │  │Cancel. │  │              │              │
│  └────────┘  │  └────────┘  │              │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

**Cards coloridos por tipo:**
- 🔵 `#359CFB` — Consultas normais
- 🟡 `#FCB80F` — Consultas pendentes
- 🔴 `#FF7E78` — Cancelados (com badge "Cancelado")
- 🟣 `#7C8CD6` — Outras especialidades

### 📊 **Visão Tabela (Tabulator)**

```
┌───────┬────────┬─────────────┬──────────────┬──────────┬─────────┐
│  DATA │ HORÁRI │  PACIENTE   │     CPF      │  MÉDICO  │ STATUS  │
├───────┼────────┼─────────────┼──────────────┼──────────┼─────────┤
│ 07-24 │ 10:00  │ Carlos A.   │111.111.111-11│ Dr. Rob. │ 🟢 Conf. │
│ 07-24 │ 14:30  │ Mariana C.  │222.222.222-22│ Dra. Sil │ 🟡 Pend. │
│ 07-25 │ 09:00  │ Felipe M.   │333.333.333-33│ Dr. Rob. │ 🔴 Canc. │
└───────┴────────┴─────────────┴──────────────┴──────────┴─────────┘

🔍 Filtros: [Paciente] [CPF] [Médico]
```

**Sistema de Status com Cores Semânticas:**

```typescript
const STATUS_STYLES = {
  confirmado: { bg: "#EAF6EF", fg: "#1E7A50", dot: "#2E9E6D" },
  pendente:   { bg: "#FBF2E3", fg: "#8A6412", dot: "#C9992F" },
  cancelado:  { bg: "#FBECEA", fg: "#A23B2F", dot: "#C0463C" },
  concluido:  { bg: "#EAF0F8", fg: "#234875", dot: "#3B6EA5" },
};
```

---

## 🔐 **Autenticação & Sessão**

### Tela de Login — Rebranded para SauTech

```
┌──────────────────────────────────────────────────────┐
│  ┌─────────────────────┐  ┌────────────────────────┐  │
│  │   ⏱️ Sautech        │  │  BEM-VINDO DE VOLTA    │  │
│  │                     │  │                        │  │
│  │   "Cada minuto da   │  │  👤 Usuário ou e-mail  │  │
│  │    sua agenda, no   │  │  🔒 Senha              │  │
│  │    lugar certo."    │  │  👁️ Mostrar/ocultar    │  │
│  │                     │  │                        │  │
│  │   Fundo azul com    │  │  [      Entrar      ] │  │
│  │   grid pattern      │  │                        │  │
│  │   + clock animado   │  │  © SauTech             │  │
│  └─────────────────────┘  └────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

**Características de UX:**

- 🎬 **Animação CSS** nos ponteiros do relógio (marca registrada)
- ✨ **Glow pulsante** no painel de marca
- 👁️ **Toggle de visibilidade** da senha
- ⏳ **Spinner de carregamento** no botão durante login
- 🚨 **Mensagens de erro** estilizadas com ícone e borda
- ♿ **`prefers-reduced-motion`** — acessibilidade como prioridade

### Fluxo de Autenticação

```
Navegador                  Next.js                  Flask
   │                          │                       │
   │   [Usuário digita]       │                       │
   ├──► POST /api/login ─────►│──── JSON ────────────►│
   │   credentials:include    │                       │
   │                          │                       │  Verifica
   │                          │                       │  credenciais
   │                          │                       │
   │◄─── Set-Cookie ──────────│◄─── 200 OK ──────────┤
   │                          │                       │
   │   [Redireciona /]        │                       │
   ├──► GET / ───────────────►│                       │
   │                          │                       │
   │                          ├──► GET /api/agendamentos ──────────►│
   │                          │    credentials:include │              │
   │                          │◄─── JSON agendamentos ◄──────────────┤
   │                          │                       │
   │◄─── Dashboard renderizado┤                       │
   │    (sidebar + calendário)│                       │
```

---

## 🧪 **Testes Automatizados**

### 📋 Suíte de Testes

```
📁 tests/
├── test_auth.py
│   ├── test_login_valido()     → ✅ 200 + b'Sair' no response
│   └── test_login_invalido()   → ✅ Mensagem de erro
│
└── test_agenda.py
    └── test_falha_api_agendamentos()
        → ✅ status == 'error'
        → ✅ data == []
        → ✅ 'temporariamente indisponível' na mensagem
```

### 🔧 **Banco em Memória**

```python
@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # 🚀 Relâmpago!
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            user = User(username='admin_teste', email='teste@admin.com')
            user.set_password('senha123')
            db.session.add(user)
            db.session.commit()
        yield client
        # Cleanup automático
        with app.app_context():
            db.session.remove()
            db.drop_all()
```

---

## 🌱 **Seed de Dados**

```bash
$ docker exec -it timesaver_backend python scripts/seed.py

# ✅ Tabelas criadas no SQLite
# ✅ Usuário admin: admin@timesaver.com / 123456
# ✅ API Mock com 4 agendamentos (incluindo 1 inválido para testar filtro)
```

### 📦 **Dados Mockados**

```json
{
  "agendamentos": [
    {"paciente": "Carlos Andrade",  "cpf": "111.111.111-11", "medico": "Dr. Roberto",   "especialidade": "Ortopedia",    "data": "2026-07-24", "horario": "10:00", "convenio": "Unimed",  "status": "Confirmado"},
    {"paciente": "Mariana Costa",  "cpf": "222.222.222-22", "medico": "Dra. Silvia",   "especialidade": "Cardiologia",  "data": "2026-07-24", "horario": "14:30", "convenio": "Bradesco", "status": "Pendente"},
    {"paciente": "Felipe Mendes",  "cpf": "333.333.333-33", "medico": "Dr. Roberto",   "especialidade": "Ortopedia",    "data": "2026-07-25", "horario": "09:00", "convenio": "Particular", "status": "Cancelado"},
    {"paciente": "Registro Incompleto", "cpf": "000.000.000-00", "medico": "Dr. Fantasma"}  // ← Inválido (filtrado!)
  ]
}
```

---

## 🚀 **Como Executar o Projeto**

### 📋 **Pré-requisitos**

| Ferramenta       | Versão | Verificação          |
|------------------|:------:|----------------------|
| 🐳 Docker       | 24+    | `docker --version`   |
| 🐳 Compose      | 2.0+   | `docker compose version` |

### 🚀 **Passo a Passo**

```bash
# 1️⃣ Clone
git clone https://github.com/seu-usuario/sautech.git
cd sautech

# 2️⃣ Construa e inicie
docker compose up -d --build

# 3️⃣ Popule o banco
docker exec -it timesaver_backend python scripts/seed.py

# 4️⃣ Acesse
open http://localhost:3000

# 5️⃣ Login
#    📧 admin@timesaver.com
#    🔑 123456
```

### 🛑 **Gerenciamento**

```bash
# Logs em tempo real
docker compose logs -f

# Parar
docker compose down

# Reset total
docker compose down -v
docker compose up -d
docker exec -it timesaver_backend python scripts/seed.py

# Testes
docker exec -it timesaver_backend python -m pytest tests/ -v
```

---

## 📸 **Demonstração Visual**

### 🚪 **Tela de Login**

```
┌──────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────┐  ┌──────────────────────────────────┐  │
│  │   ⏱️ Sautech            │  │  BEM-VINDO DE VOLTA              │  │
│  │                          │  │  ─────────────────────────────   │  │
│  │   ┌──────────────────┐   │  │  Entrar na sua conta             │  │
│  │   │ ✨ Glow animado  │   │  │                                  │  │
│  │   │    ┌─┐          │   │  │  ┌────────────────────────────┐ │  │
│  │   │    │⏱│          │   │  │  │ 👤 Usuário ou e-mail       │ │  │
│  │   │    └─┘          │   │  │  └────────────────────────────┘ │  │
│  │   │  Fundo azul     │   │  │  ┌────────────────────────────┐ │  │
│  │   └──────────────────┘   │  │  │ 🔒 Senha            👁️    │ │  │
│  │                          │  │  └────────────────────────────┘ │  │
│  │   "Cada minuto da       │  │                                  │  │
│  │    sua agenda, no       │  │  ┌────────────────────────────┐ │  │
│  │    lugar certo."        │  │  │      ⏳ Entrando...        │ │  │
│  │                          │  │  └────────────────────────────┘ │  │
│  └──────────────────────────┘  └──────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

### 📋 **Dashboard — Visão Calendário**

```
┌────┬──────────┬──────────────────────────────────────────────────────┐
│ 🗺️ │  ＋ NOVO │  [📅 Calendário]  [📊 Tabela]          [Sair]     │
│    │  🔍 Bus  ├──────────────────────────────────────────────────────┤
│  ≡  │  ────── │  ┌──────┬──────┬──────┬──────┐                      │
│  📅 │  Set    │  │  28  │  29  │  30  │  31  │                      │
│  ❤️ │   2026  │  ├──────┼──────┼──────┼──────┤                      │
│  📊 │         │  │🔵10: │🟡08: │      │      │                      │
│  ⚙️ │  🏥    │  │Carlos│Ana   │🟣15: │      │                      │
│     │  SauTec │  │      │      │Rober │      │                      │
│  TS │         │  │🔵14: │🔴11: │      │      │                      │
│     │         │  │Maria │Felipe│      │      │                      │
└────┴──────────┴──────────────────────────────────────────────────────┘
```

### 📋 **Dashboard — Visão Tabela**

```
┌────┬──────────┬──────────────────────────────────────────────────────┐
│ 🗺️ │  ＋ NOVO │  [📅]  [📊 Tabela]                       [Sair]     │
│    │  🔍 Bus  ├──────────────────────────────────────────────────────┤
│  ≡  │  ────── │  🔍 Paciente  │  🔍 CPF  │  🔍 Médico              │
│  📅 │  Set    ├──────────────────────────────────────────────────────┤
│  ❤️ │   2026  │  ┌──────┬──────┬────────┬────────┬──────┬─────────┐ │
│  📊 │         │  │ DATA │ HOR  │ PACIENT│ CPF    │MÉDICO│ STATUS  │ │
│  ⚙️ │  🏥    │  ├──────┼──────┼────────┼────────┼──────┼─────────┤ │
│     │  SauTec │  │07-24 │10:00 │Carlos  │111.111 │Dr.R. │ 🟢 Conf │ │
│  TS │         │  │07-25 │09:00 │Felipe  │333.333 │Dr.R. │ 🔴 Canc │ │
└────┴──────────┴──────────────────────────────────────────────────────┘
```

---

## 💡 **Tomada de Decisões Técnicas**

### 🆕 **Evolução do Layout — Time Saver → SauTech**

```
Antes (Time Saver)                Depois (SauTech)
══════════════════                ═════════════════

┌──────────────────┐             ┌────┬──────────┬──────────────┐
│ ⏱️ Time Saver   │             │ 🗺️ │  ＋ NOVO │ [📅][📊]    │
│     [Sair]      │             │  ≡  │  🔍 Bus │              │
├──────────────────┤             │  📅 │  📅 Sep │  CALENDÁRIO  │
│                  │             │  ❤️ │   2026  │  VISUAL      │
│   DADOS DA      │             │  📊 │         │  ou TABELA   │
│   TABELA        │             │  ⚙️ │  🏥     │              │
│                  │             │     │  SauTec │              │
└──────────────────┘             └────┴──────────┴──────────────┘

❌ Layout simples                ✅ Layout SaaS profissional
❌ Apenas tabela                 ✅ Calendário + Tabela toggle
❌ Sem sidebar                   ✅ Sidebar dupla com navegação
❌ Header simples                ✅ Header com abas de visão
```

### 🎯 Por que **Sidebar Dupla**?

```
┌─────────────┬──────────────┬────────────────────────────────┐
│  Primária   │  Secundária  │  Área Principal               │
│  (70px)     │  (280px)     │                               │
├─────────────┼──────────────┼────────────────────────────────┤
│ Navegação   │ Ações        │ Conteúdo                      │
│ global      │ contextuais  │ dinâmico                      │
│             │              │                               │
│ Ícones      │ Busca        │ • Calendário                  │
│ sempre      │ Mini calend. │ • Tabela Tabulator            │
│ visíveis    │ Novo agend.  │ • (futuro: detalhes)          │
└─────────────┴──────────────┴────────────────────────────────┘

✅ Separação clara entre navegação e conteúdo
✅ Mais espaço para a área principal
✅ Padrão adotado por: Linear, Height, Notion
```

### 🎯 Por que **Docker Compose**?

| Abordagem     | Vantagens                                     |
|---------------|-----------------------------------------------|
| 🐳 Docker     | ✅ Ambiente idêntico em qualquer máquina      |
|               | ✅ Zero configuração manual                   |
|               | ✅ Ready-to-deploy em qualquer cloud          |
| ❌ Local      | ⚠️ "Na minha máquina funciona"               |

### 🎯 Por que **Flask**?

| Critério         | Flask ✅    | FastAPI    | Django     |
|------------------|:-----------:|:----------:|:----------:|
| ⚡ Curva aprend.  | ★★★★★      | ★★★★☆     | ★★★☆☆     |
| 🎯 Escopo        | Microframew.| API-first  | Full-stack |
| ⏱️ Time-to-market| ✅ Rápido   | ⚠️ Médio  | ⚠️ Lento  |

### 🎯 Por que **Tabela + Calendário**?

```
📅 CALENDÁRIO                     📊 TABULATOR
═══════════════                   ═══════════════
✅ Visual intuitivo               ✅ Dados estruturados
✅ Cards coloridos                ✅ Filtros por campo
✅ Visão temporal                 ✅ Ordenação por coluna
✅ Melhor para poucos registros   ✅ Melhor para muitos registros
✅ Identificação rápida           ✅ Exportação facilitada

💡 O toggle permite ao usuário escolher a melhor ferramenta
    para cada tarefa — visão ampla vs. visão analítica!
```

### 🎯 Por que **SQLite**?

```
SQLite (MVP)           →    PostgreSQL (Produção)
═══════════════              ═══════════════════
✅ Zero config               ✅ Concorrência alta
✅ Arquivo único             ✅ 10+ usuários simultâneos
✅ Perfeito para MVP         ✅ Ready para escala

🔄 Migração: apenas trocar DATABASE_URL no .env!
```

---

## 🧰 **Comandos Úteis**

```bash
# ─────────────────────────────────────────────────────────────────────
# 🐳 DOCKER
# ─────────────────────────────────────────────────────────────────────

docker compose up -d --build     # Build + Start
docker compose up -d             # Start sem rebuild
docker compose down              # Parar tudo
docker compose logs -f           # Logs em tempo real
docker compose ps                # Status dos containers

# ─────────────────────────────────────────────────────────────────────
# 🔧 BACKEND
# ─────────────────────────────────────────────────────────────────────

docker exec -it timesaver_backend sh
  python scripts/seed.py              # Seed do banco
  python -m pytest tests/ -v          # Rodar testes
  python -m pytest tests/ -v --cov=app  # Testes com coverage

# ─────────────────────────────────────────────────────────────────────
# ⚛️  FRONTEND
# ─────────────────────────────────────────────────────────────────────

docker exec -it timesaver_frontend sh
  npm install <pacote>                # Nova dependência
  npm run lint                        # Lint

# ─────────────────────────────────────────────────────────────────────
# 💾 BANCO DE DADOS
# ─────────────────────────────────────────────────────────────────────

docker exec -it timesaver_backend sqlite3 /app/agenda.db
  .tables
  SELECT * FROM users;
  .exit

docker compose down -v                # Reset completo
```

---

## 📄 **Licença**

```
MIT License

Copyright (c) 2026 SauTech
```

---

<div align="center">

<br>

```
╔══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🏥  Obrigado por conferir o SauTech!                       ║
║                                                               ║
║   🚀  Desenvolvido com ☕, Docker, Python & TypeScript         ║
║                                                               ║
║   📋  "Tecnologia que simplifica a gestão da sua clínica."    ║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝
```

<br>

[![Feito com Docker](https://img.shields.io/badge/Feito_com-Docker-2496ED?style=flat-square&logo=docker)](https://docker.com)
[![Feito com Flask](https://img.shields.io/badge/Feito_com-Flask-000000?style=flat-square&logo=flask)](https://flask.palletsprojects.com)
[![Feito com Next.js](https://img.shields.io/badge/Feito_com-Next.js-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![Feito com TypeScript](https://img.shields.io/badge/Feito_com-TypeScript-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)

<br>

**⭐ Se este projeto te ajudou, dá uma estrela no GitHub!**

<br>
</div><div align="center">

<br>

https://github.com/joaorodriguesdev-detect/agenda_medica.git

<br>

```
╔══════════════════════════════════════════════════════╗
║                                                       ║
║   ████████  ██ ███    ███ ███████      ███████  █████╗ ██    ██ ███████ ██████      ║
║      ██    ██ ████  ████ ██          ██      ██   ██ ██    ██ ██      ██   ██     ║
║      ██    ██ ██ ████ ██ █████       ███████ ███████ ██    ██ █████   ██████      ║
║      ██    ██ ██  ██  ██ ██               ██ ██   ██  ██  ██  ██      ██   ██     ║
║      ██    ██ ██      ██ ███████     ███████ ██   ██   ████   ███████ ██   ██     ║
║                                                       ║
╚══════════════════════════════════════════════════════╝

<br>

# ⏱️ **SauTech — Agenda Médica Inteligente**

[![Stack](https://img.shields.io/badge/Stack-Docker%20%7C%20Flask%20%7C%20Next.js%20%7C%20TypeScript-16324F?style=for-the-badge&logo=Color=white)](https://github.com)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2016%20%7C%20React%2019%20%7C%20Tailwind%204-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Backend](https://img.shields.io/badge/Backend-Flask%203.0%20%7C%20SQLAlchemy%20%7C%20SQLite-16324F?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com)
[![Infra](https://img.shields.io/badge/Infra-Docker%20Compose%20%7C%20Multi--Service-2496ED?style=for-the-badge&logo=docker)](https://docker.com)

### ✨ *Cada minuto da sua agenda, no lugar certo.* ✨

<br>
</div>

---

## 📋 **Sumário**

- [🎯 Visão Geral](#-visão-geral)
- [🏗️ Arquitetura do Projeto](#️-arquitetura-do-projeto)
- [🛠️ Stack Tecnológica](#️-stack-tecnológica)
- [📁 Estrutura de Diretórios](#-estrutura-de-diretórios)
- [🐳 Docker — Orquestração Completa](#-docker--orquestração-completa)
- [⚙️ Backend — Flask (API REST)](#️-backend--flask-api-rest)
- [🎨 Frontend — Next.js + TypeScript](#-frontend--nextjs--typescript)
- [🔐 Autenticação & Sessão](#-autenticação--sessão)
- [📊 Tabela Interativa com Tabulator](#-tabela-interativa-com-tabulator)
- [🧪 Testes Automatizados](#-testes-automatizados)
- [🌱 Seed de Dados](#-seed-de-dados)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [📸 Demonstração Visual](#-demonstração-visual)
- [💡 Tomada de Decisões Técnicas](#-tomada-de-decisões-técnicas)
- [🧰 Comandos Úteis](#-comandos-úteis)
- [📄 Licença](#-licença)

---

## 🎯 **Visão Geral**

O **SauTech Agendamentos** é uma aplicação web full-stack para **gestão de agendas médicas**, desenvolvida com foco em:

- ✅ **Visualização centralizada** de agendamentos de pacientes
- ✅ **Interface moderna e responsiva** com experiência de usuário premium
- ✅ **Filtros em tempo real** por paciente, CPF e médico
- ✅ **Autenticação segura** com sessões gerenciadas por cookies
- ✅ **Tolerância a falhas** — tratamento robusto de erros de API
- ✅ **Containerização completa** com Docker para deploy simplificado

> 🔑 **Login de demonstração:** `admin@timesaver.com` | Senha: `123456`

---

## 🏗️ **Arquitetura do Projeto**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                        🌐 ARQUITETURA GERAL                              │
│                                                                          │
│    ┌─────────────────────────────────────────────────────────────┐      │
│    │                    DOCKER COMPOSE                             │      │
│    │  ┌──────────────────────┐      ┌──────────────────────────┐  │      │
│    │  │                      │      │                          │  │      │
│    │  │   🐍 Flask Backend   │◄────►│   ⚛️  Next.js Frontend   │  │      │
│    │  │   Container:         │      │   Container:             │  │      │
│    │  │   timesaver_backend  │      │   timesaver_frontend     │  │      │
│    │  │                      │      │                          │  │      │
│    │  │   Porta: 5000        │      │   Porta: 3000            │  │      │
│    │  │                      │      │                          │  │      │
│    │  └──────────┬───────────┘      └──────────┬───────────────┘  │      │
│    │             │                             │                   │      │
│    │             ▼                             ▼                   │      │
│    │    ┌───────────────┐            ┌──────────────────┐         │      │
│    │    │   SQLite DB    │            │  Navegador (UX)  │         │      │
│    │    │  (agenda.db)   │            │  Tabulator Table │         │      │
│    │    └───────────────┘            └──────────────────┘         │      │
│    └─────────────────────────────────────────────────────────────┘      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 🔄 **Fluxo de Dados**

```
┌──────────┐     HTTP/JSON      ┌──────────┐     SQLAlchemy     ┌──────────┐
│          │   ◄────────────►   │          │   ◄────────────►   │          │
│   Next   │   credentials:     │  Flask   │                    │  SQLite   │
│   (UI)   │     "include"      │  (API)   │                    │   (DB)    │
│          │                    │          │                    │          │
└──────────┘                    └────┬─────┘                    └──────────┘
                                     │
                                     │ requests.get(timeout=5)
                                     ▼
                            ┌────────────────┐
                            │   Mock API     │
                            │ (endpoint      │
                            │  interno)      │
                            └────────────────┘
```

---

## 🛠️ **Stack Tecnológica**

### 🐳 **Infraestrutura & Deploy**

```
📦 Docker
├── 🐳 Docker Compose (Orquestração multi-container)
│   ├── 🏗️ Dockerfile (Backend — Python 3.11-slim)
│   └── 🏗️ Dockerfile (Frontend — Node 20-alpine)
```

### ⚙️ **Backend**

```
🐍 Python 3.11
├── 🌶️ Flask 3.0.3 (Micro-framework web)
├── 🗄️ Flask-SQLAlchemy 3.1.1 (ORM)
├── 🔐 Flask-Login 0.6.3 (Gerenciamento de sessão)
├── 🔗 Flask-Cors 4.0.0 (Cross-Origin Resource Sharing)
├── 🔑 Werkzeug 3.0.3 (Password hashing)
├── 🌐 Requests 2.32.3 (HTTP client para API externa)
└── 🧪 Pytest 8.2.2 (Testes automatizados)
```

### 🎨 **Frontend**

```
⚛️ Next.js 16.2.11 (React framework)
├── 🟦 TypeScript 5.x (Tipagem estática)
├── 🎭 React 19.2.4 (UI library)
├── 🎨 Tailwind CSS 4 (Utility-first CSS)
├── 📊 React-Tabulator 0.21.0 (Tabela interativa)
├── 🔤 Geist Font (Tipografia moderna)
├── 🔤 Space Grotesk (Display font)
├── 🔤 Inter (Body font)
└── 🔤 IBM Plex Mono (Dados tabulares)
```

---

## 📁 **Estrutura de Diretórios**

```
📦 timesaver/
├── 🐳 docker-compose.yml           # Orquestração dos containers
│
├── 🐍 backend/                      # API Flask
│   ├── 🏗️ Dockerfile               # Imagem Docker do backend
│   ├── 📄 requirements.txt          # Dependências Python
│   ├── ▶️ run.py                    # Ponto de entrada da aplicação
│   ├── 🗄️ agenda.db                # Banco SQLite (gerado)
│   │
│   ├── 📁 app/                      # Pacote principal
│   │   ├── __init__.py             # Factory pattern (create_app)
│   │   ├── config.py               # Configurações (SECRET_KEY, DB, API)
│   │   ├── models.py               # Modelo User (ORM)
│   │   ├── routes.py               # Blueprint de rotas (login, agenda)
│   │   └── services.py             # Lógica de negócio (fetch_agendamentos)
│   │
│   ├── 📁 scripts/                  # Utilitários
│   │   └── seed.py                 # Popula banco com dados iniciais
│   │
│   ├── 📁 tests/                    # Suíte de testes
│   │   ├── test_auth.py            # Testes de autenticação
│   │   └── test_agenda.py          # Testes de consumo de API
│   │
│   └── 📄 .env                      # Variáveis de ambiente
│
└── ⚛️ frontend/                     # Next.js Application
    ├── 🏗️ Dockerfile               # Imagem Docker do frontend
    ├── 📄 package.json              # Dependências npm
    ├── 📄 next.config.ts            # Configuração Next.js
    ├── 📄 tsconfig.json             # Configuração TypeScript
    ├── 📄 postcss.config.mjs        # PostCSS + Tailwind
    ├── 📄 eslint.config.mjs         # ESLint + Next.js config
    │
    ├── 📁 app/                      # App Router (Next.js 16)
    │   ├── globals.css             # Estilos globais + Tailwind
    │   ├── layout.tsx              # Root layout (fonts, metadata)
    │   ├── page.tsx                # Página principal (agenda)
    │   │
    │   └── 📁 login/               # Rota /login
    │       └── page.tsx            # Tela de login
    │
    └── 📁 public/                   # Assets estáticos
        ├── file.svg
        ├── globe.svg
        ├── next.svg
        ├── vercel.svg
        └── window.svg
```

---

## 🐳 **Docker — Orquestração Completa**

### 📄 `docker-compose.yml` — O Maestro da Infraestrutura

```yaml
timesaver/docker-compose.yml

services:
  backend:
    build: ./backend
    container_name: timesaver_backend
    ports:
      - "5000:5000"
    env_file:
      - ./backend/.env
    volumes:
      - ./backend:/app          # Hot-reload em desenvolvimento
    restart: unless-stopped     # Auto-healing em falhas

  frontend:
    build: ./frontend
    container_name: timesaver_frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules       # Volume anônimo para node_modules
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000
    depends_on:
      - backend                 # Ordem de inicialização garantida
```

### 🏗️ **Dockerfile — Backend (Python 3.11-slim)**

```dockerfile
timesaver/backend/Dockerfile

FROM python:3.11-slim      # Imagem leve (~120MB)
WORKDIR /app

# Otimizações de performance para Python em container
ENV PYTHONDONTWRITEBYTECODE=1     # Não gera .pyc
ENV PYTHONUNBUFFERED=1            # Logs em tempo real

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt   # Cache otimizado

COPY . .
EXPOSE 5000
CMD ["python", "run.py"]
```

### 🏗️ **Dockerfile — Frontend (Node 20-alpine)**

```dockerfile
timesaver/frontend/Dockerfile

FROM node:20-alpine        # Imagem ultra-leve (~130MB)
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]   # Modo desenvolvimento com hot-reload
```

### 🌐 **Rede entre Containers**

```
┌──────────────────────────────────────────────┐
│         DOCKER NETWORK (bridge)              │
│                                              │
│   timesaver_backend ◄─────────────────────►  │
│   (Flask :5000)       HTTP REST + CORS       │
│                                              │
│   timesaver_frontend ◄─────────────────────► │
│   (Next.js :3000)       Navegador (:3000)    │
│                                              │
│   Volumes:                                    │
│   ├── ./backend:/app    (hot-reload)          │
│   ├── ./frontend:/app   (hot-reload)          │
│   └── /app/node_modules (container-only)     │
└──────────────────────────────────────────────┘
```

---

## ⚙️ **Backend — Flask (API REST)**

### 🧠 **Application Factory Pattern**

```python
timesaver/backend/app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
login_manager = LoginManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
    
    db.init_app(app)
    login_manager.init_app(app)
    
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    return app
```

> **🎯 Decisão técnica:** O padrão **Factory** permite criar múltiplas instâncias da app com configurações diferentes — essencial para testes com banco em memória.

### 🗄️ **Modelo de Dados — User**

```python
timesaver/backend/app/models.py

from . import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    
    id            = db.Column(db.Integer, primary_key=True)
    username      = db.Column(db.String(64), unique=True, nullable=False)
    email         = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
```

> **🔐 Segurança:** Senhas **nunca** armazenadas em texto puro — usamos `werkzeug.security.generate_password_hash` com hash **pbkdf2:sha256** + salt automático.

### 🛣️ **Rotas da API**

| Método | Rota                    | Descrição                            | Autenticação |
|--------|------------------------|--------------------------------------|:-----------:|
| POST   | `/api/login`           | Autenticação (usuário ou e-mail)     |     ❌      |
| POST   | `/api/logout`          | Encerramento de sessão               |     ✅      |
| GET    | `/api/agendamentos`    | Lista de agendamentos com fallback   |     ❌*     |
| GET    | `/api/mock/agendamentos` | Mock interno para testes           |     ❌      |

> *`/api/agendamentos` possui `@login_required` comentado — pronto para ativar quando necessário.

#### 🔐 Login: Autenticação Inteligente

```python
timesaver/backend/app/routes.py

@main.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    
    # Aceita tanto e-mail quanto username como identificador
    user = User.query.filter(
        (User.email == identificador) | (User.username == identificador)
    ).first()
    
    if user and user.check_password(senha):
        login_user(user)        # Sessão gerenciada por Flask-Login
        return jsonify({"status": "success", "user": user.username})
    else:
        return jsonify({"status": "error", "message": "Credenciais inválidas"}), 401
```

> **💡 Diferencial:** O usuário pode logar com **e-mail** OU **username** — flexibilidade que elimina atritos na experiência.

### 🛡️ **Camada de Serviços — Tolerância a Falhas**

```python
timesaver/backend/app/services.py

import requests
import logging

logger = logging.getLogger(__name__)

def fetch_agendamentos():
    url = current_app.config['API_MOCK_URL']
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        
        data = response.json()
        
        # 🛡️ Tratamento: resposta vazia ou formato inválido
        if not data or 'agendamentos' not in data:
            logger.warning("Resposta da API vazia ou com formato inválido.")
            return {"status": "error", "message": "Dados indisponíveis", "data": []}
        
        # 🛡️ Validação de campos obrigatórios
        required_fields = ['paciente', 'cpf', 'medico', 'especialidade',
                          'data', 'horario', 'convenio', 'status']
        valid_agendamentos = [
            ag for ag in data.get('agendamentos', [])
            if all(field in ag and ag[field] for field in required_fields)
        ]
        
        return {"status": "success", "data": valid_agendamentos}
        
    except requests.exceptions.ConnectionError:
        # 🛡️ API temporariamente indisponível
        logger.error("Erro de conexão: API indisponível.")
        return {"status": "error", "message": "API temporariamente indisponível", "data": []}
    except ValueError:
        # 🛡️ JSON inválido na resposta
        logger.error("Erro de Parse: JSON inválido.")
        return {"status": "error", "message": "Erro de comunicação", "data": []}
    except Exception as e:
        # 🛡️ Qualquer erro inesperado
        logger.error(f"Erro inesperado: {str(e)}")
        return {"status": "error", "message": "Erro interno", "data": []}
```

> **🛡️ Tratamento de erros em 3 camadas:**
> 1. **Conexão:** Se a API mock falha, app não quebra
> 2. **Formato:** Se retorna JSON inválido, app retorna erro amigável
> 3. **Dados:** Se faltam campos obrigatórios, registros inválidos são filtrados com log

### 🌱 **Seed de Dados**

```python
timesaver/backend/scripts/seed.py

admin_email = "admin@timesaver.com"
admin_user = "admin"

if not User.query.filter_by(email=admin_email).first():
    user = User(username=admin_user, email=admin_email)
    user.set_password("123456")
    db.session.add(user)
    db.session.commit()
    print(f"✅ Usuário criado: {admin_email} | Senha: 123456")
```

### 🧪 **Testes Automatizados**

```python
timesaver/backend/tests/test_agenda.py

def test_falha_api_agendamentos(app_context):
    """Testa se a aplicação lida com indisponibilidade da API."""
    resultado = fetch_agendamentos()
    assert resultado['status'] == 'error'
    assert resultado['data'] == []
    assert 'temporariamente indisponível' in resultado['message']


timesaver/backend/tests/test_auth.py

def test_login_valido(client):
    """Testa login com credenciais corretas."""
    response = client.post('/login', data={
        'identificador': 'teste@admin.com',
        'senha': 'senha123'
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b'Sair' in response.data

def test_login_invalido(client):
    """Testa login com senha incorreta."""
    response = client.post('/login', data={
        'identificador': 'teste@admin.com',
        'senha': 'senha_errada'
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b'Credenciais inv\xc3\xa1lidas' in response.data
```

---

## 🎨 **Frontend — Next.js + TypeScript**

### 🚀 **Next.js 16 com App Router**

O projeto utiliza o mais moderno **App Router** do Next.js 16, com:

- 🏗️ **Server Components** por padrão + `"use client"` para interatividade
- 📐 **Layout aninhado** com suporte a fonts otimizadas via `next/font`
- 🧩 **TypeScript strict mode** — tipagem completa em toda a codebase
- 🎨 **Tailwind CSS v4** com a nova engine `@tailwindcss/postcss`

### 📐 **Tipografia — Sistemática de Fontes**

Configurada no layout raiz com carregamento otimizado:

```typescript
timesaver/frontend/app/layout.tsx

const geistSans  = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono  = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
```

E em páginas específicas, fonts especializadas:

```typescript
timesaver/frontend/app/page.tsx

// Display → Space Grotesk (títulos com personalidade)
const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });
// Body → Inter (legibilidade superior em texto corrido)
const body    = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
// Mono → IBM Plex Mono (dados tabulares com alinhamento perfeito)
const mono    = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"] });
```

> **🎯 Hierarquia tipográfica:** Display (títulos) → Body (texto) → Mono (dados) cria clareza visual e professionalismo.

---

## 🔐 **Autenticação & Sessão**

### Fluxo Completo de Autenticação

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FLUXO DE AUTENTICAÇÃO                             │
│                                                                      │
│  Navegador                  Next.js                  Flask           │
│    │                          │                       │              │
│    │   [Usuário digita]       │                       │              │
│    ├──► POST /api/login ─────►│──── JSON ────────────►│              │
│    │   credentials:include    │                       │              │
│    │                          │                       │  Verifica    │
│    │                          │                       │  credenciais │
│    │                          │                       │              │
│    │◄─── Set-Cookie ──────────│◄─── 200 OK ──────────┤              │
│    │                          │                       │              │
│    │   [Redireciona /]        │                       │              │
│    ├──► GET / ───────────────►│                       │              │
│    │                          │                       │              │
│    │                          ├──► GET /api/agendamentos ──────────►│
│    │                          │    credentials:include │              │
│    │                          │◄─── JSON agendamentos ◄─────────────┤
│    │                          │                       │              │
│    │◄─── Página renderizada ──┤                       │              │
│    │    com tabela + dados    │                       │              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Tela de Login — Experiência Premium

A tela de login foi projetada como um **splash de produto**, não um simples formulário:

```
┌──────────────────────────────────────────────────────┐
│  ┌─────────────────────┐  ┌────────────────────────┐  │
│  │                     │  │                        │  │
│  │   ☰ Painel Marca    │  │  🖊️ Formulário Login   │  │
│  │                     │  │                        │  │
│  │   ⏱️ Sautech     │  │  BEM-VINDO DE VOLTA    │  │
│  │                     │  │                        │  │
│  │   "Cada minuto      │  │  👤 Usuário ou e-mail  │  │
│  │    da sua agenda,   │  │  🔒 Senha              │  │
│  │    no lugar certo." │  │  👁️ Mostrar/ocultar    │  │
│  │                     │  │                        │  │
│  │   Fundo azul com    │  │  [      Entrar      ] │  │
│  │   grid pattern +    │  │                        │  │
│  │   glow animado      │  │  © 2025 Time Saver     │  │
│  │                     │  │                        │  │
│  └─────────────────────┘  └────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

**Características de UX:**

- 🎬 **Animação CSS** nos ponteiros do relógio (marca registrada)
- ✨ **Glow pulsante** no painel de marca
- 👁️ **Toggle de visibilidade** da senha
- ⏳ **Spinner de carregamento** no botão durante login
- 🚨 **Mensagens de erro** estilizadas com ícone e borda
- ♿ **`prefers-reduced-motion`** — respeito por acessibilidade

---

## 📊 **Tabela Interativa com Tabulator**

### Colunas Configuradas

```
┌───────┬────────┬─────────────┬──────────────┬──────────┬───────────────┬──────────┬──────────┐
│  Data │ Horário│  Paciente   │     CPF      │  Médico  │ Especialidade │ Convênio │  Status  │
├───────┼────────┼─────────────┼──────────────┼──────────┼───────────────┼──────────┼──────────┤
│  monospace (IBM Plex Mono) para dados numéricos                        │          │          │
│  2026-│ 10:00  │ Carlos      │ 111.111.111  │ Dr.      │ Ortopedia     │ Unimed   │ 🟢 Conf. │
│  07-24│        │ Andrade     │ -11          │ Roberto  │               │          │          │
├───────┼────────┼─────────────┼──────────────┼──────────┼───────────────┼──────────┼──────────┤
│  2026-│ 14:30  │ Mariana     │ 222.222.222  │ Dra.     │ Cardiologia   │ Bradesco │ 🟡 Pend. │
│  07-24│        │ Costa       │ -22          │ Silvia   │               │          │          │
├───────┼────────┼─────────────┼──────────────┼──────────┼───────────────┼──────────┼──────────┤
│  2026-│ 09:00  │ Felipe      │ 333.333.333  │ Dr.      │ Ortopedia     │ Partic.  │ 🔴 Canc. │
│  07-25│        │ Mendes      │ -33          │ Roberto  │               │          │          │
└───────┴────────┴─────────────┴──────────────┴──────────┴───────────────┴──────────┴──────────┘
```

### 🎨 **Sistema de Status com Cores Semânticas**

```typescript
const STATUS_STYLES = {
  confirmado: { bg: "#EAF6EF", fg: "#1E7A50", dot: "#2E9E6D" },  // 🟢 Verde
  pendente:   { bg: "#FBF2E3", fg: "#8A6412", dot: "#C9992F" },  // 🟡 Amarelo
  cancelado:  { bg: "#FBECEA", fg: "#A23B2F", dot: "#C0463C" },  // 🔴 Vermelho
  concluido:  { bg: "#EAF0F8", fg: "#234875", dot: "#3B6EA5" },  // 🔵 Azul
};
```

> **💡** Cada status vira uma **tag pill** arredondada com bolinha indicadora — feedback visual instantâneo.

### 🔍 **Filtros em Tempo Real**

Três campos de busca que filtram a tabela **instantaneamente** sem recarregar a página:

```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│ 🔍 Buscar paciente  │ 🔍 Buscar por CPF   │ 🔍 Buscar por médico│
└─────────────────────┴─────────────────────┴─────────────────────┘
```

Implementação com `setFilter` do Tabulator:

```typescript
timesaver/frontend/app/page.tsx

const handleFiltro = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
  if (tableRef.current) {
    const val = e.target.value;
    if (val) tableRef.current.setFilter(field, "like", val);
    else tableRef.current.removeFilter(field, "like", "");
  }
};
```

### ⏱️ **Clock Mark — Identidade Visual**

Um **relógio SVG minimalista** que serve como logotipo da marca:

```
          ╭────────╮
          │ ⏱️    │
          │  /\    │  ← Ponteiro da hora (animado 12s)
          │   --   │  ← Ponteiro dos minutos (animado 3s)
          │    •   │  ← Eixo dourado (#C9992F)
          ╰────────╯
```

- **Tela de login:** Animação contínua nos ponteiros
- **Dashboard:** Ponteiros apontam para o horário real do sistema
- **Paleta:** Azul petróleo (`#16324F`) + Dourado (`#C9992F`)

---

## 🧪 **Testes Automatizados**

### 📋 Suíte de Testes

```
📁 tests/
├── test_auth.py      # Testes de autenticação
│   ├── test_login_valido()     → Credenciais corretas retornam 200
│   └── test_login_invalido()   → Senha errada exibe mensagem de erro
│
└── test_agenda.py    # Testes de resiliência
    └── test_falha_api_agendamentos()
        → API offline não quebra a aplicação
        → Retorna status "error" com data vazia
        → Mensagem amigável para o usuário
```

### 🔧 **Fixtures e Banco em Memória**

```python
timesaver/backend/tests/test_auth.py

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # 🎯 Banco relâmpago!
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            user = User(username='admin_teste', email='teste@admin.com')
            user.set_password('senha123')
            db.session.add(user)
            db.session.commit()
        yield client
        # Cleanup automático
        with app.app_context():
            db.session.remove()
            db.drop_all()
```

> **🎯 Decisão técnica:** Banco **SQLite em memória** (`:memory:`) para testes — velocidade máxima + isolamento total entre execuções.

---

## 🌱 **Seed de Dados**

```bash
# Popula o banco com usuário de demonstração
$ docker exec -it timesaver_backend python scripts/seed.py

# Resultado:
# ✅ Tabelas criadas no SQLite
# ✅ Usuário admin criado:
#    Login: admin@timesaver.com
#    Senha: 123456
# ✅ Dados mock de agendamentos disponíveis via API interna
```

### 📦 **Dados Mockados de Agendamentos**

A API mock interna (`/api/mock/agendamentos`) retorna:

```json
{
  "agendamentos": [
    {
      "paciente": "Carlos Andrade",
      "cpf": "111.111.111-11",
      "medico": "Dr. Roberto",
      "especialidade": "Ortopedia",
      "data": "2026-07-24",
      "horario": "10:00",
      "convenio": "Unimed",
      "status": "Confirmado"
    }
    // ... mais registros
  ]
}
```

---

## 🚀 **Como Executar o Projeto**

### 📋 **Pré-requisitos**

| Ferramenta       | Versão Mínima | Comando para verificar      |
|------------------|:------------:|-----------------------------|
| 🐳 Docker       | 24+           | `docker --version`          |
| 🐳 Docker Compose | 2.0+        | `docker compose version`    |
| 📦 Git          | 2.0+          | `git --version`             |

### 🚀 **Passo a Passo**

```bash
# 1️⃣ Clone o repositório
git clone https://github.com/seu-usuario/timesaver.git
cd timesaver

# 2️⃣ Inicie a infraestrutura completa
docker compose up -d --build

# 3️⃣ Popule o banco com dados iniciais
docker exec -it timesaver_backend python scripts/seed.py

# 4️⃣ Acesse a aplicação
open http://localhost:3000

# 5️⃣ Faça login
#    📧 Usuário: admin@timesaver.com
#    🔑 Senha:   123456
```

### 📊 **O que cada container faz**

```
Container              Processo              Porta    Health Check
──────────────────────────────────────────────────────────────────
timesaver_backend      Flask (Python)         :5000    ✅ Sempre rodando
timesaver_frontend     Next.js (Node)         :3000    ✅ Aguarda backend
```

### 🛑 **Comandos de Gerenciamento**

```bash
# Ver logs em tempo real
docker compose logs -f

# Parar a aplicação
docker compose down

# Parar + limpar volumes (banco recriado)
docker compose down -v

# Reconstruir após alterações
docker compose up -d --build

# Acessar o terminal do backend
docker exec -it timesaver_backend bash

# Executar testes
docker exec -it timesaver_backend python -m pytest tests/ -v
```

---

## 📸 **Demonstração Visual**

### 🚪 **Tela de Login**

```
┌──────────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────┐  ┌──────────────────────────────────┐  │
│  │   ⏱️                     │  │  BEM-VINDO DE VOLTA              │  │
│  │                          │  │  ─────────────────────────────   │  │
│  │   Time Saver             │  │  Entrar na sua conta             │  │
│  │                          │  │                                  │  │
│  │   ┌──────────────────┐   │  │  ┌────────────────────────────┐ │  │
│  │   │ ✨ Glow animado  │   │  │  │ 👤 Usuário ou e-mail       │ │  │
│  │   │    ┌─┐          │   │  │  └────────────────────────────┘ │  │
│  │   │    │⏱│          │   │  │  ┌────────────────────────────┐ │  │
│  │   │    └─┘          │   │  │  │ 🔒 Senha            👁️    │ │  │
│  │   │  Fundo azul     │   │  │  └────────────────────────────┘ │  │
│  │   └──────────────────┘   │  │                                  │  │
│  │                          │  │  ┌────────────────────────────┐ │  │
│  │   "Cada minuto da       │  │  │      ⏳ Entrando...        │ │  │
│  │    sua agenda, no       │  │  └────────────────────────────┘ │  │
│  │    lugar certo."        │  │                                  │  │
│  │                          │  │  © 2025 Time Saver              │  │
│  └──────────────────────────┘  └──────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

### 📋 **Dashboard de Agenda**

```
┌──────────────────────────────────────────────────────────────────────┐
│  ⏱️ Time Saver                                        [Sair]       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Agenda médica                                                       │
│  4 agendamentos no total                                             │
│                                                                      │
│  ┌─────────────────────┬─────────────────────┬─────────────────────┐│
│  │ 🔍 Buscar paciente  │ 🔍 Buscar por CPF   │ 🔍 Buscar por médico││
│  └─────────────────────┴─────────────────────┴─────────────────────┘│
│                                                                      │
│  ┌───────┬────────┬─────────────┬──────────────┬──────────┬─────────┐│
│  │ DATA  │ HORÁRIO│  PACIENTE   │     CPF      │  MÉDICO  │ STATUS  ││
│  ├───────┼────────┼─────────────┼──────────────┼──────────┼─────────┤│
│  │07-24  │ 10:00  │ Carlos A.   │111.111.111-11│ Dr. Rob. │ 🟢 Conf. ││
│  │07-24  │ 14:30  │ Mariana C.  │222.222.222-22│ Dra. Sil │ 🟡 Pend. ││
│  │07-25  │ 09:00  │ Felipe M.   │333.333.333-33│ Dr. Rob. │ 🔴 Canc. ││
│  └───────┴────────┴─────────────┴──────────────┴──────────┴─────────┘│
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 💡 **Tomada de Decisões Técnicas**

### 🎯 Por que **Docker Compose** em vez de rodar local?

| Abordagem     | Vantagens                                     | Desvantagens                     |
|---------------|-----------------------------------------------|----------------------------------|
| 🐳 Docker     | ✅ Ambiente idêntico em qualquer máquina      | ⚠️ Consumo moderado de recursos |
|               | ✅ Zero configuração manual                   |                                  |
|               | ✅ Isolamento total de dependências           |                                  |
|               | ✅ Ready-to-deploy em qualquer cloud          |                                  |
| ❌ Local      | ⚠️ "Na minha máquina funciona"               | ❌ Inconsistência entre devs     |

### 🎯 Por que **Flask** em vez de FastAPI/Django?

| Critério         | Flask ✅        | FastAPI        | Django         |
|------------------|:---------------:|:--------------:|:--------------:|
| ⚡ Curva aprend.  | ★★★★★ (Mínima) | ★★★★☆         | ★★★☆☆         |
| 🎯 Escopo        | Microframework  | API-first      | Full-stack     |
| 🔌 Extensões     | Flask-SQLAlchemy| SQLModel       | ORM próprio    |
| ⏱️ Time-to-market| ✅ Mais rápido  | ⚠️ Médio       | ⚠️ Mais lento  |
| 📚 Ecossistema   | Maduro + estável| Crescendo      | Muito maduro   |

> Para um MVP de agenda médica com rota para produção, **Flask oferece o melhor equilíbrio entre simplicidade, produtividade e maturidade.**

### 🎯 Por que **Next.js App Router** em vez de Pages Router?

```
Pages Router (legado)              App Router (moderno)
─────────────────────              ─────────────────────
📁 pages/                          📁 app/
   ├── index.tsx                      ├── page.tsx       ← Server Component
   ├── login.tsx                      ├── layout.tsx     ← Layout compartilhado
   └── _app.tsx                       └── login/
                                        └── page.tsx    ← Rota aninhada
```

### 🎯 Por que **Tabulator** em vez de outras tabelas?

| Biblioteca       | Performance     | Filtros     | Mobile    | Bundle     |
|------------------|:---------------:|:-----------:|:---------:|:----------:|
| 📊 **Tabulator**  | ★★★★★          | ✅ Nativo   | ✅        | ~80KB      |
| 📋 React-Table   | ★★★★☆          | ⚠️ Manual   | ⚠️        | ~30KB      |
| 🧩 Material Table| ★★★☆☆          | ✅ Nativo   | ✅        | ~200KB     |

> **Tabulator** oferece filtragem nativa, performance em datasets grandes e excelente experiência mobile.

### 🎯 Por que **SQLite** em vez de PostgreSQL?

```
SQLite (MVP/Dev)              PostgreSQL (Produção)
══════════════════              ════════════════════
✅ Zero configuração           ✅ Concorrência alta
✅ Banco em arquivo único      ✅ Usuários simultâneos
✅ Ideal para 1-10 usuários    ✅ Ideal para 10+ usuários
✅ Perfeito para MVP           ✅ Ready para escala

🔄 Migração futura é trivial — apenas trocar a DATABASE_URL no .env!
```

---

## 🧰 **Comandos Úteis**

```bash
# ─────────────────────────────────────────────────────────────────────
# 🐳 DOCKER — Gerenciamento Geral
# ─────────────────────────────────────────────────────────────────────

# Build + Start (modo destacado)
docker compose up -d --build

# Start sem rebuild
docker compose up -d

# Parar tudo
docker compose down

# Ver logs (follow mode)
docker compose logs -f

# Ver apenas logs do backend
docker compose logs backend -f

# Verificar containers ativos
docker compose ps

# ─────────────────────────────────────────────────────────────────────
# 🔧 BACKEND — Manutenção
# ─────────────────────────────────────────────────────────────────────

# Acessar terminal do backend
docker exec -it timesaver_backend sh

# Executar seed do banco
docker exec -it timesaver_backend python scripts/seed.py

# Rodar testes
docker exec -it timesaver_backend python -m pytest tests/ -v

# Ver testes com coverage
docker exec -it timesaver_backend python -m pytest tests/ -v --cov=app

# ─────────────────────────────────────────────────────────────────────
# ⚛️  FRONTEND — Manutenção
# ─────────────────────────────────────────────────────────────────────

# Acessar terminal do frontend
docker exec -it timesaver_frontend sh

# Instalar nova dependência
docker exec -it timesaver_frontend npm install nome-do-pacote

# Lint
docker exec -it timesaver_frontend npm run lint

# ─────────────────────────────────────────────────────────────────────
# 💾 BANCO DE DADOS
# ─────────────────────────────────────────────────────────────────────

# Ver banco SQLite (dentro do container)
docker exec -it timesaver_backend sqlite3 /app/agenda.db
.tables
SELECT * FROM users;
.exit

# Reset completo (apaga tudo e recria)
docker compose down -v
docker compose up -d
docker exec -it timesaver_backend python scripts/seed.py
```

---

## 📄 **Licença**

```
MIT License

Copyright (c) 2026 Time Saver

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

<div align="center">

<br>

```
╔══════════════════════════════════════════════════════════════╗
║                                                               ║
║   Obrigado por conferir o Time Saver!                         ║
║                                                               ║
║   🚀 Desenvolvido com ☕, Docker, Python & TypeScript          ║
║                                                               ║
║   ⏱️  "Cada minuto da sua agenda, no lugar certo."            ║
║                                                               ║
╚══════════════════════════════════════════════════════════════╝
```

<br>

[![Feito com Docker](https://img.shields.io/badge/Feito_com-Docker-2496ED?style=flat-square&logo=docker)](https://docker.com)
[![Feito com Flask](https://img.shields.io/badge/Feito_com-Flask-000000?style=flat-square&logo=flask)](https://flask.palletsprojects.com)
[![Feito com Next.js](https://img.shields.io/badge/Feito_com-Next.js-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![Feito com TypeScript](https://img.shields.io/badge/Feito_com-TypeScript-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)

<br>

**⭐ Se este projeto te ajudou, dá uma estrela no GitHub!**

<br>
</div>