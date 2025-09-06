$ErrorActionPreference = "Stop"

Write-Host "=== [1/6] Kiểm tra Python ==="
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  Write-Error "Không tìm thấy 'python'. Vui lòng cài Python 3.9+ rồi chạy lại."
}

Write-Host "=== [2/6] Tạo venv & cài thư viện backend ==="
if (-not (Test-Path ".\server")) { Write-Error "Thiếu thư mục 'server'." }
python -m venv .\server\venv
.\server\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r .\server\requirements.txt

Write-Host "=== [3/6] Tạo file .env cho backend ==="
$envPath = ".\server\.env"
if (-not (Test-Path $envPath)) {
  if (Test-Path ".\server\.env.example") {
    Copy-Item ".\server\.env.example" $envPath
  } else {
    New-Item -Path $envPath -ItemType File | Out-Null
    Add-Content $envPath "OPENAI_API_KEY="
    Add-Content $envPath "FLASK_ENV=development"
    Add-Content $envPath "FLASK_APP=app.py"
  }
}
$apiKey = Read-Host "Nhập OPENAI_API_KEY (bắt đầu bằng 'sk-')"
$content = Get-Content $envPath
if ($content -match "^OPENAI_API_KEY=") {
  $content = $content -replace "^OPENAI_API_KEY=.*","OPENAI_API_KEY=$apiKey"
} else {
  $content += "`r`nOPENAI_API_KEY=$apiKey"
}
Set-Content $envPath $content -Encoding UTF8

Write-Host "=== [4/6] Cài concurrently ở thư mục gốc ==="
npm install

Write-Host "=== [5/6] Cài dependencies frontend ==="
if (-not (Test-Path ".\frontend")) { Write-Error "Thiếu thư mục 'frontend'." }
Push-Location .\frontend
npm install
Pop-Location

Write-Host "=== [6/6] Hoàn tất. Dùng 'start.ps1' để chạy hệ thống. ==="
