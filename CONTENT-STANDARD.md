# Chuẩn nội dung tiếng Việt

Áp dụng cho phần nội dung chính của trang, không tính menu, chân trang và điều hướng danh mục như bài viết riêng.

- Mỗi trang giải quyết một câu hỏi hoặc công việc riêng. Dùng bản đồ ý định trong `content/editorial-pages.json`; không tạo URL mới chỉ bằng đổi cách viết từ khóa.
- Mở đầu bằng 2–3 câu trả lời trực tiếp. Sau đó dùng H2/H3 phù hợp câu hỏi; không lặp tên dự án ở mọi heading.
- Title tối đa 60 ký tự, meta tối đa 160; một H1; slug không dấu. Không tự cập nhật ngày khi nội dung và nguồn chưa được kiểm tra lại.
- Ba đến năm FAQ ngắn, có căn cứ. Dữ kiện dự án dẫn tài liệu gốc có phạm vi rõ. Lời khuyên biên tập dẫn phần giải thích tương ứng trong bài và được ghi rõ là biên tập, không mạo nhận là khuyến cáo của ngân hàng hoặc cơ quan nhà nước.
- Ba đến năm liên kết trong bài, anchor mô tả nội dung đích. Các nguồn trỏ tới cùng bài và mục lục không tính như liên kết sang trang khác.
- Ảnh phù hợp chủ đề, alt mô tả đúng hình, có kích thước và chú thích. Sơ đồ biên tập không phải bản vẽ quy hoạch, mặt bằng bán hàng hoặc ảnh hiện trường. Không lấy một ảnh đẹp làm bằng chứng về sản phẩm.
- Mỗi trang có lưu ý: trang độc lập, hình minh họa, cần đối chiếu thông báo và hồ sơ chính thức của đúng tài sản.
- Văn trung lập, tránh lời hứa về giá, lợi nhuận, ngày bán hoặc pháp lý khi chưa có tài liệu tương ứng. Viết ngắn khi dữ kiện ít; không kéo dài bằng câu quảng cáo hoặc thông tin trùng trang khác.

## Quy trình cập nhật

74 bài cẩm nang có phần mở đầu và FAQ tại `content/handbook-notes.tsv`; các chuyên đề, bài dự án và trang chức năng tại `content/section-notes.tsv`. Nội dung thân của sáu bài đã viết lại lưu ở `content/section-bodies.json`. Chạy `npm run content:sync` để dựng hồ sơ, SVG và seed; kết quả không tác động production KV.

Khi cập nhật CMS đang có dữ liệu, tạo patch theo từng trường từ baseline đã xác minh; dry-run trước, dừng khi có chỉnh sửa xung đột, không nạp đè seed. Nguồn chính quyền dùng cho số liệu đã được đọc trong đợt trước; không mở rộng phạm vi kết luận chỉ vì một tài liệu có cùng tên dự án.

`npm run check` kiểm tra source. `npm run test:browser` chạy local, gồm sửa/khôi phục FAQ qua UI, lưu dữ liệu và luồng form thử. `npm run audit:live` kiểm tra sitemap thực tế; có thể truyền `--expected-count` qua wrapper để xác minh số lượng cụ thể. Không dùng số URL để thay cho kiểm tra chất lượng hoặc bằng chứng Google đã index.
