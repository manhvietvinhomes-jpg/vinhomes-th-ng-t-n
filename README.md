# Vinhomes Olympic — website thông tin độc lập

Website: https://vinhomesthuongtin.vn — Cloudflare Worker `royal-snow-1e06`.

Bản biên tập 30/10/2026: **20 URL chuẩn**, gồm trang chủ, chín chuyên đề nền tảng, bốn bản tin sự kiện, bốn trang vận hành, mục tin và chính sách bảo mật. Gộp 84 bài mỏng bằng 301; bản gốc được giữ làm bản nháp trong CMS, cùng một bản nháp có từ trước. Không tiếp tục tạo bài ngắn để đạt chỉ tiêu 100 URL.

Đã phát hành và kiểm tra live: [báo cáo 30/10/2026](BAO-CAO-PHAT-HANH-2026-10-30.md).

Số liên hệ: **0989.294.744**, liên kết `tel:0989294744`. Xem [kiểm toán/kế hoạch](KIEM-TOAN-VA-KE-HOACH-2026-10-30.md), [nguồn và số liệu một nguồn](research/2026-10-30/DU-KIEN-CAN-DOI-CHIEU.md), [vận hành và checklist](VAN-HANH-VA-CHECKLIST-2026-10-30.md). Các báo cáo V3/96 URL ngày trước chỉ mô tả lịch sử.

## Phát triển và kiểm tra

Node.js ≥22, npm; Chromium `/usr/bin/chromium` và Pillow nếu dựng lại WebP từ sơ đồ SVG.

```sh
npm ci --no-audit --no-fund
npm run dev:prepare
npm run content:sync
node scripts/render-editorial-images.mjs
npm run check
npm run dev -- --local --ip 127.0.0.1 --port 8791
```

Trong terminal khác: `SMOKE_BASE=http://127.0.0.1:8791 npm run test:browser`. Smoke chỉ cho localhost, tạo lead kiểm thử, xác minh trong CMS rồi xóa đúng lead giả. Không chạy ghi dữ liệu thử ở production. Quét giao diện chỉ đọc: `node scripts/browser-readonly.mjs`; đặt `REVIEW_BASE=https://vinhomesthuongtin.vn` để kiểm tra live.

`npm run check` dựng dữ liệu, chạy **38 kiểm thử**, preflight build, audit metadata/schema/ảnh/link/301/robots/404 và ít nhất ba trang khác liên kết tới mỗi URL. Bảng hiện tại có 20 URL; audit live mặc định theo sitemap thực, thêm `--expected-count=20` để ghim quy mô đợt này. Không dùng audit cú pháp để cam kết Google index/ranking hoặc Core Web Vitals.

## Nguồn nội dung

- `content/journalism/*.md`: phần viết mới của chín chuyên đề.
- `content/journalism/pages.json`: ý định, title/meta, sáu từ khóa phụ và năm FAQ dẫn nguồn ngoài cho mỗi chuyên đề.
- `content/pre-journalism-seed.json`: bản nội dung công khai trước gộp, dùng để bảo toàn và tích hợp các hướng dẫn phù hợp; không có dữ liệu khách hàng.
- `scripts/build-page-content.js`: tích hợp nội dung, tạo hồ sơ bài, bốn tin sự kiện và sơ đồ SVG; `scripts/render-editorial-images.mjs` tạo WebP nén theo chủ đề.
- `src/page-content.js`, `src/journalism-release.js` và bộ JSON public là file sinh tự động. `content:sync` không ghi KV.
- `scripts/export-editorial-review.mjs` xuất HTML, slug/title/meta/H1/FAQ/nguồn/schema vào `dist/editorial-review/`. Bảng 301 ở `content/redirect-map.json` và bốn trang sản phẩm cũ tại `src/editorial.js`.

Google/Bing bị proxy chặn trong đợt nghiên cứu này. Đã dùng trình duyệt đọc toàn site và nguồn Hà Nội, nhưng chưa có nghiên cứu top 6–8 đối thủ/PAA theo từng truy vấn. Số liệu một hồ sơ gốc được nêu đúng nguồn/ngày, không tự nhận đã xác nhận độc lập hai nguồn. Không bịa giá bán, thời gian chạy xe hoặc trải nghiệm thực địa.

## CMS, bảo mật và triển khai

Đường quản trị tại `src/admin-config.js`; `/admin/` và asset cũ trả 404, không còn link quản trị ở footer. Cookie HttpOnly/Secure/SameSite, kiểm tra Origin, giới hạn đăng nhập sai, honeypot ẩn và kiểm tra chữ ký ảnh. Có hỗ trợ TOTP theo RFC 6238; **chưa bật trên production** cho đến khi chủ tài khoản ghép ứng dụng và cấu hình secret qua kênh riêng. Đường dẫn kín và robots không thay thế xác thực. Bộ đếm KV không phải rate limiter nguyên tử toàn cầu.

Production dùng `ADMIN_PASSWORD` secret và KV `OLYMPIC_KV`; không lưu mật khẩu/API token trong Git hay báo cáo. `dev:prepare` chỉ tạo mật khẩu local nếu chưa có và giữ file cũ. Wrapper chọn Account ID đã xác minh từ `wrangler.jsonc`; không dùng giá trị môi trường sai để đổi tài khoản.

Trước mỗi phát hành: backup read-only có checksum, xác minh domain/Worker và kiểm tra thay đổi CMS. `npm run deploy` kiểm thử rồi deploy nhưng **không tự migrate KV**. Đợt này dùng `content/journalism-migration-patch.json` qua `scripts/cloudflare-command.js seo-migrate`; patch có baseline, từ chối xung đột và giữ lead/nội dung riêng. Không tái dùng patch ngày này cho nội dung mới. Chi tiết và rollback: [hướng dẫn vận hành](VAN-HANH-VA-CHECKLIST-2026-10-30.md).

Workflow GitHub lưu audit theo push/lịch và cho phép quét production; đây là kiểm tra, không tự viết lại dữ kiện hay xuất bản nội dung.
