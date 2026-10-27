# V3 đã phát hành — 27/10/2026

Website: https://vinhomesthuongtin.vn/  
CMS: https://vinhomesthuongtin.vn/admin/  
Worker: `royal-snow-1e06`  
Phiên bản đang phục vụ 100% traffic: `753ec103-c3b6-4301-9463-9a7d3e61bc50`.

## Kết quả thực tế

- Phát hành bằng Wrangler thành công, giữ nguyên domain và nameserver.
- Audit **trên tên miền thật** đạt **100 URL, 100 URL truy cập được từ trang chủ, 14 ảnh, 0 lỗi, 0 cảnh báo**. Sitemap và robots hoạt động; title, description, canonical và JSON-LD được kiểm tra.
- Chromium kiểm tra trang chủ desktop và bài viết mobile trên production: HTTP 200, không tràn ngang, không lỗi JavaScript. Kiểm thử giao diện đầy đủ trước đó đã chạy local.
- CMS production đăng nhập được; truy cập dữ liệu quản trị khi chưa đăng nhập bị từ chối. Lưu và đọc nội dung gồm **84 bài xuất bản** không mất dữ liệu.
- Form production từ chối thiếu đồng ý liên hệ, nhận lead thử hợp lệ; lead thử xuất hiện trong CMS và đã được xóa sau xác nhận. Không xóa lead khác.
- Trang admin có noindex; đăng xuất hoạt động.
- Trước deploy: 24/24 kiểm thử và audit dữ liệu seed đều đạt.

Báo cáo máy: `dist/seo-audit.json`, `dist/production-smoke.json`, `dist/production-browser.json`; ảnh tại `dist/screenshots/production-*.png`.

## Tài nguyên và bản sao lưu

Token đã được xác thực. Account ID được nhập ban đầu không khớp tài khoản chứa website; đã đối chiếu danh sách tài khoản được token cấp quyền và dùng đúng tài khoản. Account ID và namespace thật đã ghi trong `wrangler.jsonc`; các lệnh deploy/backup dùng wrapper chọn cấu hình này và HTTPS proxy, không phụ thuộc giá trị Account ID nhập nhầm. Không có token trong Git.

Worker cũ không có binding KV hoặc secret quản trị. Đã tạo namespace `vinhomes-olympic-data`, binding `OLYMPIC_KV`, và secret `ADMIN_PASSWORD` ngẫu nhiên riêng cho production. Nội dung seed sau kiểm tra đã được lưu trong KV mới. Không có dữ liệu CMS cũ bị ghi đè.

Bản sao lưu trước thay đổi nằm ngoài checkout:
`/workspace/deployment-backups/2026-10-27T08-39-49.543Z/`

Bản sao lưu gồm settings, domain bindings, lịch sử deployment và nội dung Worker có SHA-256. Phiên bản trước phát hành là `509877d5-ad4a-46a8-9705-d2240227cde5` (100% traffic). Đây là ID để xem xét rollback theo `RELEASE-V3.md`; chưa chạy thử rollback production. Worker static assets cần được phục hồi qua phiên bản, không chỉ file nội dung Worker. Sao lưu KV bổ sung sau phát hành được thực hiện bằng `npm run release:backup`, lưu riêng ngoài repository.

Mật khẩu CMS không nằm trong mã nguồn, báo cáo hoặc ZIP. Bản bàn giao riêng có quyền file hạn chế, ngoài checkout tại `/workspace/deployment-secrets/royal-snow-1e06-admin-password.txt`. Không gửi lên GitHub, không đặt trong thư mục public. Mật khẩu production khác mật khẩu local.

## Audit tiếp theo

Workflow GitHub đã được cấu hình kiểm tra source khi push và chạy hằng ngày 06:15 giờ Việt Nam; sau phát hành bổ sung audit domain thật vào lịch này. Lịch CI đã cấu hình không đồng nghĩa các lần chạy tương lai đã thành công. Có thể chạy ngay `npm run audit:live`.

Chưa thao tác Google Search Console hoặc xác nhận Google đã index. Sitemap công khai tại https://vinhomesthuongtin.vn/sitemap.xml.

Báo cáo này cập nhật trạng thái production, thay cho phần “chưa phát hành” trong bản bàn giao và báo cáo V3 ngày 23/10/2026.
