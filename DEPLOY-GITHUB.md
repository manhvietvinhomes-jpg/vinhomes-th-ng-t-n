# Đưa mã lên GitHub và CI/CD (chưa thực hiện)

GitHub hiện không có repository đã được xác định/cho phép ghi từ yêu cầu này, vì vậy **bộ mã chỉ ở ZIP**, chưa đẩy lên GitHub. Bộ mã đã chuẩn bị `.gitignore` và `.github/workflows/deploy.yml` để triển khai có kiểm soát.

## Đưa lên repository private

1. Tạo **private repository** trong GitHub, ví dụ `vinhomes-olympic-web`.
2. Trong thư mục mã đã giải nén chạy:

```sh
git init
git add .
git commit -m "Initial Vinhomes Olympic CMS SEO v2"
git branch -M main
git remote add origin https://github.com/<username>/vinhomes-olympic-web.git
git push -u origin main
```

Thay `<username>` bằng tài khoản của bạn; đừng sao chép nguyên dấu ngoặc. Nếu chọn đẩy mã qua ChatGPT/GitHub, cần quyền repo ghi; sẽ không tự tạo repo ngoài ý muốn.

3. Bảo đảm **không commit** `.dev.vars`, `.env`, mật khẩu, API token, file lead CSV, backup chứa dữ liệu khách hàng.
4. Đặt `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` trong GitHub Actions repository secrets; token cần phạm vi Deploy Workers thích hợp, không gửi token qua chat.
5. KV Namespace ID phải được cấu hình trong `wrangler.jsonc` trước khi chạy workflow. `ADMIN_PASSWORD` phải được đặt làm Cloudflare Secret một lần riêng biệt.
6. Vào GitHub → Actions → Manual deploy to Cloudflare Workers → Run workflow. Workflow chỉ được kích hoạt thủ công để tránh vô tình ghi đè website hiện tại.
7. Sau khi workflow xanh, kiểm tra domain live và form/admin theo `PHAT-HANH-VA-SEARCH-CONSOLE.md`.

Nếu muốn kho mã an toàn hơn, quản lý KV ID bằng file cấu hình phát hành riêng không chia sẻ ra repo và rà soát quyền account/tokens định kỳ.
