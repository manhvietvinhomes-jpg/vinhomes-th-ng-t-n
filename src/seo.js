import { INITIAL_CONTENT } from './seed.js';

export const DOMAIN = 'https://vinhomesthuongtin.vn';
const PAGE_LINKS = [
  ['tong-quan','Tổng quan'],['vi-tri','Vị trí'],['quy-hoach','Quy hoạch'],['san-pham','Sản phẩm'],
  ['gia-ban','Giá & quỹ căn'],['mat-bang','Mặt bằng'],['tien-do','Tiến độ'],['phap-ly','Pháp lý'],['so-sanh','Đánh giá'],
];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const attr=esc;
const isSafeImage=u=>/^(\/assets\/[a-zA-Z0-9_.\/-]+|\/media\/[0-9a-f-]{36})$/.test(u||'')|| /^https?:\/\//.test(u||'');
const img=u=>isSafeImage(u)?u:'/assets/olympic-concept.webp';
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
  for(const p of site.products||[])if(permitted(p))urls.push('/san-pham/'+(p.slug||slugify(p.title))+'/');
  return [...new Set(urls)];
}
const nav=site=>PAGE_LINKS.filter(([slug])=>allPages(site).some(p=>p.slug===slug&&permitted(p))).map(([slug,t])=>`<a href="/${slug}/">${esc(t)}</a>`).join('');
const homeCard=(s,site)=>`<a class="guide-card" href="/${s.slug}/"><span class="eyebrow">${esc(s.keyword||'CẨM NANG')}</span><h3>${esc(s.title)}</h3><p>${esc(s.summary)}</p><span class="guide-more">ĐỌC THÔNG TIN →</span></a>`;
const contact=s=>`<div class="seo-cta"><div><div class="eyebrow">CẦN XÁC MINH THÔNG TIN?</div><h2>Nhận hỗ trợ từ ${esc(s.advisorName||'Mạnh Việt')}</h2><p>Chỉ cung cấp bảng hàng và ưu đãi khi có văn bản để đối chiếu. Để lại số điện thoại ở trang chủ hoặc liên hệ trực tiếp.</p></div><div class="seo-cta-actions"><a class="button button-gold" href="tel:${esc((s.phone||'0986091222').replace(/[^0-9+]/g,''))}">☎ Gọi tư vấn</a><a class="button button-outline" href="/#lienhe">Nhận thông tin ↗</a></div></div>`;
function meta({title,description,path,photo,kind='WebPage',date,site}){
  const url=DOMAIN+path,preview=new URL(img(photo),DOMAIN).href;
  const graph=[{'@type':'WebSite','@id':DOMAIN+'/#website',name:'Vinhomes Olympic – Mạnh Việt Real Estate',url:DOMAIN+'/'},
    {'@type':'WebPage','@id':url+'#webpage',name:title,url,description,isPartOf:{'@id':DOMAIN+'/#website'},inLanguage:'vi-VN'}];
  if(path!=='/')graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Trang chủ',item:DOMAIN+'/'},{'@type':'ListItem',position:2,name:title,item:url}]});
  if(kind==='Article')graph.push({'@type':'Article',headline:title,datePublished:date||undefined,dateModified:date||undefined,mainEntityOfPage:url,author:{'@type':'Person',name:site.advisorName||'Mạnh Việt'},image:preview});
  const schema=JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c');
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${attr(description)}"><link rel="canonical" href="${attr(url)}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#091b2e"><meta property="og:type" content="${kind==='Article'?'article':'website'}"><meta property="og:locale" content="vi_VN"><meta property="og:title" content="${attr(title)}"><meta property="og:description" content="${attr(description)}"><meta property="og:url" content="${attr(url)}"><meta property="og:image" content="${attr(preview)}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/logo.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/seo.css"><script type="application/ld+json">${schema}</script>`;
}
function shell(site,{title,description,path,body,photo,kind,date}){
  const head=meta({title,description,path,photo,site,kind,date});
  const l=nav(site);

  return `<!doctype html><html lang="vi"><head>${head}</head><body><div class="topline"><div class="container">TRANG THÔNG TIN DỰ ÁN ĐỘC LẬP <span>•</span> VINHOMES OLYMPIC</div></div>
  <header class="header"><div class="container header-inner"><a class="wordmark" href="/" aria-label="Trang chủ Vinhomes Olympic"><span class="wordmark-emblem">✧</span><span><small>VINHOMES</small> OLYMPIC</span></a><nav class="seo-nav" aria-label="Chuyên mục">${l}<a href="/tin-tuc/">Tin tức</a></nav><a class="header-phone" href="tel:${esc(site.phone||'0986091222')}">☎ ${esc(site.phone||'0986091222')}</a><button class="navtoggle" id="seoNavBtn" aria-label="Mở menu" aria-expanded="false">☰</button></div></header>
  <main>${body}</main><footer class="seo-footer"><div class="container seo-footgrid"><div><h3>VINHOMES OLYMPIC</h3><p>${esc(site.independentDisclaimer||INITIAL_CONTENT.independentDisclaimer)}</p><p>Hình minh họa; không phải phối cảnh chính thức hay ảnh sản phẩm đang mở bán.</p></div><div><b>Thông tin hữu ích</b><a href="/tong-quan/">Tổng quan</a><a href="/gia-ban/">Giá và quỹ căn</a><a href="/phap-ly/">Pháp lý</a><a href="/chinh-sach-bao-mat/">Bảo mật & dữ liệu</a></div><div><b>Tư vấn</b><a href="tel:${esc(site.phone||'0986091222')}">☎ ${esc(site.phone||'0986091222')}</a><a href="${attr(site.zalo||'https://zalo.me/0986091222')}" target="_blank" rel="noopener noreferrer">Zalo ↗</a><a href="/admin/" rel="nofollow">Quản trị</a></div></div></footer><script>document.getElementById('seoNavBtn').addEventListener('click',()=>{let n=document.querySelector('.seo-nav');n.classList.toggle('open');document.getElementById('seoNavBtn').setAttribute('aria-expanded',n.classList.contains('open'))});</script></body></html>`;
}
const badge=status=>status==='confirmed'?'ĐÃ ĐỐI CHIẾU NGUỒN':status==='pending'?'CHỜ BẢNG GIÁ / TÀI LIỆU':'MỘT PHẦN CẦN XÁC MINH';
function articlePage(site,p,path,{kind='WebPage'}={}){
  const other=allPages(site).filter(x=>permitted(x)&&x.slug!==p.slug).slice(0,4);
  const relatedPosts=(site.posts||[]).filter(x=>permitted(x)&&x.slug!==p.slug);
  const relatedRank=x=>(p.relatedSlugs||[]).includes(x.slug)?4:x.category&&x.category===p.category?3:x.topic&&x.topic===p.topic?2:0;
  const more=relatedPosts.map((post,index)=>({post,index,score:relatedRank(post)})).sort((a,b)=>b.score-a.score||a.index-b.index).slice(0,4).map(x=>x.post);
  const related=kind==='Article'?more.map(x=>`<a class="guide-card" href="/tin-tuc/${attr(x.slug||slugify(x.title))}/"><span class="eyebrow">${esc(x.category||'BÀI VIẾT LIÊN QUAN')}</span><h3>${esc(x.title)}</h3><p>${esc(x.excerpt||'')}</p><span class="guide-more">ĐỌC BÀI →</span></a>`).join(''):other.map(x=>homeCard(x,site)).join('');
  const sections=String(p.body||p.content||'').split(/\r?\n/).filter(x=>x.startsWith('## ')).map(x=>x.slice(3));
  const toc=sections.length?`<nav class="seo-toc" aria-label="Mục lục bài viết"><b>Trong bài viết</b><ol>${sections.map(x=>`<li><a href="#${slugify(x)}">${esc(x)}</a></li>`).join('')}</ol></nav>`:'';
  const topicLinks=PAGE_LINKS.filter(([slug])=>slug!==p.slug&&allPages(site).some(x=>x.slug===slug&&permitted(x)));
  const priceRows=(p.slug==='gia-ban'?(site.priceRows||[]).filter(x=>x.verified&&x.sourceUrl):[]);
  const pricing=priceRows.length?`<section class="seo-price-table"><h2>Bảng thông tin sản phẩm</h2><div class="table-scroll"><table><thead><tr><th>Loại hình / mã</th><th>Quy cách</th><th>Giá tham khảo</th><th>Cập nhật</th></tr></thead><tbody>${priceRows.map(x=>`<tr><td>${esc(x.product)}</td><td>${esc(x.area)}</td><td>${esc(x.price)}</td><td>${esc(x.updated)}</td></tr>`).join('')}</tbody></table></div><p>Giá và điều kiện giao dịch áp dụng theo tài liệu của từng sản phẩm tại thời điểm cập nhật.</p></section>`:'';
  const body=`<section class="seo-hero"><div class="container seo-hero-grid"><div><a href="/" class="breadcrumb">TRANG CHỦ / CẨM NANG OLYMPIC</a><div class="seo-status ${p.status==='confirmed'?'is-verified':'is-pending'}">${esc(p.category||'CẨM NANG VINHOMES OLYMPIC')}</div><h1>${esc(p.title)}</h1><p class="seo-deck">${esc(p.summary||p.excerpt||'')}</p><span class="seo-updated">Cập nhật nội dung: ${esc(p.updated||p.date||'21/10/2026')}</span></div><figure class="seo-photo"><img src="${attr(img(p.image))}" alt="Hình minh họa: ${attr(p.title)}"><figcaption>HÌNH MINH HỌA • KHÔNG PHẢI PHỐI CẢNH CHÍNH THỨC</figcaption></figure></div></section>
  <section class="seo-main container"><article class="seo-article"><div class="eyebrow">THÔNG TIN & PHÂN TÍCH</div>${toc}${paragraphs(p.body||p.content)}${pricing}<nav class="seo-context-links" aria-label="Chuyên đề liên quan"><h2>Tìm hiểu các nội dung liên quan</h2><p>${topicLinks.slice(0,4).map(([slug,label])=>`<a href="/${slug}/">${esc(label)} Vinhomes Olympic</a>`).join(' · ')}</p></nav></article><aside class="seo-aside"><div class="seo-sidebox"><b>ĐỌC THÊM</b>${topicLinks.slice(0,7).map(([slug,label])=>`<a href="/${slug}/">${esc(label)} <span>↗</span></a>`).join('')}</div><div class="seo-sidebox"><b>LIÊN HỆ TRỰC TIẾP</b><p>${esc(site.advisorName||'Mạnh Việt')}</p><a class="button button-gold" href="tel:${esc(site.phone||'0986091222')}">☎ ${esc(site.phone||'0986091222')}</a></div></aside></section>
  <section class="seo-related"><div class="container"><div class="eyebrow">TIẾP TỤC TÌM HIỂU</div><h2>Những chủ đề liên quan</h2><div class="seo-cards">${related}</div>${contact(site)}</div></section>`;
  return shell(site,{title:p.seoTitle||p.title+' | Mạnh Việt Real Estate',description:p.seoDescription||p.summary||'',path,body,photo:p.image,kind,date:p.updated||p.date});
}
function listings(site,type){
  const news=type==='news',list=(news?site.posts||[]:allPages(site)).filter(permitted);
  const title=news?'Tin tức & góc nhìn Olympic':'Tài liệu dự án và hướng dẫn';
  const path=news?'/tin-tuc/':'/';
  const body=`<section class="seo-hero"><div class="container"><a class="breadcrumb" href="/">TRANG CHỦ</a><div class="eyebrow">CẨM NANG VINHOMES OLYMPIC THƯỜNG TÍN</div><h1>${title}</h1><p class="seo-deck">${list.length} bài viết về Vinhomes Olympic Thường Tín: vị trí, quy hoạch, lựa chọn nhà ở, tài chính và quy trình giao dịch. Chọn chủ đề phù hợp với nhu cầu của bạn.</p></div></section>
  <section class="seo-related"><div class="container"><nav class="seo-topics" aria-label="Chủ đề cẩm nang">${[...new Set(list.map(p=>p.category||'Dự án Vinhomes Olympic'))].map(c=>`<a href="#nhom-${slugify(c)}">${esc(c)}</a>`).join('')}</nav><div class="seo-cards seo-news-cards">${list.map(p=>{
    const url=news?'/tin-tuc/'+(p.slug||slugify(p.title))+'/':'/'+p.slug+'/';
    return `<a href="${attr(url)}" ${list.find(x=>(x.category||'Dự án Vinhomes Olympic')===(p.category||'Dự án Vinhomes Olympic'))===p?`id="nhom-${slugify(p.category||'Dự án Vinhomes Olympic')}"`:""} class="guide-card guide-card-image"><img loading="lazy" src="${attr(img(p.image))}" alt="Minh họa: ${attr(p.title)}"><div><span class="eyebrow">${esc(p.category||'VINHOMES OLYMPIC')}</span><h3>${esc(p.title)}</h3><p>${esc(p.excerpt||p.summary||'')}</p><span class="guide-more">ĐỌC BÀI →</span></div></a>`
  }).join('')}</div>${contact(site)}</div></section>`;
  return shell(site,{title:title+' | Mạnh Việt',description:'Các bài viết Vinhomes Olympic Thường Tín: dự án, vị trí, tiến độ, mở bán và giá/quỹ căn và kinh nghiệm lựa chọn nhà ở.',path,body,photo:'/assets/olympic-concept.webp'});
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
  if(m){const post=(site.posts||[]).find(p=>permitted(p)&&(p.slug||slugify(p.title))===m[1]);if(post)return articlePage(site,{...post,body:post.content,summary:post.excerpt,status:post.status||'needs-verification',updated:post.date},route,{kind:'Article'});return null;}
  m=route.match(/^\/san-pham\/([a-z0-9-]+)\/$/);
  if(m){const product=(site.products||[]).find(p=>permitted(p)&&(p.slug||slugify(p.title))===m[1]);if(product)return articlePage(site,{...product,body:product.detail||product.short,summary:product.short,status:'needs-verification'},route);return null;}
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
export function injectHome(html,site){
  // Render edited homepage copy on the server as well as on the client.
  const replaceText=(input,id,value)=>input.replace(new RegExp('(<[^>]+id="'+id+'"[^>]*>)([\\s\\S]*?)(<\\/[^>]+>)'),(_,open,old,close)=>open+esc(value)+close);
  for(const key of ['heroTitle','heroAccent','heroSubtitle','heroNote','overviewTitle','overviewText','locationTitle','locationText','advisorName','advisorTitle','advisorBio','contactTitle','contactText']){
    const ids={heroTitle:'heroTitle',heroAccent:'heroAccent',heroSubtitle:'heroSubtitle',heroNote:'heroNote',overviewTitle:'overviewTitle',overviewText:'overviewText',locationTitle:'locationTitle',locationText:'locationText',advisorName:'advisorName',advisorTitle:'advisorTitle',advisorBio:'advisorBio',contactTitle:'contactTitle',contactText:'contactText'};
    html=replaceText(html,ids[key],site[key]||'');
  }
  html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc((site.siteName||'Vinhomes Olympic')+' | '+(site.brand||'Mạnh Việt Real Estate'))}</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${attr(site.seoDescription||INITIAL_CONTENT.seoDescription)}">`);
  let output=html.replace('</head>',`<link rel="canonical" href="${DOMAIN}/"><meta property="og:title" content="${attr((site.siteName||'Vinhomes Olympic')+' | '+(site.brand||'Mạnh Việt Real Estate'))}"><meta property="og:type" content="website"><meta property="og:description" content="${attr(site.seoDescription||INITIAL_CONTENT.seoDescription)}"><meta property="og:url" content="${DOMAIN}/"><meta property="og:image" content="${DOMAIN}/assets/olympic-concept.webp"><link rel="stylesheet" href="/seo.css"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'WebSite',name:'Vinhomes Olympic – Mạnh Việt Real Estate',url:DOMAIN+'/'}).replaceAll('<','\\u003c')}</script></head>`);
  if(isSafeImage(site.heroImage)) {
    const hero=String(site.heroImage).replaceAll('"','%22').replaceAll('\\','');
    output=output.replace('</head>',`<style>.hero-cover{background-image:linear-gradient(90deg,rgba(4,19,34,.94),rgba(4,19,34,.25)),linear-gradient(0deg,rgba(4,19,34,.72),transparent),url("${attr(hero)}")}</style></head>`);
  }
  const products=(site.products||[]).filter(permitted).map(p=>`<article class="product-card"><img loading="lazy" src="${attr(img(p.image))}" alt="Hình minh họa ${attr(p.title)}"><div class="product-copy"><div class="category">${esc(p.type)}</div><h3>${esc(p.title)}</h3><p>${esc(p.short)}</p><a class="product-link" href="/san-pham/${attr(p.slug||slugify(p.title))}/">XEM CHI TIẾT ↗</a></div></article>`).join('');
  output=output.replace('<div class="product-grid" id="products"></div>',`<div class="product-grid" id="products">${products}</div>`);
  const publishedPosts=(site.posts||[]).filter(permitted).slice(0,6);
  const news=publishedPosts.map(n=>`<a class="guide-card guide-card-image" href="/tin-tuc/${slugify(n.slug||n.title)}/"><img loading="lazy" src="${attr(img(n.image))}" alt="Ảnh minh họa ${attr(n.title)}"><div><span class="eyebrow">BÀI VIẾT · ${esc(n.date||'2026')} · ẢNH MINH HỌA</span><h3>${esc(n.title)}</h3><p>${esc(n.excerpt)}</p><span class="guide-more">ĐỌC TIN →</span></div></a>`).join('');
  output=output.replace('<div class="news-grid" id="news"></div>',`<div class="news-grid" id="news"><div class="seo-home-news" style="grid-column:1/-1;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:15px">${news}</div></div>`);
  const cards=`<section class="seo-home-index section"><div class="container"><div class="eyebrow">HƯỚNG DẪN DỰ ÁN</div><h2 class="section-title">Tìm đúng thông tin cần thiết</h2><p>Tổng quan Vinhomes Olympic Thường Tín, quy hoạch, vị trí và cẩm nang lựa chọn nhà ở.</p><div class="seo-cards">${homeLinks(site)}</div><p><a class="button button-gold" href="/tin-tuc/">XEM BÀI VIẾT ↗</a></p></div></section>`;
  output=output.replace('<section class="section gallery-section"',cards+'<section class="section gallery-section"');
  output=output.replace('</footer>',`<div class="container" style="padding-top:10px"><a href="/chinh-sach-bao-mat/">Chính sách bảo mật thông tin</a> &nbsp;·&nbsp; <a href="/gia-ban/">Tra cứu giá &amp; quỹ căn</a> &nbsp;·&nbsp; <a href="/phap-ly/">Pháp lý</a></div></footer>`);
  return output;
}
