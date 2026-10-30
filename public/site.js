const $=sel=>document.querySelector(sel);
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeImg=url=>{const s=String(url||'');if(/^\/(assets|media)\/[\w./-]+$/.test(s)&&!s.includes('..'))return s;try{const u=new URL(s);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}};
const slugify=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
const safeLink=(url,alternative)=>{try{const u=new URL(url,location.origin);return ['https:','http:'].includes(u.protocol)?u.href:alternative}catch{return alternative}};
const imageDescription=(image,title)=>({'/assets/olympic-concept.webp':'Hình minh họa đô thị với sân vận động, mặt nước và các khối nhà','/assets/waterfront.webp':'Hình minh họa hồ nước, đường phố và các khối căn hộ nhìn từ trên cao','/assets/sport.webp':'Hình minh họa sân vận động, sân tập và quảng trường','/assets/city.webp':'Hình minh họa không gian đô thị và đường giao thông'}[image]||'Đồ họa minh họa chủ đề '+title+'; không phải ảnh hiện trường');
const productTarget=p=>({'biet-thu':'/san-pham/#biet-thu','lien-ke':'/san-pham/#lien-ke','shophouse':'/san-pham/#shophouse','khong-gian-do-thi':'/quy-hoach/'}[slugify(p.slug||p.title)]||'/san-pham/');
let website={};
function field(id,text){const el=document.getElementById(id);if(el)el.textContent=text||''}
function href(id,url){const el=document.getElementById(id);if(el)el.href=url}
function socialLink(ids,url,defaultUrl){for(const id of ids){const el=document.getElementById(id);if(!el)continue;el.classList.toggle('hidden',!url);if(url)el.href=safeLink(url,defaultUrl||'#')}}
function apply(site){
  website=site;
  const phone=(site.phone||'0989294744').replace(/[^+\d]/g,'');
  const displayPhone=phone.replace(/^(\d{4})(\d{3})(\d{3})$/,'$1.$2.$3');
  const phoneUri='tel:'+phone;
  field('heroHeadingDetail',site.heroHeadingDetail);field('heroBadge',site.badge);field('heroTitle',site.heroTitle);field('heroAccent',site.heroAccent);field('heroSubtitle',site.heroSubtitle);
  field('heroNote',site.heroNote);field('overviewTitle',site.overviewTitle);field('overviewText',site.overviewText);
  field('locationTitle',site.locationTitle);field('locationText',site.locationText);field('advisorName',site.advisorName);
  field('advisorTitle',site.advisorTitle);field('advisorBio',site.advisorBio);field('footerAdvisor',site.advisorName);field('contactTitle',site.contactTitle);
  field('contactText',site.contactText);field('labelName',site.formNameLabel);field('labelPhone',site.formPhoneLabel);field('labelNote',site.formNoteLabel);field('formSubmitText',site.formSubmitText);field('labelConsent',site.formConsentText);field('disclaimer',site.independentDisclaimer);
  field('advisorCall','☎ '+displayPhone);field('headerPhone','☎ '+displayPhone);field('contactCall','☎ '+displayPhone);field('footerPhone',displayPhone);
  for(const id of ['headerPhone','heroCall','advisorCall','contactCall','footerPhone','floatingCall'])href(id,phoneUri);
  const zalo=safeLink(site.zalo||'https://zalo.me/'+phone,'https://zalo.me/'+phone);
  for(const id of ['advisorZalo','contactZalo','footerZalo','floatingZalo'])href(id,zalo);
  socialLink(['advisorFb','contactFb','floatingFb'],site.facebook);
  const avatar=$('#advisorPicture');avatar.replaceChildren();
  if(safeImg(site.advisorPhoto)){const image=document.createElement('img');image.src=safeImg(site.advisorPhoto);image.alt='Ảnh tư vấn '+site.advisorName;avatar.append(image)}else avatar.textContent='MV';
  const cover=safeImg(site.heroImage);if(cover){$('.hero-cover').style.backgroundImage=`linear-gradient(90deg,rgba(4,19,34,.94) 0%,rgba(4,19,34,.75) 28%,rgba(4,19,34,.17) 78%),linear-gradient(0deg,rgba(4,19,34,.75),transparent 60%),url("${cover.replace(/"/g,'%22')}")`}
  document.title=site.seoTitle||'Vinhomes Olympic Thường Tín: Quy hoạch, vị trí và pháp lý';
  document.querySelector('meta[name=description]').content=site.seoDescription||'';
  $('#stats').innerHTML=(site.stats||[]).map(i=>`<div class="stat"><b>${esc(i.number)}</b><small>${esc(i.label)}</small></div>`).join('');
  $('#amenities').innerHTML=(site.amenities||[]).map(i=>`<div class="amenity"><span class="symbol">${esc(i.icon)}</span><h3>${esc(i.title)}</h3><p>${esc(i.description)}</p></div>`).join('');
  const types=['all',...new Set((site.products||[]).filter(p=>p.published!==false&&p.type!=='Khác').map(p=>p.type||'Khác'))];
  $('#productFilters').innerHTML=types.map((type,i)=>`<button type="button" class="pill ${i===0?'active':''}" data-type="${esc(type)}">${type==='all'?'Tất cả':esc(type)}</button>`).join('');
  $('#productFilters').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
    $('#productFilters').querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.type);
  }));
  renderProducts('all');
  $('#gallery').innerHTML=(site.gallery||[]).map(g=>`<figure class="gallery-tile"><img src="${esc(safeImg(g.image)||'/assets/olympic-concept.webp')}" width="1000" height="720" alt="${esc(imageDescription(g.image,g.title))}" loading="lazy"><figcaption><small>HÌNH ẢNH THAM KHẢO</small>${esc(g.title)}</figcaption></figure>`).join('');
  $('#gallery').querySelectorAll('figure').forEach(f=>f.addEventListener('click',()=>{window.open(f.querySelector('img').src,'_blank','noopener')}));
  $('#leadExtra').innerHTML=(site.formQuestions||[]).map(q=>`<label>${esc(q.label)}${q.required?' *':''}<input data-question-id="${esc(q.id)}" placeholder="${esc(q.placeholder)}" ${q.required?'required':''} maxlength="180"></label>`).join('');
  const posts=(site.posts||[]).filter(p=>p.published!==false).slice(0,6);
  $('#news').innerHTML=posts.length?posts.map(p=>`<article class="news-card">${!p.id?.startsWith('olympic-cam-nang-')?`<img src="${esc(safeImg(p.image)||'/assets/olympic-concept.webp')}" width="1000" height="650" loading="lazy" alt="${esc(p.imageAlt||imageDescription(p.image,p.title))}">`:''}<div class="news-content"><span class="news-date">${esc(displayDate(p.updated||p.date))}</span><h3><a class="descriptive-link" href="/tin-tuc/${esc(slugify(p.slug||p.title))}/">${esc(p.title)}</a></h3><p>${esc(p.excerpt)}</p></div></article>`).join(''):'<p>Chưa có bài viết mới.</p>';
}
function displayDate(date){return /^\d{4}-\d{2}-\d{2}$/.test(date||'')?date.slice(8,10)+'/'+date.slice(5,7)+'/'+date.slice(0,4):''}
function renderProducts(type){const products=(website.products||[]).filter(p=>p.published!==false&&p.type!=='Khác').filter(p=>type==='all'||p.type===type);
 $('#products').innerHTML=products.map(p=>`<article class="product-card product-guide"><div class="product-copy"><div class="category">Tiêu chí lựa chọn</div><h3><a class="descriptive-link" href="${productTarget(p)}">${esc(p.title)}: cần kiểm tra gì?</a></h3><p>${esc(p.short)}</p></div></article>`).join('');
}
function openProduct(p){if(!p)return;$('#articleDetail').innerHTML=`<div class="eyebrow">LOẠI HÌNH • ${esc(p.type)}</div><img src="${esc(safeImg(p.image)||'/assets/waterfront.webp')}" alt="${esc(p.title)}"><h2>${esc(p.title)}</h2><p>${esc(p.detail||p.short)}</p><a class="button button-gold" href="#lienhe" id="productContact">NHẬN TƯ VẤN </a>`;$('#articleDialog').showModal();$('#productContact').onclick=()=>$('#articleDialog').close()}

function openPost(p){if(!p)return;$('#articleDetail').innerHTML=`<div class="eyebrow">TIN TỨC • ${esc(displayDate(p.date))}</div><img src="${esc(safeImg(p.image)||'/assets/olympic-concept.webp')}" alt="${esc(p.title)}"><h2>${esc(p.title)}</h2><p>${esc(p.content)}</p>`;$('#articleDialog').showModal()}
$('#closeDialog').onclick=()=>$('#articleDialog').close();
$('#articleDialog').addEventListener('click',e=>{if(e.target===$('#articleDialog'))$('#articleDialog').close()});
$('#navToggle').onclick=()=>{$('#nav').classList.toggle('open');$('#navToggle').setAttribute('aria-expanded',$('#nav').classList.contains('open'))};
$('#nav').querySelectorAll('a').forEach(a=>a.onclick=()=>{$('#nav').classList.remove('open');$('#navToggle').setAttribute('aria-expanded','false')});
field('year',String(new Date().getFullYear()));
async function load(){
  try{const resp=await fetch('/api/site',{cache:'no-store'});if(!resp.ok)throw Error('KV not configured');const data=await resp.json();apply(data.content)}
  catch{try{const resp=await fetch('/seed.json');apply(await resp.json())}catch(e){console.warn('Không tải được dữ liệu website',e)}}
}
load();
$('#leadForm').addEventListener('submit',async e=>{
  e.preventDefault();const form=e.currentTarget,status=$('#formStatus'),button=form.querySelector('button[type=submit]');
  button.disabled=true;status.textContent='Đang gửi yêu cầu...';status.style.color='#517080';
  try{
    const extras=(website.formQuestions||[]).map(q=>({label:q.label,value:$('#leadExtra [data-question-id="'+q.id+'"]')?.value||''}));
    const resp=await fetch('/api/leads',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:$('#leadName').value,phone:$('#leadPhone').value,note:$('#leadNote').value,consent:$('#leadConsent').checked,website:$('#leadWebsite').value,extras,page:location.pathname,utmSource:new URLSearchParams(location.search).get('utm_source')||'',utmCampaign:new URLSearchParams(location.search).get('utm_campaign')||''})});
    const data=await resp.json();if(!resp.ok||!data.ok)throw Error(data.error||'Không gửi được.');
    status.style.color='#216b56';status.textContent='✓ '+data.message;form.reset();
  }catch(err){status.style.color='#a43329';status.textContent=err.message+' Anh/chị có thể liên hệ trực tiếp qua Zalo hoặc điện thoại.'}
  finally{button.disabled=false}
});
