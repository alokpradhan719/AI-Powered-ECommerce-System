#!/bin/bash

# AI-Powered E-commerce Analytics Platform - Setup Script
# This script automates the initial setup process

echo "🚀 AI-Powered E-commerce Analytics - Setup Script"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✓ Node.js version: $(node -v)"
echo ""

# Backend setup
echo "📦 Setting up Backend..."
cd backend
cp .env.example .env
echo "Please edit backend/.env with your configuration"
npm install
echo "✓ Backend dependencies installed"
cd ..

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd frontend
cp .env.local.example .env.local
echo "Please edit frontend/.env.local with your configuration"
npm install
echo "✓ Frontend dependencies installed"
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure backend/.env with your database credentials and OpenAI API key"
echo "2. Configure frontend/.env.local with your API URL"
echo "3. Set up your MySQL database by running: database/full_database.sql"
echo "4. Start development: npm run dev"
echo ""
