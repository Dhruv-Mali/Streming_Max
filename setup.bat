@echo off
echo ========================================
echo Stremify Setup Script
echo ========================================
echo.

echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)
echo Node.js found!
echo.

echo [2/5] Setting up Backend...
cd video_straming_system-main
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env
)
echo Installing backend dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..
echo Backend setup complete!
echo.

echo [3/5] Setting up Frontend...
cd stremify-FE-main
if not exist .env.local (
    echo Creating .env.local file from .env.example...
    copy .env.example .env.local
)
echo Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..
echo Frontend setup complete!
echo.

echo [4/5] Checking MongoDB...
echo Please ensure MongoDB is running on localhost:27017
echo You can start MongoDB with: mongod
echo Or use Docker: docker run -d -p 27017:27017 mongo:7.0
echo.

echo [5/5] Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Start Backend:
echo    cd video_straming_system-main
echo    npm run dev
echo.
echo 2. Start Frontend (in new terminal):
echo    cd stremify-FE-main
echo    npm run dev
echo.
echo 3. Open browser: http://localhost:3000
echo.
echo ========================================
pause
