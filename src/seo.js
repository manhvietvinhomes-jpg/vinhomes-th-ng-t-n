import { INITIAL_CONTENT } from './seed.js';
import { HOME_SEO_TITLE, HOME_DESCRIPTION, HOME_FAQ, VERIFIED_SOURCES, VERIFIED_DATE, PRODUCT_REDIRECTS, IMAGE_DESCRIPTIONS } from './editorial.js';

export const DOMAIN = 'https://vinhomesthuongtin.vn';
const PAGE_LINKS = [
  ['tong-quan','Tổng quan'],['vi-tri','Vị trí'],['quy-hoach','Quy hoạch'],['san-pham','Sản phẩm'],
  ['gia-ban','Giá & quỹ căn'],['mat-bang','Mặt bằng'],['tien-do','Tiến độ'],['phap-ly','Pháp lý'],['so-sanh','Đánh giá'],
];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const attr=esc;
const isSafeImage=u=>/^(\/assets\/[a-zA-Z0-9_.\/-]+|\/media\/[0-9a-f-]{36})$/.test(u||'')|| /^https?:\/\//.test(u||'');
const img=u=>isSafeImage(u)?u:'/assets/olympic-concept.webp';
const imageAlt=p=>p.imageAlt||IMAGE_DESCRIPTIONS[p.image]||`Đồ họa minh họa chủ đề ${p.title}; không phải ảnh hiện trường`;
const productTarget=p=>PRODUCT_REDIRECTS['/san-pham/'+(p.slug||slugify(p.title))+'/']||'/san-pham/';
const pillarFor=p=>PAGE_LINKS.some(([slug])=>slug===p.topic)?p.topic:({'olympic-guide-01':'tong-quan','olympic-guide-02':'vi-tri','olympic-guide-03':'quy-hoach','olympic-guide-04':'san-pham','olympic-guide-05':'gia-ban','olympic-guide-06':'tien-do','olympic-guide-07':'so-sanh','olympic-guide-08':'phap-ly','olympic-guide-09':'san-pham','olympic-guide-10':'gia-ban'}[p.id]||'tong-quan');
const paragraphs=value=>{
  const lines=String(value||'').split(/\r?\n/);
  let block=[],out='';
  const flush=()=>{if(block.length){out+='<p>'+block.map(esc).join('<br>')+'</p>';block=[];}};
  for(const raw of lines){const line=raw.trim();if(!line){flush();continue;}
    if(line.startsWith('## ')){flush();out+='<h2 id="'+slugify(line.slice(3))+'">'+esc(line.slice(3))+'</h2>';}
    else block.push(line);
  }
  flush();return out;
};
export const slugify=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
const permitted=x=>x && x.published!==false;
const allPages=site=>Array.isArray(site.pages)?site.pages:INITIAL_CONTENT.pages;
export function visibleUrls(site){
  const urls=['/'];
  for(const page of allPages(site))if(permitted(page)&&/^[a-z0-9-]+$/.test(page.slug||''))urls.push('/'+page.slug+'/');
  urls.push('/tin-tuc/','/chinh-sach-bao-mat/');
  for(const post of site.posts||[])if(permitted(post))urls.push('/tin-tuc/'+(post.slug||slugify(post.title))+'/');
  // Concept-only product pages are consolidated; custom products await verified content.
  return [...new Set(urls)];
}
const nav=site=>PAGE_LINKS.filter(([slug])=>allPages(site).some(p=>p.slug===slug&&permitted(p))).map(([slug,t])=>`<a href="/${slug}/">${esc(t)}</a>`).join('');
const homeCard=(s,site)=>`<article class="guide-card"><h3><a class="descriptive-link" href="/${s.slug}/">${esc(s.title)}</a></h3><p>${esc(s.summary)}</p></article>`;
const postCard=p=>`<article class="guide-card guide-card-image">${!p.id?.startsWith('olympic-cam-nang-')?`<img loading="lazy" width="1000" height="720" src="${attr(img(p.image))}" alt="${attr(imageAlt(p))}">`:''}<div><span class="eyebrow">${esc(p.category||'Phân tích dự án')}</span><h3><a class="descriptive-link" href="/tin-tuc/${attr(p.slug||slugify(p.title))}/">${esc(p.title)}</a></h3><p>${esc(p.excerpt||'')}</p></div></article>`;
const contact=s=>`<div class="seo-cta"><div><div class="eyebrow">CẦN XÁC MINH THÔNG TIN?</div><h2>Nhận hỗ trợ từ ${esc(s.advisorName||'Mạnh Việt')}</h2><p>Chỉ cung cấp bảng hàng và ưu đãi khi có văn bản để đối chiếu. Để lại số điện thoại ở trang chủ hoặc liên hệ trực tiếp.</p></div><div class="seo-cta-actions"><a class="button button-gold" href="tel:${esc((s.phone||'0986091222').replace(/[^0-9+]/g,''))}">☎ Gọi tư vấn</a><a class="button button-outline" href="/#lienhe">Nhận thông tin ↗</a></div></div>`;
function meta({title,description,path,photo,kind='WebPage',date,modified,site}){
  const url=DOMAIN+path,preview=new URL(img(photo),DOMAIN).href;
  const graph=[{'@type':'WebSite','@id':DOMAIN+'/#website',name:'Vinhomes Olympic – Mạnh Việt Real Estate',url:DOMAIN+'/'},
    {'@type':'WebPage','@id':url+'#webpage',name:title,url,description,isPartOf:{'@id':DOMAIN+'/#website'},inLanguage:'vi-VN'}];
  if(path!=='/')graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Trang chủ',item:DOMAIN+'/'},{'@type':'ListItem',position:2,name:title,item:url}]});
  if(kind==='Article')graph.push({'@type':'Article',headline:title,datePublished:date||undefined,dateModified:modified||date||undefined,mainEntityOfPage:url,author:{'@type':'Person',name:site.advisorName||'Mạnh Việt'},image:preview});
  const schema=JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c');
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${attr(description)}"><link rel="canonical" href="${attr(url)}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#091b2e"><meta property="og:type" content="${kind==='Article'?'article':'website'}"><meta property="og:locale" content="vi_VN"><meta property="og:title" content="${attr(title)}"><meta property="og:description" content="${attr(description)}"><meta property="og:url" content="${attr(url)}"><meta property="og:image" content="${attr(preview)}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/logo.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/seo.css"><script type="application/ld+json">${schema}</script>`;
}
function shell(site,{title,description,path,body,photo,kind,date,modified}){
  const head=meta({title,description,path,photo,site,kind,date,modified});
  const l=nav(site);

  const html=`<!doctype html><html lang="vi"><head>${head}</head><body><div class="topline"><div class="container">TRANG THÔNG TIN DỰ ÁN ĐỘC LẬP <span>•</span> VINHOMES OLYMPIC</div></div>
  <header class="header"><div class="container header-inner"><a class="wordmark" href="/" aria-label="Trang chủ Vinhomes Olympic"><span class="wordmark-emblem">✧</span><span><small>VINHOMES</small> OLYMPIC</span></a><nav class="seo-nav" aria-label="Chuyên mục">${l}<a href="/tin-tuc/">Tin tức</a></nav><a class="header-phone" href="tel:${esc(site.phone||'0986091222')}">☎ ${esc(site.phone||'0986091222')}</a><button class="navtoggle" id="seoNavBtn" aria-label="Mở menu" aria-expanded="false">☰</button></div></header>
  <main>${body}</main><footer class="seo-footer"><div class="container seo-footgrid"><div><h3>VINHOMES OLYMPIC</h3><p>${esc(site.independentDisclaimer||INITIAL_CONTENT.independentDisclaimer)}</p><p>Hình minh họa; không phải phối cảnh chính thức hay ảnh sản phẩm đang mở bán.</p></div><div><b>Thông tin hữu ích</b><a href="/tong-quan/">Tổng quan</a><a href="/gia-ban/">Giá và quỹ căn</a><a href="/phap-ly/">Pháp lý</a><a href="/chinh-sach-bao-mat/">Bảo mật & dữ liệu</a></div><div><b>Tư vấn</b><a href="tel:${esc(site.phone||'0986091222')}">☎ ${esc(site.phone||'0986091222')}</a><a href="${attr(site.zalo||'https://zalo.me/0986091222')}" target="_blank" rel="noopener noreferrer">Zalo ↗</a><a href="/admin/" rel="nofollow">Quản trị</a></div></div></footer><script>document.getElementById('seoNavBtn').addEventListener('click',()=>{let n=document.querySelector('.seo-nav');n.classList.toggle('open');document.getElementById('seoNavBtn').setAttribute('aria-expanded',n.classList.contains('open'))});</script></body></html>`;
  return html.replace(/[↗→]/g,'');
}
const badge=status=>status==='confirmed'?'ĐÃ ĐỐI CHIẾU NGUỒN':status==='pending'?'CHỜ BẢNG GIÁ / TÀI LIỆU':'MỘT PHẦN CẦN XÁC MINH';
function articlePage(site,p,path,{kind='WebPage'}={}){
  const other=allPages(site).filter(x=>permitted(x)&&x.slug!==p.slug).slice(0,4);
  const relatedPosts=(site.posts||[]).filter(x=>permitted(x)&&x.slug!==p.slug);
  const relatedRank=x=>(p.relatedSlugs||[]).includes(x.slug)?4:x.category&&x.category===p.category?3:x.topic&&x.topic===p.topic?2:0;
  const more=relatedPosts.map((post,index)=>({post,index,score:relatedRank(post)})).sort((a,b)=>b.score-a.score||a.index-b.index).slice(0,4).map(x=>x.post);
  const related=kind==='Article'?more.map(postCard).join(''):other.map(x=>homeCard(x,site)).join('');
  const sections=String(p.body||p.content||'').split(/\r?\n/).filter(x=>x.startsWith('## ')).map(x=>x.slice(3));
  const toc=sections.length?`<nav class="seo-toc" aria-label="Mục lục bài viết"><b>Trong bài viết</b><ol>${sections.map(x=>`<li><a href="#${slugify(x)}">${esc(x)}</a></li>`).join('')}</ol></nav>`:'';
  const topicLinks=PAGE_LINKS.toSorted((a,b)=>(b[0]===pillarFor(p))-(a[0]===pillarFor(p))).filter(([slug])=>slug!==p.slug&&allPages(site).some(x=>x.slug===slug&&permitted(x)));
  const references=[...(p.sources||[]),...(p.sourceUrl?[{url:p.sourceUrl,label:p.sourceLabel||'Tài liệu gốc'}]:[])].filter(x=>VERIFIED_SOURCES.some(s=>s.url===x.url)||x.url==='https://thanhoai.hanoi.gov.vn/chi-tiet-van-ban/quyet-dinh-ve-viec-phe-duyet-phuong-an-boi-thuong-ho-tro-tai-dinh-cu-khi-nha-nuoc-thu-hoi-dat-de-th-253884');
  const referencesHtml=references.length?`<section class="article-references"><h2>Tài liệu liên quan</h2><ul>${references.map(x=>`<li><a href="${attr(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.label)}</a></li>`).join('')}</ul></section>`:'';
  const priceRows=(p.slug==='gia-ban'?(site.priceRows||[]).filter(x=>x.verified&&x.sourceUrl):[]);
  const pricing=priceRows.length?`<section class="seo-price-table"><h2>Bảng thông tin sản phẩm</h2><div class="table-scroll"><table><thead><tr><th>Loại hình / mã</th><th>Quy cách</th><th>Giá tham khảo</th><th>Cập nhật</th></tr></thead><tbody>${priceRows.map(x=>`<tr><td>${esc(x.product)}</td><td>${esc(x.area)}</td><td>${esc(x.price)}</td><td>${esc(x.updated)}</td></tr>`).join('')}</tbody></table></div><p>Giá và điều kiện giao dịch áp dụng theo tài liệu của từng sản phẩm tại thời điểm cập nhật.</p></section>`:'';
  const pillar=allPages(site).find(x=>x.slug===pillarFor(p)&&permitted(x));
  const pillarLink=kind==='Article'&&pillar?`<p class="article-parent">Chuyên đề: <a href="/${pillar.slug}/">${esc(pillar.title)}</a></p>`:'';
  const photo=kind!=='Article'||!p.id?.startsWith('olympic-cam-nang-');
  const body=`<section class="seo-hero"><div class="container seo-hero-grid ${photo?'':'text-only-hero'}"><div><a href="/" class="breadcrumb">TRANG CHỦ / CẨM NANG OLYMPIC</a><div class="seo-status ${p.status==='confirmed'?'is-verified':'is-pending'}">${esc(p.category||'CẨM NANG VINHOMES OLYMPIC')}</div><h1>${esc(p.title)}</h1><p class="seo-deck">${esc(p.summary||p.excerpt||'')}</p><span class="seo-updated">Cập nhật nội dung: ${esc(p.updated||p.date||'21/10/2026')}</span>${pillarLink}</div>${photo?`<figure class="seo-photo"><img src="${attr(img(p.image))}" width="1000" height="720" fetchpriority="high" alt="${attr(imageAlt(p))}"><figcaption>HÌNH MINH HỌA • KHÔNG PHẢI PHỐI CẢNH CHÍNH THỨC</figcaption></figure>`:''}</div></section>
  <section class="seo-main container"><article class="seo-article"><div class="eyebrow">THÔNG TIN & PHÂN TÍCH</div>${toc}${paragraphs(p.body||p.content)}${pricing}${referencesHtml}<nav class="seo-context-links" aria-label="Chuyên đề liên quan"><h2>Tìm hiểu các nội dung liên quan</h2><p>${topicLinks.slice(0,4).map(([slug,label])=>`<a href="/${slug}/">${esc(label)} Vinhomes Olympic</a>`).join(' · ')}</p></nav></article><aside class="seo-aside"><div class="seo-sidebox"><b>ĐỌC THÊM</b>${topicLinks.slice(0,7).map(([slug,label])=>`<a href="/${slug}/">${esc(label)} <span>↗</span></a>`).join('')}</div><div class="seo-sidebox"><b>LIÊN HỆ TRỰC TIẾP</b><p>${esc(site.advisorName||'Mạnh Việt')}</p><a class="button button-gold" href="tel:${esc(site.phone||'0986091222')}">☎ ${esc(site.phone||'0986091222')}</a></div></aside></section>
  <section class="seo-related"><div class="container"><div class="eyebrow">TIẾP TỤC TÌM HIỂU</div><h2>Những chủ đề liên quan</h2><div class="seo-cards">${related}</div>${contact(site)}</div></section>`;
  return shell(site,{title:p.seoTitle||p.title+' | Mạnh Việt Real Estate',description:p.seoDescription||p.summary||'',path,body,photo:p.image,kind,date:p.date||p.updated,modified:p.updated||p.date});
}
function listings(site,type){
  const news=type==='news',list=(news?site.posts||[]:allPages(site)).filter(permitted);
  const title=news?'Cẩm nang và phân tích Vinhomes Olympic Thường Tín':'Tài liệu dự án và hướng dẫn';
  const path=news?'/tin-tuc/':'/';
  const body=`<section class="seo-hero"><div class="container"><a class="breadcrumb" href="/">TRANG CHỦ</a><div class="eyebrow">CẨM NANG VINHOMES OLYMPIC THƯỜNG TÍN</div><h1>${title}</h1><p class="seo-deck">${list.length} bài viết về Vinhomes Olympic Thường Tín: vị trí, quy hoạch, lựa chọn nhà ở, tài chính và quy trình giao dịch. Chọn chủ đề phù hợp với nhu cầu của bạn.</p></div></section>
  <section class="seo-related"><div class="container"><nav class="seo-topics" aria-label="Chủ đề cẩm nang">${[...new Set(list.map(p=>p.category||'Phân tích dự án'))].map(c=>`<a href="#nhom-${slugify(c)}">${esc(c)}</a>`).join('')}</nav>${[...new Set(list.map(p=>p.category||'Phân tích dự án'))].map(c=>`<section id="nhom-${slugify(c)}"><h2>${esc(c)}</h2><div class="seo-cards seo-news-cards">${list.filter(p=>(p.category||'Phân tích dự án')===c).map(postCard).join('')}</div></section>`).join('')}${contact(site)}</div></section>`;
  return shell(site,{title:title+' | Mạnh Việt',description:'Cẩm nang Vinhomes Olympic Thường Tín: đọc hồ sơ quy hoạch, kiểm tra vị trí, lập ngân sách và chuẩn bị giao dịch theo từng nhu cầu.',path,body,photo:'/assets/olympic-concept.webp'});
}
const privacyText=`## Dữ liệu được thu thập
Khi bạn gửi yêu cầu tư vấn, biểu mẫu tiếp nhận họ tên, số điện thoại, nội dung quan tâm và câu trả lời bổ sung nếu có. Hệ thống có thể lưu nguồn truy cập do đường dẫn cung cấp để hỗ trợ phục vụ yêu cầu.

## Mục đích và phạm vi sử dụng
Thông tin được dùng để liên hệ và tư vấn theo yêu cầu bạn đã gửi. Dữ liệu chỉ dành cho người có quyền quản trị trang; không công khai danh sách khách hàng trên website.

## Thời gian lưu và quyền kiểm soát
Dữ liệu được lưu đến khi không còn cần thiết cho việc hỗ trợ hoặc khi bạn yêu cầu xóa. Để yêu cầu tra cứu, chỉnh sửa hoặc xóa thông tin đã cung cấp, vui lòng liên hệ số điện thoại công khai trên website. Quản trị viên có công cụ xóa dữ liệu khách hàng.

## Giới hạn kỹ thuật
Hệ thống lưu trên Cloudflare Workers KV và sử dụng phiên đăng nhập riêng cho trang quản trị. Không nhập tài khoản ngân hàng, mã OTP, giấy tờ tùy thân hoặc thông tin nhạy cảm trong biểu mẫu.

## Liên kết bên ngoài
Nút Zalo, Facebook và nguồn tài liệu có thể mở website của đơn vị khác với chính sách riêng của họ.`;
export function renderSeo(route,site){
  if(route==='/tin-tuc/')return listings(site,'news');
  if(route==='/chinh-sach-bao-mat/')return articlePage(site,{title:'Chính sách bảo mật thông tin',summary:'Cách chúng tôi thu thập và sử dụng thông tin khi bạn yêu cầu tư vấn.',body:privacyText,updated:'2026-10-21',status:'confirmed',image:'/assets/city.webp',sourceLabel:'Chính sách vận hành website',sourceUrl:''},route);
  let m=route.match(/^\/tin-tuc\/([a-z0-9-]+)\/$/);
  if(m){const post=(site.posts||[]).find(p=>permitted(p)&&(p.slug||slugify(p.title))===m[1]);if(post)return articlePage(site,{...post,body:post.content,summary:post.excerpt,status:post.status||'needs-verification',updated:post.updated||post.date},route,{kind:'Article'});return null;}
  m=route.match(/^\/san-pham\/([a-z0-9-]+)\/$/);
  if(m){const product=(site.products||[]).find(p=>permitted(p)&&(p.slug||slugify(p.title))===m[1]);if(product)return articlePage(site,{...product,body:product.detail||product.short,summary:product.short,status:'needs-verification'},route).replace('content="index,follow,max-image-preview:large"','content="noindex,follow"');return null;}
  m=route.match(/^\/([a-z0-9-]+)\/$/);
  if(m){const item=allPages(site).find(p=>permitted(p)&&p.slug===m[1]);if(item)return articlePage(site,item,route);}
  return null;
}
export function sitemap(site){
  const urls=visibleUrls(site);
  const dateFor=path=>{
    const page=(site.pages||[]).find(x=>'/'+x.slug+'/'===path);
    if(page&&/^\d{4}-\d{2}-\d{2}$/.test(page.updated||''))return page.updated;
    const article=(site.posts||[]).find(x=>'/tin-tuc/'+(x.slug||slugify(x.title))+'/'===path);
    if(article&&/^\d{4}-\d{2}-\d{2}$/.test(article.date||''))return article.date;
    return null;
  };
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(path=>`  <url><loc>${DOMAIN+path}</loc>${dateFor(path)?'<lastmod>'+dateFor(path)+'</lastmod>':''}</url>`).join('\n')}\n</urlset>`;
}
export function robots(){return `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: ${DOMAIN}/sitemap.xml\n`}
export function homeLinks(site){return allPages(site).filter(permitted).map(p=>homeCard(p,site)).join('')}
export function verifiedFacts(){
  return `<section class="section cream verified-facts" id="thong-tin-nhanh"><div class="container"><h2 class="section-title">Thông tin nhanh về Vinhomes Olympic Thường Tín</h2><p>Đối chiếu tài liệu gốc ngày <time datetime="${VERIFIED_DATE}">27/10/2026</time>. Mỗi số liệu dưới đây có phạm vi riêng; không dùng quy mô một phân khu để mô tả toàn bộ dự án.</p><dl class="facts-grid"><div><dt>Tên trong hồ sơ</dt><dd>Khu đô thị thể thao Olympic; dự án thành phần phân khu B được nêu riêng trong quyết định môi trường. <a href="#nguon-dtm-b">[2]</a></dd></div><div><dt>Quy mô tổng thể được địa phương công bố</dt><dd>Khoảng 9.171 ha, chia bốn phân khu trên địa bàn nhiều xã, phường. <a href="#nguon-dan-hoa">[1]</a></dd></div><div><dt>Riêng phân khu B</dt><dd>2.944,39 ha theo Quyết định 916/QĐ-SNNMT; địa điểm gồm Thường Tín, Thượng Phúc, Tam Hưng và Dân Hòa. <a href="#nguon-dtm-b">[2]</a></dd></div><div><dt>Phạm vi quy hoạch và diện tích dự án</dt><dd>Cần đọc theo từng đồ án và quyết định. Không đồng nhất phạm vi nghiên cứu, dự án tổng thể và dự án thành phần.</dd></div><div><dt>Hồ sơ đã đối chiếu</dt><dd>Quyết định thẩm định ĐTM phân khu B và thông báo lấy ý kiến quy hoạch 1/500. Những hồ sơ này không thay thế điều kiện mở bán của từng tài sản. <a href="#nguon-dtm-b">[2]</a> <a href="#nguon-ngoc-hoi">[3]</a></dd></div><div><dt>Website tư vấn</dt><dd>Mạnh Việt Real Estate vận hành độc lập; không phải website chính thức của Vingroup/Vinhomes.</dd></div></dl><nav aria-label="Thông tin chuyên đề"><a class="descriptive-link" href="/tong-quan/">Tổng quan dự án</a> · <a class="descriptive-link" href="/quy-hoach/">Quy hoạch và các phân khu</a> · <a class="descriptive-link" href="/phap-ly/">Hồ sơ pháp lý cần kiểm tra</a></nav></div></section>`;
}
const sourceList=()=>`<section class="section source-references" id="nguon-tham-khao"><div class="container"><h2 class="section-title">Tài liệu gốc và phạm vi đối chiếu</h2><ol>${VERIFIED_SOURCES.map(s=>`<li id="nguon-${s.id}"><a href="${attr(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a></li>`).join('')}</ol><p>Các tài liệu thể hiện tình trạng và phạm vi tại ngày ban hành. Hồ sơ môi trường hoặc quy hoạch không tự xác nhận lịch bán, giá hoặc quyền sở hữu của từng sản phẩm.</p></div></section>`;
const faqSection=()=>`<section class="section cream home-faq" id="cau-hoi"><div class="container"><h2 class="section-title">Câu hỏi thường gặp về Vinhomes Olympic</h2>${HOME_FAQ.map(x=>`<details><summary>${esc(x.question)}</summary><p>${esc(x.answer)}</p><a class="descriptive-link" href="${x.href}">${esc(x.label)}</a></details>`).join('')}</div></section>`;
export function injectHome(html,site){
  const replaceText=(input,id,value)=>input.replace(new RegExp('(<[^>]+id="'+id+'"[^>]*>)([\\s\\S]*?)(<\\/[^>]+>)'),(_,open,old,close)=>open+esc(value)+close);
  for(const key of ['heroTitle','heroAccent','heroHeadingDetail','heroSubtitle','heroNote','overviewTitle','overviewText','locationTitle','locationText','advisorName','advisorTitle','advisorBio','contactTitle','contactText'])html=replaceText(html,key,site[key]||INITIAL_CONTENT[key]||'');
  const title=site.seoTitle||HOME_SEO_TITLE,description=site.seoDescription||HOME_DESCRIPTION;
  html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(title)}</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${attr(description)}">`);
  const graph={'@context':'https://schema.org','@graph':[{'@type':'WebSite','@id':DOMAIN+'/#website',name:'Vinhomes Olympic – Mạnh Việt Real Estate',url:DOMAIN+'/'},{'@type':'WebPage','@id':DOMAIN+'/#webpage',name:title,description,url:DOMAIN+'/',inLanguage:'vi-VN',isPartOf:{'@id':DOMAIN+'/#website'}},{'@type':'FAQPage','@id':DOMAIN+'/#cau-hoi',mainEntity:HOME_FAQ.map(x=>({'@type':'Question',name:x.question,acceptedAnswer:{'@type':'Answer',text:x.answer}}))}]};
  let output=html.replace('</head>',`<link rel="canonical" href="${DOMAIN}/"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:title" content="${attr(title)}"><meta property="og:type" content="website"><meta property="og:description" content="${attr(description)}"><meta property="og:url" content="${DOMAIN}/"><meta property="og:image" content="${new URL(img(site.heroImage),DOMAIN).href}"><meta name="twitter:card" content="summary_large_image"><link rel="preload" as="image" href="${attr(img(site.heroImage))}"><link rel="stylesheet" href="/seo.css"><script type="application/ld+json">${JSON.stringify(graph).replaceAll('<','\\u003c')}</script></head>`);
  if(isSafeImage(site.heroImage)){
    const hero=String(site.heroImage).replaceAll('"','%22').replaceAll('\\','');
    output=output.replace('</head>',`<style>.hero-cover{background-image:linear-gradient(90deg,rgba(4,19,34,.94),rgba(4,19,34,.25)),linear-gradient(0deg,rgba(4,19,34,.72),transparent),url("${attr(hero)}")}</style></head>`);
  }
  // Render useful content without depending on hydration or JavaScript indexing.
  const products=(site.products||[]).filter(p=>permitted(p)&&p.type!=='Khác').map(p=>`<article class="product-card product-guide"><div class="product-copy"><div class="category">Tiêu chí lựa chọn</div><h3><a class="descriptive-link" href="${attr(productTarget(p))}">${esc(p.title)}: cần kiểm tra gì?</a></h3><p>${esc(p.short)}</p></div></article>`).join('');
  output=output.replace('<div class="product-grid" id="products"></div>',`<div class="product-grid" id="products">${products}</div>`);
  const gallery=(site.gallery||[]).map(g=>`<figure class="gallery-tile"><img src="${attr(img(g.image))}" width="1000" height="720" alt="${attr(imageAlt(g))}" loading="lazy"><figcaption><small>HÌNH MINH HỌA, KHÔNG PHẢI PHỐI CẢNH CHÍNH THỨC</small>${esc(g.title)}</figcaption></figure>`).join('');
  output=output.replace('<div class="gallery-grid" id="gallery"></div>',`<div class="gallery-grid" id="gallery">${gallery}</div>`);
  output=output.replace('<div class="stat-grid" id="stats"></div>',`<div class="stat-grid" id="stats">${(site.stats||[]).map(x=>`<div class="stat"><b>${esc(x.number)}</b><small>${esc(x.label)}</small></div>`).join('')}</div>`);
  output=output.replace('<div class="amenity-grid" id="amenities"></div>',`<div class="amenity-grid" id="amenities">${(site.amenities||[]).map(x=>`<div class="amenity"><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></div>`).join('')}</div>`);
  const news=(site.posts||[]).filter(permitted).slice(0,6).map(postCard).join('');
  output=output.replace('<div class="news-grid" id="news"></div>',`<div class="news-grid" id="news">${news}</div>`);
  const cards=`<section class="seo-home-index section"><div class="container"><h2 class="section-title">Quy hoạch, vị trí và hồ sơ dự án Olympic</h2><p>Chọn chuyên đề để xem thông tin nền tảng; bài phân tích và hướng dẫn chi tiết được tổ chức trong mục cẩm nang.</p><div class="seo-cards">${homeLinks(site)}</div><p><a class="button button-gold" href="/tin-tuc/">Cẩm nang và phân tích dự án</a></p></div></section>`;
  output=output.replace('<section class="section gallery-section"',cards+'<section class="section gallery-section"');
  output=output.replace('<div class="value-strip">',verifiedFacts()+'<div class="value-strip">');
  output=output.replace('<section class="section contact-section"',faqSection()+sourceList()+'<section class="section contact-section"');
  for(const id of ['advisorFb','contactFb','floatingFb']){
    output=output.replace(new RegExp('<a\\b[^>]*id="'+id+'"[^>]*>[\\s\\S]*?<\\/a>'),()=>{
      try{const u=new URL(site.facebook);if(u.protocol==='https:'&&/(^|\.)(facebook\.com|fb\.com|fb\.me)$/.test(u.hostname))return `<a id="${id}" href="${attr(u.href)}" target="_blank" rel="noopener noreferrer">Facebook</a>`;}catch{}
      return '';
    });
  }
  output=output.replace('</footer>',`<div class="container" style="padding-top:10px"><a href="/chinh-sach-bao-mat/">Chính sách bảo mật thông tin</a> · <a href="/gia-ban/">Giá và quỹ căn</a> · <a href="/phap-ly/">Pháp lý</a></div></footer>`);
  return output.replace(/[↗→]/g,'');
}
