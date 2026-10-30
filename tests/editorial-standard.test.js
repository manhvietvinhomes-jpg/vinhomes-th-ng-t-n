import {contentWordCount} from '../src/text.js';
import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
import {PAGE_CONTENT} from '../src/page-content.js';import {INITIAL_CONTENT} from '../src/seed.js';import worker,{normalize} from '../src/worker.js';import {renderSeo,injectHome,visibleUrls,DOMAIN} from '../src/seo.js';import {UTILITY_SLUGS} from '../src/journalism-release.js';
const needsFaq=r=>r!=='/tin-tuc/'&&r!=='/chinh-sach-bao-mat/'&&!UTILITY_SLUGS.some(s=>r==='/'+s+'/');
test('every current route has distinct intent, correct metadata, working links and evidence',async()=>{
 const urls=visibleUrls(INITIAL_CONTENT),intents=new Set(),bodies=new Set();assert.equal(urls.length,20);
 for(const route of urls){const p=PAGE_CONTENT[route];assert.ok(p,route);assert.ok(p.seoTitle.length<=60,route);assert.ok(p.seoDescription.length<=160,route);assert.ok(!intents.has(p.intent),route);intents.add(p.intent);assert.ok(!bodies.has(p.body),route);bodies.add(p.body);
 const sentences=p.intro.split(/(?<=[.!?])\s+/).filter(Boolean);assert.ok(sentences.length>=2&&sentences.length<=4,route);
 if(needsFaq(route)){assert.equal(p.faqs.length,5);for(const f of p.faqs){assert.ok(f.question&&f.answer);assert.ok(f.sources.length);for(const s of f.sources){assert.equal(s.kind,'document');assert.ok(s.url.startsWith('https://'));assert.ok(!s.url.startsWith(DOMAIN));}}}
 assert.equal(p.links.length,4);for(const l of p.links){assert.ok(urls.includes(l.href),route+': '+l.href);assert.notEqual(route,l.href);assert.ok(!/^(xem thêm|đọc tin)$/i.test(l.anchor));}
 if(route!=='/'){const webp=await fs.readFile('public'+p.image);assert.equal(webp.subarray(0,4).toString(),'RIFF');assert.equal(webp.subarray(8,12).toString(),'WEBP');assert.ok(webp.length<100_000);}
 }
});
test('visible FAQ/schema agree and article sources are outside the site',async()=>{
 const template=await fs.readFile('public/index.html','utf8'),site=normalize(INITIAL_CONTENT);
 for(const route of visibleUrls(site)){const html=route==='/'?injectHome(template,site):renderSeo(route,site);assert.ok(html,route);const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>{const x=JSON.parse(m[1]);return x['@graph']||[x]});
 const faq=schemas.find(x=>x['@type']==='FAQPage');if(needsFaq(route)){assert.equal(faq.mainEntity.length,5,route);for(const f of faq.mainEntity)assert.ok(html.includes(f.acceptedAnswer.text));}else assert.ok(!faq);
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1);assert.ok(schemas.some(x=>x['@type']==='Organization'));assert.ok(!html.includes('href="/admin/"'));assert.equal((html.match(/class="container page-notice"/g)||[]).length,1);
 }
});
test('CMS round trip preserves archived originals, new events, source types and expanded bodies',()=>{
 const site=normalize(INITIAL_CONTENT),again=normalize(site);assert.deepEqual(again,site);assert.equal(site.posts.filter(x=>x.published).length,4);assert.equal(site.posts.filter(x=>!x.published).length,85);
 for(const p of site.pages.filter(p=>!UTILITY_SLUGS.includes(p.slug))){const count=contentWordCount(p.body);assert.ok(count>=1800&&count<=2500,p.slug);assert.equal(p.faqs.length,5);assert.equal(p.relatedLinks.length,4);assert.ok(p.body.includes('[MẠNH VIỆT BỔ SUNG:'));}
});
test('CMS refuses content without external FAQ evidence or required editorial fields',async()=>{
 const db=new Map();const env={ADMIN_PASSWORD:'private-unit-test-password',OLYMPIC_KV:{get:async k=>db.get(k)||null,put:async(k,v)=>db.set(k,v),delete:async k=>db.delete(k)}};
 const headers={Origin:DOMAIN,'content-type':'application/json'};const login=await worker.fetch(new Request(DOMAIN+'/api/admin/login',{method:'POST',headers,body:JSON.stringify({password:env.ADMIN_PASSWORD})}),env);assert.equal(login.status,200);headers.Cookie=login.headers.get('set-cookie').split(';')[0];
 for(const edit of [p=>p.seoTitle='x'.repeat(61),p=>p.seoDescription='x'.repeat(161),p=>p.faqs=p.faqs.slice(0,4),p=>p.faqs[0].sources=[],p=>p.faqs[0].sources=[{label:'Own article',url:'/tong-quan/',kind:'editorial'}],p=>p.relatedLinks=p.relatedLinks.slice(0,3),p=>p.intro='Chỉ một câu.',p=>p.imageAlt='']){const content=normalize(INITIAL_CONTENT);edit(content.posts.find(p=>p.published));const response=await worker.fetch(new Request(DOMAIN+'/api/admin/content',{method:'PUT',headers,body:JSON.stringify(content)}),env);assert.equal(response.status,400);assert.ok(!db.has('site:content'));}
 const thin=normalize(INITIAL_CONTENT);thin.pages[0].body='## Rút gọn\nMỏng.';const rejected=await worker.fetch(new Request(DOMAIN+'/api/admin/content',{method:'PUT',headers,body:JSON.stringify(thin)}),env);assert.equal(rejected.status,400);assert.ok(!db.has('site:content'));
});

test('visible word count excludes headings and table delimiters',()=>{assert.equal(contentWordCount('## Một tiêu đề\n\n| Cột một | Cột hai |\n|---|---|\n| Giá trị | Dữ liệu |'),11)});
