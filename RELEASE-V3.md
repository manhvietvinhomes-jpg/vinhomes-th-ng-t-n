# Phát hành V3 — giữ dữ liệu production

Phạm vi đã được người dùng yêu cầu: phát triển và phát hành website, mở rộng lên 100 URL, tối ưu SEO và liên kết nội bộ. Không cần xin lại chấp thuận cho các bước trong phạm vi này. Dừng khi thiếu quyền truy cập thực tế hoặc không xác định được đúng tài nguyên cần bảo vệ.

## Điều kiện truy cập

Trong môi trường đám mây, thêm `CLOUDFLARE_API_TOKEN` qua mục Secrets, destination `api.cloudflare.com`, và `CLOUDFLARE_ACCOUNT_ID` qua mục biến môi trường. Token cần quyền Workers Scripts, Workers KV Storage và đọc thông tin domain Workers trong đúng tài khoản. Không gửi token hoặc mật khẩu qua chat; không lưu chúng vào Git. Khi quyền đọc bị từ chối, kiểm tra quyền tương ứng và tài khoản thay vì tạo tài nguyên thay thế.

Không giả định đã đăng nhập chỉ vì có GitHub token. Chạy `npx wrangler whoami` hoặc kiểm tra API bằng token đã được cấp. Nếu dùng OAuth trên máy cá nhân, có thể dùng `npx wrangler login`; tiện ích sao lưu hiện yêu cầu API token trong biến môi trường.

## Kiểm kê và sao lưu trước khi sửa production

```sh
npm run release:backup
```

Lệnh **chỉ đọc**, xác nhận `vinhomesthuongtin.vn` gắn đúng Worker `royal-snow-1e06`, lấy settings, deployment đang hoạt động và nội dung Worker. Nếu có `OLYMPIC_KV`, nó đọc toàn bộ keys, metadata và giá trị dạng base64, lưu ngoài checkout tại `/workspace/deployment-backups/<timestamp>/` với quyền file hạn chế và SHA-256. Không upload thư mục này lên GitHub; có thể chứa thông tin khách hàng.

Giới hạn: KV không có snapshot giao dịch nguyên tử. Tạm ngừng chỉnh CMS trong lần sao lưu cuối và kiểm tra manifest; công cụ không xuất được giá trị secret. Worker static assets cần dựa vào phiên bản đã ghi nhận để rollback; file nội dung Worker riêng lẻ không khôi phục đủ assets. Đã chạy sao lưu xác thực trước lần phát hành 27/10/2026; chưa thử khôi phục production, không được mô tả là đã kiểm chứng khả năng rollback.

Nếu script gặp binding KV ngoài `OLYMPIC_KV`, nó dừng để kiểm kê và sao lưu thêm. Không xóa hoặc thay namespace có sẵn. Nếu Worker chưa có KV, tạo namespace trong đúng tài khoản sau khi xác minh inventory; ghi lại ID, không thay binding đang chứa dữ liệu.

## Cấu hình và triển khai

1. Đọc namespace ID thực từ settings đã kiểm kê. Nếu chưa có namespace, tạo bằng công cụ Cloudflare trong đúng tài khoản. Không đoán ID.
2. Chạy `node scripts/prepare.js <namespace-id-thật>` để cập nhật cấu hình.
3. Kiểm tra `ADMIN_PASSWORD` có tồn tại trong Worker settings. Giữ secret hiện có. Chỉ khi thực sự thiếu, đặt bằng `npx wrangler secret put ADMIN_PASSWORD` qua kênh nhập an toàn; không dùng mật khẩu local và không xuất secret ra báo cáo.
4. Chạy `npm run deploy`. Lệnh chạy kiểm thử/audit và chặn namespace placeholder trước khi Wrangler deploy.
5. Nếu KV đã có `site:content`, dùng CMS nhập các bài còn thiếu, giữ nội dung và trạng thái bài hiện có. Xem bản sao lưu trước, không PUT toàn bộ seed lên production.
6. Kiểm tra `https://vinhomesthuongtin.vn/`, `/admin/`, `/tin-tuc/`, bài mới, ảnh, `/robots.txt`, `/sitemap.xml`. Chạy `npm run audit:live` sau khi bộ nội dung mới đã được lưu. Nếu production có bài riêng, điều chỉnh mục tiêu URL một cách minh bạch; không xóa dữ liệu để làm audit xanh.
7. Kiểm tra form production bằng một lead thử có đánh dấu, xác nhận trong CMS rồi xóa đúng lead thử. Việc này chưa được thực hiện khi chưa triển khai và chưa có quyền CMS.

Workflow GitHub deploy cũ là lựa chọn thủ công, cần các secrets Cloudflare và repository variable `CLOUDFLARE_KV_NAMESPACE_ID` thật. Nó không thay thế bước sao lưu bên ngoài CI; không dùng khi chưa hoàn thành kiểm kê và lưu bản sao bên ngoài runner.

## Rollback

Đọc `deployments.json` trong backup, xác định phiên bản production trước phát hành. Nếu trước đó là một phiên bản duy nhất, sử dụng lệnh rollback Wrangler với ID đã ghi nhận và kiểm tra đúng Worker trước khi chạy. Nếu deployment chia tỷ lệ nhiều phiên bản, giữ nguyên thông tin tỷ lệ và lập phương án khôi phục tương ứng; không chọn ngẫu nhiên một ID.

Rollback Worker không tự hoàn tác nội dung KV. Khi cần khôi phục nội dung, chỉ phục hồi phần đã đổi từ backup sau khi đối chiếu các chỉnh sửa và lead mới. Không khôi phục đè toàn bộ namespace, vì có thể làm mất đăng ký sau thời điểm sao lưu. Không có thao tác rollback production nào đã được chạy trong môi trường này.

## Google Search Console

Sitemap là `https://vinhomesthuongtin.vn/sitemap.xml`. Chỉ gửi bằng tài khoản đã xác minh quyền sở hữu hoặc được cấp quyền phù hợp. Không dùng API Indexing để gửi hàng loạt URL bất động sản thông thường; không tuyên bố đã index dựa vào việc sitemap trả HTTP 200.

Lần tối ưu SEO 27/10/2026 giảm sitemap còn 96 URL chuẩn bằng cách gộp bốn trang loại hình mỏng. Di chuyển nội dung có kiểm tra xung đột dùng `node scripts/cloudflare-command.js seo-migrate` (dry-run), thêm `--apply` để áp dụng bản vá theo trường. Bản vá giữ bài và dữ liệu khách hàng; khi phát hiện trường đã được chỉnh khác baseline, lệnh dừng trước khi ghi. Không chạy lại một migration khác mà chưa xem nội dung và bản sao lưu.
