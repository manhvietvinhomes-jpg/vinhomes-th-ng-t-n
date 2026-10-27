# Tối ưu SEO toàn site — 27/10/2026

Đã phát hành tại https://vinhomesthuongtin.vn/. Worker version: `72420e0f-3ddf-410f-a5ea-184ef4d29784`.

## Những thay đổi chính

- Trang chủ dùng title **Vinhomes Olympic Thường Tín: Quy hoạch, vị trí và pháp lý**, meta riêng theo ý định tìm kiếm và H1 **Vinhomes Olympic Thường Tín – Đô thị thể thao phía Nam Hà Nội**. Dấu cách giữa hai phần thương hiệu có trong DOM. JavaScript dùng cùng trường SEO với HTML máy chủ, không ghi đè về tên thương hiệu cũ.
- CMS bổ sung trường title SEO trang chủ và phần mô tả trong H1. Giữ tên thương hiệu riêng với title tìm kiếm.
- Menu Tổng quan, Vị trí, Sản phẩm, Tin tức tới các URL chuyên đề. Nút vị trí tới `/vi-tri/`. Cards dùng liên kết trong H3, bỏ nhãn từ khóa lặp và các anchor “đọc tin/đọc thông tin” chung chung. Mũi tên trang trí bằng CSS, không nằm trong text liên kết. Loại Facebook rỗng khỏi HTML; chỉ hiện khi có URL Facebook hợp lệ.
- Trang trụ cột giữ vai trò nền tảng. Bốn bài dễ trùng ý định được biên tập lại thành: đối chiếu tên dự án; đọc địa danh trong hồ sơ phân khu B; đọc hồ sơ lấy ý kiến 1/500; đọc thông báo bồi thường/GPMB. Giữ URL bài đã phát hành, bổ sung liên kết về trụ cột phù hợp. Hai bài sản phẩm/giá cũng đổi tiêu đề và từ khóa theo ý định hướng dẫn so sánh/kiểm tra, khác trang dữ liệu nền. Giữ ngày xuất bản 21/10, ghi ngày sửa 27/10 riêng trong Article schema.
- Gộp bốn trang loại hình mỏng bằng **301**, giữ nội dung hữu ích trong `/san-pham/`: `/biet-thu/`, `/lien-ke/`, `/shophouse/` dưới tiền tố `/san-pham/` tới các mục cùng tên; `/san-pham/khong-gian-do-thi/` tới `/quy-hoach/`. Chuyển hướng trực tiếp cả URL có/không có slash, giữ query. Không xóa nội dung sản phẩm cũ trong KV. Trang sản phẩm tổng hợp vẫn indexable; trang sản phẩm tự thêm chưa đủ hồ sơ được noindex và không đưa vào sitemap.
- Sitemap hiện có **96 URL chuẩn**. Đây là thay đổi có chủ đích để gộp trang mỏng, không phải mất bốn URL do lỗi. Các URL cũ có đích 301 rõ ràng. Vẫn giữ **84 bài xuất bản**.
- Trang chủ có khối thông tin nhanh, phạm vi từng số liệu, nguồn tài liệu gốc và FAQ ngắn. FAQ hiển thị khớp JSON-LD; không hứa hẹn kết quả tìm kiếm dạng đặc biệt.
- Thư viện, số liệu, tiện ích, thẻ sản phẩm và bài liên quan được dựng trong HTML trước JavaScript. Thẻ loại hình không dùng ảnh tưởng tượng làm ảnh sản phẩm. Alt mô tả cảnh thực sự trong ảnh, có kích thước ảnh để giảm dịch chuyển bố cục. Bài cẩm nang không còn lặp ảnh đô thị không liên quan trong phần hero.

## Đối chiếu nguồn

Đã đọc nội dung bài UBND Dân Hòa: khoảng 9.171 ha và bốn phân khu. Đã tải và trích xuất Quyết định 916/QĐ-SNNMT ngày 13/04/2026: phần trang 2–3 xác định phân khu B, địa điểm bốn xã và diện tích 2.944,39 ha. Dữ liệu không bị suy rộng thành điều kiện bán hoặc pháp lý mọi sản phẩm.

Nguồn QHKT cũ liên quan 16.093 ha trả 404; chưa kiểm chứng lại văn bản gốc nên không đưa số đó vào trang chủ. Liên kết tài liệu công khai được lọc theo các nguồn đã kiểm tra. Chi tiết tại `research/seo-source-review-2026-10-27.json`. Không tạo lịch bán hoặc giá mới.

## Kiểm tra và bảo toàn dữ liệu

- **28/28 kiểm thử** đạt, bao gồm H1, FAQ, nguồn, canonical, 301 và bảo đảm trang `/san-pham/` không bị noindex ngoài ý muốn.
- Audit **production**: 96 URL, cả 96 reachable từ trang chủ; 14 tệp ảnh; **0 lỗi, 0 cảnh báo**. Kiểm tra thêm header robots, link rỗng và các URL 301.
- Chromium desktop/mobile trên production: title/meta/H1 trước và sau JavaScript trùng nhau; gallery có sẵn khi tắt JS; không link rỗng, không tràn ngang, không lỗi JavaScript; chuyển hướng tới đúng mục trong chuyên đề.
- Smoke local giữ luồng form → CMS → xóa lead thử và lưu 84 bài đạt. Trong đợt sửa SEO này không tạo/xóa lead production.
- Đã sao lưu trước thay đổi tại `/workspace/deployment-backups/2026-10-27T08-53-08.910Z/`, gồm Worker và KV. Phiên bản trước đợt SEO là `753ec103-c3b6-4301-9463-9a7d3e61bc50`. Chưa thử rollback production; phục hồi KV cần giữ các lead mới.
- Migration kiểm tra baseline theo từng trường: dry-run dự kiến 68 trường; sau triển khai hai trường mới đã có mặc định phù hợp, còn 66 trường được ghi. Không có xung đột. Chạy lại dry-run báo **0 thay đổi**, xác nhận tính lặp lại. Bài chỉnh riêng hoặc trường có xung đột sẽ làm lệnh dừng trước khi ghi; không nạp đè toàn bộ seed hoặc đụng lead.

Báo cáo máy tại `dist/seo-audit.json`, `dist/seo-production-browser.json`, `dist/browser-smoke.json`. Danh sách canonical ở `dist/indexable-urls.txt`. Workflow audit hằng ngày và khi push đã dùng danh sách canonical mới.

Các thay đổi giảm nguy cơ trùng ý định và cải thiện khả năng thu thập thông tin; chưa có dữ liệu Search Console để kết luận mức ảnh hưởng tới thứ hạng hoặc xác nhận đã index.
