import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import worker from '../src/worker.js';
import {INITIAL_CONTENT} from '../src/seed.js';
import {sitemap,visibleUrls,slugify} from '../src/seo.js';
const host='https://vinhomesthuongtin.vn';
const env={
  ADMIN_PASSWORD:'PrivatePass123456789',
  OLYMPIC_KV:{async get(){return null}},
  ASSETS:{async fetch(r){
    const u=new URL(r.url), p=(u.pathname==='/'||u.pathname==='/index.html')?'public/index.html':'public'+u.pathname;
    return new Response(await readFile(new URL('../'+p,import.meta.url), 'utf8'),{headers:{'content-type':'text/html; charset=utf-8'}});
  }}
};
const get=async(path,base=host)=>worker.fetch(new Request(base+path),env);
test('SSR pages have unique canonical URLs, readable h1, and links',async()=>{
  for(const page of INITIAL_CONTENT.pages){
    const route='/'+page.slug+'/';const response=await get(route);assert.equal(response.status,200,route);
    const html=await response.text();
    assert.match(html,new RegExp('rel="canonical" href="'+host+route+'"'));
    assert.match(html,/<h1>/);assert.ok(html.includes(page.title));
    assert.ok(html.includes('application/ld+json'));assert.ok(html.includes('Thông tin'));
    assert.equal(response.headers.get('content-type'),'text/html; charset=utf-8');
  }
});
test('sitemap includes only published unique canonical URLs, robots protect admin',async()=>{
  const xml=await (await get('/sitemap.xml')).text();assert.ok(xml.includes(host+'/phap-ly/'));
  assert.ok(xml.includes(host+'/tin-tuc/vinhomes-olympic-thuong-tin-tong-quan/'));
  assert.ok(!xml.includes('/admin/'));
  const robots=await (await get('/robots.txt')).text();assert.match(robots,/Disallow: \/admin\//);assert.match(robots,/Sitemap: https:\/\/vinhomesthuongtin.vn\/sitemap.xml/);
});
test('root injects SEO links and readable edited content',async()=>{
  const res=await get('/');assert.equal(res.status,200);
  const html=await res.text();assert.match(html,/rel="canonical" href="https:\/\/vinhomesthuongtin.vn\/"/);
  assert.match(html,/href="\/gia-ban\/"/);assert.match(html,/~9.171 ha|Một tầm nhìn đô thị mới/);
});
test('nonexistent and hidden pages return correct status',async()=>{
  assert.equal((await get('/khong-co-trang/')).status,404);
  assert.equal((await get('/tin-tuc/sai-ten/')).status,404);
  assert.equal((await get('/gia-ban')).status,301);
  const copied=structuredClone(INITIAL_CONTENT);copied.pages[0].published=false;
  assert.ok(!visibleUrls(copied).includes('/tong-quan/'));
});
test('worker preview host is marked noindex',async()=>{
  const res=await get('/tong-quan/','https://royal-snow-1e06.manhvietvinhomes.workers.dev');
  assert.equal(res.headers.get('x-robots-tag'),'noindex, nofollow');
});
test('Vietnamese slugs are normalized',()=>assert.equal(slugify('Pháp lý Olympic – năm 2026'),'phap-ly-olympic-nam-2026'));
