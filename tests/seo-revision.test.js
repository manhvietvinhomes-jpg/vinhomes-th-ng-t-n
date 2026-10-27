import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
import worker,{normalize} from '../src/worker.js';import {INITIAL_CONTENT} from '../src/seed.js';import {injectHome,visibleUrls,renderSeo,DOMAIN} from '../src/seo.js';import {HOME_SEO_TITLE,PRODUCT_REDIRECTS,VERIFIED_SOURCES} from '../src/editorial.js';
test('home has searchable H1 text, original document links and gallery without JavaScript',async()=>{
 const html=injectHome(await fs.readFile('public/index.html','utf8'),normalize(INITIAL_CONTENT));
 assert.ok(html.includes('<title>'+HOME_SEO_TITLE+'</title>'));
 const h1=html.match(/<h1>([\s\S]*?)<\/h1>/)[1].replace(/<[^>]*>/g,'').replace(/\s+/g,' ');
 assert.equal(h1,'Vinhomes Olympic Thường Tín – Đô thị thể thao phía Nam Hà Nội');
 assert.ok(html.includes('id="gallery"><figure'));assert.ok(html.includes('width="1000" height="720"'));
 for(const source of VERIFIED_SOURCES)assert.ok(html.includes(source.url));
 assert.ok(!html.includes('16.093'));assert.ok(!/href="#"/.test(html));
 const faq=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'].find(x=>x['@type']==='FAQPage');
 assert.equal(faq.mainEntity.length,3);for(const item of faq.mainEntity)assert.ok(html.includes(item.acceptedAnswer.text));
});
test('concept product URLs redirect once and are excluded from the sitemap',async()=>{
 const urls=visibleUrls(INITIAL_CONTENT);assert.equal(urls.length,96);
 for(const [from,to] of Object.entries(PRODUCT_REDIRECTS)){
  assert.ok(!urls.includes(from));const response=await worker.fetch(new Request(DOMAIN+from+'?utm_source=test'),{});
  const expected=new URL(DOMAIN+to);expected.search='?utm_source=test';assert.equal(response.status,301);assert.equal(response.headers.get('location'),expected.href);
  const parent=renderSeo(expected.pathname,INITIAL_CONTENT);assert.ok(parent);if(expected.hash)assert.ok(parent.includes('id="'+expected.hash.slice(1)+'"'));
 }
});
test('analysis articles have a distinct intent, link to a pillar and preserve publication dates',()=>{
 for(const id of ['olympic-guide-01','olympic-guide-02','olympic-guide-03','olympic-guide-06']){
  const post=INITIAL_CONTENT.posts.find(x=>x.id===id),pillar=INITIAL_CONTENT.pages.find(x=>x.slug===post.topic);
  const html=renderSeo('/tin-tuc/'+post.slug+'/',normalize(INITIAL_CONTENT));
  assert.notEqual(post.title,pillar.title);assert.ok(html.includes('class="article-parent"'));assert.ok(html.includes('href="/'+pillar.slug+'/"'));
  const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const article=graph.find(x=>x['@type']==='Article');assert.equal(article.datePublished,'2026-10-21');assert.equal(article.dateModified,'2026-10-27');
 }
});

test('the consolidated product pillar remains indexable',async()=>{
 const response=await worker.fetch(new Request(DOMAIN+'/san-pham/'),{});assert.equal(response.status,200);assert.equal(response.headers.get('x-robots-tag'),'index, follow');
 assert.ok(!(await response.text()).includes('content="noindex'));
});
