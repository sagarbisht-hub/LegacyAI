<#
.SYNOPSIS
    LegacyAI — One-click development startup.
.DESCRIPTION
    Kills any old processes on ports 5173 and 8000,
    starts the FastAPI backend and Vite frontend in
    separate windows, then opens the browser.
.NOTES
    Double-click this file or run:  powershell -ExecutionPolicy Bypass -File start-dev.ps1
#>

$ROOT    = Split-Path -Parent $MyInvocation.MyCommand.Path
$BACKEND = Join-Path $ROOT "backend"
$VENV_PY = Join-Path $BACKEND "venv\Scripts\python.exe"

# ── 1. Kill anything on our ports ─────────────────────────────────────────
Write-Host "Cleaning up old processes…" -ForegroundColor Cyan
foreach ($port in 5173, 8000) {
    $conns = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    foreach ($c in $conns) {
        Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
    }
}
Start-Sleep -Seconds 1

# ── 2. Start backend in a new window ──────────────────────────────────────
Write-Host "Starting backend (FastAPI on :8000)…" -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", @"
    Set-Location '$BACKEND'
    Write-Host '=== LegacyAI Backend ===' -ForegroundColor Green
    & '$VENV_PY' -m uvicorn app.main:app --reload --port 8000
"@

# ── 3. Start frontend in a new window ─────────────────────────────────────
Write-Host "Starting frontend (Vite on :5173)…" -ForegroundColor Green
Start-Sleep -Seconds 2   # let backend start first
Start-Process powershell -ArgumentList "-NoExit", "-Command", @"
    Set-Location '$ROOT'
    Write-Host '=== LegacyAI Frontend ===' -ForegroundColor Green
    npx vite --port 5173
"@

# ── 4. Open browser after a short wait ────────────────────────────────────
Write-Host "Opening browser…" -ForegroundColor Cyan
Start-Sleep -Seconds 4
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "  LegacyAI is running!" -ForegroundColor Yellow
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  Backend:  http://localhost:8000/docs" -ForegroundColor White
Write-Host "  API Docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Keep the two PowerShell windows open." -ForegroundColor Gray
Write-Host "Close them to stop the servers." -ForegroundColor Gray
Write-Host ""
