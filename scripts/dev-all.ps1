# Demarre backend + frontend dans 2 fenetres separees
Start-Process pwsh -ArgumentList "-NoExit", "-File", "C:\Users\KOURO\africa-energy-frontend\scripts\dev-backend.ps1"
Start-Sleep -Seconds 1
Start-Process pwsh -ArgumentList "-NoExit", "-File", "C:\Users\KOURO\africa-energy-frontend\scripts\dev-frontend.ps1"
Write-Host "==> Backend : http://localhost:4000" -ForegroundColor Cyan
Write-Host "==> Frontend : http://localhost:5173" -ForegroundColor Cyan
Write-Host "==> App : http://localhost:5173 (ouvrez ce lien dans le navigateur)" -ForegroundColor Green
Write-Host ""
Write-Host "Pour arreter : fermez les 2 fenetres PowerShell" -ForegroundColor Yellow
