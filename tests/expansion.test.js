import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import worker,{normalize} from '../src/worker.js';
import {INITIAL_CONTENT} from '../src/seed.js';
import {visibleUrls,renderSeo,injectHome} from '../src/seo.js';
const origin='https://vinhomesthuongtin.vn';
test('96 indexable URLs survive CMS normalization and repeated saves',()=>{
 const original=normalize(INITIAL_CONTENT),again=normalize(original);
 assert.equal(visibleUrls(original).length,96);
 assert.equal(original.posts.filter(p=>p.published).length,84);
 assert.deepEqual(again,original);
 for(const post of original.posts.filter(p=>p.id.startsWith('olympic-cam-nang-'))){
  assert.ok(post.content.length>800,post.slug);
  assert.equal(post.relatedSlugs.length,4);
  assert.ok(post.relatedSlugs.every(slug=>original.posts.some(x=>x.slug===slug)));
 }
});
test('existing KV edits and hidden articles are preserved without automatic reseeding',async()=>{
 const old={...INITIAL_CONTENT,heroTitle:'NỘI DUNG RIÊNG',posts:[{id:'custom',slug:'bai-tu-bien-tap',title:'Bài riêng',published:false}]};
 const env={OLYMPIC_KV:{get:async()=>old}};
 const response=await worker.fetch(new Request(origin+'/api/site'),env);
 const {content}=await response.json();assert.equal(content.heroTitle,'NỘI DUNG RIÊNG');
 assert.equal(content.posts.length,1);assert.equal(content.posts[0].published,false);
 assert.ok(!visibleUrls(content).includes('/tin-tuc/bai-tu-bien-tap/'));
});
test('admin is served before public single-segment routing and is never indexed',async()=>{
 const response=await worker.fetch(new Request(origin+'/admin/'),{ASSETS:{fetch:async()=>new Response('<form id="loginForm"></form>')}});
 assert.equal(response.status,200);assert.match(await response.text(),/loginForm/);
 assert.equal(response.headers.get('cache-control'),'no-store');assert.match(response.headers.get('x-robots-tag'),/noindex/);
});
test('home asset uses the root URL so Workers Assets cannot redirect index.html',async()=>{
 const home=await readFile(new URL('../public/index.html',import.meta.url),'utf8');
 const response=await worker.fetch(new Request(origin+'/'),{ASSETS:{fetch:async req=>{
  assert.equal(new URL(req.url).pathname,'/');return new Response(home);
 }}});
 const html=await response.text();assert.match(html,/<title>/);assert.match(html,/href="\/san-pham\/#biet-thu"/);
});
test('SSR honors edited home metadata and escapes hostile HTML in CMS content',async()=>{
 const home=await readFile(new URL('../public/index.html',import.meta.url),'utf8');
 const html=injectHome(home,{...INITIAL_CONTENT,siteName:'Tên riêng',brand:'Thương hiệu',seoTitle:'Tiêu đề tìm kiếm riêng',seoDescription:'Mô tả riêng'});
 assert.match(html,/<title>Tiêu đề tìm kiếm riêng<\/title>/);
 assert.match(html,/<meta name="description" content="Mô tả riêng">/);
 const site=normalize(INITIAL_CONTENT);site.posts[0].title='<script>alert(1)</script>';
 site.posts[0].image='https://images.example.com/photo.webp';
 const article=renderSeo('/tin-tuc/'+site.posts[0].slug+'/',site);
 assert.ok(!article.includes('<script>alert(1)</script>'));
 assert.ok(article.includes('content="https://images.example.com/photo.webp"'));
});
test('www, HTTP and missing slashes redirect to canonical destinations',async()=>{
 for(const [url,target] of [['https://www.vinhomesthuongtin.vn/vi-tri/?a=1',origin+'/vi-tri/?a=1'],['http://vinhomesthuongtin.vn/',origin+'/'],[origin+'/tin-tuc',origin+'/tin-tuc/'],[origin+'/san-pham/biet-thu',origin+'/san-pham/#biet-thu']]){
  const response=await worker.fetch(new Request(url),{});assert.equal(response.status,301);assert.equal(response.headers.get('location'),target);
 }
});
test('empty admin password returns 401 and counts as a failed attempt',async()=>{
 const db=new Map();const env={ADMIN_PASSWORD:'local-test-only-password',OLYMPIC_KV:{get:async k=>db.get(k)||null,put:async(k,v)=>db.set(k,v)}};
 const response=await worker.fetch(new Request(origin+'/api/admin/login',{method:'POST',headers:{origin,'content-type':'application/json'},body:'{"password":""}'}),env);
 assert.equal(response.status,401);assert.ok([...db.keys()].some(k=>k.startsWith('limit:auth:')));
});
