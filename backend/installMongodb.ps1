# local MongoDB installer for RuralGrow AI
$ErrorActionPreference = "Stop"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "   RuralGrow AI - Local MongoDB Setup" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

$baseDir = "d:\tbi  project\backend\mongodb"
$dataDir = "$baseDir\data"
$zipFile = "$baseDir\mongodb.zip"
$extractDir = "$baseDir\extracted"

# 1. Create Directories
if (-not (Test-Path $dataDir)) {
    Write-Host "[1/5] Creating database folders..." -ForegroundColor Green
    New-Item -ItemType Directory -Force -Path $dataDir | Out-Null
} else {
    Write-Host "[1/5] Database folders already exist." -ForegroundColor Yellow
}

# 2. Download MongoDB Zip Binary
if (-not (Test-Path "$baseDir\mongod.exe")) {
    Write-Host "[2/5] Downloading MongoDB Server Binary Archive (~100MB, please wait)..." -ForegroundColor Green
    Invoke-WebRequest -Uri "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.6.zip" -OutFile $zipFile
    
    # 3. Extract Archive
    Write-Host "[3/5] Extracting binary archive files..." -ForegroundColor Green
    Expand-Archive -Path $zipFile -DestinationPath $extractDir
    
    # Move files to root bin folder
    Write-Host "[4/5] Moving MongoDB files to project folder..." -ForegroundColor Green
    Copy-Item -Path "$extractDir\mongodb-win32-x86_64-windows-7.0.6\bin\*" -Destination $baseDir -Recurse -Force
    
    # 4. Clean up temp files
    Write-Host "[5/5] Cleaning up installation files..." -ForegroundColor Green
    Remove-Item -Path $zipFile -Force
    Remove-Item -Path $extractDir -Recurse -Force
} else {
    Write-Host "[2/5] MongoDB Server Binaries are already downloaded." -ForegroundColor Yellow
    Write-Host "[3/5] Skipping extraction." -ForegroundColor Yellow
    Write-Host "[4/5] Skipping file copy." -ForegroundColor Yellow
    Write-Host "[5/5] Skipping cleanup." -ForegroundColor Yellow
}

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "   MongoDB Local Server Setup Completed!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
