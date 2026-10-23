# QUY TRÌNH KIỂM THỬ, TRIỂN KHAI, SEARCH CONSOLE

**Chưa thể khẳng định bản mới đã online:** mã được tạo và test trong môi trường phát triển. Các thao tác đăng nhập và triển khai trên tài khoản thật phải do chủ tài khoản hoặc phiên làm việc được cấp quyền thực hiện.

## A. Trước triển khai

1. Tải lại mã gốc hiện đang chạy và sao lưu nội dung đã sửa, ảnh và leads (nếu đã có). Trong Cloudflare xem các deployment cũ của `royal-snow-1e06`, ghi mã phiên bản gần nhất để có đường khôi phục.
2. Đăng nhập đúng Cloudflare account sở hữu `royal-snow-1e06` và domain `vinhomesthuongtin.vn`.
3. Tạo KV namespace `vinhomes-olympic-data` tại **Storage & databases → KV**; lấy ID 32 ký tự.
4. Giải nén ZIP, mở cửa sổ CMD trong thư mục, cài Node.js LTS (nếu chưa có).
5. Chạy `npm install` (cần Internet), `node scripts/prepare.js <ID_KV>` (phải thay bằng ID thực).
6. Chạy `npx wrangler login`, tiếp theo `npx wrangler secret put ADMIN_PASSWORD`. Tự đặt mật khẩu mạnh >=12 ký tự, không đưa mật khẩu vào ZIP hoặc GitHub.
7. Chạy `npm run check` (Node tests + preflight) và `npm run deploy` để Wrangler đóng gói và xuất bản vào **Worker cùng tên**.

**Không** kéo thả ZIP như website tĩnh. Không đổi Nameserver lại. Nếu Wrangler báo thiếu KV binding hoặc sai account, dừng trước khi xác nhận thành công.

## B. Kiểm thử website sau deploy (bắt buộc)

Mở trên máy tính **và** điện thoại thật, kiểm tra từng mục:

- `https://vinhomesthuongtin.vn/`: HTTP 200, đủ banner, ảnh WebP, menu và nút gọi/Zalo; không có ảnh giả làm phối cảnh chính thức.
- `https://vinhomesthuongtin.vn/tong-quan/`, `/gia-ban/`, `/phap-ly/`, `/quy-hoach/`: HTTP 200; nguồn khớp; bảng giá không hiển thị con số chưa xác thực.
- `/admin/`: đăng nhập bằng secret; thử tạo trang nháp, sửa và lưu; ẩn trang kiểm tra trả 404; thử đăng lại; **không dùng mật khẩu giả/ghi vào mã**.
- Upload thử ảnh mới, kiểm tra nó xuất hiện sau khi bấm **LƯU THAY ĐỔI**.
- Form: dùng **số điện thoại thử của chính bạn**, tích đồng ý, gửi một lần; kiểm tra lead trong admin, xuất CSV; thử yêu cầu thiếu đồng ý để chắc chắn bị từ chối; xóa lead thử.
- Kiểm tra `/sitemap.xml` đọc được; `/robots.txt` không chặn các trang công khai; `/admin/` không index.
- Mở devtools hoặc xem nguồn trang: canonical trỏ về cùng URL HTTPS, title/description riêng, structured data là JSON hợp lệ.
- Kiểm tra mobile: menu hamburger hoạt động, chữ không tràn, form dễ nhập, CTA dễ bấm.
- Tại Cloudflare: Workers & Pages → `royal-snow-1e06` → Domains; đảm bảo `vinhomesthuongtin.vn` trỏ **Production**; kiểm tra DNS và HTTPS ổn định; thử cả `www` nếu đã cấu hình, điều hướng thống nhất về bản chuẩn.
- Kiểm tra `robots`/sitemap chỉ khi website mới được xác nhận online; những bước trước không được coi là xác nhận live.

## C. Đảm bảo an toàn với khách hàng

- Form lưu số điện thoại và nội dung quan tâm trong KV; chỉ người có quyền admin mới xem/xóa. Nên bật 2FA Cloudflare và sao lưu nội dung/lead định kỳ.
- Gói KV miễn phí có hạn mức và đồng bộ cuối cùng; với nhiều lead hoặc nhu cầu giao dịch lớn hãy nâng cấp D1/R2 và có lịch sao lưu/monitoring.
- Chưa có cơ chế push lead sang Zalo hoặc email tự động; cần mở mục **Khách đăng ký** để xem.
- Không điền giá/địa chỉ chính xác lô nếu chưa có hồ sơ hợp lệ; không đăng ảnh không được cấp phép.

## D. Google Search Console – cần chủ website đăng nhập và xác minh

1. Mở https://search.google.com/search-console/ bằng tài khoản Google muốn quản trị dữ liệu tìm kiếm.
2. Chọn **Thêm thuộc tính → Domain** và nhập `vinhomesthuongtin.vn` (không nhập `https://`).
3. Google cấp **TXT verification record**. Vào Cloudflare → Domain `vinhomesthuongtin.vn` → DNS → Records → tạo TXT với tên và giá trị Google yêu cầu. Không tự chế mã TXT.
4. Quay lại Search Console bấm **Verify** sau khi TXT đã có hiệu lực.
5. Mở Sitemaps → gửi `sitemap.xml` (hoặc đường dẫn đầy đủ `https://vinhomesthuongtin.vn/sitemap.xml`). Xem trạng thái gửi thành công; không đồng nghĩa đã được lập chỉ mục.
6. URL Inspection → kiểm tra lần lượt trang chủ, `/gia-ban/`, `/phap-ly/`, `/tong-quan/`. Nếu phù hợp, bấm **Request indexing**; Google quyết định có lập chỉ mục hay không.
7. Sau 1–2 tuần, xem **Performance → Search results**, lọc Pages và Queries; ghi lại trang tăng impressions/clicks và trang có lead thực. Cập nhật nội dung theo câu hỏi khách hàng.

## E. Bước cần người dùng cấp quyền

- Phát hành lên Workers: cần xác thực Cloudflare của bạn và thông tin KV binding, Secret.
- Đẩy repo: cần tên GitHub repository và quyền ghi; hiện chưa có repository được chỉ định.
- Search Console: cần tài khoản Google được cấp quyền; hiện chưa có.
- Không dùng tài khoản, mật khẩu, API token đưa qua nội dung chat; nhập chúng tại giao diện dịch vụ tương ứng.
