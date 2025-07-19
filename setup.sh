#!/bin/bash

echo "🚀 Setting up FastAPI + Vue.js Full-Stack Application"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment files if they don't exist
if [ ! -f backend/.env ]; then
    echo "📋 Creating backend .env file..."
    cp backend/.env.example backend/.env
    echo "⚠️  Please update backend/.env with your database credentials"
fi

if [ ! -f frontend/.env ]; then
    echo "📋 Creating frontend .env file..."
    cp frontend/.env.example frontend/.env
fi

# Make setup script executable
chmod +x setup.sh

echo "✅ Setup complete!"
echo ""
echo "🐳 To run with Docker:"
echo "   docker-compose up --build"
echo ""
echo "💻 For local development:"
echo "   # Backend"
echo "   cd backend"
echo "   pip install -r requirements.txt"
echo "   uvicorn app.main:app --reload"
echo ""
echo "   # Frontend (in another terminal)"
echo "   cd frontend"
echo "   npm install"
echo "   npm run dev"
echo ""
echo "📖 API Documentation:"
echo "   Swagger UI: http://localhost:8000/docs"
echo "   ReDoc: http://localhost:8000/redoc"
echo ""
echo "🌐 Frontend:"
echo "   Development: http://localhost:5173"
echo "   Production: http://localhost:4173"
