@echo off
REM AI-Powered E-commerce Analytics Platform - Setup Script for Windows

echo.
echo 🚀 AI-Powered E-commerce Analytics - Setup Script
echo ==================================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo ✓ Node.js version:
node -v

REM Backend setup
echo.
echo 📦 Setting up Backend...
cd backend
if exist .env (
    echo .env already exists
) else (
    copy .env.example .env
    echo ✓ Created backend/.env (please edit with your configuration)
)
call npm install
echo ✓ Backend dependencies installed
cd ..

REM Frontend setup
echo.
echo 📦 Setting up Frontend...
cd frontend
if exist .env.local (
    echo .env.local already exists
) else (
    copy .env.local.example .env.local
    echo ✓ Created frontend/.env.local (please edit with your configuration)
)
call npm install
echo ✓ Frontend dependencies installed
cd ..

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Configure backend/.env with your database credentials and OpenAI API key
echo 2. Configure frontend/.env.local with your API URL
echo 3. Set up your MySQL database by running: database/full_database.sql
echo 4. Start development: npm run dev
echo.
pause
