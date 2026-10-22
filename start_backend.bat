@echo off
REM DeepShield FastAPI Backend Startup Script
REM Run this from the project root directory

echo Starting DeepShield FastAPI Backend on http://localhost:8000 ...
echo API Docs available at: http://localhost:8000/docs
echo Press CTRL+C to stop the server.
echo.

python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
