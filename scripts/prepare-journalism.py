import json
from pathlib import Path
base=json.load(open('research/2026-10-30/web-sources.json'));municipal=json.load(open('research/2026-10-30/municipal-search-results.json'))
sources={
 'danhoa':dict(label='UBND xã Dân Hòa, 22/04/2026',url=base[0]['url'],date='2026-04-22'),
 'dtm':dict(label='Quyết định 916/QĐ-SNNMT, 13/04/2026, trang 2–4',url=base[1]['url'],date='2026-04-13'),
 'ngoch hoi':dict(label='UBND xã Ngọc Hồi, 10/02/2026',url=base[2]['url'],date='2026-02-10'),
 'trile':dict(label='UBND xã Dân Hòa: Tri Lễ, 13/10/2026',url=municipal[0]['url'],date='2026-10-13'),
 'queson':dict(label='UBND xã Dân Hòa: Quế Sơn, 28/09/2026',url=municipal[1]['url'],date='2026-09-28'),
 'sxd':dict(label='Sở Xây dựng Hà Nội: danh sách dự án đủ điều kiện kinh doanh',url=base[4]['url'],date=None)
}
sources['ngochhoi']=sources.pop('ngoch hoi')
Path('content/journalism/sources.json').write_text(json.dumps(sources,ensure_ascii=False,indent=2)+'\n')
def f(q,a,s):return dict(question=q,answer=a,sources=[dict(label=sources[k]['label'],url=sources[k]['url'],kind='document') for k in s.split(',')])
pages={}
def p(slug,title,intro,intent,keywords,faq):
 pages['/'+slug+'/']=dict(heading=title,seoTitle=title,seoDescription=intro.split('. ')[0]+'.',intro=intro,intent=intent,topic=slug,keywords=keywords.split('|'),faqs=faq,sourceKeys=list(dict.fromkeys(k for x in faq for k,v in sources.items() if any(z['url']==v['url'] for z in x['sources']))))
p('tong-quan','Vinhomes Olympic Thường Tín: Tổng quan dự án',
 'Vinhomes Olympic là tên tìm kiếm của Khu đô thị thể thao Olympic phía Nam Hà Nội. Dân Hòa nêu quy mô khoảng 9.171 ha ngày 22/04/2026. Hồ sơ phân khu B ngày 13/04/2026 xác định riêng 2.944,39 ha.',
 'Nhận diện dự án, tên hồ sơ và cấu trúc tổng thể',
 'vinhomes olympic là gì|khu đô thị thể thao quốc tế hà nội|quy mô tổng thể olympic|chủ đầu tư phân khu b|tên gọi olympic thường tín|dự án phía nam hà nội',[
 f('Vinhomes Olympic được gọi thế nào trong văn bản?','Quyết định môi trường ngày 13/04/2026 ghi Khu đô thị thể thao Olympic; thông báo Tri Lễ ngày 13/10/2026 dùng tên Khu đô thị thể thao Quốc tế Hà Nội và chú thích tên trước đây.','dtm,trile'),
 f('Con số 9.171 ha là của toàn dự án hay phân khu B?','Nguồn Dân Hòa ngày 22/04/2026 dùng khoảng 9.171 ha cho dự án tổng thể; hồ sơ môi trường xác định riêng B là 2.944,39 ha.','danhoa,dtm'),
 f('Dự án có bao nhiêu phân khu?','Nguồn Dân Hòa nêu bốn phân khu; thông báo hội nghị Ngọc Hồi ngày 10/02/2026 gọi cụ thể A, B, C, D.','danhoa,ngochhoi'),
 f('Công ty nào đại diện liên danh trong hồ sơ B?','Điều 1 Quyết định 916/QĐ-SNNMT ghi Công ty Cổ phần Vinhomes đại diện liên danh nhà đầu tư của dự án thành phần B.','dtm'),
 f('Dân số 186.760 người thuộc phạm vi nào?','Đó là quy mô dân số dự kiến của phân khu B trong hồ sơ môi trường, không phải số cư dân hiện hữu của toàn dự án.','dtm')])
p('vi-tri','Vị trí Vinhomes Olympic Thường Tín và ranh phân khu B',
 'Phân khu B nằm tại Thường Tín, Thượng Phúc, Tam Hưng và Dân Hòa theo hồ sơ ngày 13/04/2026. Tài liệu mô tả ranh bắc giáp Vành đai 4. Thời gian đến từng lối vào cần đo bằng hành trình thực.',
 'Xác định địa bàn, ranh và tổ chức khảo sát đường tiếp cận',
 'vinhomes olympic ở đâu|ranh giới phân khu b|đường vào olympic|olympic thường tín thuộc xã nào|kết nối phân khu b|đo đường đi olympic',[
 f('Phân khu B thuộc những xã nào?','Hồ sơ môi trường ghi bốn xã Thường Tín, Thượng Phúc, Tam Hưng và Dân Hòa, thành phố Hà Nội.','dtm'),
 f('Phía bắc phân khu B giáp đâu?','Trang 4 hồ sơ kèm quyết định môi trường mô tả phía bắc giáp đường Vành đai 4; đây là mô tả ranh, không xác nhận lối vào của từng căn.','dtm'),
 f('Ranh đông và tây của B được ghi thế nào?','Hồ sơ ghi phía đông theo tuyến đường sắt cao tốc Bắc Nam, phía tây giáp Quốc lộ 21C.','dtm'),
 f('Có nguồn nào ghi nhận đường dẫn đang thi công?','Bài Dân Hòa ngày 22/04/2026 ghi nhận một trong ba tuyến dẫn vào sân vận động tại Ước Lễ đang thi công ở thời điểm đó.','danhoa'),
 f('Tri Lễ 1 và Tri Lễ có phải cùng địa danh trong thông báo?','Thông báo ngày 13/10/2026 ghi Tri Lễ 1, nay là thôn Tri Lễ, xã Dân Hòa. Đây là cách gọi được dùng trong chính nguồn đó.','trile')])
p('quy-hoach','Quy hoạch Vinhomes Olympic: phân khu A, B, C, D',
 'Ngọc Hồi tổ chức lấy ý kiến quy hoạch chi tiết 1/500 A, B, C, D ngày 10/02/2026. Hồ sơ B dẫn quyết định quy hoạch 1/2000 ngày 16/12/2025. Mỗi lớp tài liệu cần được đọc đúng phạm vi và thời điểm.',
 'Đọc cấp quy hoạch, phân khu và phiên bản đồ án',
 'quy hoạch olympic 1/500|quy hoạch olympic 1/2000|phân khu a b c d olympic|quyết định 6260|điều chỉnh đồ án olympic|chức năng đất phân khu b',[
 f('Hội nghị lấy ý kiến 1/500 diễn ra ngày nào?','Thông tin xã Ngọc Hồi ghi ngày 10/02/2026, đối với đồ án A, B, C, D.','ngochhoi'),
 f('Số quyết định quy hoạch 1/2000 của B là gì?','Hồ sơ môi trường dẫn Quyết định 6260/QĐ-UBND ngày 16/12/2025; số hiệu hiện được kiểm tra qua dẫn chiếu này.','dtm'),
 f('Bốn phân khu có được hai nguồn cùng nêu không?','Có. Nguồn Ngọc Hồi tháng 2/2026 nêu A, B, C, D; nguồn Dân Hòa tháng 4/2026 nêu bốn phân khu.','ngochhoi,danhoa'),
 f('Có phải hồ sơ 1/500 đồng nghĩa đã phê duyệt chi tiết?','Không đồng nhất hai trạng thái. Ngọc Hồi ghi bước lấy ý kiến, còn Dân Hòa ngày 22/04/2026 nêu vướng mắc phê duyệt chi tiết tại thời điểm bài viết.','ngochhoi,danhoa'),
 f('Phần liên hợp thể thao trong B có diện tích bao nhiêu?','Hồ sơ môi trường ghi 411,29 ha; phần đô thị ghi 2.533,1 ha. Đây là cơ cấu của B.','dtm')])
p('phap-ly','Pháp lý Vinhomes Olympic: hồ sơ và phạm vi áp dụng',
 'Quyết định 916/QĐ-SNNMT ngày 13/04/2026 thẩm định môi trường dự án thành phần B. Hồ sơ nêu Vinhomes đại diện liên danh nhà đầu tư. Điều kiện giao dịch cần kiểm tra theo đúng sản phẩm và bên ký.',
 'Kiểm tra chuỗi hồ sơ và chủ thể của giao dịch cụ thể',
 'quyết định 916 olympic|hồ sơ môi trường phân khu b|liên danh đầu tư olympic|điều kiện kinh doanh nhà olympic|kiểm tra bên ký olympic|hồ sơ pháp lý phân khu b',[
 f('Quyết định 916/QĐ-SNNMT được ban hành khi nào?','Ngày 13/04/2026, về kết quả thẩm định báo cáo đánh giá tác động môi trường của dự án thành phần B.','dtm'),
 f('Quyết định môi trường áp dụng toàn dự án không?','Đối tượng được ghi rõ là dự án thành phần phân khu B, tại bốn xã trong hồ sơ. Không đổi phạm vi đó thành toàn bộ A, B, C, D.','dtm'),
 f('Quyết định chủ trương nào được dẫn trong hồ sơ B?','Phần thông tin chung dẫn Quyết định 6277/QĐ-UBND ngày 17/12/2025. Bản đầy đủ của quyết định này cần được đọc riêng khi phân tích từng điều khoản.','dtm'),
 f('Tra danh sách dự án đủ điều kiện kinh doanh ở đâu?','Tại mục công khai tương ứng của Sở Xây dựng Hà Nội; cần tìm đúng tên dự án thành phần và phạm vi sản phẩm, không coi sự tồn tại của mục tra cứu là xác nhận Olympic đã có tên.','sxd'),
 f('Thông báo Tri Lễ ngày 13/10/2026 thuộc loại công việc nào?','Đó là thông báo công khai thu hồi đất tại Tri Lễ, đợt 6, ba hộ; không phải giấy xác nhận quyền sở hữu nhà của người mua.','trile')])
p('tien-do','Tiến độ Vinhomes Olympic: các mốc hồ sơ năm 2026',
 'Dân Hòa đăng thông báo thu hồi đất tại Tri Lễ ngày 13/10/2026. Trước đó có thông tin điều chỉnh nguồn gốc đất Quế Sơn ngày 28/09/2026. Đây là các mốc đất đai theo địa bàn, không phải tỷ lệ xây dựng toàn dự án.',
 'Theo dõi mốc triển khai theo ngày, địa bàn và hạng mục',
 'tiến độ olympic tháng 10 2026|giải phóng mặt bằng dân hòa|thu hồi đất tri lễ olympic|nguồn gốc đất quế sơn|đường dẫn ước lễ|nhật ký xây dựng olympic',[
 f('Nguồn mới nhất đã đọc trong đợt rà soát là mốc nào?','Thông báo Dân Hòa ngày 13/10/2026 về Tri Lễ, đợt 6, ba hộ; đây là mốc nguồn, không phải cam kết không còn tài liệu mới hơn.','trile'),
 f('Thông tin Quế Sơn tháng 9 nói về việc gì?','Nguồn ngày 28/09/2026 công khai danh sách điều chỉnh xác nhận nguồn gốc đất nông nghiệp tại Quế Sơn, đợt 1.','queson'),
 f('Diện tích GPMB tại Dân Hòa được công bố thế nào?','Bài ngày 22/04/2026 nêu khoảng 1.932,9 ha, liên quan khoảng 9.600 hộ thuộc 23 thôn; đây là số liệu một nguồn tại thời điểm bài viết.','danhoa'),
 f('757,4 ha có phải toàn bộ phân khu B?','Không. Nguồn Dân Hòa nêu khoảng 757,4 ha thuộc B tại xã; hồ sơ môi trường nêu toàn B là 2.944,39 ha.','danhoa,dtm'),
 f('Có thể suy ngày bàn giao từ thông báo thu hồi đất không?','Thông báo Tri Lễ công khai công việc đất đai của nhóm hộ cụ thể, không ấn định ngày bàn giao một sản phẩm nhà ở.','trile')])
p('gia-ban','Giá Vinhomes Olympic: kiểm tra báo giá và ngân sách',
 'Báo giá Olympic cần có mã sản phẩm, diện tích tính giá và ngày hiệu lực. Hồ sơ môi trường B ngày 13/04/2026 là tài liệu quy mô, không phải bảng giá. So sánh ngân sách phải tính cả lịch trả và chi phí sử dụng.',
 'Chuẩn hóa báo giá và kiểm tra khả năng chi trả',
 'bảng giá olympic cần kiểm tra|chi phí mua nhà olympic|giá đất và giá nhà olympic|chiết khấu báo giá olympic|ngân sách mua olympic|đơn giá sản phẩm olympic',[
 f('Quyết định môi trường B có phải bảng giá bán không?','Không. Quyết định 916/QĐ-SNNMT ngày 13/04/2026 phê duyệt kết quả thẩm định môi trường và mô tả dự án; đó không phải văn bản báo giá sản phẩm.','dtm'),
 f('Diện tích 9.171 ha có dùng để suy đơn giá nhà không?','Nguồn Dân Hòa dùng khoảng 9.171 ha cho quy mô tổng thể, không nêu đó là mẫu số để định giá một căn.','danhoa'),
 f('Số liệu 411,29 ha có phải diện tích hàng bán?','Đó là phần liên hợp thể thao trong B theo hồ sơ môi trường, không phải diện tích một giỏ hàng.','dtm'),
 f('Thông báo đất Quế Sơn có phải bảng giá nhà?','Nguồn ngày 28/09/2026 nói về điều chỉnh xác nhận nguồn gốc đất nông nghiệp, không phải báo giá nhà ở.','queson'),
 f('Mục tra cứu của Sở Xây dựng xác nhận giá từng căn không?','Mục công khai dự án đủ điều kiện đưa vào kinh doanh phục vụ tra cứu điều kiện theo tài liệu cụ thể; không thay bảng giá của một sản phẩm.','sxd')])
p('mat-bang','Mặt bằng Vinhomes Olympic: đọc bản vẽ và diện tích',
 'Hồ sơ B xác định 2.533,1 ha khu đô thị và 411,29 ha liên hợp thể thao. Tổng là 2.944,39 ha theo tài liệu ngày 13/04/2026. Sơ đồ cấp phân khu không thay mặt bằng thiết kế từng căn.',
 'Đọc bản vẽ, ký hiệu và diện tích của ô đất hoặc căn',
 'bản vẽ mặt bằng olympic|diện tích đô thị phân khu b|cơ cấu diện tích olympic b|đọc chú giải mặt bằng|mặt bằng căn olympic|tỷ lệ bản vẽ olympic',[
 f('Hai phần diện tích B cộng lại được bao nhiêu?','2.533,1 ha cộng 411,29 ha bằng 2.944,39 ha, theo các số cùng hồ sơ ĐTM.','dtm'),
 f('Tỷ lệ khoảng 14% được tính từ đâu?','Đó là 411,29 chia 2.944,39 rồi nhân 100, làm tròn; là tỷ trọng phần liên hợp thể thao trong B, không phải mật độ xây dựng.','dtm'),
 f('186.760 người có phải số căn trong mặt bằng?','Không. Hồ sơ gọi đây là quy mô dân số dự kiến của B, khác đơn vị số căn.','dtm'),
 f('Hồ sơ có nêu chung cư trong B không?','Có. Phần hạng mục đô thị liệt kê nhà liền kề, biệt thự và chung cư; không kèm bảng mã căn mở bán.','dtm'),
 f('Thông tin 1/500 ngày 10/02/2026 thuộc bước nào?','Nguồn Ngọc Hồi ghi hội nghị lấy ý kiến đồ án chi tiết A, B, C, D, không phải thiết kế căn cho người mua lựa chọn.','ngochhoi')])
p('san-pham','Sản phẩm Vinhomes Olympic: loại hình trong hồ sơ B',
 'Hồ sơ B ngày 13/04/2026 nêu nhà liền kề, biệt thự và chung cư. Tài liệu cũng có thương mại dịch vụ, trường học và y tế. Danh mục chức năng cần phân biệt với bảng hàng và tình trạng vận hành.',
 'Chọn nhóm loại hình theo công năng sử dụng và dữ liệu sản phẩm',
 'liền kề olympic trong hồ sơ|biệt thự olympic trong hồ sơ|chung cư olympic trong hồ sơ|thương mại dịch vụ olympic|chọn loại hình olympic|tiện ích quy hoạch olympic',[
 f('Ba nhóm nhà ở nào được nêu trong hồ sơ B?','Nhà ở liền kề, nhà ở biệt thự và nhà ở chung cư được liệt kê trong phần hạng mục đô thị.','dtm'),
 f('Hồ sơ môi trường có phải bảng mã sản phẩm?','Đây là hồ sơ dự án thành phần B, liệt kê chức năng và hạng mục; không phải bảng mã căn và giá bán.','dtm'),
 f('Có nhóm trường học và y tế trong danh mục không?','Có, tài liệu nêu trường học, y tế và các hạ tầng xã hội; danh mục đó không xác nhận dịch vụ đã vận hành.','dtm'),
 f('Có thể gọi toàn bộ thương mại dịch vụ là shophouse không?','Tài liệu dùng nhóm chức năng thương mại dịch vụ du lịch; cần hồ sơ sản phẩm cụ thể trước khi đổi thành danh mục nhà phố mở bán.','dtm'),
 f('Hạng mục thể thao có nằm chung trong phần đô thị không?','Hồ sơ tách phần đô thị 2.533,1 ha và phần liên hợp thể thao 411,29 ha của B.','dtm')])
p('so-sanh','Có nên mua Vinhomes Olympic? Khung so sánh phương án',
 'Đánh giá Olympic cần cùng lúc so nhu cầu ở, nguồn tiền, hồ sơ và thời gian chờ. Hồ sơ B ghi dân số dự kiến 186.760 người ngày 13/04/2026. Quy mô dự án không thay dữ liệu của sản phẩm đang cân nhắc.',
 'So phương án ở hoặc đầu tư trên cùng nhu cầu và ngân sách',
 'có nên mua olympic|đánh giá nhu cầu ở olympic|so phương án mua olympic|rủi ro thời gian chờ olympic|quy mô và giá trị sử dụng|tiêu chí chọn olympic',[
 f('Dân số dự kiến có phải lượng khách thuê chắc chắn?','Hồ sơ B ghi quy mô dân số dự kiến 186.760 người; đây không phải hợp đồng thuê hay số cư dân đã chuyển đến.','dtm'),
 f('Quy mô toàn dự án có thay được dữ liệu căn nhà không?','Nguồn Dân Hòa nêu tổng thể khoảng 9.171 ha; hồ sơ B có phạm vi riêng. Các số liệu cấp dự án không xác định công năng và chi phí của một căn.','danhoa,dtm'),
 f('Mốc đất đai tháng 10 có phải lịch nhận nhà?','Thông báo Tri Lễ ngày 13/10/2026 nói về công khai thu hồi đất của ba hộ, không ấn định lịch bàn giao nhà.','trile'),
 f('Tiện ích trong danh mục có đồng nghĩa đang phục vụ cư dân?','Hồ sơ B liệt kê các công trình dự án, không phải danh sách dịch vụ đã khai trương. Trạng thái vận hành cần nguồn riêng.','dtm'),
 f('Vì sao phải phân biệt quy hoạch và trải nghiệm hiện tại?','Nguồn Ngọc Hồi tháng 2/2026 là bước lấy ý kiến quy hoạch; nguồn Dân Hòa tháng 4/2026 phản ánh cả công tác GPMB và thi công cục bộ. Mỗi dữ liệu thuộc một trạng thái khác nhau.','ngochhoi,danhoa')])
Path('content/journalism/pages.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2)+'\n')
for route,x in pages.items():
 assert len(x['seoTitle'])<=60,(route,len(x['seoTitle']))
 assert len(x['seoDescription'])<=160,(route,len(x['seoDescription']))
print('Prepared nine pillar profiles with five externally sourced FAQs each.')
