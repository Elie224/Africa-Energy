@echo off
set JWT_SECRET=dev-secret-tres-long-pour-le-dev-local-aaa-1234567890
set NODE_ENV=development
set PORT=4000
set FRONTEND_ORIGIN=http://localhost:5174
cd /d C:\Users\KOURO\africa-energy-frontend\backend
node src/server.js
