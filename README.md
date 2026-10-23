# Vinhomes Olympic — V3, CMS và 100 URL

Website tư vấn độc lập của Mạnh Việt Real Estate tại `https://vinhomesthuongtin.vn`, Worker `royal-snow-1e06`.

Bản V3 giữ 9 trang chuyên đề, 10 bài bàn giao và 4 trang loại hình; thêm 74 bài cẩm nang có tình huống áp dụng. Tổng dữ liệu khởi tạo: **100 URL** gồm trang chủ, chuyên đề, bài viết, loại hình, danh mục tin và chính sách bảo mật. Số URL trên production phụ thuộc dữ liệu KV đang lưu; không tự ghi đè KV bằng dữ liệu khởi tạo.

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
- `npm run check` đồng bộ nội dung, chạy 24 kiểm thử, preflight build và audit 100 URL.
- Báo cáo tại `dist/seo-audit.json`, danh sách URL tại `dist/100-urls.txt`, ảnh kiểm tra ở `dist/screenshots/`.
- Workflow `SEO audit` chạy khi push, chạy hằng ngày lúc **06:15 giờ Việt Nam**, hoặc chạy thủ công. Đây là kiểm tra và xuất báo cáo; không tự xuất bản hay sửa dữ kiện dự án. Audit production được bật riêng sau khi đã phát hành.
- Audit kiểm tra HTTP, title/description duy nhất, H1, canonical, JSON-LD, ảnh, liên kết và khả năng truy cập từ trang chủ. Đây không phải chứng nhận xếp hạng hoặc bằng chứng Google đã lập chỉ mục.

Nội dung công khai dùng chú thích “hình minh họa”, không nhận là phối cảnh chính thức. Các đường dẫn đối chiếu được giữ trong dữ liệu nghiên cứu nội bộ; bảng liệt kê nguồn không hiển thị trong trang bài viết. Không tự tạo giá, ngày mở bán, quyền sở hữu hoặc cam kết lợi nhuận.

## CMS và dữ liệu hiện có

KV binding: `OLYMPIC_KV`. Đăng nhập dùng Cloudflare secret `ADMIN_PASSWORD` tối thiểu 12 ký tự. Không có mật khẩu mặc định.

CMS có nút **Nhập bộ 84 bài SEO**: chỉ thêm slug còn thiếu, giữ bài đã sửa và bài đã ẩn; cần bấm lưu sau khi nhập. Có thể có hơn hoặc ít hơn 100 URL nếu dữ liệu production có nội dung riêng. Không xóa bài riêng để ép số URL.

## Phát hành

Đọc [RELEASE-V3.md](RELEASE-V3.md). Mã nguồn đã chuẩn bị không đồng nghĩa đã phát hành lên domain. Cần xác thực Cloudflare, xác nhận đúng Worker/domain, sao lưu Worker và KV, cấu hình namespace thật, kiểm tra secret trước khi deploy. Không đổi nameserver.

Các tài liệu bàn giao còn lại được giữ để tra lịch sử V2; số URL, số kiểm thử và nhãn nút cũ trong các tài liệu đó không đại diện V3.
