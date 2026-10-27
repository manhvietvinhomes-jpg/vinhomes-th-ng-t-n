import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
import {PAGE_CONTENT} from '../src/page-content.js';import {INITIAL_CONTENT} from '../src/seed.js';import worker,{normalize} from '../src/worker.js';import {renderSeo,injectHome,visibleUrls,DOMAIN} from '../src/seo.js';
test('every canonical route has a unique intent, reviewed lead, FAQ and real illustration',async()=>{
 const urls=visibleUrls(INITIAL_CONTENT),intents=new Set(),bodies=new Set();assert.equal(urls.length,96);
 for(const route of urls){
  const p=PAGE_CONTENT[route];assert.ok(p,route);assert.ok(p.seoTitle.length<=60,route);assert.ok(p.seoDescription.length<=160,route);
  assert.ok(!intents.has(p.intent),route);intents.add(p.intent);assert.ok(!bodies.has(p.body),route);bodies.add(p.body);
  const sentences=p.intro.split(/(?<=[.!?])\s+/).filter(Boolean);assert.ok(sentences.length>=2&&sentences.length<=3,route);
  assert.equal(p.faqs.length,3);for(const f of p.faqs){assert.ok(f.question&&f.answer);assert.ok(f.sources.length);for(const s of f.sources)assert.ok(s.label&&(s.url.startsWith('https://')||s.url.startsWith('/')))}
  assert.ok(p.links.length>=3&&p.links.length<=5);for(const l of p.links){assert.ok(urls.includes(l.href),route+': '+l.href);assert.ok(!/^(xem thêm|đọc tin)$/i.test(l.anchor));}
  const svg=await fs.readFile('public'+p.image,'utf8');assert.match(svg,/^<svg/);assert.match(svg,/<title/);assert.ok(!/<script|onload=|javascript:/.test(svg));
 }
});
test('rendered content, FAQ schema and source fragments agree on every route',async()=>{
 const template=await fs.readFile('public/index.html','utf8'),site=normalize(INITIAL_CONTENT);
 for(const route of visibleUrls(site)){
  const html=route==='/'?injectHome(template,site):renderSeo(route,site);assert.ok(html,route);
  const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>{const x=JSON.parse(m[1]);return x['@graph']||[x]});
  const faq=schemas.find(x=>x['@type']==='FAQPage');assert.equal(faq.mainEntity.length,3,route);
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1);assert.match(html,/Trang thông tin độc lập của Mạnh Việt/);
  for(const item of PAGE_CONTENT[route].faqs)for(const s of item.sources){const u=new URL(s.url,DOMAIN);if(u.pathname===route&&u.hash)assert.ok(html.includes('id="'+u.hash.slice(1)+'"'),route+' '+u.hash)}
 }
});
test('CMS round trip keeps FAQ source types, lead, intent and internal links',()=>{
 const site=normalize(INITIAL_CONTENT),again=normalize(site);assert.deepEqual(again,site);
 for(const item of [...again.pages,...again.posts.filter(x=>x.published!==false)]){assert.equal(item.faqs.length,3);assert.ok(item.intro);assert.ok(item.searchIntent);assert.ok(item.imageAlt);assert.equal(item.relatedLinks.length,4)}
});

test('CMS refuses published content that breaks the editorial contract before writing',async()=>{
 const db=new Map();const env={ADMIN_PASSWORD:'private-unit-test-password',OLYMPIC_KV:{get:async k=>db.get(k)||null,put:async(k,v)=>db.set(k,v),delete:async k=>db.delete(k)}};
 const headers={Origin:DOMAIN,'content-type':'application/json'};const login=await worker.fetch(new Request(DOMAIN+'/api/admin/login',{method:'POST',headers,body:JSON.stringify({password:env.ADMIN_PASSWORD})}),env);assert.equal(login.status,200);headers.Cookie=login.headers.get('set-cookie').split(';')[0];
 for(const edit of [p=>p.seoTitle='x'.repeat(61),p=>p.seoDescription='x'.repeat(161),p=>p.faqs=p.faqs.slice(0,2),p=>p.faqs[0].sources=[],p=>p.relatedLinks=p.relatedLinks.slice(0,2),p=>p.intro='Chỉ một câu.',p=>p.imageAlt='']){
  const content=normalize(INITIAL_CONTENT);edit(content.posts[0]);const response=await worker.fetch(new Request(DOMAIN+'/api/admin/content',{method:'PUT',headers,body:JSON.stringify(content)}),env);assert.equal(response.status,400);assert.ok(!db.has('site:content'));
 }
});
