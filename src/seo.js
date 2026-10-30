import {ADMIN_PATH} from './admin-config.js';
import { INITIAL_CONTENT } from './seed.js';
import { PAGE_CONTENT } from './page-content.js';
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
export const displayDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(value||'')?value.slice(8,10)+'/'+value.slice(5,7)+'/'+value.slice(0,4):value||'';
const phoneNumber=site=>(site.phone||'0989294744').replace(/[^0-9+]/g,'');
const phoneLabel=site=>phoneNumber(site).replace(/^(\d{4})(\d{3})(\d{3})$/,'$1.$2.$3');
const utilityPath=path=>['/gioi-thieu/','/lien-he/','/tac-gia-manh-viet/','/chinh-sach-bien-tap/','/chinh-sach-bao-mat/'].includes(path);
const paragraphs=value=>{
 const lines=String(value||'').split(/\r?\n/);let out='',block=[],table=[],list=[];
 const flush=()=>{if(block.length){out+='<p>'+block.map(esc).join('<br>')+'</p>';block=[];}if(list.length){out+='<ul>'+list.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';list=[];}if(table.length){const rows=table.filter(x=>!/^\|[\s:|-]+\|$/.test(x)).map(x=>x.replace(/^\||\|$/g,'').split('|').map(x=>x.trim()));out+='<div class="table-scroll"><table><thead><tr>'+rows[0].map(x=>'<th scope="col">'+esc(x)+'</th>').join('')+'</tr></thead><tbody>'+rows.slice(1).map(row=>'<tr>'+row.map(x=>'<td>'+esc(x)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';table=[];}};
 for(const raw of lines){const line=raw.trim();if(!line){flush();continue;}if(line.startsWith('|')){if(block.length||list.length)flush();table.push(line);continue;}if(table.length)flush();if(line.startsWith('- ')){if(block.length)flush();list.push(line.slice(2));continue;}if(list.length)flush();if(line.startsWith('### ')){flush();out+='<h3 id="'+slugify(line.slice(4))+'">'+esc(line.slice(4))+'</h3>';}else if(line.startsWith('## ')){flush();out+='<h2 id="'+slugify(line.slice(3))+'">'+esc(line.slice(3))+'</h2>';}else block.push(line);}
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
const postCard=p=>`<article class="guide-card guide-card-image">${true?`<img loading="lazy" width="1000" height="650" src="${attr(img(p.image))}" alt="${attr(imageAlt(p))}">`:''}<div><span class="eyebrow">${esc(p.category||'Tin theo sự kiện')}</span><p><time datetime="${attr(p.date||'')}">${esc(displayDate(p.date))}</time></p><h3><a class="descriptive-link" href="/tin-tuc/${attr(p.slug||slugify(p.title))}/">${esc(p.title)}</a></h3><p>${esc(p.excerpt||'')}</p></div></article>`;
const contact=s=>`<div class="seo-cta"><div><div class="eyebrow">CẦN XÁC MINH THÔNG TIN?</div><h2>Nhận hỗ trợ từ ${esc(s.advisorName||'Mạnh Việt')}</h2><p>Chỉ cung cấp bảng hàng và ưu đãi khi có văn bản để đối chiếu. Để lại số điện thoại ở trang chủ hoặc liên hệ trực tiếp.</p></div><div class="seo-cta-actions"><a class="button button-gold" href="tel:${esc((s.phone||'0989294744').replace(/[^0-9+]/g,''))}">☎ Gọi tư vấn</a><a class="button button-outline" href="/#lienhe">Nhận thông tin ↗</a></div></div>`;
function meta({title,description,path,photo,kind='WebPage',date,modified,faqs=[],site}){
  const url=DOMAIN+path,preview=new URL(img(photo),DOMAIN).href;
  const graph=[{'@type':'WebSite','@id':DOMAIN+'/#website',name:'Vinhomes Olympic – Mạnh Việt Real Estate',url:DOMAIN+'/',publisher:{'@id':DOMAIN+'/#organization'}},{'@type':'Organization','@id':DOMAIN+'/#organization',name:'Mạnh Việt Real Estate',url:DOMAIN+'/',telephone:phoneNumber(site)}, {'@type':'Person','@id':DOMAIN+'/tac-gia-manh-viet/#person',name:site.advisorName||'Mạnh Việt',url:DOMAIN+'/tac-gia-manh-viet/'},
    {'@type':'WebPage','@id':url+'#webpage',name:title,url,description,isPartOf:{'@id':DOMAIN+'/#website'},inLanguage:'vi-VN'}];
  if(path!=='/'){const crumbs=[{'@type':'ListItem',position:1,name:'Trang chủ',item:DOMAIN+'/'}];if(path.startsWith('/tin-tuc/')&&path!=='/tin-tuc/')crumbs.push({'@type':'ListItem',position:2,name:'Tin theo sự kiện',item:DOMAIN+'/tin-tuc/'});crumbs.push({'@type':'ListItem',position:crumbs.length+1,name:title,item:url});graph.push({'@type':'BreadcrumbList',itemListElement:crumbs});}
  if(kind==='Article')graph.push({'@type':'Article',headline:title,datePublished:date||undefined,dateModified:modified||date||undefined,mainEntityOfPage:url,author:{'@id':DOMAIN+'/tac-gia-manh-viet/#person'},publisher:{'@id':DOMAIN+'/#organization'},inLanguage:'vi-VN',image:preview});
  if(faqs.length)graph.push(faqSchema(faqs,url));
  const schema=JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c');
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${attr(description)}"><link rel="canonical" href="${attr(url)}"><meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#091b2e"><meta property="og:type" content="${kind==='Article'?'article':'website'}"><meta property="og:site_name" content="Mạnh Việt – thông tin Olympic"><meta property="og:locale" content="vi_VN"><meta property="og:title" content="${attr(title)}"><meta property="og:description" content="${attr(description)}"><meta property="og:url" content="${attr(url)}"><meta property="og:image" content="${attr(preview)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${attr(title)}"><meta name="twitter:description" content="${attr(description)}"><meta name="twitter:image" content="${attr(preview)}"><link rel="icon" href="/assets/logo.svg" type="image/svg+xml">${photo?`<link rel="preload" as="image" href="${attr(img(photo))}">`:""}<link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/seo.css"><script type="application/ld+json">${schema}</script>`;
}
function shell(site,{title,description,path,body,photo,kind,date,modified,faqs}){
  const head=meta({title,description,path,photo,site,kind,date,modified,faqs});
  const l=nav(site);

  const html=`<!doctype html><html lang="vi"><head>${head}</head><body><div class="topline"><div class="container">TRANG THÔNG TIN DỰ ÁN ĐỘC LẬP <span>•</span> VINHOMES OLYMPIC</div></div>
  <header class="header"><div class="container header-inner"><a class="wordmark" href="/" aria-label="Trang chủ Vinhomes Olympic"><span class="wordmark-emblem">✧</span><span><small>VINHOMES</small> OLYMPIC</span></a><nav class="seo-nav" aria-label="Chuyên mục">${l}<a href="/tin-tuc/">Tin tức</a></nav><a class="header-phone" href="tel:${phoneNumber(site)}">☎ ${phoneLabel(site)}</a><button class="navtoggle" id="seoNavBtn" aria-label="Mở menu" aria-expanded="false">☰</button></div></header>
  <main>${body}</main>${editorialFooter(site)}<script>document.getElementById('seoNavBtn').addEventListener('click',()=>{let n=document.querySelector('.seo-nav');n.classList.toggle('open');document.getElementById('seoNavBtn').setAttribute('aria-expanded',n.classList.contains('open'))});</script></body></html>`;
  return html.replace(/↗/g,'');
}
function editorialFooter(site){return `<footer class="seo-footer"><div class="container seo-footgrid"><div><h3>Mạnh Việt Real Estate</h3><p>Người biên tập và đầu mối liên hệ: <a href="/tac-gia-manh-viet/">Mạnh Việt</a>.</p><a href="tel:${phoneNumber(site)}">${phoneLabel(site)}</a><a href="/lien-he/">Liên hệ và gửi phản hồi</a></div><nav aria-label="Thông tin vận hành"><a href="/gioi-thieu/">Giới thiệu website</a><a href="/chinh-sach-bien-tap/">Chính sách biên tập</a><a href="/chinh-sach-bao-mat/">Bảo mật dữ liệu</a><a href="/tin-tuc/">Tin theo ngày nguồn</a></nav><nav aria-label="Các mốc đã tổng hợp">${(site.posts||[]).filter(permitted).slice(0,4).map(p=>`<a href="/tin-tuc/${attr(p.slug)}/">${esc(p.title)}</a>`).join('')}</nav></div><p class="container page-notice">${esc(PAGE_CONTENT['/'].notice)}</p></footer>`}
function faqSchema(faqs,url){return {'@type':'FAQPage','@id':url+'#cau-hoi',mainEntity:faqs.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))}}
function pageFaqs(faqs=[]){if(!faqs.length)return "";return `<section class="page-faq" id="cau-hoi"><h2>Câu hỏi thường gặp</h2>${faqs.map((f,i)=>`<section class="faq-item"><h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p><p class="faq-sources">Căn cứ: ${(f.sources||[]).map(source=>`<a href="${attr(source.url)}" ${source.kind==='document'?'target="_blank" rel="noopener noreferrer"':''}>${esc(source.label)}</a>`).join(' · ')}</p></section>`).join('')}</section>`}
function contextualLinks(links){return `<nav class="editorial-links" aria-label="Liên kết trong nội dung"><h2>Nội dung liên quan</h2><ul>${links.map(l=>`<li><a class="descriptive-link" href="${attr(l.href)}">${esc(l.anchor)}</a></li>`).join('')}</ul></nav>`}
function articlePage(site,p,path,{kind=utilityPath(path)?'WebPage':'Article'}={}){
  const profile=PAGE_CONTENT[path]||{};
  p={...p,intro:p.intro||profile.intro,faqs:p.faqs?.length?p.faqs:profile.faqs||[],relatedLinks:p.relatedLinks?.length?p.relatedLinks:profile.links||[]};
  const sections=String(p.body||p.content||'').split(/\r?\n/).filter(x=>x.startsWith('## ')).map(x=>x.slice(3));
  const toc=sections.length?`<nav class="seo-toc" aria-label="Mục lục bài viết"><b>Trong bài viết</b><ol>${sections.map(x=>`<li><a href="#${slugify(x)}">${esc(x)}</a></li>`).join('')}</ol></nav>`:'';
  const references=[...(p.sources||[]),...(p.sourceUrl?[{url:p.sourceUrl,label:p.sourceLabel||'Tài liệu gốc'}]:[]),...(profile.sources||[])].filter((x,i,a)=>/^https:\/\//.test(x.url)&&a.findIndex(y=>y.url===x.url)===i);
  const referencesHtml=references.length?`<section class="article-references"><h2>Tài liệu liên quan</h2><ul>${references.map(x=>`<li><a href="${attr(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.label)}</a></li>`).join('')}</ul></section>`:'';
  const priceRows=(p.slug==='gia-ban'?(site.priceRows||[]).filter(x=>x.verified&&x.sourceUrl):[]);
  const pricing=priceRows.length?`<section class="seo-price-table"><h2>Bảng thông tin sản phẩm</h2><div class="table-scroll"><table><thead><tr><th>Loại hình / mã</th><th>Quy cách</th><th>Giá tham khảo</th><th>Cập nhật</th></tr></thead><tbody>${priceRows.map(x=>`<tr><td>${esc(x.product)}</td><td>${esc(x.area)}</td><td>${esc(x.price)}</td><td>${esc(displayDate(x.updated))}</td></tr>`).join('')}</tbody></table></div><p>Giá và điều kiện giao dịch áp dụng theo tài liệu của từng sản phẩm tại thời điểm cập nhật.</p></section>`:'';
  const pillar=allPages(site).find(x=>x.slug===pillarFor(p)&&permitted(x));
  const pillarLink=kind==='Article'&&path.startsWith('/tin-tuc/')&&pillar?`<p class="article-parent">Chuyên đề: <a href="/${pillar.slug}/">${esc(pillar.title)}</a></p>`:'';
  const photo=true;
  const body=`<section class="seo-hero"><div class="container seo-hero-grid ${photo?'':'text-only-hero'}"><div><nav class="breadcrumb" aria-label="Đường dẫn"><a href="/">Trang chủ</a> / ${path.startsWith("/tin-tuc/")?'<a href="/tin-tuc/">Tin theo sự kiện</a> / ':""}<span>${esc(p.title)}</span></nav><div class="seo-status ${p.status==='confirmed'?'is-verified':'is-pending'}">${esc(p.category||'CẨM NANG VINHOMES OLYMPIC')}</div><h1>${esc(p.title)}</h1><div class="quick-answer"><b>Trả lời nhanh</b><p class="seo-deck">${esc(p.intro||p.summary||p.excerpt||'')}</p></div><span class="seo-updated">Cập nhật: ${esc(displayDate(p.updated||p.date||'2026-10-30'))}</span><p class="byline">Biên tập: <a href="/tac-gia-manh-viet/">Mạnh Việt</a> · Tổ chức và đối chiếu tài liệu công khai.</p>${pillarLink}</div>${photo?`<figure class="seo-photo"><img src="${attr(img(p.image))}" width="1000" height="650" fetchpriority="high" alt="${attr(imageAlt(p))}"><figcaption>${esc(p.imageCaption||profile.imageCaption||'HÌNH MINH HỌA • KHÔNG PHẢI PHỐI CẢNH CHÍNH THỨC')}</figcaption></figure>`:''}</div></section>
  <section class="seo-main container"><article class="seo-article"><div class="eyebrow">THÔNG TIN & PHÂN TÍCH</div>${toc}${p.slug==='san-pham'?'<span id="biet-thu"></span><span id="lien-ke"></span><span id="shophouse"></span>':''}<section class="article-body">${paragraphs(p.body||p.content)}</section>${pricing}${referencesHtml}${pageFaqs(p.faqs)}${contextualLinks(p.relatedLinks)}</article><aside class="seo-aside"><div class="seo-sidebox"><b>LIÊN HỆ TRỰC TIẾP</b><p>${esc(site.advisorName||'Mạnh Việt')}</p><a class="button button-gold" href="tel:${phoneNumber(site)}">☎ ${phoneLabel(site)}</a></div></aside></section>
  <section class="seo-related"><div class="container">${contact(site)}</div></section>`;
  return shell(site,{title:p.seoTitle||p.title+' | Mạnh Việt Real Estate',description:p.seoDescription||p.summary||'',path,body,photo:p.image,kind,date:p.date,modified:p.updated||p.date,faqs:p.faqs});
}
function listings(site,type){
  const news=type==='news',list=(news?site.posts||[]:allPages(site)).filter(permitted);
  const profile=PAGE_CONTENT['/tin-tuc/'];
  const title=news?profile.heading:'Tài liệu dự án và hướng dẫn';
  const path=news?'/tin-tuc/':'/';
  const body=`<section class="seo-hero"><div class="container"><a class="breadcrumb" href="/">TRANG CHỦ</a><div class="eyebrow">CẨM NANG VINHOMES OLYMPIC THƯỜNG TÍN</div><h1>${title}</h1><p class="seo-deck">${esc(profile.intro)}</p></div></section>
  <section class="seo-main container hub-editorial"><article class="seo-article"><figure class="editorial-figure"><img src="${profile.image}" width="1000" height="650" alt="${attr(profile.imageAlt)}"><figcaption>${esc(profile.imageCaption)}</figcaption></figure>${paragraphs(profile.body)}${pageFaqs(profile.faqs)}${contextualLinks(profile.links)}</article></section>
  <section class="seo-related"><div class="container"><nav class="seo-topics" aria-label="Chủ đề cẩm nang">${[...new Set(list.map(p=>p.category||'Phân tích dự án'))].map(c=>`<a href="#nhom-${slugify(c)}">${esc(c)}</a>`).join('')}</nav>${[...new Set(list.map(p=>p.category||'Phân tích dự án'))].map(c=>`<section id="nhom-${slugify(c)}"><h2>${esc(c)}</h2><div class="seo-cards seo-news-cards">${list.filter(p=>(p.category||'Phân tích dự án')===c).map(postCard).join('')}</div></section>`).join('')}${contact(site)}</div></section>`;
  return shell(site,{title:profile.seoTitle,description:profile.seoDescription,faqs:profile.faqs,path,body,photo:'/assets/olympic-concept.webp'});
}
export function renderSeo(route,site){
  if(route==='/tin-tuc/')return listings(site,'news');
  if(route==='/chinh-sach-bao-mat/')return articlePage(site,{title:'Chính sách bảo mật thông tin',summary:'Cách chúng tôi thu thập và sử dụng thông tin khi bạn yêu cầu tư vấn.',body:PAGE_CONTENT[route].body,intro:PAGE_CONTENT[route].intro,seoTitle:PAGE_CONTENT[route].seoTitle,seoDescription:PAGE_CONTENT[route].seoDescription,faqs:PAGE_CONTENT[route].faqs,relatedLinks:PAGE_CONTENT[route].links,imageAlt:PAGE_CONTENT[route].imageAlt,imageCaption:PAGE_CONTENT[route].imageCaption,updated:'2026-10-30',status:'confirmed',image:PAGE_CONTENT[route].image,sourceLabel:'Chính sách vận hành website',sourceUrl:''},route);
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
    if(article&&/^\d{4}-\d{2}-\d{2}$/.test(article.updated||article.date||''))return article.updated||article.date;
    return null;
  };
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(path=>`  <url><loc>${DOMAIN+path}</loc>${dateFor(path)?'<lastmod>'+dateFor(path)+'</lastmod>':''}</url>`).join('\n')}\n</urlset>`;
}
export function robots(){return `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: ${ADMIN_PATH}\nDisallow: /api/\nSitemap: ${DOMAIN}/sitemap.xml\n`}
export function homeLinks(site){return allPages(site).filter(permitted).map(p=>homeCard(p,site)).join('')}
export function verifiedFacts(){
  return `<section class="section cream verified-facts" id="thong-tin-nhanh"><div class="container"><h2 class="section-title">Thông tin nhanh về Vinhomes Olympic Thường Tín</h2><p>Đối chiếu tài liệu gốc ngày <time datetime="${VERIFIED_DATE}">30/10/2026</time>. Mỗi số liệu dưới đây có phạm vi riêng; không dùng quy mô một phân khu để mô tả toàn bộ dự án.</p><dl class="facts-grid"><div><dt>Tên trong hồ sơ</dt><dd>Khu đô thị thể thao Olympic; dự án thành phần phân khu B được nêu riêng trong quyết định môi trường. <a href="#nguon-dtm-b">[2]</a></dd></div><div><dt>Quy mô tổng thể được địa phương công bố</dt><dd>Khoảng 9.171 ha, chia bốn phân khu trên địa bàn nhiều xã, phường. <a href="#nguon-dan-hoa">[1]</a></dd></div><div><dt>Riêng phân khu B</dt><dd>2.944,39 ha theo Quyết định 916/QĐ-SNNMT; địa điểm gồm Thường Tín, Thượng Phúc, Tam Hưng và Dân Hòa. <a href="#nguon-dtm-b">[2]</a></dd></div><div><dt>Phạm vi quy hoạch và diện tích dự án</dt><dd>Cần đọc theo từng đồ án và quyết định. Không đồng nhất phạm vi nghiên cứu, dự án tổng thể và dự án thành phần.</dd></div><div><dt>Hồ sơ đã đối chiếu</dt><dd>Quyết định thẩm định ĐTM phân khu B và thông báo lấy ý kiến quy hoạch 1/500. Những hồ sơ này không thay thế điều kiện mở bán của từng tài sản. <a href="#nguon-dtm-b">[2]</a> <a href="#nguon-ngoc-hoi">[3]</a></dd></div><div><dt>Website tư vấn</dt><dd>Mạnh Việt Real Estate vận hành độc lập; không phải website chính thức của Vingroup/Vinhomes.</dd></div></dl><nav aria-label="Thông tin chuyên đề"><a class="descriptive-link" href="/tong-quan/">Tổng quan dự án</a> · <a class="descriptive-link" href="/quy-hoach/">Quy hoạch và các phân khu</a> · <a class="descriptive-link" href="/phap-ly/">Hồ sơ pháp lý cần kiểm tra</a></nav></div></section>`;
}
const sourceList=()=>`<section class="section source-references" id="nguon-tham-khao"><div class="container"><h2 class="section-title">Tài liệu gốc và phạm vi đối chiếu</h2><ol>${VERIFIED_SOURCES.map(s=>`<li id="nguon-${s.id}"><a href="${attr(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a></li>`).join('')}</ol></div></section>`;
const faqSection=()=>`<section class="section cream home-faq"><div class="container"><article class="seo-article">${pageFaqs(PAGE_CONTENT['/'].faqs)}${contextualLinks(PAGE_CONTENT['/'].links)}</article></div></section>`;
export function injectHome(html,site){
  const replaceText=(input,id,value)=>input.replace(new RegExp('(<[^>]+id="'+id+'"[^>]*>)([\\s\\S]*?)(<\\/[^>]+>)'),(_,open,old,close)=>open+esc(value)+close);
  for(const key of ['heroTitle','heroAccent','heroHeadingDetail','heroSubtitle','heroNote','overviewTitle','overviewText','locationTitle','locationText','advisorName','advisorTitle','advisorBio','contactTitle','contactText'])html=replaceText(html,key,site[key]||INITIAL_CONTENT[key]||'');
  for(const id of ['headerPhone','heroCall','advisorCall','contactCall','footerPhone','floatingCall'])html=html.replace(new RegExp('<a\\b[^>]*id="'+id+'"[^>]*>[\\s\\S]*?<\\/a>'),tag=>tag.replace(/href="[^"]*"/,'href="tel:'+phoneNumber(site)+'"').replace(/>[\s\S]*<\/a>$/,['headerPhone','advisorCall','contactCall','footerPhone'].includes(id)?'>'+esc(phoneLabel(site))+'</a>':tag.match(/>[\s\S]*<\/a>$/)[0]));
  const title=site.seoTitle||HOME_SEO_TITLE,description=site.seoDescription||HOME_DESCRIPTION;
  html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(title)}</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${attr(description)}">`);
  const graph={'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':DOMAIN+'/#organization',name:'Mạnh Việt Real Estate',url:DOMAIN+'/',telephone:phoneNumber(site)},{'@type':'WebSite','@id':DOMAIN+'/#website',name:'Vinhomes Olympic – Mạnh Việt Real Estate',url:DOMAIN+'/',publisher:{'@id':DOMAIN+'/#organization'}},{'@type':'WebPage','@id':DOMAIN+'/#webpage',name:title,description,url:DOMAIN+'/',inLanguage:'vi-VN',isPartOf:{'@id':DOMAIN+'/#website'}},{'@type':'FAQPage','@id':DOMAIN+'/#cau-hoi',mainEntity:PAGE_CONTENT['/'].faqs.map(x=>({'@type':'Question',name:x.question,acceptedAnswer:{'@type':'Answer',text:x.answer}}))}]};
  html=html.replace(/(<p class="hero-description"[^>]*>)[\s\S]*?(<\/p>)/,(_,a,b)=>a+esc(site.homeIntro||PAGE_CONTENT['/'].intro)+b);
  let output=html.replace('</head>',`<link rel="canonical" href="${DOMAIN}/"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:site_name" content="Mạnh Việt – thông tin Olympic"><meta property="og:locale" content="vi_VN"><meta property="og:title" content="${attr(title)}"><meta property="og:type" content="website"><meta property="og:description" content="${attr(description)}"><meta property="og:url" content="${DOMAIN}/"><meta property="og:image" content="${new URL(img(site.heroImage),DOMAIN).href}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${attr(title)}"><meta name="twitter:description" content="${attr(description)}"><meta name="twitter:image" content="${new URL(img(site.heroImage),DOMAIN).href}"><link rel="preload" as="image" href="${attr(img(site.heroImage))}"><link rel="stylesheet" href="/seo.css"><script type="application/ld+json">${JSON.stringify(graph).replaceAll('<','\\u003c')}</script></head>`);
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
  output=output.replace(/<footer>[\s\S]*?<\/footer>/,editorialFooter(site));

  return output.replace(/[↗→]/g,'');
}
