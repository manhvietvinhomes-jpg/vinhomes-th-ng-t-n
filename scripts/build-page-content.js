import fs from 'node:fs';
import path from 'node:path';
import {INITIAL_CONTENT} from '../src/seed.js';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const slug=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
const data={},allItems=new Map();
for(const p of INITIAL_CONTENT.pages)allItems.set('/'+p.slug+'/',p);
for(const p of INITIAL_CONTENT.posts.filter(p=>p.published!==false))allItems.set('/tin-tuc/'+p.slug+'/',p);
const bodyOverrides=JSON.parse(fs.readFileSync('content/section-bodies.json','utf8'));
const rows=[];
for(const line of fs.readFileSync('content/handbook-notes.tsv','utf8').trim().split('\n')){
 const [s,intro,...qa]=line.split('|');rows.push({route:'/tin-tuc/'+s+'/',intro,qa});
}
for(const line of fs.readFileSync('content/section-notes.tsv','utf8').trim().split('\n')){
 const [route,intent,intro,...qa]=line.split('|');rows.push({route,intent,intro,qa});
}
const shortTitles={
 'so-sanh':'Có nên mua tại Olympic? Tiêu chí đánh giá phương án',
 'tien-ich-vinhomes-olympic-khu-the-thao':'Tiện ích Olympic: quy hoạch và dịch vụ đang phục vụ',
 'vinhomes-olympic-khi-nao-mo-ban':'Olympic khi nào mở bán? Cách kiểm tra thông báo',
 'tiem-nang-thuong-tin-vinhomes-olympic':'Đánh giá khu vực Thường Tín: hiện trạng và kỳ vọng',
 'kinh-nghiem-mua-vinhomes-olympic':'Trình tự kiểm tra trước khi mua tại Olympic',
 'ky-hieu-chuc-nang-dat':'Ký hiệu đất: phân biệt đất ở và công trình công cộng',
 'khoang-lui-va-chi-gioi':'Khoảng lùi và chỉ giới: đọc ranh trước khi chọn nhà',
 'dieu-chinh-quy-hoach-cach-theo-doi':'Điều chỉnh quy hoạch: so phiên bản và phạm vi đổi',
 'chon-biet-thu-theo-nhu-cau':'Chọn biệt thự: công năng, riêng tư và chi phí',
 'chon-can-ho-cho-gia-dinh':'Chọn căn hộ: mặt bằng, thang máy và phần chung',
 'tam-nhin-va-kha-nang-thay-doi':'Tầm nhìn nhà ở: kiểm tra hiện trạng và quy hoạch',
 'tien-do-thanh-toan-mua-nha':'Lịch thanh toán mua nhà và dòng tiền gia đình',
 'chi-phi-co-hoi-mua-bat-dong-san':'Chi phí cơ hội mua nhà: so vốn theo cùng kỳ',
 'quy-du-phong-khi-so-huu-nha':'Quỹ dự phòng nhà ở và chi phí ngoài kế hoạch',
 'doc-hop-dong-mua-ban-nha':'Đọc hợp đồng mua nhà và các phụ lục liên quan',
 'bao-lanh-nha-o-hinh-thanh-tuong-lai':'Bảo lãnh nhà ở tương lai: phạm vi và điều kiện',
 'chung-tu-thanh-toan-bat-dong-san':'Chứng từ mua nhà: lưu và đối soát từng đợt',
 'truong-hoc-khi-chon-noi-o':'Chọn nhà theo trường học: tiếp nhận và đưa đón',
 'cong-vien-va-khong-gian-xanh':'Không gian xanh: lối vào và khả năng sử dụng',
 'van-hanh-khu-do-thi-giai-doan-dau':'Khu đô thị mới: chuẩn bị vận hành và chuyển về',
 'nha-san-co-hay-hinh-thanh-tuong-lai':'Nhà sẵn có hay nhà tương lai: so thời gian và chi phí',
 'lap-danh-sach-can-so-sanh':'Danh sách so căn: dữ liệu và tiêu chí lựa chọn',
 'dam-phan-dieu-kien-mua-nha':'Đàm phán mua nhà: giá và các điều kiện đi kèm'
};
const utility={
 '/':{title:'Vinhomes Olympic Thường Tín',seoTitle:INITIAL_CONTENT.seoTitle,topic:'tong-quan',slug:'trang-chu',body:'## Phạm vi dự án\nTách dự án tổng thể với từng dự án thành phần.\n\n## Nguồn thông tin\nĐối chiếu tài liệu gốc theo đúng phạm vi.\n\n## Chọn chuyên đề\nChọn nội dung theo câu hỏi cần giải quyết.'},
 '/tin-tuc/':{title:'Cẩm nang và phân tích Vinhomes Olympic',seoTitle:'Cẩm nang Olympic: hồ sơ, khảo sát và tài chính',topic:'tong-quan',slug:'cam-nang',body:'## Chuyên đề nền tảng\nXác định nhóm thông tin trước khi đọc sâu.\n\n## Câu hỏi cụ thể\nChọn bài có cùng công việc cần thực hiện.\n\n## Phạm vi áp dụng\nPhân biệt hướng dẫn chung với hồ sơ của tài sản.'},
 '/chinh-sach-bao-mat/':{title:'Chính sách bảo mật thông tin đăng ký tư vấn',seoTitle:'Chính sách bảo mật thông tin đăng ký tư vấn',topic:'phap-ly',slug:'chinh-sach-bao-mat',body:'## Dữ liệu được thu thập\nBiểu mẫu nhận tên, số điện thoại, nội dung quan tâm và các câu trả lời người dùng tự gửi. Không yêu cầu giấy tờ tùy thân, tài khoản ngân hàng, mã OTP hoặc mật khẩu.\n\n## Mục đích và quyền tiếp cận\nThông tin được dùng để liên hệ theo yêu cầu đã gửi; danh sách khách không công khai và chỉ dành cho người quản trị có xác thực. Không tự động gửi dữ liệu khách sang dịch vụ tiếp thị khác.\n\n## Yêu cầu sửa hoặc xóa\nNgười gửi có thể liên hệ số điện thoại công khai để đề nghị kiểm tra, sửa hoặc xóa dữ liệu. Quản trị viên kiểm tra yêu cầu trước khi xử lý, tránh thay đổi thông tin của người khác.\n\n## Giới hạn sử dụng biểu mẫu\nChỉ gửi nội dung cần thiết cho tư vấn ban đầu. Liên kết sang Zalo hoặc website bên ngoài có chính sách dữ liệu của đơn vị đó; cần xem trước khi tiếp tục cung cấp thông tin.'}
};
const officialSources={
 'tong-quan':{label:'UBND Dân Hòa: quy mô và phân khu được công bố',url:'https://danhoa.hanoi.gov.vn/cac-du-an-trong-diem/xa-dan-hoa-quyet-tam-hoan-thanh-tien-do-giai-phong-mat-bang-khu-do-thi-the-thao-olympic-2765260422103124797.htm'},
 'vi-tri':{label:'Quyết định 916/QĐ-SNNMT, trang 2–3: địa điểm phân khu B',url:'https://sotnmt.hanoi.gov.vn/images/pdf/Nam2026/document%202.pdf'},
 'quy-hoach':{label:'UBND Ngọc Hồi: thông báo lấy ý kiến quy hoạch 1/500',url:'https://ngochoi.hanoi.gov.vn/tin-tuc-su-kien/lay-y-kien-cong-dong-dan-cu-doi-voi-do-an-quy-hoach-chi-tiet-ty-le-1-500-khu-do-thi-the-thao-olympic-phan-khu-a-b-c-d-2724260210151416024.htm'},
 'phap-ly':{label:'Quyết định 916/QĐ-SNNMT: đối tượng và phạm vi thẩm định ĐTM',url:'https://sotnmt.hanoi.gov.vn/images/pdf/Nam2026/document%202.pdf'},
 'tien-do':{label:'UBND Thanh Oai: phương án bồi thường tại Văn Quán, đợt 5',url:'https://thanhoai.hanoi.gov.vn/chi-tiet-van-ban/quyet-dinh-ve-viec-phe-duyet-phuong-an-boi-thuong-ho-tro-tai-dinh-cu-khi-nha-nuoc-thu-hoi-dat-de-th-253884'}
};
function sentences(text){return text.split(/(?<=[.!?])\s+/).filter(Boolean)}
function wrap(text,limit){const out=[];for(const word of text.split(/\s+/)){if(!out.length||out.at(-1).length+word.length+1>limit)out.push(word);else out[out.length-1]+=' '+word}return out}
function illustration(profile,headings){
 const titleLines=wrap(profile.seoTitle,42).slice(0,2),labels=headings.slice(0,3);
 const cards=labels.map((text,index)=>{
  const x=56+index*304;return `<rect x="${x}" y="276" width="280" height="270" rx="18" fill="#fff" stroke="#d2dce3"/><circle cx="${x+42}" cy="318" r="23" fill="#17354a"/><text x="${x+42}" y="326" text-anchor="middle" fill="#fff" font-size="21">0${index+1}</text>${wrap(text,19).slice(0,5).map((line,i)=>`<text x="${x+24}" y="${386+i*31}" fill="#17354a" font-size="23">${escape(line)}</text>`).join('')}`;
 }).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 650" role="img" aria-labelledby="title desc"><title id="title">${escape(profile.imageAlt)}</title><desc id="desc">Ba nội dung: ${escape(labels.join('; '))}. Đồ họa biên tập, không phải bản vẽ dự án.</desc><rect width="1000" height="650" fill="#f4f0e8"/><path d="M0 0H1000V210H0Z" fill="#102c40"/><rect x="56" y="43" width="63" height="5" rx="2" fill="#d8b371"/><text x="140" y="53" font-family="sans-serif" font-size="18" letter-spacing="3" fill="#dfc38c">CẨM NANG NHÀ Ở</text><g font-family="Arial, sans-serif">${titleLines.map((line,i)=>`<text x="56" y="${109+i*46}" fill="#fff" font-size="33" font-weight="600">${escape(line)}</text>`).join('')}<text x="56" y="247" fill="#6b7c88" font-size="19">Các điểm đối chiếu trong bài</text>${cards}<path d="M56 580H944" stroke="#cdbd9d"/><text x="56" y="615" fill="#596d7c" font-size="17">Hình minh họa biên tập • Không phải bản vẽ hoặc thông báo của dự án</text></g></svg>`;
}
const topicFallback={'olympic-guide-01':'tong-quan','olympic-guide-02':'vi-tri','olympic-guide-03':'quy-hoach','olympic-guide-04':'san-pham','olympic-guide-05':'gia-ban','olympic-guide-06':'tien-do','olympic-guide-07':'so-sanh','olympic-guide-08':'phap-ly','olympic-guide-09':'san-pham','olympic-guide-10':'gia-ban'};
const pillars=INITIAL_CONTENT.pages;
fs.mkdirSync('public/assets/guides',{recursive:true});
for(const row of rows){
 const item=allItems.get(row.route)||utility[row.route];if(!item)throw Error('Missing item '+row.route);
 const title=shortTitles[item.slug]||item.seoTitle||item.title;
 const description=sentences(row.intro)[0];
 if(title.length>60||description.length>160)throw Error(`Metadata too long: ${row.route} (${title.length}/${description.length})`);
 const introSentences=sentences(row.intro);if(introSentences.length<2||introSentences.length>3)throw Error('Lead must have 2–3 sentences: '+row.route);
 let body=bodyOverrides[row.route]||item.body||item.content||'';const start=body.indexOf('## ');if(start>=0)body=body.slice(start);
 // Remove old marketing contact endings; retain substantive instructional sections.
 body=body.replace(/\n\n## Nhận thông tin và tư vấn[\s\S]*$/,'');
 const headings=[...body.matchAll(/^## (.+)$/gm)].map(m=>m[1]);if(headings.length<3)throw Error('Insufficient substantive sections '+row.route);
 const topic=item.topic||topicFallback[item.id]||item.slug||'tong-quan';
 const image='/assets/guides/'+(item.slug||slug(item.title))+'.svg';
 const faqs=[];for(let i=0;i<3;i++){
  const question=row.qa[i*2],answer=row.qa[i*2+1];if(!question||!answer)throw Error('Missing FAQ');
  // Advice is attributed to its actual editorial explanation, not falsely to a public authority.
  const methodHeading=headings[Math.min(i,headings.length-1)];
  const sources=[{label:'Giải thích trong bài: '+methodHeading,url:row.route+'#'+slug(methodHeading),kind:'editorial'}];
  if(officialSources[topic]&&(/^\/(tong-quan|vi-tri|quy-hoach|phap-ly|tien-do)\/$/.test(row.route)||item.id?.startsWith('olympic-guide-')))sources.push({...officialSources[topic],kind:'document'});
  if(row.route==='/'){sources.splice(0,sources.length,{label:i===1?'Thông báo vận hành trang độc lập':'Thông tin nhanh và phạm vi dự án',url:i===1?'/#disclaimer':'/#thong-tin-nhanh',kind:'editorial'});if(i===2)sources.push({...officialSources['vi-tri'],kind:'document'});}
  faqs.push({question,answer,sources});
 }
 const related=(item.relatedSlugs||[]).map(s=>({href:'/tin-tuc/'+s+'/',anchor:INITIAL_CONTENT.posts.find(p=>p.slug===s)?.seoTitle||INITIAL_CONTENT.posts.find(p=>p.slug===s)?.title})).filter(x=>x.anchor);
 const matching=(INITIAL_CONTENT.posts||[]).filter(p=>p.published!==false&&p.slug!==item.slug&&(p.topic===topic||p.category&&p.category===item.category)).slice(0,4).map(p=>({href:'/tin-tuc/'+p.slug+'/',anchor:shortTitles[p.slug]||p.seoTitle||p.title}));
 const candidates=[...(pillars.some(p=>p.slug===topic)&&row.route!=='/'+topic+'/'?[{href:'/'+topic+'/',anchor:pillars.find(p=>p.slug===topic).title}]:[]),...related,...matching,...pillars.filter(p=>row.route!=='/'+p.slug+'/').map(p=>({href:'/'+p.slug+'/',anchor:p.title}))];
 const links=[];for(const link of candidates)if(link.href!==row.route&&!links.some(x=>x.href===link.href))links.push(link);
 const profile={intent:row.intent||item.keyword||item.title,heading:shortTitles[item.slug]&&item.id?.startsWith('olympic-guide-')?shortTitles[item.slug]:item.title,seoTitle:title,seoDescription:description,intro:row.intro,body,topic,image,imageAlt:'Sơ đồ minh họa: '+title,imageCaption:'Sơ đồ biên tập về các nội dung cần kiểm tra; không phải bản vẽ hoặc phối cảnh chính thức.',faqs,links:links.slice(0,4),notice:'Trang thông tin độc lập của Mạnh Việt. Hình ảnh là minh họa; cần đối chiếu thông báo và hồ sơ chính thức của đúng tài sản tại thời điểm sử dụng.'};
 data[row.route]=profile;fs.writeFileSync('public'+image,illustration(profile,headings));
}
if(Object.keys(data).length!==96)throw Error('Expected profiles for all 96 canonical pages.');
fs.writeFileSync('content/editorial-pages.json',JSON.stringify(data,null,2)+'\n');
fs.writeFileSync('src/page-content.js','// Generated from content/handbook-notes.tsv and content/section-notes.tsv.\nexport const PAGE_CONTENT = '+JSON.stringify(data,null,2)+';\n');
console.log(`Prepared ${Object.keys(data).length} distinct intents, ${Object.values(data).reduce((n,p)=>n+p.faqs.length,0)} FAQs and illustrations.`);
