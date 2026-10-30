import {contentWordCount,PILLAR_SLUGS} from './text.js';
import {ADMIN_PATH} from './admin-config.js';
import {EDITORIAL_REDIRECTS, UTILITY_SLUGS} from './journalism-release.js';
import {matchingStep} from './totp.js';
import { INITIAL_CONTENT } from './seed.js';
import { PRODUCT_REDIRECTS } from './editorial.js';
import { DOMAIN, slugify, renderSeo, sitemap, robots, injectHome } from './seo.js';

const enc = new TextEncoder();
const SESSION_COOKIE = 'mv_admin_session';
const SESSION_AGE = 8 * 60 * 60;
const MAX_JSON_BYTES = 3_000_000;
const MAX_IMAGE_BYTES = 1_700_000;

function reply(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), { status, headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store', 'x-content-type-options': 'nosniff', ...extraHeaders
  }});
}
function fail(message, status = 400) { return reply({ ok: false, error: message }, status); }
function good(data = {}, status = 200, headers = {}) { return reply({ ok: true, ...data }, status, headers); }
function str(v, max = 300) { return typeof v === 'string' ? v.trim().slice(0, max) : ''; }
function cleanUrl(value) {
  const v = str(value, 450);
  if (!v) return '';
  if (/^\/(assets|media)\/[a-zA-Z0-9_./-]+$/.test(v) && !v.includes('..')) return v;
  try { const u = new URL(v); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; }
  catch { return ''; }
}
function editorialFields(x){
 return {intro:str(x?.intro,850),searchIntent:str(x?.searchIntent,220),imageAlt:str(x?.imageAlt,450),imageCaption:str(x?.imageCaption,400),
  faqs:Array.isArray(x?.faqs)?x.faqs.slice(0,6).map(f=>({question:str(f?.question,250),answer:str(f?.answer,1500),sources:Array.isArray(f?.sources)?f.sources.slice(0,4).map(s=>({label:str(s?.label,300),url:typeof s?.url==='string'&&/^\/(?:[a-z0-9-]+\/)*(?:#[a-z0-9-]+)?$/.test(s.url)?s.url:cleanUrl(s?.url),kind:s?.kind==='document'?'document':'editorial'})).filter(s=>s.label&&s.url):[]})).filter(f=>f.question&&f.answer):[],
  relatedLinks:Array.isArray(x?.relatedLinks)?x.relatedLinks.slice(0,6).map(l=>({href:typeof l?.href==='string'&&/^\/(?:[a-z0-9-]+\/)*$/.test(l.href)?l.href:'',anchor:str(l?.anchor,220)})).filter(l=>l.href&&l.anchor):[]};
}
function normalize(source) {
  const obj = source && typeof source === 'object' && !Array.isArray(source) ? source : {};
  const out = structuredClone(INITIAL_CONTENT);
  const fields = ['siteName','brand','badge','heroTitle','heroAccent','heroSubtitle','heroNote','overviewTitle','overviewText','locationTitle','locationText','advisorName','advisorTitle','advisorBio','phone','contactTitle','contactText','formNameLabel','formPhoneLabel','formNoteLabel','formSubmitText','formConsentText','seoDescription','seoTitle','heroHeadingDetail','homeIntro','independentDisclaimer'];
  for (const field of fields) if (Object.hasOwn(obj,field)) out[field] = str(obj[field], field.endsWith('Text') || field.endsWith('Disclaimer') ? 4000 : 380);
  for (const field of ['heroImage','advisorPhoto','zalo','facebook']) if (Object.hasOwn(obj,field)) out[field] = cleanUrl(obj[field]);
  if (Array.isArray(obj.formQuestions)) out.formQuestions = obj.formQuestions.slice(0,5).map(x=>({id:str(x?.id,70)||crypto.randomUUID(),label:str(x?.label,150),placeholder:str(x?.placeholder,160),required:!!x?.required}));
  if (Array.isArray(obj.stats)) out.stats = obj.stats.slice(0,6).map(x=>({number:str(x?.number,90),label:str(x?.label,130)}));
  if (Array.isArray(obj.amenities)) out.amenities = obj.amenities.slice(0,12).map(x=>({icon:str(x?.icon,6),title:str(x?.title,100),description:str(x?.description,380)}));
  if (Array.isArray(obj.priceRows))out.priceRows=obj.priceRows.slice(0,80).map(x=>({
    id:str(x?.id,70)||crypto.randomUUID(),product:str(x?.product,170),area:str(x?.area,140),price:str(x?.price,160),
    verified:x?.verified===true,sourceUrl:cleanUrl(x?.sourceUrl),updated:str(x?.updated,30)
  }));
  if (Array.isArray(obj.pages)) {
    const slugs=new Set();
    out.pages=obj.pages.slice(0,25).map(x=>({
      ...editorialFields(x),slug:str(x?.slug,80).toLowerCase().replace(/[^a-z0-9-]/g,''),
      title:str(x?.title,180),summary:str(x?.summary,850),keyword:str(x?.keyword,130),
      body:str(x?.body,28000),image:cleanUrl(x?.image),status:['confirmed','needs-verification','pending'].includes(x?.status)?x.status:'pending',
      sourceLabel:str(x?.sourceLabel,250),sourceUrl:cleanUrl(x?.sourceUrl),updated:str(x?.updated,30),
      seoTitle:str(x?.seoTitle,200),seoDescription:str(x?.seoDescription,300),published:x?.published!==false
    })).filter(x=>{
      if(!x.slug||['admin','api','media','tin-tuc','chinh-sach-bao-mat','sitemap','robots'].includes(x.slug)||slugs.has(x.slug))return false;
      slugs.add(x.slug);return true;
    });
  }
  if (Array.isArray(obj.products)) out.products = obj.products.slice(0,50).map(x=>({
    id: str(x?.id,70) || crypto.randomUUID(), title:str(x?.title,130),type:str(x?.type,80),
    short:str(x?.short,450),detail:str(x?.detail,5000),image:cleanUrl(x?.image),slug:slugify(x?.slug||x?.title),published:x?.published!==false
  }));
  if (Array.isArray(obj.gallery)) out.gallery = obj.gallery.slice(0,100).map(x=>({id:str(x?.id,70)||crypto.randomUUID(),title:str(x?.title,160),image:cleanUrl(x?.image)}));
  if (Array.isArray(obj.posts)) out.posts = obj.posts.slice(0,500).map(x=>({
    ...editorialFields(x),id:str(x?.id,70)||crypto.randomUUID(),title:str(x?.title,200),date:str(x?.date,30),
    updated:str(x?.updated,30),eventDate:str(x?.eventDate,30),excerpt:str(x?.excerpt,700),content:str(x?.content,28000),image:cleanUrl(x?.image),slug:slugify(x?.slug||x?.title),published:x?.published!==false,
    seoTitle:str(x?.seoTitle,200),seoDescription:str(x?.seoDescription,300),keyword:str(x?.keyword,130),
    status:['confirmed','needs-verification','pending'].includes(x?.status)?x.status:'needs-verification',
    articleNote:str(x?.articleNote,380),topic:str(x?.topic,60),category:str(x?.category,100),
    relatedSlugs:Array.isArray(x?.relatedSlugs)?[...new Set(x.relatedSlugs.map(slugify))].slice(0,8):[],
    sources:Array.isArray(x?.sources)?x.sources.slice(0,8).map(r=>({label:str(r?.label,280),url:cleanUrl(r?.url)})).filter(r=>r.label&&r.url):[]
  }));
  return out;
}
async function readLimitedText(req, max=MAX_JSON_BYTES) {
  const length = Number(req.headers.get('content-length') || '0');
  if (length > max) throw new Error('Dữ liệu quá lớn.');
  if (!req.body) return '';
  const chunks=[]; let total=0;
  const reader=req.body.getReader();
  while (true) {
    const {done,value}=await reader.read(); if (done) break;
    total += value.byteLength;
    if (total > max) { await reader.cancel(); throw new Error('Dữ liệu quá lớn.'); }
    chunks.push(value);
  }
  const result=new Uint8Array(total);let cursor=0;
  for (const chunk of chunks){result.set(chunk,cursor);cursor+=chunk.byteLength;}
  return new TextDecoder().decode(result);
}
async function readJson(req,max=MAX_JSON_BYTES) {
  const raw=await readLimitedText(req,max);
  try { return JSON.parse(raw); } catch { throw new Error('Định dạng dữ liệu không hợp lệ.'); }
}
async function key(password) {
  return crypto.subtle.importKey('raw',enc.encode(password),{name:'HMAC',hash:'SHA-256'},false,['sign']);
}
function toHex(array) { return [...new Uint8Array(array)].map(x=>x.toString(16).padStart(2,'0')).join(''); }
async function signature(secret,msg) {return toHex(await crypto.subtle.sign('HMAC',await key(secret),enc.encode(msg)));}
function equalStr(a,b) {
  const aa=enc.encode(a), bb=enc.encode(b);
  if (aa.length!==bb.length) return false;
  let diff=0;for(let i=0;i<aa.length;i++)diff|=aa[i]^bb[i];return diff===0;
}
function cookie(req,name) {
  const match=(req.headers.get('cookie')||'').match(new RegExp('(?:^|;\\s*)'+name+'=([^;]+)'));
  return match ? match[1] : '';
}
async function authenticated(req,env) {
  if (!env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.length < 12) return false;
  const token=cookie(req,SESSION_COOKIE), parts=token.split('.');
  if (parts.length!==2 || !/^\d{13}$/.test(parts[0]) || !/^[0-9a-f]{64}$/.test(parts[1]))return false;
  const expires=Number(parts[0]);
  if (expires < Date.now() || expires > Date.now()+SESSION_AGE*1000+60_000) return false;
  const expected=await signature(env.ADMIN_PASSWORD,`v1:${expires}`);
  return equalStr(expected,parts[1]);
}
function secureSameOrigin(req) {
  const origin=req.headers.get('origin');
  return origin===new URL(req.url).origin;
}
async function site(env) {
  const data=await env.OLYMPIC_KV.get('site:content','json');
  return data ? normalize(data) : normalize(INITIAL_CONTENT);
}
function clientIp(req) {return req.headers.get('cf-connecting-ip') || 'unknown';}
async function hashedIp(req,env) {return (await signature(env.ADMIN_PASSWORD||'rate-public',clientIp(req))).slice(0,20);}
async function rateLimit(env,keyName,limit,ttl) {
  const current=Number(await env.OLYMPIC_KV.get(keyName) || '0');
  if(current>=limit) return false;
  await env.OLYMPIC_KV.put(keyName,String(current+1),{expirationTtl:ttl});
  return true;
}
async function readLeads(env,limit=250) {
  const out=[]; let cursor=undefined;
  do {
    const list=await env.OLYMPIC_KV.list({prefix:'lead:',limit:1000,...(cursor ? {cursor}: {})});
    for(const item of list.keys){const val=await env.OLYMPIC_KV.get(item.name,'json');if(val)out.push(val);if(out.length>=limit)break;}
    if (out.length>=limit || list.list_complete)break;
    cursor=list.cursor;
  } while(cursor);
  return out.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
}
async function readMedia(env) {
  const names=[];let cursor;
  do {
    const page=await env.OLYMPIC_KV.list({prefix:'media:',limit:1000,...(cursor?{cursor}:{})});
    for(const item of page.keys) if(item.metadata)names.push({...item.metadata,url:'/media/'+item.name.slice(6)});
    if(page.list_complete||names.length>=500)break;
    cursor=page.cursor;
  }while(cursor);
  return names.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
}
function imageMime(bytes,claimed) {
  if(claimed==='image/jpeg' && bytes[0]===0xff && bytes[1]===0xd8 && bytes[2]===0xff)return claimed;
  if(claimed==='image/png' && bytes[0]===0x89 && bytes[1]===0x50 && bytes[2]===0x4e && bytes[3]===0x47)return claimed;
  if(claimed==='image/webp' && String.fromCharCode(...bytes.slice(0,4))==='RIFF' && String.fromCharCode(...bytes.slice(8,12))==='WEBP')return claimed;
  return null;
}
async function publicLead(req,env) {
  const body=await readJson(req,6000);
  if (body.website) return good({message:'Cảm ơn bạn.'}); // Honeypot.
  const name=str(body.name,90),phone=str(body.phone,25),note=str(body.note,600);
  const refPage=str(body.page,150),utmSource=str(body.utmSource,100),utmCampaign=str(body.utmCampaign,100);
  const extras=Array.isArray(body.extras)?body.extras.slice(0,5).map(x=>str(x?.label,100)+': '+str(x?.value,180)).join(' | '):'';
  if(name.length<2 || !/^[+0-9().\s-]{9,22}$/.test(phone) || !body.consent)return fail('Vui lòng nhập họ tên, số điện thoại hợp lệ và đồng ý liên hệ.');
  const hash=await hashedIp(req,env);
  if(!(await rateLimit(env,`limit:lead:${hash}`,4,3600)))return fail('Bạn đã gửi nhiều yêu cầu. Vui lòng thử lại sau.',429);
  const id=crypto.randomUUID();
  await env.OLYMPIC_KV.put('lead:'+id,JSON.stringify({id,name,phone,note:(note+(extras?' | '+extras:'')).slice(0,1500),refPage,utmSource,utmCampaign,createdAt:new Date().toISOString()}));
  return good({message:'Đã nhận yêu cầu. Mạnh Việt sẽ liên hệ với anh/chị.'});
}
async function api(request,env) {
  const u=new URL(request.url), p=u.pathname,method=request.method;
  if (!env.OLYMPIC_KV)return fail('Chưa thiết lập kho dữ liệu Cloudflare KV. Xem HƯỚNG-DẪN.txt.',503);
  if(p==='/api/site'&&method==='GET'){const content=await site(env);content.posts=content.posts.filter(x=>x.published!==false).map(({content,faqs,sources,...p})=>p);content.pages=content.pages.filter(x=>x.published!==false).map(({body,faqs,...p})=>p);return good({content});}
  if(p==='/api/leads'&&method==='POST')return publicLead(request,env);
  if(!p.startsWith('/api/admin/'))return fail('Không tìm thấy.',404);
  if(!(await authenticated(request,env)))return fail('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',401);
  if(method!=='GET'&&!secureSameOrigin(request))return fail('Yêu cầu không hợp lệ.',403);
  if(p==='/api/admin/me'&&method==='GET')return good({loggedIn:true});
  if(p==='/api/admin/content'&&method==='GET')return good({content:await site(env)});
  if(p==='/api/admin/content'&&method==='PUT') {
    const body=await readJson(request);
    if(Array.isArray(body.posts)&&body.posts.length>500)return fail('Tối đa 500 bài viết. Hãy lưu trữ bớt bản nháp trước khi thêm.',413);
    const clean=normalize(body);
    for(const item of [...clean.pages,...clean.posts].filter(x=>x.published!==false)){
      const title=item.seoTitle||item.title,description=item.seoDescription||item.summary||item.excerpt||'';
      if([...title].length>60||[...description].length>160)return fail('Tiêu đề SEO tối đa 60 ký tự, mô tả tối đa 160 ký tự: '+item.slug);
      const leadSentences=(item.intro||'').split(/(?<=[.!?])\s+/).filter(Boolean);
      if(leadSentences.length<2||leadSentences.length>4||!item.searchIntent)return fail('Cần ý định riêng và mở đầu trả lời trực tiếp bằng 2–4 câu: '+item.slug);
      if(PILLAR_SLUGS.includes(item.slug)){const words=contentWordCount(item.body);if(words<1800||words>2500)return fail('Trang trụ cột cần 1.800–2.500 từ hiển thị: '+item.slug);}
      if(!item.image||!item.imageAlt)return fail('Cần ảnh minh họa và mô tả ảnh: '+item.slug);
      if(!UTILITY_SLUGS.includes(item.slug)&&(item.faqs?.length<5||item.faqs?.length>6||item.faqs.some(f=>!f.sources.length||f.sources.some(z=>z.kind!=='document'||!z.url.startsWith('https://')))))return fail('Bài thông tin cần 5–6 FAQ dẫn tài liệu bên ngoài: '+item.slug);
      if(item.relatedLinks?.length<4||item.relatedLinks?.length>6)return fail('Mỗi nội dung xuất bản cần 4–6 liên kết mô tả: '+item.slug);
    }
    await env.OLYMPIC_KV.put('site:content',JSON.stringify(clean));
    return good({content:clean,message:'Đã lưu nội dung.'});
  }
  if(p==='/api/admin/leads'&&method==='GET')return good({leads:await readLeads(env)});
  if(p.startsWith('/api/admin/leads/')&&method==='DELETE') {
    const id=p.slice('/api/admin/leads/'.length);
    if(!/^[0-9a-f-]{36}$/.test(id))return fail('Mã không hợp lệ.');
    await env.OLYMPIC_KV.delete('lead:'+id);return good({deleted:id});
  }
  if(p==='/api/admin/media'&&method==='GET')return good({media:await readMedia(env)});
  if(p==='/api/admin/upload'&&method==='POST') {
    const length=Number(request.headers.get('content-length')||'0');
    if(length>MAX_IMAGE_BYTES+50_000)return fail('Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn 1,6 MB.',413);
    const form=await request.formData(),file=form.get('file');
    if(!(file instanceof File))return fail('Chưa chọn ảnh.');
    if(file.size>MAX_IMAGE_BYTES||file.size<20)return fail('Ảnh phải nhỏ hơn 1,6 MB.',413);
    const bytes=new Uint8Array(await file.arrayBuffer());
    const mime=imageMime(bytes,file.type);
    if(!mime)return fail('Chỉ nhận ảnh JPG, PNG hoặc WebP hợp lệ.');
    const id=crypto.randomUUID();
    const metadata={id,name:str(file.name,110),mime,bytes:file.size,createdAt:new Date().toISOString()};
    await env.OLYMPIC_KV.put('media:'+id,bytes,{metadata});
    return good({media:{...metadata,url:'/media/'+id}});
  }
  if(p.startsWith('/api/admin/media/')&&method==='DELETE') {
    const id=p.slice('/api/admin/media/'.length);
    if(!/^[0-9a-f-]{36}$/.test(id))return fail('Mã không hợp lệ.');
    const serialized=JSON.stringify(await site(env));
    if(serialized.includes('/media/'+id))return fail('Ảnh đang được sử dụng trên website. Hãy thay ảnh trước khi xóa.',409);
    await env.OLYMPIC_KV.delete('media:'+id);return good({deleted:id});
  }
  return fail('Đường dẫn không tồn tại.',404);
}
async function apiWithCookies(req,env){
  const url=new URL(req.url);
  if(url.pathname==='/api/admin/login'&&req.method==='POST'){
    // Managed here to ensure cookie attributes are set explicitly and never exposed to JS.
    if(!secureSameOrigin(req))return fail('Yêu cầu không hợp lệ.',403);
    if(!env.OLYMPIC_KV)return fail('Chưa thiết lập KV.',503);
    if(!env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.length<12)return fail('Chưa thiết lập mật khẩu quản trị.',503);
    let body;try{body=await readJson(req,3000)}catch(e){return fail(e.message);}
    const identity=await hashedIp(req,env), keyName='limit:auth:'+identity;
    if(Number(await env.OLYMPIC_KV.get(keyName)||'0')>=10)return fail('Bạn đã thử nhiều lần. Vui lòng đợi khoảng một giờ.',429);
    const password=str(body.password,300);
    let ok=password.length>0&&equalStr(await signature(env.ADMIN_PASSWORD,'verify'),await signature(password,'verify'));
    let totpStep=null;
    if(env.ADMIN_TOTP_SECRET){try{totpStep=ok?await matchingStep(env.ADMIN_TOTP_SECRET,str(body.otp,6)):null;const last=Number(await env.OLYMPIC_KV.get('auth:last-totp-step')||'0');ok=ok&&totpStep!==null&&totpStep>last;}catch{return fail('Cấu hình xác thực chưa hợp lệ.',503);}}
    if(!ok){await rateLimit(env,keyName,10,3600);return fail('Mật khẩu hoặc mã xác thực không đúng.',401);}
    if(totpStep!==null)await env.OLYMPIC_KV.put('auth:last-totp-step',String(totpStep),{expirationTtl:120});
    await env.OLYMPIC_KV.delete(keyName);
    const expiry=Date.now()+SESSION_AGE*1000;
    const token=`${expiry}.${await signature(env.ADMIN_PASSWORD,`v1:${expiry}`)}`;
    return good({message:'Đăng nhập thành công.'},200,{'set-cookie':`${SESSION_COOKIE}=${token}; Max-Age=${SESSION_AGE}; HttpOnly; Secure; SameSite=Strict; Path=/`});
  }
  if(url.pathname==='/api/admin/logout'&&req.method==='POST'){
    if(!secureSameOrigin(req))return fail('Yêu cầu không hợp lệ.',403);
    return good({message:'Đã đăng xuất.'},200,{'set-cookie':`${SESSION_COOKIE}=; Max-Age=0; HttpOnly; Secure; SameSite=Strict; Path=/`});
  }
  try{return await api(req,env);}catch(e){
    const safe = e instanceof Error && /Dữ liệu quá lớn|Định dạng dữ liệu/.test(e.message) ? e.message : 'Thao tác chưa thực hiện được. Vui lòng thử lại.';
    return fail(safe, safe.includes('thử lại') ? 500 : 400);
  }
}
function notFound(request){return new Response(request.method==='HEAD'?null:'<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Không tìm thấy trang | Mạnh Việt</title><link rel="stylesheet" href="/site.css"></head><body><main class="container" style="padding:80px 20px"><h1>Không tìm thấy trang</h1><p>Đường dẫn có thể đã thay đổi. Chọn chuyên đề phù hợp để tiếp tục.</p><nav aria-label="Trang chính"><a href="/">Trang chủ</a> · <a href="/tong-quan/">Tổng quan Olympic</a> · <a href="/vi-tri/">Vị trí</a> · <a href="/phap-ly/">Pháp lý</a> · <a href="/tin-tuc/">Tin theo ngày nguồn</a></nav></main></body></html>',{status:404,headers:{'content-type':'text/html; charset=utf-8','x-robots-tag':'noindex, follow','x-content-type-options':'nosniff','x-frame-options':'DENY'}})}
export default {
  async fetch(request,env) {
    const url=new URL(request.url);
    const rawPath=url.pathname,slashPath=/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)?$/.test(rawPath)&&!rawPath.startsWith('/api/')&&!rawPath.startsWith('/media/')?rawPath+'/':rawPath;
    const target=PRODUCT_REDIRECTS[slashPath]||EDITORIAL_REDIRECTS[slashPath]||slashPath;
    if((request.method==='GET'||request.method==='HEAD')&&(url.hostname==='www.vinhomesthuongtin.vn'||(url.hostname==='vinhomesthuongtin.vn'&&url.protocol==='http:')||target!==rawPath)){const next=new URL(DOMAIN+target);next.search=url.search;return Response.redirect(next.href,301);}
    if(url.pathname.startsWith('/api/'))return apiWithCookies(request,env);
    if(rawPath==='/admin/'||rawPath.startsWith('/admin/'))return notFound(request);
    if(rawPath.startsWith(ADMIN_PATH)){
      const relative=rawPath.slice(ADMIN_PATH.length);if(!['','admin.js','admin.css'].includes(relative))return notFound(request);
      const assetRequest=new Request(new URL('/admin/'+relative,request.url),request);const response=await env.ASSETS.fetch(assetRequest);
      const copy=new Response(request.method==='HEAD'?null:response.body,response);copy.headers.set('x-robots-tag','noindex, nofollow');copy.headers.set('cache-control','no-store');copy.headers.set('x-frame-options','DENY');copy.headers.set('x-content-type-options','nosniff');return copy;
    }
    // Public pages are rendered on the server, so search engines receive readable text without JS.
    if((request.method==='GET'||request.method==='HEAD') && (/^\/[a-z0-9-]+\/$/.test(url.pathname)||url.pathname==='/'||url.pathname==='/sitemap.xml'||url.pathname==='/robots.txt'||/^\/(tin-tuc|san-pham)\/[a-z0-9-]+\/$/.test(url.pathname))) {
      const content=env.OLYMPIC_KV ? await site(env) : normalize(INITIAL_CONTENT);
      const noindex=url.hostname!=='vinhomesthuongtin.vn'?'noindex, nofollow':'index, follow';
      const headers={'x-frame-options':'DENY','referrer-policy':'strict-origin-when-cross-origin','permissions-policy':'camera=(), microphone=()','x-content-type-options':'nosniff','x-robots-tag':noindex,'cache-control':'public,max-age=120'};
      if(url.pathname==='/robots.txt')return new Response(request.method==='HEAD'?null:robots(),{headers:{...headers,'content-type':'text/plain; charset=utf-8'}});
      if(url.pathname==='/sitemap.xml')return new Response(request.method==='HEAD'?null:sitemap(content),{headers:{...headers,'content-type':'application/xml; charset=utf-8'}});
      if(url.pathname==='/') {
        const asset=await env.ASSETS.fetch(new Request(new URL('/',request.url),request));
        if(!asset.ok)return new Response('Chưa tải được trang chủ',{status:503,headers:{'x-robots-tag':'noindex'}});
        const html=injectHome(await asset.text(),content);
        return new Response(request.method==='HEAD'?null:html,{headers:{...headers,'content-type':'text/html; charset=utf-8'}});
      }
      if(/^\/san-pham\/[a-z0-9-]+\/$/.test(url.pathname))headers['x-robots-tag']='noindex, follow';
      const html=renderSeo(url.pathname,content);
      return html?new Response(request.method==='HEAD'?null:html,{headers:{...headers,'content-type':'text/html; charset=utf-8'}}):notFound(request);
    }
    if(/^\/(tin-tuc|san-pham)\/[a-z0-9-]+$/.test(url.pathname)||url.pathname==='/tin-tuc'||/^\/(tong-quan|vi-tri|quy-hoach|san-pham|gia-ban|mat-bang|tien-do|phap-ly|so-sanh|chinh-sach-bao-mat)$/.test(url.pathname)){
      return Response.redirect(new URL(url.pathname+'/',DOMAIN),301);
    }
    if(url.pathname.startsWith('/media/')){
      if(request.method!=='GET'&&request.method!=='HEAD')return fail('Không được hỗ trợ.',405);
      const id=url.pathname.slice(7);
      if(!/^[0-9a-f-]{36}$/.test(id)||!env.OLYMPIC_KV)return new Response('Not found',{status:404});
      const result=await env.OLYMPIC_KV.getWithMetadata('media:'+id,'arrayBuffer');
      if(!result.value)return new Response('Not found',{status:404});
      return new Response(request.method==='HEAD'?null:result.value,{headers:{'content-type':result.metadata?.mime||'application/octet-stream','cache-control':'public,max-age=31536000,immutable','x-content-type-options':'nosniff'}});
    }
    const response=await env.ASSETS.fetch(request);return response.status===404?notFound(request):response;
  }
};
export { normalize, imageMime };
