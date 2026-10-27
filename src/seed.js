import { PAGE_CONTENT } from './page-content.js';
import { TEN_POSTS } from './articles.js';
import { GUIDE_POSTS } from './guides.js';
// Starter content only. The administrator edits persistent values in Workers KV.
export const INITIAL_CONTENT = {
  siteName: 'VINHOMES OLYMPIC',
  brand: 'Mạnh Việt Real Estate',
  badge: 'KHÔNG GIAN SỐNG & THỂ THAO TƯƠNG LAI',
  heroTitle: 'VINHOMES',
  heroAccent: 'OLYMPIC',
  heroSubtitle: 'Biểu tượng sống mới phía Nam Hà Nội',
  heroImage: '/assets/olympic-concept.webp',
  heroNote: 'Hình minh họa, không phải phối cảnh chính thức của chủ đầu tư.',
  overviewTitle: 'Một tầm nhìn đô thị mới',
  overviewText: 'Khám phá thông tin tham khảo về khu đô thị thể thao Quốc tế Hà Nội và các định hướng phát triển đô thị tại phía Nam Thủ đô. Website do Mạnh Việt vận hành để hỗ trợ khách hàng tiếp cận nguồn tin, hình ảnh minh họa và cập nhật mới nhất. Thông tin về quy hoạch, sản phẩm và giá bán cần được đối chiếu với các thông báo chính thức.',
  locationTitle: 'Kết nối khu vực phía Nam Hà Nội',
  locationText: 'Khám phá các yếu tố vị trí, liên kết khu vực và định hướng phát triển hạ tầng. Nội dung chỉ phục vụ tham khảo và sẽ được cập nhật khi có công bố chính thức.',
  stats: [
    { number: '~9.171 ha', label: 'Quy mô dự án tổng thể' },
    { number: '04 phân khu', label: 'Theo thông tin quy hoạch công khai' },
    { number: '02/2026', label: 'Thông tin lấy ý kiến quy hoạch' },
    { number: 'Tư vấn riêng', label: 'Chọn thông tin theo nhu cầu của bạn' }
  ],
  products: [
    { id: 'p-villa', title: 'Biệt thự', type: 'Biệt thự', short: 'Ý tưởng không gian sống riêng tư và cảnh quan xanh.', image: '/assets/waterfront.webp', detail: 'Nội dung mang tính minh họa ý tưởng, chưa phải thông tin mở bán chính thức.' },
    { id: 'p-town', title: 'Liền kề', type: 'Liền kề', short: 'Khám phá hình dung về những dãy nhà phố hiện đại.', image: '/assets/city.webp', detail: 'Loại hình minh họa, vui lòng kiểm tra thông báo từ chủ đầu tư.' },
    { id: 'p-shop', title: 'Shophouse', type: 'Shophouse', short: 'Ý tưởng không gian thương mại trong đô thị.', image: '/assets/sport.webp', detail: 'Không xác nhận nguồn cung hoặc chính sách kinh doanh.' },
    { id: 'p-urban', title: 'Không gian đô thị', type: 'Khác', short: 'Cảm hứng cho nhịp sống đô thị thể thao mới.', image: '/assets/olympic-concept.webp', detail: 'Hình ảnh minh họa độc lập.' }
  ],
  amenities: [
    { icon: '✧', title: 'Không gian thể thao', description: 'Định hướng hệ sinh thái thể thao trong quy hoạch đô thị.' },
    { icon: '♧', title: 'Không gian xanh', description: 'Cảnh quan và cộng đồng sống lành mạnh.' },
    { icon: '⌖', title: 'Kết nối khu vực', description: 'Theo dõi các thông tin về hạ tầng và giao thông.' }
  ],
  gallery: [
    { id: 'g1', title: 'Tầm nhìn đô thị thể thao', image: '/assets/olympic-concept.webp' },
    { id: 'g2', title: 'Cảnh quan mặt nước', image: '/assets/waterfront.webp' },
    { id: 'g3', title: 'Kiến trúc khu đô thị', image: '/assets/city.webp' },
    { id: 'g4', title: 'Ý tưởng tiện ích', image: '/assets/sport.webp' }
  ],
  priceRows: [],
  pages: [
  {
    "slug": "tong-quan",
    "title": "Tổng quan Khu đô thị thể thao Olympic",
    "keyword": "vinhomes olympic là gì",
    "summary": "Tên dự án trong hồ sơ, quy mô công bố, đầu mối thông tin và những gì cần kiểm tra trước khi tìm hiểu sản phẩm.",
    "body": "## Tên gọi và phạm vi nghiên cứu\nKhu đô thị thể thao Olympic, còn được gọi trong nhiều văn bản là Khu đô thị thể thao Quốc tế Hà Nội, được định hướng phát triển tại phía Nam Hà Nội. “Vinhomes Olympic” là tên gọi thường gặp khi khách hàng tìm kiếm thông tin; khi đối chiếu pháp lý cần bám đúng tên trong từng hồ sơ.\n\n## Quy mô và phân khu\nTheo thông tin UBND xã Dân Hòa công bố ngày 22/04/2026, quy mô tổng thể khoảng 9.171 ha, chia thành bốn phân khu trên địa bàn nhiều xã, phường. Đây là quy mô của dự án tổng thể, không phải diện tích của một giai đoạn đang chào bán.\n\n## Chủ đầu tư và phạm vi xác nhận\nTài liệu môi trường do cơ quan chức năng Hà Nội công bố nêu Công ty Cổ phần Vinhomes là chủ đầu tư dự án thành phần phân khu B. Không nên tự suy rộng thông tin của riêng phân khu B thành thông tin pháp lý của mọi sản phẩm hay phân khu.\n\n## Những dữ liệu còn phải kiểm tra\nCác thông tin giá bán từng căn, giỏ hàng, đặt chỗ và điều kiện ký hợp đồng cần đối chiếu văn bản phát hành có hiệu lực tại thời điểm giao dịch. Liên hệ Mạnh Việt để được hỗ trợ rà soát tài liệu, không thay thế xác nhận từ chủ đầu tư.",
    "sourceLabel": "UBND xã Dân Hòa – thông tin quy mô và GPMB (22/04/2026)",
    "sourceUrl": "https://danhoa.hanoi.gov.vn/cac-du-an-trong-diem/xa-dan-hoa-quyet-tam-hoan-thanh-tien-do-giai-phong-mat-bang-khu-do-thi-the-thao-olympic-2765260422103124797.htm",
    "status": "confirmed",
    "image": "/assets/olympic-concept.webp",
    "published": true,
    "updated": "2026-10-21",
    "seoTitle": "Tổng quan Khu đô thị thể thao Olympic | Mạnh Việt",
    "seoDescription": "Tên dự án trong hồ sơ, quy mô công bố, đầu mối thông tin và những gì cần kiểm tra trước khi tìm hiểu sản phẩm."
  },
  {
    "slug": "vi-tri",
    "title": "Vị trí dự án Olympic tại phía Nam Hà Nội",
    "keyword": "vinhomes olympic ở đâu",
    "summary": "Tìm hiểu các địa bàn được đề cập trong hồ sơ, cách đọc ranh giới và hạn chế của bản đồ môi giới.",
    "body": "## Vị trí được nhắc đến trong hồ sơ\nTài liệu môi trường của phân khu B ghi nhận các xã Thường Tín, Thượng Phúc, Tam Hưng và Dân Hòa thuộc địa bàn thực hiện phân khu này. Khu đô thị tổng thể trải rộng qua nhiều địa bàn khác, vì vậy không thể dùng vị trí một phân khu để mô tả toàn bộ dự án.\n\n## Cách xác minh một lô đất hoặc phân khu\nHãy yêu cầu số hiệu bản vẽ, quyết định hoặc trích lục quy hoạch có thẩm quyền; kiểm tra mốc ranh, địa chỉ hành chính mới và đường đi thực tế. Không nên xác định vị trí căn bằng ảnh khoanh vùng do môi giới tự vẽ.\n\n## Kết nối và thời gian di chuyển\nKhả năng tiếp cận thay đổi theo vị trí cụ thể, tuyến giao thông đã khai thác và thời điểm trong ngày. Chúng tôi không công bố phút di chuyển hoặc cam kết hạ tầng tương lai khi chưa có số liệu kiểm chứng.\n\n## Gợi ý khi đi thực địa\nĐối chiếu địa điểm dự kiến trên bản đồ quy hoạch với khu vực thực tế, kiểm tra pháp lý và tiến độ hạ tầng của khu vực bạn quan tâm.",
    "sourceLabel": "Sở Nông nghiệp và Môi trường Hà Nội – hồ sơ phân khu B",
    "sourceUrl": "https://sotnmt.hanoi.gov.vn/images/pdf/Nam2026/document%202.pdf",
    "status": "confirmed",
    "image": "/assets/city.webp",
    "published": true,
    "updated": "2026-10-21",
    "seoTitle": "Vị trí dự án Olympic tại phía Nam Hà Nội | Mạnh Việt",
    "seoDescription": "Tìm hiểu các địa bàn được đề cập trong hồ sơ, cách đọc ranh giới và hạn chế của bản đồ môi giới."
  },
  {
    "slug": "quy-hoach",
    "title": "Quy hoạch Olympic: A, B, C, D cần đọc thế nào?",
    "keyword": "quy hoạch olympic a b c d",
    "summary": "Hướng dẫn phân biệt quy hoạch phân khu với quy hoạch chi tiết và hồ sơ lấy ý kiến cộng đồng.",
    "body": "## Các lớp quy hoạch\nQuy hoạch phân khu tỷ lệ 1/2000 thể hiện định hướng tổ chức không gian rộng; đồ án quy hoạch chi tiết tỷ lệ 1/500 đi sâu hơn vào các khu vực. Hai cấp tài liệu không thay thế quyết định giao đất, giấy phép hay hồ sơ đủ điều kiện bán nhà hình thành trong tương lai.\n\n## Tiến trình lấy ý kiến\nNgày 10/02/2026, UBND xã Ngọc Hồi ghi nhận việc lấy ý kiến cộng đồng đối với đồ án quy hoạch chi tiết 1/500 Khu đô thị thể thao Olympic (phân khu A, B, C, D). “Lấy ý kiến” không đồng nghĩa với “đã phê duyệt” toàn bộ hạng mục.\n\n## Mặt bằng môi giới và bản vẽ chính thức\nChỉ nên công bố sơ đồ khi có quyền sử dụng và ghi rõ phiên bản, đơn vị ban hành, ngày cập nhật. Một số sơ đồ xuất hiện trên mạng mang tính tổng hợp, dễ bị nhầm với mặt bằng bán hàng.\n\n## Cần hỏi gì trước khi mua?\nDự án thành phần nào, quyết định pháp lý nào áp dụng, loại đất của căn, tiến độ dự kiến và điều kiện mở bán là những câu hỏi nên có câu trả lời bằng tài liệu cụ thể.",
    "sourceLabel": "UBND xã Ngọc Hồi – lấy ý kiến quy hoạch 1/500 (10/02/2026)",
    "sourceUrl": "https://ngochoi.hanoi.gov.vn/tin-tuc-su-kien/lay-y-kien-cong-dong-dan-cu-doi-voi-do-an-quy-hoach-chi-tiet-ty-le-1-500-khu-do-thi-the-thao-olympic-phan-khu-a-b-c-d-2724260210151416024.htm",
    "status": "confirmed",
    "image": "/assets/sport.webp",
    "published": true,
    "updated": "2026-10-21",
    "seoTitle": "Quy hoạch Olympic: A, B, C, D cần đọc thế nào? | Mạnh Việt",
    "seoDescription": "Hướng dẫn phân biệt quy hoạch phân khu với quy hoạch chi tiết và hồ sơ lấy ý kiến cộng đồng."
  },
  {
    "slug": "san-pham",
    "title": "Loại hình bất động sản được quan tâm tại Olympic",
    "keyword": "biệt thự liền kề shophouse olympic",
    "summary": "Góc nhìn nhu cầu mua ở, kinh doanh và đầu tư; không nhầm concept với danh mục sản phẩm mở bán.",
    "body": "## Nhu cầu mua ở và đầu tư\nNgười mua thường tìm kiếm biệt thự, nhà liền kề, nhà phố thương mại và căn hộ khi tìm hiểu một đại đô thị. Trên website này, các ảnh loại hình là minh họa phong cách sống, không xác nhận từng dòng sản phẩm đã đủ điều kiện giao dịch.\n\n## Biệt thự và nhà ở thấp tầng\nTrước khi đánh giá một căn, hãy kiểm tra diện tích đất, diện tích xây dựng, mặt tiền, hướng, thời hạn sử dụng, hình thức sở hữu và nghĩa vụ tài chính gắn với hồ sơ cụ thể.\n\n## Shophouse và dòng tiền\nLợi nhuận cho thuê phụ thuộc mật độ cư dân, lưu lượng thương mại, thiết kế kinh doanh và chi phí vận hành. Không nên tính dòng tiền dựa hoàn toàn trên hứa hẹn lưu lượng khách trong tương lai.\n\n## Nhận tư vấn theo tiêu chí thật\nMạnh Việt có thể hỗ trợ lập danh sách câu hỏi, nhu cầu diện tích và ngân sách; chỉ gửi danh mục căn khi có nguồn tài liệu hợp lệ để đối chiếu.",
    "sourceLabel": "UBND xã Dân Hòa – thông tin chung dự án",
    "sourceUrl": "https://danhoa.hanoi.gov.vn/cac-du-an-trong-diem/xa-dan-hoa-quyet-tam-hoan-thanh-tien-do-giai-phong-mat-bang-khu-do-thi-the-thao-olympic-2765260422103124797.htm",
    "status": "needs-verification",
    "image": "/assets/waterfront.webp",
    "published": true,
    "updated": "2026-10-21",
    "seoTitle": "Loại hình bất động sản được quan tâm tại Olympic | Mạnh Việt",
    "seoDescription": "Góc nhìn nhu cầu mua ở, kinh doanh và đầu tư; không nhầm concept với danh mục sản phẩm mở bán."
  },
  {
    "slug": "gia-ban",
    "title": "Giá bán, chiết khấu và quỹ căn Olympic",
    "keyword": "giá vinhomes olympic 2026",
    "summary": "Chưa công bố bảng giá xác thực tại đây. Hướng dẫn kiểm tra giá, voucher, điều kiện thanh toán và quỹ căn.",
    "body": "## Vì sao trang chưa đăng giá cụ thể?\nChúng tôi chưa có bảng giá và danh mục quỹ căn được xác thực để niêm yết công khai. Việc đưa mức giá đồn đoán có thể khiến người mua hiểu nhầm về số tiền cần chuẩn bị hoặc điều kiện giao dịch.\n\n## Khi có bảng giá, cần xem những gì?\nĐối chiếu mã căn, diện tích, giá niêm yết, VAT nếu áp dụng, kinh phí bảo trì, phí khác, mức chiết khấu, điều kiện voucher, thời điểm thanh toán và lãi vay sau ưu đãi. Cần phân biệt giá dự kiến và giá theo văn bản bán hàng.\n\n## Chính sách tài chính có thể thay đổi\nChiết khấu, chính sách thành viên và phương án vay cần đối chiếu đúng văn bản, đối tượng được áp dụng và hạn hiệu lực; không mặc định ưu đãi của dự án khác áp dụng cho Olympic.\n\n## Nhận tài liệu được kiểm tra\nĐể lại nhu cầu và thông tin liên hệ, chúng tôi sẽ hỗ trợ xác minh nguồn trước khi trao đổi về con số; không nhận đặt cọc khi chưa có căn cứ giao dịch hợp lệ.",
    "sourceLabel": "Nguồn chính thức cần bổ sung khi có bảng giá hợp lệ",
    "sourceUrl": "",
    "status": "pending",
    "image": "/assets/city.webp",
    "published": true,
    "updated": "2026-10-21",
    "seoTitle": "Giá bán, chiết khấu và quỹ căn Olympic | Mạnh Việt",
    "seoDescription": "Chưa công bố bảng giá xác thực tại đây. Hướng dẫn kiểm tra giá, voucher, điều kiện thanh toán và quỹ căn."
  },
  {
    "slug": "mat-bang",
    "title": "Mặt bằng Olympic: xem bản vẽ và ranh giới ở đâu?",
    "keyword": "mặt bằng vinhomes olympic",
    "summary": "Nhận diện bản đồ quy hoạch tham khảo và cách xác minh bản vẽ có hiệu lực, không tự suy diễn vị trí căn.",
    "body": "## Phân biệt các loại bản vẽ\nSơ đồ vị trí, sơ đồ quy hoạch sử dụng đất, bản vẽ giao thông và mặt bằng bán hàng phục vụ mục đích khác nhau. Bản vẽ dự thảo lấy ý kiến chưa phải sơ đồ sản phẩm đủ điều kiện bán.\n\n## Hồ sơ quy hoạch có thể tra cứu\nCác thông báo công khai quy hoạch chi tiết 1/500 được đăng trên cổng thông tin chính quyền địa phương; có thể đối chiếu tên đồ án và hồ sơ đi kèm khi tài liệu được công bố.\n\n## Trước khi sử dụng một ảnh mặt bằng\nKiểm tra ngày cập nhật, quyết định đi kèm, chữ ký hoặc nguồn phát hành; xác định ảnh có được phép tái sử dụng hay không. Website ưu tiên đặt liên kết đến nguồn gốc thay vì sao chép bản đồ chưa có quyền sử dụng.\n\n## Tại sao chưa hiển thị số lô?\nChưa có bảng xác thực ghép mã sản phẩm với sơ đồ từng phân khu. Chúng tôi không tự vẽ và gắn nhãn lô để tránh gây hiểu nhầm.",
    "sourceLabel": "Cổng thông tin địa phương – hồ sơ lấy ý kiến quy hoạch khu C",
    "sourceUrl": "https://chuongduong.hanoi.gov.vn/thong-bao/thong-bao-ve-viec-niem-yet-cong-khai-lay-y-kien-co-quan-quan-ly-nha-nuoc-to-chuc-chuyen-gia-va-cong-dong-dan-cu-co-lien-quan-doi-voi-quy-hoach-chi-tiet-ty-le-1-500-khu-do-thi-the-thao-olympic-khu-c-2799260206161359492.htm",
    "status": "needs-verification",
    "image": "/assets/sport.webp",
    "published": true,
    "updated": "2026-10-21",
    "seoTitle": "Mặt bằng Olympic: xem bản vẽ và ranh giới ở đâu? | Mạnh Việt",
    "seoDescription": "Nhận diện bản đồ quy hoạch tham khảo và cách xác minh bản vẽ có hiệu lực, không tự suy diễn vị trí căn."
  },
  {
    "slug": "tien-do",
    "title": "Tiến độ thực hiện khu đô thị thể thao Olympic",
    "keyword": "tiến độ vinhomes olympic 2026",
    "summary": "Những mốc đã công khai về quy hoạch, giải phóng mặt bằng và cách theo dõi diễn biến tiếp theo.",
    "body": "## Những mốc có thể đối chiếu\nTháng 02/2026, các địa phương đã thông tin về hoạt động lấy ý kiến quy hoạch chi tiết 1/500. Tháng 04/2026, UBND xã Dân Hòa công bố công tác giải phóng mặt bằng đang được triển khai trên địa bàn. Tháng 06/2026, UBND xã Thanh Oai công bố các quyết định bồi thường, hỗ trợ, tái định cư theo từng đợt.\n\n## Tiến độ phải gắn với hạng mục\nBồi thường, xây dựng hạ tầng, triển khai công trình thể thao, phát triển nhà ở và nghiệm thu không phải một mốc duy nhất. Khi đọc tin tiến độ cần hỏi “ở phân khu nào, công trình nào, nguồn nào và ngày nào”.\n\n## Ảnh thực địa\nWebsite hiện sử dụng hình concept thay vì ảnh hiện trạng; chỉ bổ sung ảnh công trường nếu chúng tôi sở hữu ảnh hoặc được quyền sử dụng, có ngày chụp và mô tả rõ.\n\n## Theo dõi cập nhật\nƯu tiên quyết định của cơ quan có thẩm quyền và thông báo chủ đầu tư, sau đó mới đến báo chí và các kênh tư vấn.",
    "sourceLabel": "UBND xã Thanh Oai – quyết định bồi thường đợt 5 (05/06/2026)",
    "sourceUrl": "https://thanhoai.hanoi.gov.vn/chi-tiet-van-ban/quyet-dinh-ve-viec-phe-duyet-phuong-an-boi-thuong-ho-tro-tai-dinh-cu-khi-nha-nuoc-thu-hoi-dat-de-th-253884",
    "status": "confirmed",
    "image": "/assets/city.webp",
    "published": true,
    "updated": "2026-10-21",
    "seoTitle": "Tiến độ thực hiện khu đô thị thể thao Olympic | Mạnh Việt",
    "seoDescription": "Những mốc đã công khai về quy hoạch, giải phóng mặt bằng và cách theo dõi diễn biến tiếp theo."
  },
  {
    "slug": "phap-ly",
    "title": "Pháp lý Olympic: checklist trước giao dịch",
    "keyword": "pháp lý vinhomes olympic",
    "summary": "Bộ câu hỏi giúp phân biệt pháp lý quy hoạch, pháp lý dự án và điều kiện kinh doanh sản phẩm.",
    "body": "## Những gì có nguồn công khai\nMột số hồ sơ quy hoạch, hồ sơ môi trường theo phân khu và quyết định liên quan đến giải phóng mặt bằng có thể tra cứu trên cổng cơ quan nhà nước. Chúng chứng minh hoạt động quản lý, triển khai ở phạm vi tương ứng; không tự động xác lập điều kiện bán của từng căn.\n\n## Checklist trước khi giao dịch\nYêu cầu xác nhận đơn vị đứng tên bán hàng, hồ sơ đất đai, giấy tờ xây dựng nếu bắt buộc, điều kiện bán nhà ở hình thành trong tương lai và mẫu hợp đồng. Kiểm tra tài khoản nhận tiền, đối tượng nhận cọc và điều khoản hoàn trả.\n\n## Bản quy hoạch không phải giấy chứng nhận\nVị trí trong bản vẽ 1/500 không thay thế quyền sử dụng đất hợp pháp hay tài liệu về quyền sở hữu nhà. Tránh dùng ảnh “giấy tờ pháp lý dự án” không có số quyết định và đường tra cứu.\n\n## Khi cần tư vấn chuyên sâu\nNên đối chiếu văn bản gốc và hỏi chuyên gia pháp lý độc lập khi giá trị giao dịch lớn; nội dung trên website không phải ý kiến pháp lý cho một căn cụ thể.",
    "sourceLabel": "Sở NN&MT Hà Nội – tài liệu pháp lý môi trường phân khu B",
    "sourceUrl": "https://sotnmt.hanoi.gov.vn/images/pdf/Nam2026/document%202.pdf",
    "status": "confirmed",
    "image": "/assets/waterfront.webp",
    "published": true,
    "updated": "2026-10-21",
    "seoTitle": "Pháp lý Olympic: checklist trước giao dịch | Mạnh Việt",
    "seoDescription": "Bộ câu hỏi giúp phân biệt pháp lý quy hoạch, pháp lý dự án và điều kiện kinh doanh sản phẩm."
  },
  {
    "slug": "so-sanh",
    "title": "Nên đánh giá Olympic so với các khu đô thị khác thế nào?",
    "keyword": "có nên mua vinhomes olympic",
    "summary": "Khung so sánh minh bạch: vị trí, pháp lý, tổng vốn, tiến độ, nhu cầu sử dụng và tính thanh khoản.",
    "body": "## So sánh dựa trên nhu cầu thật\nTrước tiên xác định mục tiêu mua để ở, khai thác thương mại, giữ tài sản hay đầu tư ngắn hạn. Cùng một dự án có thể phù hợp với người có tài chính dài hạn nhưng không phù hợp với người cần dòng tiền ngay.\n\n## Năm nhóm tiêu chí\n(1) Vị trí và thời gian di chuyển thực tế. (2) Pháp lý sản phẩm có thể kiểm chứng. (3) Giá tổng thể gồm thuế, phí và lãi vay. (4) Tiến độ bàn giao và hạ tầng tại thời điểm sử dụng. (5) Sức mua hoặc nhu cầu cho thuê ở khu vực.\n\n## Không so sánh dựa trên quảng cáo\nKhông dùng tỷ lệ tăng giá dự đoán hay mức lợi nhuận cam kết không có tài liệu. Cần biết rõ mức độ chắc chắn của mỗi dữ kiện khi đặt lên bảng so sánh.\n\n## Kết luận thực tế\nChỉ nên đưa ra quyết định khi tìm được căn cụ thể, hồ sơ hợp lệ và phương án dòng tiền phù hợp. Nếu chưa có bảng hàng chính thức, việc nghiên cứu từ trước vẫn hữu ích nhưng chưa nên coi là lời chào bán.",
    "sourceLabel": "UBND xã Dân Hòa – bối cảnh triển khai khu đô thị",
    "sourceUrl": "https://danhoa.hanoi.gov.vn/cac-du-an-trong-diem/xa-dan-hoa-quyet-tam-hoan-thanh-tien-do-giai-phong-mat-bang-khu-do-thi-the-thao-olympic-2765260422103124797.htm",
    "status": "needs-verification",
    "image": "/assets/olympic-concept.webp",
    "published": true,
    "updated": "2026-10-21",
    "seoTitle": "Nên đánh giá Olympic so với các khu đô thị khác thế nào? | Mạnh Việt",
    "seoDescription": "Khung so sánh minh bạch: vị trí, pháp lý, tổng vốn, tiến độ, nhu cầu sử dụng và tính thanh khoản."
  }
],
  posts: [
    ...TEN_POSTS, ...GUIDE_POSTS,
    { id: 'news-intro', title: 'Tìm hiểu tầm nhìn đô thị thể thao phía Nam Hà Nội', date: '2026-10-16', excerpt: 'Giải thích cách đọc tài liệu quy hoạch, thông tin triển khai và dữ liệu chưa được xác thực.', content: 'Khi tìm hiểu một khu đô thị quy mô lớn, khách hàng nên ưu tiên hồ sơ quy hoạch, công bố chính thức, kết nối hạ tầng và tiến độ thực tế.\n\nChỉ sử dụng bảng giá và chính sách bán hàng khi có văn bản áp dụng hợp lệ.', image: '/assets/olympic-concept.webp', published: false }
  ],
  advisorName: 'Mạnh Việt',
  advisorTitle: 'Tư vấn bất động sản',
  advisorBio: 'Đồng hành cùng anh/chị trên hành trình an cư và đầu tư giá trị.',
  advisorPhoto: '',
  phone: '0986091222',
  zalo: 'https://zalo.me/0986091222',
  facebook: '',
  contactTitle: 'Nhận thông tin dự án',
  contactText: 'Để lại thông tin, Mạnh Việt sẽ liên hệ tư vấn và hỗ trợ giải đáp các câu hỏi về dự án.',
  formNameLabel: 'Họ và tên',
  formPhoneLabel: 'Số điện thoại',
  formNoteLabel: 'Anh/chị quan tâm nội dung gì?',
  formSubmitText: 'GỬI YÊU CẦU TƯ VẤN',
  formConsentText: 'Tôi đồng ý để Mạnh Việt liên hệ theo thông tin đã cung cấp.',
  formQuestions: [],
  seoDescription: 'Thông tin tham khảo Vinhomes Olympic và đô thị thể thao phía Nam Hà Nội. Liên hệ tư vấn Mạnh Việt 0986 091 222.',
  independentDisclaimer: 'Trang thông tin và tư vấn độc lập do Mạnh Việt vận hành, không phải website chính thức của Vingroup/Vinhomes. Hình concept chỉ mang tính minh họa.'
};

// SEO editorial revision: retain CMS-editable fields with separate search metadata.
Object.assign(INITIAL_CONTENT,{
  seoTitle:'Vinhomes Olympic Thường Tín: Quy hoạch, vị trí và pháp lý',
  seoDescription:'Tìm hiểu Vinhomes Olympic Thường Tín: vị trí, quy hoạch, pháp lý và tiến độ. Dữ kiện đối chiếu tài liệu gốc, tư vấn độc lập từ Mạnh Việt.',
  heroTitle:'Vinhomes',heroAccent:'Olympic Thường Tín',heroHeadingDetail:'Đô thị thể thao phía Nam Hà Nội',
  heroSubtitle:'Quy hoạch, vị trí, pháp lý và thông tin cho người mua',
  overviewTitle:'Tổng quan Vinhomes Olympic Thường Tín',
  overviewText:'Khu đô thị thể thao Olympic được định hướng tại phía Nam Hà Nội. UBND xã Dân Hòa công bố quy mô tổng thể khoảng 9.171 ha, chia bốn phân khu. Riêng hồ sơ môi trường phân khu B nêu 2.944,39 ha; không đồng nhất diện tích dự án thành phần với toàn đô thị. Website tổng hợp dữ kiện để người mua đọc đúng phạm vi, kiểm tra vị trí và hồ sơ trước khi lựa chọn.',
  locationTitle:'Vị trí và kết nối khu vực Olympic',
  locationText:'Quyết định môi trường phân khu B ghi địa điểm tại Thường Tín, Thượng Phúc, Tam Hưng và Dân Hòa. Vị trí cụ thể cần được đối chiếu theo mã ô đất, lối tiếp cận và bản vẽ. Đọc chuyên đề vị trí để phân biệt địa bàn trong hồ sơ với hành trình thực tế tới từng khu vực.'
});
const productPage=INITIAL_CONTENT.pages.find(p=>p.slug==='san-pham');
Object.assign(productPage,{
 title:'Loại hình nhà ở và tiêu chí lựa chọn tại Olympic',
 seoTitle:'Sản phẩm Vinhomes Olympic: loại hình và tiêu chí lựa chọn',
 summary:'So sánh nhu cầu với công năng nhà ở; phân biệt loại hình được quan tâm và danh mục sản phẩm có tài liệu giao dịch xác thực.',
 updated:'2026-10-27',
 body:`## Loại hình không thay thế thông tin mở bán
Biệt thự, liền kề, shophouse và căn hộ là các nhóm người mua thường so sánh khi tìm hiểu một đại đô thị. Trang này tập hợp tiêu chí lựa chọn, không công bố giỏ hàng, diện tích căn hoặc giá bán khi chưa có hồ sơ của đúng sản phẩm. Tên loại hình và hình minh họa không xác nhận điều kiện giao dịch.

## Biệt thự
Đọc diện tích đất cùng phần được xây, khoảng lùi, sân vườn và cách tổ chức phòng. Gia đình nhiều thế hệ cần kiểm tra đường di chuyển, phòng ngủ thuận tiện và khả năng tiếp cận khu vệ sinh; tổng diện tích sàn lớn không tự bảo đảm phù hợp. Tính thêm chăm sóc cảnh quan, bảo trì mái, chiếu sáng và an ninh trong ngân sách sở hữu. Nếu thông tin sản phẩm được cung cấp, đối chiếu mã lô, quyền sử dụng và tiêu chuẩn bàn giao trong hồ sơ trước khi trả tiền.

## Liền kề
Mặt tiền, chiều sâu và vị trí thang ảnh hưởng trực tiếp diện tích dùng được. Xem ánh sáng giữa nhà, giếng trời, khu giặt phơi và lối thoát theo thiết kế; đừng chỉ so diện tích đất. Đặt thử nội thất vào mặt bằng và tính chi phí hoàn thiện tới thời điểm có thể ở. Những thay đổi liên quan khu ướt, kết cấu hoặc mặt ngoài cần được kiểm tra về kỹ thuật và quy định, không suy từ một căn đã cải tạo ở nơi khác.

## Shophouse
Đánh giá dòng khách theo ngày thường, giờ hoạt động và khả năng tiếp cận cửa hàng. Kiểm tra điều kiện dừng xe, giao nhận, ngành hàng phù hợp và phần diện tích khai thác thực tế. Lập kịch bản chưa có khách thuê, chi phí hoàn thiện và vận hành trước khi tính lợi nhuận ròng. Một vị trí gần công trình thể thao chưa bảo đảm lưu lượng mua sắm ổn định, còn giá thuê chào không thay thế hợp đồng đã ký.

## Căn hộ và nhu cầu sử dụng một mặt sàn
So mặt bằng với lịch sinh hoạt, số người và khả năng kê nội thất. Kiểm tra tuyến từ chỗ đỗ xe tới cửa, thang máy, không gian chung và phí vận hành. Tách định nghĩa diện tích trong hợp đồng khỏi số đo quảng bá. Hình thức kiến trúc không tự xác định thời hạn hoặc quyền sở hữu; cần đọc giấy tờ của tài sản cụ thể.

## Danh mục câu hỏi trước khi nhận bảng hàng
Yêu cầu mã căn hoặc ô đất, vị trí trên bản vẽ, diện tích theo định nghĩa, tổng tiền và phần đã bao gồm. Kiểm tra chủ thể bán, thẩm quyền nhận tiền, tiến độ thanh toán và tài liệu đủ điều kiện giao dịch tương ứng. Nếu chưa có thông tin, ghi câu hỏi còn thiếu thay vì tự điền từ một sản phẩm khác. Liên hệ tư vấn để lập tiêu chí phù hợp ngân sách và mục tiêu của gia đình.`
});
INITIAL_CONTENT.products=INITIAL_CONTENT.products.filter(p=>p.type!=='Khác');
for(const p of INITIAL_CONTENT.products){
 p.short={Biệt_thự:'Kiểm tra sân vườn, riêng tư, công năng và chi phí bảo trì.',Liền_kề:'Đọc mặt tiền, chiều sâu, ánh sáng và chi phí hoàn thiện.',Shophouse:'Đánh giá dòng khách, khả năng khai thác và dòng tiền sau chi phí.'}[p.title.replaceAll(' ','_')]||p.short;
}
INITIAL_CONTENT.gallery=INITIAL_CONTENT.gallery.map(g=>({...g,title:{g1:'Toàn cảnh đô thị và sân vận động (minh họa)',g2:'Mặt nước và các khối căn hộ (minh họa)',g3:'Không gian đô thị và đường giao thông (minh họa)',g4:'Sân vận động và quảng trường (minh họa)'}[g.id]||g.title}));

// Apply the reviewed editorial profiles to seed data; live KV is migrated separately.
for(const [collection,prefix] of [['pages','/'],['posts','/tin-tuc/']])for(const item of INITIAL_CONTENT[collection]){
 const profile=PAGE_CONTENT[prefix+item.slug+'/'];if(!profile)continue;
 Object.assign(item,{title:profile.heading,seoTitle:profile.seoTitle,seoDescription:profile.seoDescription,intro:profile.intro,searchIntent:profile.intent,image:profile.image,imageAlt:profile.imageAlt,imageCaption:profile.imageCaption,faqs:profile.faqs,relatedLinks:profile.links,updated:'2026-10-27'});
 if(collection==='pages'){item.summary=profile.intro;item.body=profile.body}else{item.excerpt=profile.intro;item.content=profile.body}
}
INITIAL_CONTENT.homeIntro=PAGE_CONTENT['/'].intro;

INITIAL_CONTENT.badge='THÔNG TIN DỰ ÁN VÀ HƯỚNG DẪN CHO NGƯỜI MUA';
INITIAL_CONTENT.independentDisclaimer='Trang thông tin và tư vấn độc lập do Mạnh Việt vận hành, không phải website chính thức của Vingroup/Vinhomes. Hình minh họa không phải tài liệu chính thức.';
