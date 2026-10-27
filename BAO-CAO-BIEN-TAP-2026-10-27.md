# Chuẩn biên tập toàn site — 27/10/2026

Đã phát hành trên https://vinhomesthuongtin.vn/.
Worker version: `861520d4-8304-4804-b3b0-cdd8f5939c9d`.

## Phạm vi

Biên tập và bổ sung toàn bộ **96 URL chuẩn đang có**, gồm 9 chuyên đề, 84 bài, trang chủ, danh mục cẩm nang và chính sách bảo mật. Giữ các chuyển hướng 301 của đợt trước; không tăng số URL bằng nội dung gần giống nhau.

Mỗi URL có hồ sơ riêng trong `content/editorial-pages.json`: ý định, title, meta, mở đầu, phần thân, FAQ, liên kết, hình và alt. 74 cẩm nang được bổ sung phần mở đầu và 222 câu trả lời riêng; các chuyên đề, bài dự án và trang chức năng bổ sung 66 câu trả lời, tổng **288 FAQ**. Sáu bài còn chất quảng bá được viết lại toàn bộ phần thân thành hướng dẫn trung lập.

## Chuẩn áp dụng

- Title không quá 60 ký tự, meta không quá 160, một H1; slug giữ nguyên không dấu. H2/H3 dựa vào câu hỏi thực tế, không ép lặp thương hiệu.
- Mở đầu 2–3 câu trả lời trực tiếp. Dữ liệu hiện tại của đợt này đều dùng hai câu.
- Mỗi trang có ba FAQ hiển thị khớp FAQPage JSON-LD. Căn cứ được ghi theo loại: câu trả lời thực hành dẫn đến phần giải thích biên tập trong bài; dữ kiện dự án có tài liệu gốc tương ứng. Không mạo nhận lời khuyên quản lý tiền, chọn căn hoặc khảo sát là trích dẫn của ngân hàng/cơ quan nhà nước.
- Mỗi phần nội dung chính có bốn liên kết sang trang khác, anchor mô tả đúng đích. Menu, chân trang, mục lục, danh mục 84 bài và liên kết tới chính mục nguồn trong bài được phân biệt với bốn liên kết này.
- Mỗi trang có lưu ý trang độc lập, hình minh họa và việc cần đối chiếu thông báo/hồ sơ chính thức.
- Bổ sung sơ đồ SVG tự biên tập theo chủ đề, với ba điểm kiểm tra cụ thể. Có 96 tệp được tạo; 95 dùng cho các trang con và trang chức năng, trang chủ tiếp tục dùng hình nền/thư viện có chú thích. SVG trang chủ được giữ làm tài sản dự phòng. Không dựng sơ đồ thành bản vẽ quy hoạch hoặc ảnh hiện trường giả. Ảnh hiển thị có alt, kích thước và chú thích; OG dùng ảnh thương hiệu WebP để tương thích chia sẻ.

Phân vai theo ý định và kiểm tra phần thân không trùng nguyên văn; các lưu ý, điều hướng và cấu trúc FAQ chung vẫn được dùng nhất quán. Chưa có dữ liệu Search Console để khẳng định không cạnh tranh từ khóa trong kết quả tìm kiếm hoặc đo tác động thứ hạng.

## CMS và dữ liệu

Bổ sung trường ý định, mở đầu, alt, chú thích, FAQ cùng căn cứ và danh sách liên kết. Có thể thêm/xóa FAQ trong giới hạn, sửa câu hỏi, câu trả lời và nguồn. Khi xuất bản, backend từ chối title/meta quá dài, mở đầu thiếu số câu, thiếu ý định/ảnh/alt, thiếu FAQ có căn cứ hoặc thiếu số liên kết. Bản nháp vẫn lưu được để biên tập tiếp.

Migration theo từng trường dựa trên baseline `8d8ae0c`: dry-run không xung đột; sau triển khai áp dụng **1.036 trường**, một trường mới đã có mặc định phù hợp nên không phải ghi lại. Không thay thế toàn bộ seed, không xóa bài và không đụng lead. 84 bài xuất bản được giữ. Chạy lại dry-run sau cập nhật báo **0 thay đổi**, xác nhận tính lặp lại.

Bản sao trước thay đổi: `/workspace/deployment-backups/2026-10-27T09-20-30.075Z/`.
Bản sao sau phát hành: `/workspace/deployment-backups/2026-10-27T09-57-41.882Z/`.
Các bản sao ngoài Git chứa settings, Worker, phiên bản và KV có kiểm tra SHA-256; chưa thử rollback production. Không công khai bản sao hoặc mật khẩu quản trị.

## Kiểm chứng

- **32/32 kiểm thử** đạt.
- Audit website thật: **96/96 URL**, **288 FAQ**, mỗi phần nội dung chính bốn liên kết; **0 lỗi, 0 cảnh báo**. Kiểm tra cả title/meta, H1, câu mở đầu, lưu ý, JSON-LD, ảnh, liên kết, sitemap, robots và 301.
- Audit kiểm tra **99 tệp ảnh được sử dụng**; các ảnh cũ được giữ để URL đã phát hành không bị mất.
- Chromium trên production: 12 lượt desktop/mobile cho trang tổng quan, vị trí, pháp lý, giá, cẩm nang tài chính và bảo mật. FAQ, ảnh SVG, title/meta và bốn liên kết đạt; không tràn ngang; không lỗi JavaScript. Kiểm tra khi tắt JS vẫn có FAQ và ảnh trong HTML.
- Smoke local: 8 lượt trang desktop/mobile, luồng form → CMS → xóa lead giả, lưu 84 bài; thêm kiểm tra sửa và khôi phục FAQ bằng giao diện quản trị. Không tạo lead thử production trong đợt này.

Chi tiết máy tại `dist/seo-audit.json`, `dist/editorial-production-browser.json`, `dist/browser-smoke.json` và các báo cáo migration. Lịch audit GitHub đã tự dùng bộ tiêu chí mới; thêm bài hợp lệ trong CMS không buộc số URL phải luôn là 96. Có thể yêu cầu kiểm tra quy mô hiện tại bằng `node scripts/cloudflare-command.js audit --expected-count=96`.

Các miền phục vụ tra cứu mở rộng đã lưu vào cấu hình môi trường dạng nháp; các yêu cầu tới nguồn chưa truy cập được không được coi là đã xác minh. Website đã phát hành độc lập với bản nháp này. Muốn áp dụng phần cấu hình mạng cho phiên sau, duyệt/lưu trong cài đặt rồi Publish môi trường.
