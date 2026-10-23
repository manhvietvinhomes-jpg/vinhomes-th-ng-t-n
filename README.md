# VINHOMES OLYMPIC • MẠNH VIỆT REAL ESTATE | CMS + SEO V2

**Trạng thái ngày 21/10/2026:** Đã xây dựng mã nguồn, 17 bài kiểm thử và preflight build chạy đạt. **Chưa triển khai bản V2 lên tài khoản Cloudflare, chưa xác nhận DNS/SSL/trang live của bản mới, chưa liên kết GitHub hoặc Google Search Console.**

Tên miền dự kiến: `https://vinhomesthuongtin.vn` • Worker đã sử dụng ở các bước trước: `royal-snow-1e06`.

## Phiên bản V2 + 10 bài Marketing (22/10/2026)

Đã tích hợp 10 bài biên soạn từ Word, 10 ảnh WebP và các nguồn tham khảo được trích trong Word. Bản này có **26 URL** trong sitemap trên dữ liệu khởi tạo (bao gồm 10 bài mới). Bài tin mặc định cũ đã chuyển thành bản nháp, không bị xóa. Chưa triển khai vào Cloudflare, GitHub hay Google Search Console. Xem `NHAP-10-BAI-VA-PHAT-HANH.md` để nhận biết rõ việc cập nhật khi dữ liệu KV đã được quản trị.

## Có gì mới trong V2?

- Trang chủ responsive, ảnh concept AI được đánh dấu là ảnh minh họa.
- 9 trang SEO có nội dung máy chủ (SSR): `/tong-quan/`, `/vi-tri/`, `/quy-hoach/`, `/san-pham/`, `/gia-ban/`, `/mat-bang/`, `/tien-do/`, `/phap-ly/`, `/so-sanh/`.
- Bài viết ` /tin-tuc/<slug>/ ` và chi tiết sản phẩm minh họa ` /san-pham/<slug>/ ` có URL riêng, title, description, canonical, OG và JSON-LD.
- Sitemap XML tự tạo từ các bài và trang công khai; robots.txt; noindex cho bản xem thử Workers.dev; HTML có liên kết nội bộ.
- Trang `/admin/` có mật khẩu riêng (Cloudflare Secret): sửa banner/chữ, ảnh, trang SEO, trạng thái nguồn, bài viết, sản phẩm, bảng giá và nhận khách đăng ký; có xuất CSV khách và JSON nội dung.
- Bảng giá chỉ hiện công khai nếu người quản trị đánh dấu **đã có văn bản xác minh** và gắn URL nguồn. Mặc định không có giá và giỏ hàng được khẳng định.
- Form có yêu cầu đồng ý liên hệ, honeypot, giới hạn số yêu cầu cơ bản, lưu nguồn trang và `utm_source`/`utm_campaign`.
- Chính sách bảo mật tại `/chinh-sach-bao-mat/`.

## Bắt đầu

1. Đọc **`HUONG-DAN-CLOUDFLARE.txt`** và **`PHAT-HANH-VA-SEARCH-CONSOLE.md`**.
2. Tải ZIP về máy và giải nén. Chạy `CAI-DAT-WINDOWS.cmd` sau khi đã tạo KV và sao lưu site cũ; hoặc dùng npm/wrangler theo hướng dẫn.
3. Trong thư mục mã: `npm run check` để chạy kiểm thử và preflight build; `npm run deploy` để cập nhật Worker thực khi đã cấu hình chính xác.
4. Sau khi triển khai có xác nhận: website `/`, quản trị `/admin/`, sitemap `/sitemap.xml`.

**Lưu ý:** Không được đăng bản V2 bằng cách kéo thả ZIP tĩnh. Worker có backend lưu trữ và cần binding `OLYMPIC_KV` cùng Cloudflare Secret `ADMIN_PASSWORD`. Mã này **không kèm mật khẩu mặc định**. Không gửi mật khẩu hoặc API token qua chat.

## Hạn chế và thông tin cần xác minh

- Các giấy tờ bán hàng, phân khu và quỹ căn cần bổ sung tài liệu gốc trước khi khẳng định điều kiện mở bán.
- Thông tin trong trang `/gia-ban/` là hướng dẫn kiểm tra giá, không phải bảng hàng đã được xác nhận.
- Hình ảnh đi kèm là concept AI, không phải phối cảnh được chủ đầu tư phê duyệt. Việc tự sửa ảnh của bên khác **không** tạo quyền sử dụng ảnh.
- KV Free có giới hạn, tính nhất quán cuối cùng (eventual consistency); lượng lớn lead nên cân nhắc Cloudflare D1 và hệ thống cảnh báo/backup độc lập. Hiện không gửi email/Zalo tự động.
- Không có tài khoản GitHub/Search Console được thao tác trong quá trình tạo mã; cần cấp quyền để thực hiện kết nối và phát hành ngoài môi trường này.

## Tài liệu đi kèm

- `PHAT-HANH-VA-SEARCH-CONSOLE.md` – checklist cài đặt, QA, Cloudflare, Search Console.
- `KIEM-KE-NGUON-VA-SEO.md` – nguồn tài liệu, keyword map, kế hoạch 7 giai đoạn.
- `DEPLOY-GITHUB.md` – cách tạo repo GitHub, workflow deploy thủ công.
- `research/SOURCE-INVENTORY.json` – danh sách nguồn và độ tin cậy.
- `tests/*.test.js` – kiểm thử tự động (17 bài), `scripts/build.js` – kiểm tra preflight.

Trang này là trang tư vấn bất động sản độc lập của Mạnh Việt, không phải website chính thức của Vingroup/Vinhomes.
