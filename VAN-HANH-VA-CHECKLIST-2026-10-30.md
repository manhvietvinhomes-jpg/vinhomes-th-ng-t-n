# Vận hành và việc cần chủ website hoàn thiện

## Cài và tự kiểm tra

```sh
npm ci --no-audit --no-fund
npm run dev:prepare
npm run content:sync
node scripts/render-editorial-images.mjs
npm run check
npm run dev -- --local --ip 127.0.0.1 --port 8791
```

Trong terminal khác: `SMOKE_BASE=http://127.0.0.1:8791 npm run test:browser`. Lệnh trình duyệt tạo và xóa dữ liệu kiểm thử trên localhost; không chạy với production. Audit public thật: `node scripts/cloudflare-command.js audit --expected-count=20`. Dựng bộ HTML/schema xem lại bằng `node scripts/export-editorial-review.mjs`.

Trụ cột: `content/journalism/*.md` và `content/journalism/pages.json`; dữ liệu bài cũ gộp trong `content/pre-journalism-seed.json`. Builder bổ sung hướng dẫn cũ theo chủ đề; giữ nội dung nền tảng mới ở đầu. Giới hạn 1.800–2.500 được đếm theo từ hiển thị, loại ký hiệu Markdown/bảng và không tính FAQ, menu; tiếng Việt có các âm tiết viết cách nhau. Chỉnh nội dung rồi dựng lại ảnh nếu tiêu đề/mục thay đổi. Không ghi thẳng file sinh tự động `src/page-content.js`.

## Triển khai và bảo toàn dữ liệu

Trước phát hành: `npm run release:backup`, `npm run check`, `node scripts/deploy-guard.js`, rồi `node scripts/cloudflare-command.js deploy`. Với đợt này, chạy migration đã chuẩn bị `node scripts/cloudflare-command.js seo-migrate --patch=content/journalism-migration-patch.json --apply`, kiểm tra lại live và chạy lại dry-run phải 0 thay đổi. Bản vá bổ sung `content/visible-words-migration-patch.json` chỉ sửa bài vị trí trên baseline sau lần triển khai đầu, cũng kiểm tra lặp về 0. Bộ patch tổng đã được cập nhật phản ánh nội dung cuối. Migration phát hiện xung đột theo từng trường, không ghi đè chỉnh sửa riêng và không chạm lead. Không dùng bộ patch này cho nội dung mới khác ngày.

Bản gốc 84 bài vẫn là bản nháp trong CMS; một bản nháp có từ trước cũng được giữ. Bảng 301: `content/redirect-map.json`, cộng bốn URL sản phẩm trong `src/editorial.js`. Sitemap chỉ có URL đang công khai. Giảm 96 xuống 20 URL là quyết định gộp nội dung mỏng, có rủi ro biến động tìm kiếm; chưa có dữ liệu Search Console để định lượng traffic/backlink. Không khôi phục toàn bộ KV đè lên lead phát sinh sau backup. Muốn rollback URL phải khôi phục cả phiên bản Worker và riêng cấu hình/nội dung CMS liên quan, sau khi so thay đổi mới.

## Quản trị và hai lớp

Đường dẫn quản trị được cấu hình tại `src/admin-config.js`; `/admin/` và asset cũ trả 404. Mật khẩu hiện có giữ nguyên; cookie HttpOnly/Secure/SameSite, giới hạn 10 lần sai/giờ theo IP. Đổi đường dẫn không thay thế xác thực và robots không phải cơ chế giữ bí mật. Bộ đếm KV và chống dùng lại TOTP không phải thao tác nguyên tử toàn cầu; với yêu cầu chống tấn công đồng thời cao cần thêm Cloudflare Access/rate limiting ở biên hoặc Durable Object.

Đã có hỗ trợ TOTP nhưng chưa bật cho tài khoản thật. Để bật: tạo khóa base32 ngẫu nhiên ít nhất 160 bit trong trình quản lý mật khẩu/ứng dụng xác thực của chủ tài khoản, ghép ứng dụng với khóa đó, lưu bản khôi phục riêng rồi đưa khóa qua `wrangler secret put ADMIN_TOTP_SECRET` bằng kênh riêng. Không gửi khóa qua chat, Git hay báo cáo. Kiểm tra mã hợp lệ, mã sai và đăng nhập lại trước khi kết thúc cấu hình. Không tự bật một yếu tố mà chủ tài khoản chưa có. Cloudflare Access là lựa chọn bổ sung nếu tài khoản có quyền cấu hình.

## Việc cần người có hồ sơ hoặc tài khoản làm

- Xác nhận số 0989.294.744 và tài khoản Zalo tương ứng đang hoạt động; hệ thống chỉ kiểm tra được liên kết, không xác nhận cuộc gọi đến.
- Cung cấp tên pháp nhân vận hành, địa chỉ đăng ký, MST và thông tin nghề nghiệp có thể đối chiếu. Không mượn địa chỉ/MST của Vinhomes để điền footer.
- Bổ sung ảnh thực địa được phép dùng, ngày/địa điểm/hướng chụp; thay các khung `[MẠNH VIỆT BỔ SUNG: ...]`. Các sơ đồ hiện tại là đồ họa nội dung, không phải bản đồ chính thức.
- Đo các hành trình được đánh dấu bằng Google Maps với điểm đầu/cuối thật và giờ đi lại; không thay khung bằng phút đoán.
- Đối chiếu các con số một nguồn và tài liệu dẫn chiếu trong `research/2026-10-30/DU-KIEN-CAN-DOI-CHIEU.md`. Tra văn bản mới nếu muốn xác nhận trạng thái pháp lý hiện tại.
- Hoàn tất ghép ứng dụng xác thực để bật hai lớp; không chia sẻ mật khẩu/khóa trong chat.

## Google Search Console

1. Thêm Domain property `vinhomesthuongtin.vn`, lấy TXT xác minh từ chính tài khoản Google của chủ sở hữu và thêm vào DNS Cloudflare. Không thay nameserver. Kiểm tra TXT rồi xác minh.
2. Gửi `https://vinhomesthuongtin.vn/sitemap.xml`. Sitemap hiện chỉ có 20 URL chuẩn; giữ các 301 cũ để Google chuyển tín hiệu theo thời gian.
3. URL Inspection: kiểm tra trang chủ, chín trụ cột và các bản tin; dùng Test live URL, kiểm tra canonical rồi yêu cầu lập chỉ mục URL quan trọng trong hạn mức của Google. Không gửi một loạt URL chuyển hướng hoặc quản trị.
4. Theo dõi Page indexing, lỗi fetch/404, soft 404, duplicate/canonical, chuyển hướng và Manual actions/Security. “Page with redirect” ở URL đã gộp là kết quả dự kiến. Không xem gửi sitemap là bằng chứng đã được index.
5. Theo dõi hiệu suất truy vấn/URL trước và sau gộp ít nhất một chu kỳ đủ dữ liệu; kiểm tra bài nào mất traffic/backlink trước khi sửa bản đồ 301.

## PageSpeed và Rich Results

Mở https://pagespeed.web.dev/ và đo mobile/desktop trang chủ, `/tong-quan/`, `/vi-tri/`, một bản tin. Mục tiêu LCP ≤2,5 giây và CLS ≤0,1; phân biệt lab một lần chạy với dữ liệu người dùng thực theo thời gian. Chưa có kết quả PSI thì không ghi là đạt Core Web Vitals.

Mở https://search.google.com/test/rich-results và kiểm tra URL đã xuất bản. Xem Article, BreadcrumbList, tính đồng nhất dữ liệu hiển thị và JSON-LD. FAQPage hợp lệ về cú pháp không bảo đảm Google hiển thị FAQ rich result; website này không tự nhận là cơ quan chính phủ hay tổ chức y tế. Các trang vận hành và mục lục không được nhồi FAQ không có căn cứ bên ngoài chỉ để đủ số lượng; năm FAQ áp dụng cho bài dự án/chuyên đề và trang chủ.

## Lịch cập nhật

Hằng tháng: rà tiến độ và dữ liệu giá có tài liệu mới; ghi nội dung đổi và ngày nguồn. Mỗi tuần: xem audit link/HTTP, form và cảnh báo Search Console. Mỗi quý: rà điều kiện pháp lý, thông tin tác giả/đơn vị vận hành và quyền ảnh. Khi có quyết định mới: cập nhật đúng chuyên đề và tin sự kiện, giữ lịch sử mốc cũ. Không tự đổi ngày nếu nội dung không được rà soát.
