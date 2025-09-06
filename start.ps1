$ErrorActionPreference = "Stop"

if (-not (Test-Path ".\server\venv\Scripts\Activate.ps1")) {
  Write-Error "Chưa chạy setup. Hãy chạy .\setup.ps1 trước."
}

Write-Host "Kích hoạt Python venv..."
.\server\venv\Scripts\Activate.ps1

Write-Host "Khởi động backend + frontend..."
npm start
