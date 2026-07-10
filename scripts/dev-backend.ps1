# Demarrage backend en mode dev
$ErrorActionPreference = "Stop"
$env:JWT_SECRET = "dev-secret-tres-long-pour-le-dev-local-aaa-1234567890"
$env:NODE_ENV = "development"
$env:PORT = "4000"
$env:FRONTEND_ORIGIN = "http://localhost:5173"
Set-Location -LiteralPath "C:\Users\KOURO\africa-energy-frontend\backend"
Write-Host "==> Backend demarre sur http://localhost:4000" -ForegroundColor Cyan
try { node src/server.js }
catch {
  Write-Host "ERREUR backend: $_" -ForegroundColor Red
  Read-Host "Appuyez sur Entree pour fermer"
}
