# Full-Stack FastAPI + Vue.js Application

A modern full-stack application with:

- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Frontend**: Vue.js 3 + Vuetify 3

## Project Structure

```
project/
├── backend/          # FastAPI backend
├── frontend/         # Vue.js frontend
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.9+ (for local backend development)

### Using Docker (Recommended)

```bash
docker-compose up --build
```

### Local Development

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## API Documentation

- Swagger UI: <http://localhost:8000/docs>
- ReDoc: <http://localhost:8000/redoc>

## Frontend

- Development server: <http://localhost:5173>
- Production build: <http://localhost:4173>
