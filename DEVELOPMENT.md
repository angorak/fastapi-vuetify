# Development Guide

## Quick Start

### Using Docker (Recommended)

```bash
./setup.sh
docker-compose up --build
```

### Local Development

#### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create database
createdb fastapi_db  # or use your preferred method

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
project/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application
│   │   ├── config.py            # Configuration settings
│   │   ├── database.py          # Database connection
│   │   ├── models/              # SQLAlchemy models
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── routers/             # API routes
│   │   ├── crud/                # Database operations
│   │   └── core/                # Security utilities
│   ├── alembic/                 # Database migrations
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── main.js              # Vue app entry
│   │   ├── App.vue              # Root component
│   │   ├── router/              # Vue Router
│   │   ├── stores/              # Pinia stores
│   │   ├── views/               # Page components
│   │   └── plugins/             # Vuetify setup
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
├── setup.sh
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users

- `GET /api/users/me` - Get current user
- `GET /api/users/` - Get all users (paginated)
- `GET /api/users/{user_id}` - Get user by ID
- `PUT /api/users/{user_id}` - Update user
- `DELETE /api/users/{user_id}` - Delete user

## Database

### Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Downgrade migration
alembic downgrade -1
```

### Database Schema

- **users**: User management table with authentication

## Frontend Features

### Pages

- **Home** (`/`) - Welcome page
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration
- **Users** (`/users`) - User management (protected)

### State Management

- **Auth Store** (`stores/auth.js`) - Authentication state
- **User Store** (`stores/user.js`) - User data management

### Components

- Responsive design with Vuetify 3
- Form validation
- Loading states
- Error handling
- Protected routes

## Development Commands

### Backend

```bash
# Run tests
pytest

# Format code
black app/
isort app/

# Type checking
mypy app/
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Environment Variables

### Backend (.env)

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/fastapi_db
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:8000
```

## Docker Services

- **backend**: FastAPI application (port 8000)
- **frontend**: Vue.js application (port 5173 for dev, 4173 for prod)
- **postgres**: PostgreSQL database (port 5432)

## Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check PostgreSQL is running
   - Verify DATABASE_URL in backend/.env
   - Ensure database exists

2. **CORS errors**
   - Check FRONTEND_URL in backend/.env
   - Ensure frontend URL matches exactly

3. **Port conflicts**
   - Change ports in docker-compose.yml
   - Update corresponding environment variables

4. **Frontend build fails**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version (18+ required)

### Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation
- SQL injection prevention via SQLAlchemy ORM
- XSS protection via Vue.js templating
