# Phát hành 10 bài Vinhomes Olympic lên website V2

## Tình trạng
Bộ mã đã tích hợp 10 bài Word, 10 ảnh WebP và nguồn tham khảo vào source. Chưa tự triển khai lên Cloudflare trong cuộc trò chuyện tạo bộ mã.

## Kiểm tra trước khi phát hành
1. Sao lưu project Workers hiện tại và dữ liệu KV trong trang quản trị (Tổng quan → Tải bản sao lưu JSON). Không thay Nameserver nữa.
2. Từ thư mục mã nguồn này chạy `npm install`, `npm run check` và đảm bảo không có lỗi.
3. Bảo đảm Cloudflare Worker `royal-snow-1e06` đã dùng bản CMS V2; nếu website vẫn đang chạy bản HTML/Worker cũ thì triển khai **toàn bộ** V2 trước, không chỉ tải file ảnh.
4. Trong `wrangler.jsonc`, thay `DIEN_ID_KV_CUA_BAN_VAO_DAY` bằng ID KV **thật** và xác nhận tên Worker, quyền Cloudflare. Secret `ADMIN_PASSWORD` phải thiết lập trong Cloudflare, không đưa mật khẩu vào mã.
5. Khi đã xác nhận đúng tài khoản & Worker: `npx wrangler login` sau đó `npm run deploy`.
6. Nếu KV đã lưu nội dung trước đây, trang quản trị `/admin/` → Tổng quan → `Nhập 10 bài Vinhomes Olympic vào website` → `LƯU THAY ĐỔI`. Nếu mới cài V2 và KV rỗng, 10 bài tự hiện từ dữ liệu khởi tạo, không cần nhập.
7. Kiểm tra trang `/tin-tuc/`, đủ 10 đường dẫn, hiển thị hình ảnh, tác giả, liên kết nguồn và form liên hệ. Kiểm tra `/sitemap.xml` và `/robots.txt`.
8. Sau khi thật sự live, gửi sitemap trong Google Search Console của tài khoản có quyền, theo dõi URL được lập chỉ mục.

## Ảnh và nguồn
Ảnh trong `public/assets/posts/` là AI/đồ họa minh họa do người dùng yêu cầu tạo ở bộ Word, **không phải phối cảnh chính thức**. Nội dung dựa theo tài liệu đối chiếu ngày 21/10/2026; trước khi công khai yêu cầu người quản trị rà soát lại dữ kiện, hạn chế tuyên bố về điều kiện mở bán/giá/quỹ căn nếu chưa có hồ sơ.

## Không được bỏ qua
- Mã nguồn chứa URL và nội dung nhưng **không chứa mật khẩu, token, ID KV của tài khoản bạn**, nên chỉ tải ZIP lên Cloudflare bằng trình kéo thả tĩnh sẽ **không tạo trang quản trị có lưu dữ liệu**.
- KV lưu thay đổi quản trị sẽ đè dữ liệu mặc định. Nút nhập 10 bài tránh mất thông tin và tránh trùng bài đã có.
- Chưa có xác nhận live từ môi trường tạo ZIP. Chỉ coi là phát hành khi URL thực tế trả HTML, ảnh, canonical, sitemap, SSL đúng và form/admin được kiểm tra sau deploy.
