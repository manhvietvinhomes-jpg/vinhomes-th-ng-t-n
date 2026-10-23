@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo VINHOMES OLYMPIC - CAI DAT CMS CLOUDFLARE
echo ============================================
where node >nul 2>nul
if errorlevel 1 (
  echo Chua cai Node.js. Hay cai Node.js LTS tai https://nodejs.org/
  pause
  exit /b 1
)
echo [1/5] Dang cai cong cu...
call npm install
if errorlevel 1 goto failed
echo [2/5] Dang nhap Cloudflare, mot cua so trinh duyet se mo.
call npx wrangler login
if errorlevel 1 goto failed
echo.
echo [3/5] Hay tao KV Namespace ten vinhomes-olympic-data trong Cloudflare.
echo Sau do sao chep ID (32 ky tu) va dan vao day.
set /p KV_ID=Nhap KV Namespace ID: 
node scripts/prepare.js "%KV_ID%"
if errorlevel 1 goto failed
echo.
echo [4/5] Dat MAT KHAU QUAN TRI rieng (toi thieu 12 ky tu).
echo Ban se duoc hoi mat khau trong cua so lenh. KHONG chia se cho ai.
call npx wrangler secret put ADMIN_PASSWORD
if errorlevel 1 goto failed
echo.
echo [5/5] Chuan bi cap nhat Worker royal-snow-1e06 (website hien tai).
set /p OK=Go DEPLOY de xuat ban, phim khac de huy: 
if /I not "%OK%"=="DEPLOY" (
  echo Chua trien khai. Website cu van giu nguyen.
  pause
  exit /b 0
)
call npm run deploy
if errorlevel 1 goto failed
echo.
echo XONG! Website: https://vinhomesthuongtin.vn
echo Quan tri: https://vinhomesthuongtin.vn/admin/
echo Neu website khong len, kiem tra lai Domain cua Worker tren Cloudflare.
pause
exit /b 0
:failed
echo Co loi khi cai dat. Chua the khang dinh website da duoc cap nhat.
pause
exit /b 1
