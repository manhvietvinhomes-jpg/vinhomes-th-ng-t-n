/** Dependency-free preflight for this Cloudflare Workers project. Wrangler performs the final bundle on deployment. */
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {INITIAL_CONTENT} from '../src/seed.js';
import {sitemap,visibleUrls} from '../src/seo.js';
const base=process.cwd(),routes=visibleUrls(INITIAL_CONTENT);
for(const file of ['src/worker.js','src/seo.js','src/seed.js','public/site.js','public/admin/admin.js'])execFileSync(process.execPath,['--check',path.join(base,file)],{stdio:'pipe'});
for(const file of ['public/index.html','public/site.css','public/seo.css','public/admin/index.html','public/admin/admin.css','public/assets/olympic-concept.webp','public/assets/waterfront.webp','public/assets/city.webp','public/assets/sport.webp'])if(!fs.existsSync(file))throw new Error('Thiếu file: '+file);
const slugs=INITIAL_CONTENT.pages.map(p=>p.slug);
if(new Set(slugs).size!==slugs.length)throw new Error('Slug bị trùng');
for(const p of INITIAL_CONTENT.pages){if(!p.title||!p.summary||!p.body||!p.seoTitle)throw new Error('Chưa đủ dữ liệu SEO: '+p.slug);if(p.status==='confirmed'&&!p.sourceUrl)throw new Error('Trang xác nhận chưa có URL nguồn: '+p.slug)}
fs.mkdirSync('dist',{recursive:true});
fs.writeFileSync('dist/sitemap-preview.xml',sitemap(INITIAL_CONTENT));
fs.writeFileSync('dist/build-report.json',JSON.stringify({builtAt:new Date().toISOString(),pages:routes.length,images:fs.readdirSync('public/assets',{withFileTypes:true}).reduce((sum,x)=>sum+(x.isDirectory()?fs.readdirSync('public/assets/'+x.name).length:1),0),worker:'royal-snow-1e06',note:'Đây là kiểm tra local; chỉ Wrangler deploy mới cập nhật website trực tuyến.'},null,2));
console.log(`✓ Preflight build: ${routes.length} URL, ${INITIAL_CONTENT.pages.length} trang chuyên đề/vận hành. Chưa triển khai lên Cloudflare.`);
