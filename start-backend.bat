@echo off
echo ========================================
echo Starting Backend Server
echo ========================================
cd video_straming_system-main
echo.
echo Checking MongoDB connection...
echo MongoDB URI: mongodb://127.0.0.1:27017/stream_db
echo.
echo Starting server on port 3001...
npm run dev
