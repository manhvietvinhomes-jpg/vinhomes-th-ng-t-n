# Vinhomes Olympic — V3, CMS và kiến trúc SEO

Website tư vấn độc lập của Mạnh Việt Real Estate tại `https://vinhomesthuongtin.vn`, Worker `royal-snow-1e06`.

Bản hiện tại có **96 URL chuẩn trong sitemap**: trang chủ, 9 chuyên đề, 84 bài viết, danh mục cẩm nang và chính sách bảo mật. Bốn URL loại hình minh họa cũ được gộp bằng 301 vào chuyên đề sản phẩm/quy hoạch, không tiếp tục để trang mỏng trong sitemap. Số URL thực tế phụ thuộc nội dung CMS; không xóa bài riêng để ép số lượng.

**Đã phát hành và kiểm tra trên production ngày 27/10/2026.** Xem [báo cáo tối ưu SEO](BAO-CAO-SEO-2026-10-27.md). Bản phát hành V3 ban đầu có 100 URL được ghi nhận riêng trong [báo cáo phát hành](BAO-CAO-PHAT-HANH-2026-10-27.md).

## Phát triển

Node.js 22 trở lên, npm và Chromium nếu chạy kiểm thử giao diện.

```sh
cd /workspace/vinhomes-th-ng-t-n
npm ci --no-audit --no-fund
npm run dev:prepare
npm run check
npm run dev -- --local --ip 127.0.0.1 --port 8787
```

`dev:prepare` chỉ tạo `.dev.vars` ngẫu nhiên cho local khi chưa có, giữ file cũ, không in mật khẩu. File này được Git bỏ qua; không dùng nó để đặt lại mật khẩu production. Dùng checkout hiện có, không cần tạo worktree.

Trong terminal khác, khi Wrangler đã báo sẵn sàng:

```sh
npm run test:browser
node scripts/audit-seo.js --base=http://127.0.0.1:8787
npx wrangler deploy --dry-run --outdir dist/worker
```

Kiểm thử trình duyệt dùng Chromium tại `/usr/bin/chromium`; đặt `CHROMIUM_PATH` nếu máy khác. Nó chỉ cho phép chạy trên localhost, tạo lead giả, kiểm tra qua CMS rồi xóa lead giả. Không chạy smoke ghi dữ liệu trên production.

## Nội dung và audit

- Biên tập 74 bài mới tại `content/guides/74-bai-cam-nang.json`; 10 bài cũ ở `src/articles.js`.
- `npm run content:sync` tạo `src/guides.js`, bộ nhập CMS `public/noi-dung-seo.json` và seed đồng nhất. Lệnh không kết nối hoặc ghi KV.
- `npm run check` đồng bộ nội dung, chạy 28 kiểm thử, preflight build và audit các URL chuẩn trong sitemap.
- Báo cáo tại `dist/seo-audit.json`, danh sách URL tại `dist/indexable-urls.txt`, ảnh kiểm tra ở `dist/screenshots/`.
- Workflow `SEO audit` chạy khi push, chạy hằng ngày lúc **06:15 giờ Việt Nam**, hoặc chạy thủ công. Đây là kiểm tra và xuất báo cáo; không tự xuất bản hay sửa dữ kiện dự án. Audit production cũng chạy theo lịch hằng ngày; khi chạy thủ công có thể bật tùy chọn kiểm tra live.
- Audit kiểm tra HTTP, title/description duy nhất, H1, canonical, JSON-LD, ảnh, liên kết và khả năng truy cập từ trang chủ. Đây không phải chứng nhận xếp hạng hoặc bằng chứng Google đã lập chỉ mục.

Nội dung công khai dùng chú thích “hình minh họa”, không nhận là phối cảnh chính thức. Các đường dẫn đối chiếu được giữ trong dữ liệu nghiên cứu nội bộ; nguồn đã kiểm tra được dẫn tại trang chủ và các nội dung có dữ kiện liên quan. Không tự tạo giá, ngày mở bán, quyền sở hữu hoặc cam kết lợi nhuận.

## CMS và dữ liệu hiện có

KV binding: `OLYMPIC_KV`. Đăng nhập dùng Cloudflare secret `ADMIN_PASSWORD` tối thiểu 12 ký tự. Không có mật khẩu mặc định.

CMS có nút **Nhập bộ 84 bài SEO**: chỉ thêm slug còn thiếu, giữ bài đã sửa và bài đã ẩn; cần bấm lưu sau khi nhập. Có thể có hơn hoặc ít hơn 100 URL nếu dữ liệu production có nội dung riêng. Không xóa bài riêng để ép số URL.

## Phát hành

Đọc [RELEASE-V3.md](RELEASE-V3.md). Bản V3 hiện đã được phát hành. Với các lần cập nhật tiếp theo, Cần xác thực Cloudflare, xác nhận đúng Worker/domain, sao lưu Worker và KV, cấu hình namespace thật, kiểm tra secret trước khi deploy. Không đổi nameserver.

Các tài liệu bàn giao còn lại được giữ để tra lịch sử V2; số URL, số kiểm thử và nhãn nút cũ trong các tài liệu đó không đại diện V3.

Tài khoản Cloudflare và namespace thật đã được xác minh và ghi trong `wrangler.jsonc` (đây không phải thông tin bí mật). Các lệnh deploy, backup và `audit:live` dùng wrapper để chọn đúng tài khoản và dùng HTTPS proxy của môi trường, ngay cả khi biến Account ID được nhập khác. Không lưu API token trong mã nguồn.
