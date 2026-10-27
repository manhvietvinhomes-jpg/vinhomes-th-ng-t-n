import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import worker from '../src/worker.js';
import {INITIAL_CONTENT} from '../src/seed.js';
import {visibleUrls} from '../src/seo.js';

const domain='https://vinhomesthuongtin.vn';
const env={
  ADMIN_PASSWORD:'private-local-test-password-not-live',
  OLYMPIC_KV:{async get(){return null}},
  ASSETS:{async fetch(req){return new Response(await readFile(new URL('../public/index.html',import.meta.url)),{headers:{'content-type':'text/html'}})}}
};
const recent=INITIAL_CONTENT.posts.filter(post=>/^olympic-guide-/.test(post.id));

test('all 10 Word articles have distinct posts, canonical URLs, evidence and optimized images',async()=>{
  assert.equal(recent.length,10);
  assert.equal(new Set(recent.map(p=>p.slug)).size,10);
  assert.equal(new Set(recent.map(p=>p.image)).size,10);
  for(const post of recent){
    assert.match(post.slug,/^[a-z0-9-]+$/);
    assert.ok((post.content.match(/^## /gm)||[]).length>=3);
    assert.equal(post.faqs.length,3);
    assert.ok(post.sources.length>=1);
    assert.ok(post.sources.every(s=>s.url.startsWith('https://')));
    assert.equal(post.published,true);
    assert.equal(post.status,'needs-verification');
    const imgFile=new URL('../public'+post.image,import.meta.url);
    assert.ok((await stat(imgFile)).size>1000);
    assert.match(await readFile(imgFile,'utf8'),/^<svg/);
    const route='/tin-tuc/'+post.slug+'/';
    const response=await worker.fetch(new Request(domain+route),env);
    assert.equal(response.status,200,route);
    const html=await response.text();
    assert.ok(html.includes('<h1>'+post.title+'</h1>'));
    assert.ok(html.includes('rel="canonical" href="'+domain+route+'"'));
    assert.ok(html.includes(post.image));
    assert.ok(html.includes('"@type":"Article"'));
    assert.ok(!html.includes('Nguồn đối chiếu:'));
    assert.ok(post.sources[0].url.startsWith('https://')); // Provenance retained in editorial data.
    assert.ok(html.includes('không phải bản vẽ hoặc phối cảnh chính thức'));
  }
});
test('news archive links to all 84 posts and sitemap contains the original 10',async()=>{
  const res=await worker.fetch(new Request(domain+'/tin-tuc/'),env);
  assert.equal(res.status,200);
  const html=await res.text();
  assert.ok(!html.includes('undefined'));
  assert.equal((html.match(/guide-card-image/g)||[]).length,84);
  const xml=await (await worker.fetch(new Request(domain+'/sitemap.xml'),env)).text();
  for(const post of recent)assert.ok(xml.includes(domain+'/tin-tuc/'+post.slug+'/'));
  assert.ok(visibleUrls(INITIAL_CONTENT).length>=26);
});
test('admin enables non-destructive import for previously saved KV content',async()=>{
  const admin=await readFile(new URL('../public/admin/admin.js',import.meta.url),'utf8');
  assert.ok(admin.includes("data-import-posts"));
  assert.ok(admin.includes("const have=new Set(S.data.posts.map(x=>x.slug))"));
  assert.ok(admin.includes("Bấm LƯU THAY ĐỔI"));
});
