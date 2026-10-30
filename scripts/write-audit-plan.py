import json,re
from pathlib import Path
site=json.load(open('research/2026-10-30/live-site.json'))['pages'];s=json.load(open('content/pre-journalism-seed.json'))
redirects=json.load(open('content/redirect-map.json'))
rows=[]
for p in s['pages']:rows.append(('/'+p['slug']+'/',p['keyword'],p['searchIntent'],'Giữ; mở rộng hướng dẫn nền tảng'))
for p in s['posts']:
 if p.get('published') is False:continue
 topic=p.get('topic') or 'tong-quan'
 if topic not in {x['slug'] for x in s['pages']}:topic='tong-quan'
 rows.append(('/tin-tuc/'+p['slug']+'/',p.get('keyword',p['title']),p.get('searchIntent',p['title']),'Gộp nội dung phù hợp; 301 → '+redirects['/tin-tuc/'+p['slug']+'/']))
rows.extend([('/','vinhomes olympic thường tín','Điểm vào thông tin dự án','Giữ'),('/tin-tuc/','tin dự án olympic theo ngày','Tin ngắn theo sự kiện, dẫn về trụ cột','Giữ; bỏ cẩm nang trùng ý'),('/chinh-sach-bao-mat/','bảo mật dữ liệu tư vấn','Chính sách xử lý thông tin biểu mẫu','Giữ')])
text='''# Kiểm toán và kế hoạch ngày 30/10/2026

Đã đọc HTML và nội dung cả 96 URL sitemap bằng Chromium; dữ liệu thô: research/2026-10-30/live-site.json. Người dùng đã cho phép thực hiện liên tục, không cần chờ duyệt kế hoạch.

## Phát hiện

- 95/96 trang có link /admin/ trong footer; trang quản trị có noindex, đăng nhập có hạn chế 10 lần sai/giờ theo IP và cookie HttpOnly. Không coi việc đổi URL là lớp xác thực.
- 9 trụ cột có thân bài ngắn; 84 bài cũ đa số khoảng 180–300 từ tách theo khoảng trắng, chủ yếu là checklist chung. Đây là nội dung mỏng dù ý định được đặt tên khác nhau. Gộp phần hữu ích theo chủ đề, giữ bản gốc trong CMS và chuyển 301 một bước. Không giữ 100 URL bằng bài rỗng.
- /tin-tuc/ thực chất là cẩm nang; thay bằng tin ngắn gắn sự kiện/ngày nguồn. Ngày xuất bản của bản tổng hợp là ngày biên tập; ngày sự kiện nêu riêng, không lùi ngày giả làm tin gốc.
- Menu chuyên đề đã trỏ trang thật; các anchor ảnh/liên hệ trên trang chủ có mục đích hợp lệ. Không thấy Facebook trỏ # trong HTML đã quét. Bốn trang sản phẩm mỏng đã có 301.
- Title/meta giới hạn đúng, một H1, canonical, lang vi, sitemap, WebSite/Breadcrumb/FAQ và Twitter card đã có. Thiếu og:site_name, Organization và tác giả có hồ sơ. FAQ hiện thường dẫn nội bộ thay vì bằng chứng bên ngoài. og:image nhiều trang dùng chung ảnh concept. Ngày trong giao diện còn ISO.
- Ảnh sơ đồ dùng đúng mô tả nhưng không phải ảnh thực địa. Không có căn cứ để gắn nhãn ảnh chính thức hoặc bịa trải nghiệm.
- Không có tên pháp nhân vận hành, địa chỉ đăng ký và mã số thuế đã được xác minh. Không lấy thông tin pháp nhân Vinhomes thay cho chủ website.

## Giới hạn nghiên cứu

Trình duyệt truy cập được site và các cổng Hà Nội. Google và Bing trả lỗi proxy/403. Không có căn cứ để tuyên bố đã khảo sát 6–8 kết quả Google đầu trang cho từng từ khóa, hoặc đã lấy People Also Ask/autocomplete. Đã tìm bằng công cụ tìm kiếm nội bộ Dân Hòa và đọc 10 kết quả đầu liên quan cùng các hồ sơ gốc khác. Từ khóa phụ trong kế hoạch là phân nhóm biên tập từ nội dung thực, chưa phải dữ liệu lượng tìm kiếm/PAA. Bảng đối thủ sẽ ghi rõ chưa thực hiện thay vì bịa danh sách.

## Phương án URL

| URL | Từ khóa chính | Ý định tìm kiếm | Xử lý |
|---|---|---|---|
'''
for r in rows:text+='| '+' | '.join(x.replace('|','/') for x in r)+' |\n'
text+='''
## Phần bổ sung

Bổ sung trang giới thiệu, liên hệ, tác giả Mạnh Việt, chính sách biên tập bằng thông tin đang có; không tự đặt học vị, chứng chỉ, địa chỉ hay MST. Mọi bài cập nhật phải dẫn nguồn gốc đúng phạm vi. Số liệu chỉ có một nguồn được đánh dấu trong hồ sơ kiểm tra và ghi rõ tài liệu/ngày trong nội dung khi cần. Không đưa giá chào bán hay thời gian chạy xe không đo được.

Mỗi trụ cột sở hữu nhóm từ khóa phụ riêng; bài cũ chuyển hướng được gắn mục tiêu theo chuyên đề, không tạo bài cạnh tranh. Rủi ro: việc giảm mạnh URL có thể làm biến động tìm kiếm; không có dữ liệu Search Console để định lượng traffic và backlink bị ảnh hưởng. Đã sao lưu toàn bộ CMS và mã triển khai trước khi sửa, nội dung gốc được bảo toàn.
'''
Path('KIEM-TOAN-VA-KE-HOACH-2026-10-30.md').write_text(text)
