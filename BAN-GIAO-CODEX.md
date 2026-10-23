# BÀN GIAO SANG CODEX — VINHOMES OLYMPIC

**Ngày bàn giao:** 23/10/2026  
**Ngôn ngữ làm việc:** Tiếng Việt  
**Mục tiêu:** Tiếp tục phát triển, kiểm tra và phát hành phiên bản V2 + 10 bài SEO của website bất động sản `https://vinhomesthuongtin.vn` trên Cloudflare Workers, không làm mất nội dung website cũ.

## 1. Bối cảnh dự án

- Chủ website: Mạnh Việt Real Estate (trang tư vấn BĐS độc lập, không được thể hiện là website chính thức của Vinhomes).
- Tên miền: `vinhomesthuongtin.vn`, mua tại Nhân Hòa; Nameserver đã chuyển sang `dee.ns.cloudflare.com` và `marvin.ns.cloudflare.com`, Cloudflare từng báo tên miền được bảo vệ/kích hoạt.
- Cloudflare Worker đã triển khai bản website cũ: `royal-snow-1e06` thuộc tài khoản đang đăng nhập của người dùng; tên miền đã được thêm ở Worker → Domains → Custom Domains and Routes, với môi trường `Production` (theo ảnh người dùng trong cuộc trò chuyện trước).
- **Chưa xác nhận V2 + 10 bài hiện chạy trên domain thật.** Không mặc định coi mã CMS trong gói đã được phát hành.
- Website tập trung dự án khu đô thị thể thao Olympic tại phía Nam Hà Nội/Thường Tín. Chỉ dùng dữ kiện có nguồn, không tự sáng tạo bảng giá, giỏ căn, thời điểm mở bán, pháp lý hoặc thông tin độc quyền phân phối.
- Thông tin liên hệ đã dùng trước đây: số tư vấn/Zalo `0986 091 222`. Link Facebook cá nhân và ảnh chân dung cần người dùng cung cấp/xác nhận trước khi đưa lên.

## 2. Mã nguồn bàn giao

- Nằm trong thư mục `vinhomes-olympic-cms/` của ZIP đi kèm.
- Công nghệ: Cloudflare Workers + Workers static assets, backend `src/worker.js`, frontend `public/`, CMS `/admin/`, dữ liệu KV.
- `wrangler.jsonc` sử dụng tên Worker `royal-snow-1e06`; KV binding `OLYMPIC_KV` có placeholder `DIEN_ID_KV_CUA_BAN_VAO_DAY` **phải thay bằng KV namespace ID thật, chưa được điền**.
- Mật khẩu quản trị dùng Cloudflare secret `ADMIN_PASSWORD`, **không có mật khẩu mặc định**. Không yêu cầu người dùng gửi mật khẩu hoặc token vào chat.
- Kiểm tra: `npm install` → `npm run check` (test và preflight build) → kiểm tra thủ công.
- Triển khai **chỉ sau khi kiểm tra đúng tài khoản/worker, tạo KV/binding và sao lưu dữ liệu**: `npx wrangler login`, `npm run deploy`.
- README.md, `HUONG-DAN-CLOUDFLARE.txt`, `NHAP-10-BAI-VA-PHAT-HANH.md`, `PHAT-HANH-VA-SEARCH-CONSOLE.md`, `DEPLOY-GITHUB.md` nêu quy trình đầy đủ.

## 3. Nội dung đã chuẩn bị

- V2 gồm trang chủ responsive, 9 trang nội dung SEO: tổng quan, vị trí, quy hoạch, sản phẩm, giá bán, mặt bằng, tiến độ, pháp lý, so sánh; blog, SEO metadata, canonical, sitemap, robots, structured data, trang chính sách bảo mật, CMS.
- 10 bài marketing SEO đã tích hợp vào source; nội dung ở `content/noi-dung-10-bai.json` và `public/noi-dung-10-bai.json`, ảnh minh họa WebP ở `public/assets/posts/`.
- Các nhóm bài: tổng quan, vị trí Thường Tín, quy hoạch, tiện ích, mở bán, tiến độ, tiềm năng khu vực, kinh nghiệm mua, loại hình sản phẩm, giá/quỹ căn.
- Hình minh họa AI/đồ họa **không phải phối cảnh chính thức**; giữ chú thích này trên các trang.
- Nội dung nguồn đã được đối chiếu trong quá trình biên soạn đến ngày 21/10/2026 nhưng cần rà soát thông tin quan trọng ngay trước phát hành.

## 4. Công việc Codex cần thực hiện theo thứ tự

1. Mở thư mục mã nguồn. Đọc README và các file hướng dẫn trước khi sửa.
2. Kiểm kê code hiện tại: build, runtime, test, SEO, CMS, form, chống spam, xử lý ảnh, an toàn đăng nhập. Xác minh dữ liệu/bản nháp để không ghi đè.
3. Chạy `npm install`, `npm run check`, và chạy local preview; kiểm tra 10 URL bài, ảnh, liên kết trong bài, menu và sitemap. Xử lý lỗi phát hiện và báo lại.
4. Kiểm tra quyền truy cập Cloudflare của **chính người dùng**. Xác minh Worker `royal-snow-1e06` và binding KV `OLYMPIC_KV`, thiết lập `ADMIN_PASSWORD` qua Cloudflare Secrets. Không ghi mật khẩu/token vào code, Git hay phần trao đổi.
5. **Sao lưu bản Worker và dữ liệu KV hiện tại**, xác nhận phương án khôi phục. Nếu người dùng đã chỉnh bài/ảnh trong CMS, không thay thế toàn bộ KV bằng seed mới. Xem quy trình nhập 10 bài trong `NHAP-10-BAI-VA-PHAT-HANH.md`.
6. Chỉ triển khai sau khi xác định đúng môi trường, nhắc người dùng phê duyệt thay đổi có tác động. Đẩy mã lên GitHub repo riêng tư **nếu tài khoản đã kết nối và người dùng cho phép**; nếu chưa, hướng dẫn kết nối.
7. Sau khi triển khai, **kiểm tra thật** `https://vinhomesthuongtin.vn/`, `/tin-tuc/`, 10 đường dẫn, `/admin/`, `/sitemap.xml`, `/robots.txt`, HTTPS, ảnh, menu, form và lưu lead end-to-end. Phân biệt rõ chưa kiểm tra/đã kiểm tra.
8. Google Search Console: yêu cầu người dùng kết nối/quyền sở hữu phù hợp trước khi gửi sitemap và yêu cầu lập chỉ mục. Không tuyên bố đã index nếu chưa có bằng chứng.

## 5. Tiêu chí nghiệm thu

- Website mới hoạt động tại `https://vinhomesthuongtin.vn` (không đổi NS/DNS vô cớ).
- 10 bài mới hiển thị đúng, ảnh WebP tải được, mỗi bài có URL và metadata riêng, có internal links.
- CMS có đăng nhập bằng secret riêng, chỉnh sửa/ẩn bài, sửa ảnh, xem lead, cập nhật nội dung và không mất dữ liệu đã có.
- Không có lỗi nghiêm trọng trên mobile/desktop; SSL và canonical/sitemap/robots kiểm tra live thành công.
- Thông tin giá, mở bán, pháp lý có nhãn xác minh phù hợp; ảnh minh họa AI không mạo nhận phối cảnh chính thức.
- Có báo cáo đã làm/chưa làm, link trực tiếp những mục đã kiểm tra và cách rollback.

## 6. Nguyên tắc an toàn

- **Không thay Nameserver**: DNS tại Cloudflare đã được cấu hình trong hội thoại trước.
- Không xóa Worker, KV hay dữ liệu khách hàng để thử nghiệm. Không commit `.dev.vars`, token, mật khẩu, lead CSV.
- Không tự ý gửi thông tin khách hàng ra dịch vụ thứ ba.
- Nếu chưa thể triển khai vì thiếu kết nối Cloudflare/GitHub, tiếp tục sửa/test source và đưa hướng dẫn chính xác, không tuyên bố đã lên website.

## 7. Lời nhắn để nhập vào Codex

> Tiếp tục dự án Vinhomes Olympic từ thư mục này. Đọc `BAN-GIAO-CODEX.md` và README, xác minh các yêu cầu, chạy toàn bộ test và local preview. Chuẩn bị phát hành bộ V2 + 10 bài SEO lên Worker `royal-snow-1e06` tại `vinhomesthuongtin.vn`. Hãy sao lưu và kiểm tra quyền Cloudflare/KV trước khi triển khai; yêu cầu tôi xác nhận ngay trước những thay đổi ảnh hưởng trang live; sau đó kiểm tra website, CMS, form, ảnh, sitemap và SSL thực tế. Không tự tuyên bố thành công nếu chưa kiểm tra URL live.
