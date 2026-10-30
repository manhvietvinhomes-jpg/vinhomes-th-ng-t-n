# Báo cáo phát hành — 30/10/2026

Website đã phát hành: https://vinhomesthuongtin.vn. Cloudflare Worker `royal-snow-1e06`, phiên bản **b5e99662-61c4-4d3b-aa03-a896621a8db0**. Số liên hệ và tel đã đổi thành **0989.294.744** / `tel:0989294744`; Zalo dùng số tương ứng. Chưa kiểm tra được cuộc gọi thật hoặc quyền sở hữu tài khoản Zalo.

## Kết quả nội dung và URL

- Đã đọc đầy đủ 96 URL trước sửa bằng Chromium. Kiểm toán và bảng quyết định từng URL: [kế hoạch](KIEM-TOAN-VA-KE-HOACH-2026-10-30.md).
- Hiện có **20 URL trong sitemap**: trang chủ, chín chuyên đề nền tảng, bốn bản tin sự kiện, mục tin, chính sách bảo mật và bốn trang giới thiệu/liên hệ/tác giả/biên tập.
- Chín chuyên đề có 1.835–1.991 từ đếm theo khoảng trắng, không tính FAQ/menu. Mỗi chuyên đề mở bằng ba câu trả lời nhanh, có bảng và hướng dẫn thực hành tích hợp từ bài mỏng cũ; năm FAQ dẫn nguồn ngoài, bốn liên kết nội bộ mô tả. Không nhồi FAQ vào trang vận hành/mục lục khi không có căn cứ ngoài phù hợp. Toàn site có 70 câu trả lời FAQ hiển thị trùng khớp schema.
- **84 bài cũ được gộp và 301**, không xóa dữ liệu. CMS giữ 84 bản gốc làm nháp, một nháp có từ trước và bốn bản tin mới đang xuất bản. Bảng chuyển hướng trong `content/redirect-map.json`; bốn trang sản phẩm concept cũ vẫn chuyển hướng theo `src/editorial.js`. URL đã gộp không nằm trong sitemap. Giảm số URL có thể làm biến động hiệu suất tìm kiếm; chưa có Search Console để đo traffic/backlink trước/sau.
- Tin mới ghi riêng ngày sự kiện trong tiêu đề/nội dung và ngày biên tập 30/10/2026; không lùi ngày bản tổng hợp về tháng 2/tháng 4 để giả làm tin gốc.
- Sơ đồ minh họa theo chủ đề được dựng thành WebP 1000×650, có alt/caption đúng bản chất và og:image riêng cho các trang con. Không giả bản đồ địa chính, ảnh công trường hoặc phối cảnh chính thức.

## Kỹ thuật đã triển khai

Menu chuyên đề trỏ URL thật. Không thấy Facebook trỏ # trong bản quét. Đã bỏ link quản trị khỏi footer, chuyển giao diện tới đường được cấu hình trong `src/admin-config.js`, đường `/admin/` và asset cũ trả 404. Mật khẩu giữ nguyên, đăng nhập giới hạn 10 lần sai/giờ theo IP; cookie HttpOnly/Secure/SameSite và kiểm tra Origin được giữ. Có mã hỗ trợ TOTP và kiểm thử RFC 6238, **chưa bật hai lớp ở tài khoản thật** vì chủ tài khoản phải có ứng dụng/khóa khôi phục. Bộ đếm KV/chống dùng lại mã không nguyên tử toàn cầu; không gọi đây là chứng nhận chống tấn công phân tán.

Các trang có lang vi, canonical, title/meta riêng, og:site_name/locale, Twitter, WebSite/Organization và Breadcrumb; bài dự án có Article và FAQPage khi có FAQ thật. Hiển thị ngày dd/mm/yyyy, ISO dành cho máy đọc. 404 có menu liên kết trang chính; robots chặn đường quản trị/API; sitemap chỉ có URL index. Honeypot ẩn hoàn toàn. Sửa lỗi tràn bảng mobile và lỗi JavaScript khi đổi footer; bỏ phụ thuộc font ngoài ở trang công khai. API site và seed public không xuất bài nháp; API quản trị giữ bản gốc sau xác thực.

Footer và trang tác giả dùng tên Mạnh Việt cùng vai trò hiện biết. **Chưa thêm tên pháp nhân, địa chỉ đăng ký, MST hay chứng chỉ chưa được xác minh.** Không dùng thông tin chủ đầu tư làm thông tin vận hành website.

## Kiểm thử và bằng chứng

- `npm run check`: **37/38 kiểm thử**, preflight build và audit local đạt.
- Smoke trên localhost: tám lượt desktop/mobile, gửi form → kiểm tra lead trong CMS → xóa đúng lead giả; đăng nhập, sửa/khôi phục FAQ và lưu/đọc nội dung đạt. Không tạo lead thử trên production trong đợt này.
- Browser chỉ đọc: **40 lượt desktop/mobile** trên tất cả 20 trang, cùng trang chủ và tổng quan tắt JavaScript; không tràn ngang, ảnh hỏng, lỗi JS hoặc link quản trị công khai. Các tel đều dùng số mới.
- Audit live: **20 URL, 20 truy cập được từ trang chủ, 23 asset dùng thực, 0 lỗi/0 cảnh báo trong phạm vi kiểm tra**. Title dài nhất 57, meta dài nhất 137. Cả chín thân bài hiển thị có 1.835–1.991 từ, loại ký hiệu Markdown và bảng; CMS từ chối lưu trụ cột nằm ngoài 1.800–2.500. Mỗi trang nhận liên kết từ 19 trang khác, phần lớn từ điều hướng/footer; không coi đó là 19 liên kết biên tập trong thân bài.
- 84 redirect cũ được kiểm tra đích trực tiếp trên production; kiểm thử trong mã kiểm tra thêm www/http, query và có/không slash. Tất cả đích là trang chuẩn hiện công khai.
- Migration **214 thay đổi** theo baseline và một cập nhật bổ sung thân bài vị trí để kiểm tra số từ hiển thị, không xung đột; chạy lại dry-run **0 thay đổi**. Không chạm lead/nội dung riêng ngoài các trường được liệt kê.

Artifact: `dist/seo-audit-live-2026-10-30.json`, `dist/journalism-production-browser.json`, ảnh `dist/screenshots/journalism-production-*.png`; bộ HTML/metadata/FAQ/nguồn/schema của 20 URL ở `dist/editorial-review/`.

Quan sát trình duyệt production không throttle: LCP lớn nhất khoảng **0,77 giây**, CLS lớn nhất khoảng **0,014** trong mẫu 40 lượt. Đây là một phép đo lab của môi trường này, **không phải PageSpeed Insights hoặc Core Web Vitals người dùng thật**. Không tuyên bố đã đạt kiểm định PSI, Rich Results hay Google đã index.

## Sao lưu và khôi phục

Trước sửa số: `/workspace/deployment-backups/2026-10-30T08-22-50.262Z/`. Trước hai lần deploy: `/workspace/deployment-backups/2026-10-30T08-54-58.415Z/` và `/workspace/deployment-backups/2026-10-30T09-03-06.490Z/`. Bản sau lần đầu: `/workspace/deployment-backups/2026-10-30T08-57-49.065Z/`. Bản sau phát hành cuối và kiểm tra: `/workspace/deployment-backups/2026-10-30T09-07-14.289Z/`. Có SHA256, Worker/domain/settings/deployment và KV; secret không được xuất. Không đưa backup hoặc mật khẩu vào Git. Backup KV không nguyên tử và chưa diễn tập restore; không đè toàn KV lên dữ liệu khách mới khi rollback. Đường dẫn và phiên bản rollback được ghi trong manifest riêng.

## Giới hạn và việc còn lại

Đã dùng tìm kiếm nội bộ Dân Hòa và đọc mười kết quả cùng các hồ sơ Hà Nội. Google/Bing bị proxy chặn nên **chưa làm được bảng 6–8 đối thủ đầu Google theo từng từ khóa, PAA/autocomplete**. Sáu từ khóa phụ mỗi chuyên đề là phân nhóm biên tập, không phải dữ liệu lượng tìm kiếm. Nhiều số liệu quan trọng chỉ có một hồ sơ gốc; đã ghi nguồn/ngày và liệt kê trong [bảng kiểm dữ kiện](research/2026-10-30/DU-KIEN-CAN-DOI-CHIEU.md), không tự nhận có hai nguồn độc lập.

Chưa có ảnh thực địa, phép đo Google Maps, bảng giá có hiệu lực hoặc hồ sơ vận hành doanh nghiệp để điền các trường còn thiếu. Các khung chờ được giữ minh bạch, không bịa giá, phút di chuyển hay trải nghiệm. [Checklist vận hành](VAN-HANH-VA-CHECKLIST-2026-10-30.md) ghi rõ việc cần tài khoản/hồ sơ thật: Search Console, PSI, Rich Results Test, ghép hai lớp, xác minh pháp nhân và lịch cập nhật tiến độ/giá hằng tháng.
