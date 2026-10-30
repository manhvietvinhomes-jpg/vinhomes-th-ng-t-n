# Kiểm toán và kế hoạch ngày 30/10/2026

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
| /tong-quan/ | vinhomes olympic là gì | Hiểu cấu trúc và phạm vi dự án Olympic | Giữ; mở rộng hướng dẫn nền tảng |
| /vi-tri/ | vinhomes olympic ở đâu | Xác định phạm vi địa lý và cách kiểm tra vị trí Olympic | Giữ; mở rộng hướng dẫn nền tảng |
| /quy-hoach/ | quy hoạch olympic a b c d | Đọc các lớp quy hoạch và phạm vi phân khu Olympic | Giữ; mở rộng hướng dẫn nền tảng |
| /san-pham/ | biệt thự liền kề shophouse olympic | Phân biệt nhóm nhà ở trước khi hỏi sản phẩm cụ thể | Giữ; mở rộng hướng dẫn nền tảng |
| /gia-ban/ | giá vinhomes olympic 2026 | Kiểm tra tình trạng bảng giá và tổng tiền cần chuẩn bị | Giữ; mở rộng hướng dẫn nền tảng |
| /mat-bang/ | mặt bằng vinhomes olympic | Đọc mặt bằng và đối chiếu công năng tài sản | Giữ; mở rộng hướng dẫn nền tảng |
| /tien-do/ | tiến độ vinhomes olympic 2026 | Theo dõi mốc triển khai dự án theo phạm vi và ngày | Giữ; mở rộng hướng dẫn nền tảng |
| /phap-ly/ | pháp lý vinhomes olympic | Kiểm tra hồ sơ và giới hạn xác nhận pháp lý Olympic | Giữ; mở rộng hướng dẫn nền tảng |
| /so-sanh/ | có nên mua vinhomes olympic | Đánh giá sự phù hợp trước quyết định mua tại Olympic | Giữ; mở rộng hướng dẫn nền tảng |
| /tin-tuc/vinhomes-olympic-thuong-tin-tong-quan/ | tên pháp lý khu đô thị thể thao Olympic | Đối chiếu tên thường gọi với tên trong văn bản | Gộp nội dung phù hợp; 301 → /tong-quan/ |
| /tin-tuc/vi-tri-vinhomes-olympic-thuong-tin/ | địa điểm phân khu B Olympic | Đọc địa danh trong tài liệu phân khu B | Gộp nội dung phù hợp; 301 → /vi-tri/ |
| /tin-tuc/quy-hoach-vinhomes-olympic-a-b-c-d/ | hồ sơ lấy ý kiến quy hoạch Olympic 1/500 | Đọc hồ sơ tham vấn 1/500 tại Ngọc Hồi | Gộp nội dung phù hợp; 301 → /quy-hoach/ |
| /tin-tuc/tien-ich-vinhomes-olympic-khu-the-thao/ | tiện ích Vinhomes Olympic | Phân biệt định hướng tiện ích với dịch vụ đang vận hành | Gộp nội dung phù hợp; 301 → /san-pham/ |
| /tin-tuc/vinhomes-olympic-khi-nao-mo-ban/ | Vinhomes Olympic khi nào mở bán | Xác minh thông tin mở bán thay vì suy từ tiến độ | Gộp nội dung phù hợp; 301 → /gia-ban/ |
| /tin-tuc/tien-do-vinhomes-olympic-2026/ | thông báo giải phóng mặt bằng Olympic | Đọc thông báo bồi thường theo địa bàn và đợt | Gộp nội dung phù hợp; 301 → /tien-do/ |
| /tin-tuc/tiem-nang-thuong-tin-vinhomes-olympic/ | tiềm năng Thường Tín Vinhomes Olympic | Đánh giá giả định phát triển khu vực phía Nam Hà Nội | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/kinh-nghiem-mua-vinhomes-olympic/ | kinh nghiệm mua Vinhomes Olympic | Sắp xếp trình tự kiểm tra trước quyết định giao dịch | Gộp nội dung phù hợp; 301 → /phap-ly/ |
| /tin-tuc/san-pham-vinhomes-olympic-lien-ke-biet-thu-chung-cu/ | so sánh loại hình nhà ở | So cách sử dụng giữa các nhóm nhà ở | Gộp nội dung phù hợp; 301 → /san-pham/ |
| /tin-tuc/gia-vinhomes-olympic-quy-can/ | cách kiểm tra bảng giá Olympic | Kiểm tra bảng hàng và thời điểm thông tin còn hiệu lực | Gộp nội dung phù hợp; 301 → /gia-ban/ |
| /tin-tuc/khao-sat-duong-di-vinhomes-olympic/ | khảo sát đường đi đến vinhomes olympic theo lịch sinh hoạt | khảo sát đường đi đến vinhomes olympic theo lịch sinh hoạt | Gộp nội dung phù hợp; 301 → /vi-tri/ |
| /tin-tuc/ga-ngoc-hoi-va-lua-chon-nha/ | ga ngọc hồi | ga ngọc hồi | Gộp nội dung phù hợp; 301 → /vi-tri/ |
| /tin-tuc/quoc-lo-1a-ket-noi-thuong-tin/ | quốc lộ 1a và bài toán kết nối khu vực thường tín | quốc lộ 1a và bài toán kết nối khu vực thường tín | Gộp nội dung phù hợp; 301 → /vi-tri/ |
| /tin-tuc/phap-van-cau-gie-khi-chon-nha/ | pháp vân – cầu giẽ | pháp vân – cầu giẽ | Gộp nội dung phù hợp; 301 → /vi-tri/ |
| /tin-tuc/vanh-dai-4-va-gia-tri-su-dung/ | vành đai 4 | vành đai 4 | Gộp nội dung phù hợp; 301 → /vi-tri/ |
| /tin-tuc/dai-lo-120m-cach-doc-thong-tin/ | đại lộ 120 m | đại lộ 120 m | Gộp nội dung phù hợp; 301 → /vi-tri/ |
| /tin-tuc/khao-sat-gio-cao-diem-thuong-tin/ | khảo sát giờ cao điểm tại thường tín | khảo sát giờ cao điểm tại thường tín | Gộp nội dung phù hợp; 301 → /vi-tri/ |
| /tin-tuc/doc-ban-do-vi-tri-du-an/ | đọc bản đồ vị trí dự án | đọc bản đồ vị trí dự án | Gộp nội dung phù hợp; 301 → /vi-tri/ |
| /tin-tuc/quy-hoach-1-2000-la-gi/ | quy hoạch 1/2.000 | quy hoạch 1/2.000 | Gộp nội dung phù hợp; 301 → /quy-hoach/ |
| /tin-tuc/quy-hoach-1-500-cach-doc/ | quy hoạch 1/500 | quy hoạch 1/500 | Gộp nội dung phù hợp; 301 → /quy-hoach/ |
| /tin-tuc/ky-hieu-chuc-nang-dat/ | ký hiệu chức năng đất | ký hiệu chức năng đất | Gộp nội dung phù hợp; 301 → /quy-hoach/ |
| /tin-tuc/mat-do-xay-dung-khi-chon-nha/ | mật độ xây dựng | mật độ xây dựng | Gộp nội dung phù hợp; 301 → /quy-hoach/ |
| /tin-tuc/tang-cao-va-khong-gian-song/ | tầng cao công trình và lựa chọn không gian sống | tầng cao công trình và lựa chọn không gian sống | Gộp nội dung phù hợp; 301 → /quy-hoach/ |
| /tin-tuc/khoang-lui-va-chi-gioi/ | khoảng lùi, chỉ giới | khoảng lùi, chỉ giới | Gộp nội dung phù hợp; 301 → /quy-hoach/ |
| /tin-tuc/phan-ky-dau-tu-va-tien-ich/ | phân kỳ đầu tư | phân kỳ đầu tư | Gộp nội dung phù hợp; 301 → /quy-hoach/ |
| /tin-tuc/dieu-chinh-quy-hoach-cach-theo-doi/ | theo dõi điều chỉnh quy hoạch | theo dõi điều chỉnh quy hoạch | Gộp nội dung phù hợp; 301 → /quy-hoach/ |
| /tin-tuc/chon-biet-thu-theo-nhu-cau/ | chọn biệt thự | chọn biệt thự | Gộp nội dung phù hợp; 301 → /san-pham/ |
| /tin-tuc/chon-lien-ke-cong-nang/ | chọn nhà liền kề | chọn nhà liền kề | Gộp nội dung phù hợp; 301 → /san-pham/ |
| /tin-tuc/chon-shophouse-dong-khach/ | shophouse | shophouse | Gộp nội dung phù hợp; 301 → /san-pham/ |
| /tin-tuc/chon-can-ho-cho-gia-dinh/ | chọn căn hộ cho gia đình | chọn căn hộ cho gia đình | Gộp nội dung phù hợp; 301 → /san-pham/ |
| /tin-tuc/can-goc-va-can-giua/ | căn góc và căn giữa | căn góc và căn giữa | Gộp nội dung phù hợp; 301 → /san-pham/ |
| /tin-tuc/san-vuon-khi-chon-nha/ | sân vườn nhà ở | sân vườn nhà ở | Gộp nội dung phù hợp; 301 → /san-pham/ |
| /tin-tuc/tam-nhin-va-kha-nang-thay-doi/ | tầm nhìn căn nhà | tầm nhìn căn nhà | Gộp nội dung phù hợp; 301 → /san-pham/ |
| /tin-tuc/nha-cho-gia-dinh-nhieu-the-he/ | nhà cho gia đình nhiều thế hệ | nhà cho gia đình nhiều thế hệ | Gộp nội dung phù hợp; 301 → /san-pham/ |
| /tin-tuc/lap-ngan-sach-mua-nha/ | ngân sách mua nhà olympic | ngân sách mua nhà olympic | Gộp nội dung phù hợp; 301 → /gia-ban/ |
| /tin-tuc/vay-mua-nha-kha-nang-tra-no/ | vay mua nhà | vay mua nhà | Gộp nội dung phù hợp; 301 → /gia-ban/ |
| /tin-tuc/lai-suat-uu-dai-va-tha-noi/ | lãi suất ưu đãi và thả nổi | lãi suất ưu đãi và thả nổi | Gộp nội dung phù hợp; 301 → /gia-ban/ |
| /tin-tuc/tien-do-thanh-toan-mua-nha/ | tiến độ thanh toán | tiến độ thanh toán | Gộp nội dung phù hợp; 301 → /gia-ban/ |
| /tin-tuc/chi-phi-co-hoi-mua-bat-dong-san/ | chi phí cơ hội khi mua bất động sản | chi phí cơ hội khi mua bất động sản | Gộp nội dung phù hợp; 301 → /gia-ban/ |
| /tin-tuc/thanh-khoan-bat-dong-san/ | thanh khoản bất động sản | thanh khoản bất động sản | Gộp nội dung phù hợp; 301 → /gia-ban/ |
| /tin-tuc/dong-tien-cho-thue-nha/ | dòng tiền cho thuê nhà | dòng tiền cho thuê nhà | Gộp nội dung phù hợp; 301 → /gia-ban/ |
| /tin-tuc/quy-du-phong-khi-so-huu-nha/ | quỹ dự phòng khi sở hữu nhà | quỹ dự phòng khi sở hữu nhà | Gộp nội dung phù hợp; 301 → /gia-ban/ |
| /tin-tuc/ho-so-can-xem-truoc-khi-mua/ | hồ sơ cần xem trước khi mua | hồ sơ cần xem trước khi mua | Gộp nội dung phù hợp; 301 → /phap-ly/ |
| /tin-tuc/dat-coc-mua-nha-can-doc-gi/ | đặt cọc mua nhà | đặt cọc mua nhà | Gộp nội dung phù hợp; 301 → /phap-ly/ |
| /tin-tuc/doc-hop-dong-mua-ban-nha/ | đọc hợp đồng mua bán nhà | đọc hợp đồng mua bán nhà | Gộp nội dung phù hợp; 301 → /phap-ly/ |
| /tin-tuc/bao-lanh-nha-o-hinh-thanh-tuong-lai/ | bảo lãnh nhà ở hình thành trong tương lai | bảo lãnh nhà ở hình thành trong tương lai | Gộp nội dung phù hợp; 301 → /phap-ly/ |
| /tin-tuc/the-chap-va-giai-chap-tai-san/ | thế chấp và giải chấp | thế chấp và giải chấp | Gộp nội dung phù hợp; 301 → /phap-ly/ |
| /tin-tuc/quyen-so-huu-va-thoi-han-su-dung/ | quyền sở hữu và thời hạn sử dụng | quyền sở hữu và thời hạn sử dụng | Gộp nội dung phù hợp; 301 → /phap-ly/ |
| /tin-tuc/kiem-tra-don-vi-tu-van-phan-phoi/ | kiểm tra đơn vị tư vấn và phân phối trước khi giao dịch | kiểm tra đơn vị tư vấn và phân phối trước khi giao dịch | Gộp nội dung phù hợp; 301 → /phap-ly/ |
| /tin-tuc/chung-tu-thanh-toan-bat-dong-san/ | chứng từ thanh toán bất động sản | chứng từ thanh toán bất động sản | Gộp nội dung phù hợp; 301 → /phap-ly/ |
| /tin-tuc/huong-nang-khi-chon-nha/ | hướng nắng khi chọn nhà | hướng nắng khi chọn nhà | Gộp nội dung phù hợp; 301 → /mat-bang/ |
| /tin-tuc/thong-gio-tu-nhien-nha-o/ | thông gió tự nhiên | thông gió tự nhiên | Gộp nội dung phù hợp; 301 → /mat-bang/ |
| /tin-tuc/tieng-on-va-rieng-tu-nha-o/ | tiếng ồn và riêng tư | tiếng ồn và riêng tư | Gộp nội dung phù hợp; 301 → /mat-bang/ |
| /tin-tuc/thoat-nuoc-va-cao-do-khu-dat/ | thoát nước và cao độ | thoát nước và cao độ | Gộp nội dung phù hợp; 301 → /mat-bang/ |
| /tin-tuc/loi-thoat-nan-khi-chon-nha/ | lối thoát nạn khi chọn nhà | lối thoát nạn khi chọn nhà | Gộp nội dung phù hợp; 301 → /mat-bang/ |
| /tin-tuc/cho-do-xe-khi-mua-nha/ | chỗ đỗ xe khi mua nhà | chỗ đỗ xe khi mua nhà | Gộp nội dung phù hợp; 301 → /mat-bang/ |
| /tin-tuc/khoang-cach-di-bo-den-tien-ich/ | khoảng cách đi bộ tới tiện ích | khoảng cách đi bộ tới tiện ích | Gộp nội dung phù hợp; 301 → /mat-bang/ |
| /tin-tuc/khao-sat-khu-dan-cu-buoi-toi/ | khảo sát khu dân cư buổi tối | khảo sát khu dân cư buổi tối | Gộp nội dung phù hợp; 301 → /mat-bang/ |
| /tin-tuc/truong-hoc-khi-chon-noi-o/ | trường học khi chọn nơi ở | trường học khi chọn nơi ở | Gộp nội dung phù hợp; 301 → /tong-quan/ |
| /tin-tuc/y-te-va-tiep-can-cham-soc/ | dịch vụ y tế khi chọn nhà | dịch vụ y tế khi chọn nhà | Gộp nội dung phù hợp; 301 → /tong-quan/ |
| /tin-tuc/tien-ich-the-thao-cho-cu-dan/ | tiện ích thể thao | tiện ích thể thao | Gộp nội dung phù hợp; 301 → /tong-quan/ |
| /tin-tuc/cong-vien-va-khong-gian-xanh/ | công viên và không gian xanh | công viên và không gian xanh | Gộp nội dung phù hợp; 301 → /tong-quan/ |
| /tin-tuc/nha-o-phu-hop-nguoi-cao-tuoi/ | nhà ở cho người cao tuổi | nhà ở cho người cao tuổi | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/khong-gian-cho-tre-em/ | không gian sống cho trẻ em | không gian sống cho trẻ em | Gộp nội dung phù hợp; 301 → /tong-quan/ |
| /tin-tuc/mua-sam-dich-vu-hang-ngay/ | mua sắm hàng ngày khi chọn nhà | mua sắm hàng ngày khi chọn nhà | Gộp nội dung phù hợp; 301 → /tong-quan/ |
| /tin-tuc/kiem-tra-anh-tien-do-du-an/ | ảnh tiến độ dự án | ảnh tiến độ dự án | Gộp nội dung phù hợp; 301 → /tien-do/ |
| /tin-tuc/giai-phong-mat-bang-va-thi-cong/ | giải phóng mặt bằng và thi công | giải phóng mặt bằng và thi công | Gộp nội dung phù hợp; 301 → /tien-do/ |
| /tin-tuc/ha-tang-ky-thuat-truoc-khi-o/ | hạ tầng kỹ thuật trước khi ở | hạ tầng kỹ thuật trước khi ở | Gộp nội dung phù hợp; 301 → /tien-do/ |
| /tin-tuc/phan-biet-mong-va-ket-cau/ | móng và kết cấu | móng và kết cấu | Gộp nội dung phù hợp; 301 → /tien-do/ |
| /tin-tuc/tieu-chuan-hoan-thien-nha/ | tiêu chuẩn hoàn thiện | tiêu chuẩn hoàn thiện | Gộp nội dung phù hợp; 301 → /tien-do/ |
| /tin-tuc/cham-ban-giao-cach-theo-doi/ | theo dõi lịch bàn giao | theo dõi lịch bàn giao | Gộp nội dung phù hợp; 301 → /tien-do/ |
| /tin-tuc/van-hanh-khu-do-thi-giai-doan-dau/ | vận hành khu đô thị giai đoạn đầu | vận hành khu đô thị giai đoạn đầu | Gộp nội dung phù hợp; 301 → /tien-do/ |
| /tin-tuc/mua-de-o-hay-dau-tu/ | mua để ở hay đầu tư | mua để ở hay đầu tư | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/thap-tang-hay-can-ho/ | nhà thấp tầng hay căn hộ | nhà thấp tầng hay căn hộ | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/nha-san-co-hay-hinh-thanh-tuong-lai/ | nhà sẵn có hay hình thành trong tương lai | nhà sẵn có hay hình thành trong tương lai | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/thue-hay-mua-nha/ | thuê hay mua nhà | thuê hay mua nhà | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/dien-tich-dat-san-thong-thuy/ | diện tích đất, sàn và thông thủy | diện tích đất, sàn và thông thủy | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/tong-gia-tri-hay-don-gia/ | tổng giá trị hay đơn giá | tổng giá trị hay đơn giá | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/ban-mo-ta-nhu-cau-mua-nha/ | bản mô tả nhu cầu mua nhà | bản mô tả nhu cầu mua nhà | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/lap-danh-sach-can-so-sanh/ | lập danh sách căn so sánh | lập danh sách căn so sánh | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/lich-di-xem-nha-hieu-qua/ | lịch đi xem nhà hiệu quả | lịch đi xem nhà hiệu quả | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/dam-phan-dieu-kien-mua-nha/ | đàm phán mua nhà | đàm phán mua nhà | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/checklist-nhan-ban-giao-nha/ | checklist nhận bàn giao nhà | checklist nhận bàn giao nhà | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| /tin-tuc/sau-khi-mua-nha-can-lam-gi/ | sau khi mua nhà | sau khi mua nhà | Gộp nội dung phù hợp; 301 → /so-sanh/ |
| / | vinhomes olympic thường tín | Điểm vào thông tin dự án | Giữ |
| /tin-tuc/ | tin dự án olympic theo ngày | Tin ngắn theo sự kiện, dẫn về trụ cột | Giữ; bỏ cẩm nang trùng ý |
| /chinh-sach-bao-mat/ | bảo mật dữ liệu tư vấn | Chính sách xử lý thông tin biểu mẫu | Giữ |

## Phần bổ sung

Bổ sung trang giới thiệu, liên hệ, tác giả Mạnh Việt, chính sách biên tập bằng thông tin đang có; không tự đặt học vị, chứng chỉ, địa chỉ hay MST. Mọi bài cập nhật phải dẫn nguồn gốc đúng phạm vi. Số liệu chỉ có một nguồn được đánh dấu trong hồ sơ kiểm tra và ghi rõ tài liệu/ngày trong nội dung khi cần. Không đưa giá chào bán hay thời gian chạy xe không đo được.

Mỗi trụ cột sở hữu nhóm từ khóa phụ riêng; bài cũ chuyển hướng được gắn mục tiêu theo chuyên đề, không tạo bài cạnh tranh. Rủi ro: việc giảm mạnh URL có thể làm biến động tìm kiếm; không có dữ liệu Search Console để định lượng traffic và backlink bị ảnh hưởng. Đã sao lưu toàn bộ CMS và mã triển khai trước khi sửa, nội dung gốc được bảo toàn.

## Bảng URL sau thực hiện

| URL | Ý định / nhóm từ khóa chính | Từ khóa phụ phân vai | Trạng thái |
|---|---|---|---|
| / | Tìm thông tin nền tảng về Olympic Thường Tín | Trang chức năng / sự kiện cụ thể | Giữ index |
| /tong-quan/ | Nhận diện dự án, tên hồ sơ và cấu trúc tổng thể | vinhomes olympic là gì; khu đô thị thể thao quốc tế hà nội; quy mô tổng thể olympic; chủ đầu tư phân khu b; tên gọi olympic thường tín; dự án phía nam hà nội | Giữ index |
| /vi-tri/ | Xác định địa bàn, ranh và tổ chức khảo sát đường tiếp cận | vinhomes olympic ở đâu; ranh giới phân khu b; đường vào olympic; olympic thường tín thuộc xã nào; kết nối phân khu b; đo đường đi olympic | Giữ index |
| /quy-hoach/ | Đọc cấp quy hoạch, phân khu và phiên bản đồ án | quy hoạch olympic 1/500; quy hoạch olympic 1/2000; phân khu a b c d olympic; quyết định 6260; điều chỉnh đồ án olympic; chức năng đất phân khu b | Giữ index |
| /san-pham/ | Chọn nhóm loại hình theo công năng sử dụng và dữ liệu sản phẩm | liền kề olympic trong hồ sơ; biệt thự olympic trong hồ sơ; chung cư olympic trong hồ sơ; thương mại dịch vụ olympic; chọn loại hình olympic; tiện ích quy hoạch olympic | Giữ index |
| /gia-ban/ | Chuẩn hóa báo giá và kiểm tra khả năng chi trả | bảng giá olympic cần kiểm tra; chi phí mua nhà olympic; giá đất và giá nhà olympic; chiết khấu báo giá olympic; ngân sách mua olympic; đơn giá sản phẩm olympic | Giữ index |
| /mat-bang/ | Đọc bản vẽ, ký hiệu và diện tích của ô đất hoặc căn | bản vẽ mặt bằng olympic; diện tích đô thị phân khu b; cơ cấu diện tích olympic b; đọc chú giải mặt bằng; mặt bằng căn olympic; tỷ lệ bản vẽ olympic | Giữ index |
| /tien-do/ | Theo dõi mốc triển khai theo ngày, địa bàn và hạng mục | tiến độ olympic tháng 10 2026; giải phóng mặt bằng dân hòa; thu hồi đất tri lễ olympic; nguồn gốc đất quế sơn; đường dẫn ước lễ; nhật ký xây dựng olympic | Giữ index |
| /phap-ly/ | Kiểm tra chuỗi hồ sơ và chủ thể của giao dịch cụ thể | quyết định 916 olympic; hồ sơ môi trường phân khu b; liên danh đầu tư olympic; điều kiện kinh doanh nhà olympic; kiểm tra bên ký olympic; hồ sơ pháp lý phân khu b | Giữ index |
| /so-sanh/ | So phương án ở hoặc đầu tư trên cùng nhu cầu và ngân sách | có nên mua olympic; đánh giá nhu cầu ở olympic; so phương án mua olympic; rủi ro thời gian chờ olympic; quy mô và giá trị sử dụng; tiêu chí chọn olympic | Giữ index |
| /gioi-thieu/ | Giới thiệu trang thông tin Vinhomes Olympic | Trang chức năng / sự kiện cụ thể | Giữ index |
| /lien-he/ | Liên hệ Mạnh Việt về thông tin Vinhomes Olympic | Trang chức năng / sự kiện cụ thể | Giữ index |
| /tac-gia-manh-viet/ | Mạnh Việt – người biên tập website Olympic | Trang chức năng / sự kiện cụ thể | Giữ index |
| /chinh-sach-bien-tap/ | Chính sách biên tập và kiểm chứng dữ kiện | Trang chức năng / sự kiện cụ thể | Giữ index |
| /tin-tuc/ | Chọn đúng hướng dẫn theo câu hỏi của người đọc | Trang chức năng / sự kiện cụ thể | Giữ index |
| /chinh-sach-bao-mat/ | Biết dữ liệu đăng ký tư vấn được dùng như thế nào | Trang chức năng / sự kiện cụ thể | Giữ index |
| /tin-tuc/tri-le-thu-hoi-dat-13-10-2026/ | Bản tin theo sự kiện: Tri Lễ: công khai thu hồi đất ngày 13/10/2026 | Trang chức năng / sự kiện cụ thể | Giữ index |
| /tin-tuc/que-son-nguon-goc-dat-28-09-2026/ | Bản tin theo sự kiện: Quế Sơn: điều chỉnh nguồn gốc đất ngày 28/09/2026 | Trang chức năng / sự kiện cụ thể | Giữ index |
| /tin-tuc/ngoc-hoi-lay-y-kien-10-02-2026/ | Bản tin theo sự kiện: Ngọc Hồi lấy ý kiến quy hoạch Olympic ngày 10/02/2026 | Trang chức năng / sự kiện cụ thể | Giữ index |
| /tin-tuc/tham-dinh-moi-truong-b-13-04-2026/ | Bản tin theo sự kiện: Phân khu B: quyết định môi trường ngày 13/04/2026 | Trang chức năng / sự kiện cụ thể | Giữ index |
