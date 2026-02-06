# Quick Server Restart Script
# Run this by right-clicking and selecting "Run with PowerShell"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  MediCare+ Server Restart Tool" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "[1/4] Stopping all Node.js processes..." -ForegroundColor Green
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

Write-Host "[2/4] Navigating to server directory..." -ForegroundColor Green
Set-Location "C:\Users\madhu\OneDrive\Desktop\PROJ\server"

Write-Host "[3/4] Starting server..." -ForegroundColor Green
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  SERVER IS STARTING..." -ForegroundColor Yellow
Write-Host "  Watch for these messages:" -ForegroundColor Yellow
Write-Host "  ✅ MongoDB Connected Successfully" -ForegroundColor Gray
Write-Host "  🚀 Server Status: RUNNING" -ForegroundColor Gray
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "[4/4] Running npm run dev..." -ForegroundColor Green
npm run dev

# If you see this, the server stopped
Write-Host "`n⚠️  Server stopped. Press any key to exit..." -ForegroundColor Red
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
