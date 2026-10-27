import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import worker from '../src/worker.js';
import {DOMAIN,visibleUrls} from '../src/seo.js';
import {INITIAL_CONTENT} from '../src/seed.js';
import {PRODUCT_REDIRECTS} from '../src/editorial.js';
const root=path.resolve(fileURLToPath(new URL('../public/',import.meta.url)));
const base=process.argv.find(x=>x.startsWith('--base='))?.slice(7);
const failures=[],warnings=[],pages=[],titles=new Map(),descriptions=new Map(),links=new Map();
const assets={async fetch(req){
 const pathname=new URL(req.url).pathname;
 const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
 if(!file.startsWith(root+path.sep))return new Response('Forbidden',{status:403});
 try{return new Response(await fs.readFile(file),{headers:{'content-type':({'.html':'text/html','.webp':'image/webp','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.json':'application/json'})[path.extname(file)]||'application/octet-stream'}})}catch{return new Response('Not found',{status:404})}
}};
const get=route=>base?fetch(new URL(route,base),{redirect:'manual'}):worker.fetch(new Request(DOMAIN+route),{ASSETS:assets});
const fail=(route,message)=>failures.push({route,message});
const check=(condition,route,message)=>{if(!condition)fail(route,message)};
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
const sitemapResponse=await get('/sitemap.xml');
check(sitemapResponse.status===200,'/sitemap.xml','Sitemap HTTP status');
const xml=await sitemapResponse.text();
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>decode(x[1]));
const expectedCount=visibleUrls(INITIAL_CONTENT).length;
check(urls.length===expectedCount,'/sitemap.xml',`Expected ${expectedCount} indexable URLs, got ${urls.length}`);
check(new Set(urls).size===urls.length,'/sitemap.xml','Duplicate URL');
for(const url of urls){
 const route=new URL(url).pathname;
 check(url===DOMAIN+route,route,'Incorrect canonical hostname');
 const response=await get(route),html=await response.text();
 check(response.status===200,route,`HTTP ${response.status}`);
 if(!base||new URL(base).hostname==='vinhomesthuongtin.vn')check(!/noindex/i.test(response.headers.get('x-robots-tag')||''),route,'Noindex HTTP header on sitemap URL');
 check(response.headers.get('content-type')?.includes('text/html'),route,'Missing HTML content type');
 const title=decode(html.match(/<title>([^<]+)<\/title>/)?.[1]||'');
 const description=decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1]||'');
 check(Boolean(title),route,'Missing title');check(Boolean(description),route,'Missing description');
 check(!titles.has(title),route,'Duplicate title: '+titles.get(title));titles.set(title,route);
 check(!descriptions.has(description),route,'Duplicate description: '+descriptions.get(description));descriptions.set(description,route);
 if(title.length>75)warnings.push({route,message:`Long title (${title.length})`});
 if(description.length>180)warnings.push({route,message:`Long description (${description.length})`});
 check((html.match(/<h1(?:\s|>)/g)||[]).length===1,route,'Must have exactly one H1');
 check(html.includes(`rel="canonical" href="${url}"`),route,'Incorrect canonical');
 check(!/\bAI\b/.test(html),route,'Outdated illustration wording');
 check(!/href="#"/.test(html),route,'Empty anchor destination');
 check(!/VINHOMESOLYMPIC/.test(html),route,'Brand words are concatenated');
 check(!/content="noindex/.test(html),route,'Noindex URL included in sitemap');
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
 check(schemas.length>0,route,'Missing structured data');
 for(const schema of schemas){try{JSON.parse(schema[1])}catch{fail(route,'Invalid JSON-LD')}}
 for(const m of html.matchAll(/href="(\/[^"]*)"/g)){
  const target=new URL(decode(m[1]),DOMAIN);
  if(target.pathname==='/admin/'||/\.(css|svg)$/.test(target.pathname))continue;
  if(!links.has(route))links.set(route,new Set());
  links.get(route).add(target.pathname);
  if(target.pathname===route&&target.hash)check(html.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`),route,'Broken fragment '+target.hash);
 }
 const images=[...html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/g)];
 for(const image of images){
  check(/alt="[^"]+"/.test(image[0]),route,'Missing image alt');
  const src=decode(image[1]);if(src.startsWith('/'))links.set('asset:'+src,new Set([src]));
 }
 pages.push({route,title,description,internalLinks:links.get(route)?.size||0});
}
const known=new Set(urls.map(x=>new URL(x).pathname)),checkedAssets=new Map();
for(const [from,targets] of links){
 for(const target of targets){
  if(from.startsWith('asset:')||target.startsWith('/assets/')){
   if(!checkedAssets.has(target))checkedAssets.set(target,(await get(target)).status);
   check(checkedAssets.get(target)===200,from,'Missing asset '+target);
  }else check(known.has(target),from,'Broken internal link '+target);
 }
}
const reachable=new Set(['/']),queue=['/'];
while(queue.length){for(const to of links.get(queue.shift())||[]){if(known.has(to)&&!reachable.has(to)){reachable.add(to);queue.push(to)}}}
for(const route of known)check(reachable.has(route),route,'Orphan URL: not reachable from homepage');
const robots=await get('/robots.txt'),robotsText=await robots.text();
check(robots.status===200&&robotsText.includes('Sitemap: '+DOMAIN+'/sitemap.xml')&&robotsText.includes('Disallow: /admin/'),'/robots.txt','Incorrect robots');
for(const [from,to] of Object.entries(PRODUCT_REDIRECTS)){const response=await get(from);check(response.status===301&&response.headers.get('location')===DOMAIN+to,from,'Product consolidation must redirect directly to its destination');}
const missing=await get('/tin-tuc/khong-ton-tai/');check(missing.status===404,'/tin-tuc/khong-ton-tai/','Soft 404');
const report={checkedAt:new Date().toISOString(),mode:base?'http':'worker-in-process',base:base||DOMAIN,urlCount:urls.length,reachableCount:reachable.size,assetCount:checkedAssets.size,failures,warnings,pages};
await fs.mkdir('dist',{recursive:true});
await fs.writeFile('dist/seo-audit.json',JSON.stringify(report,null,2)+'\n');
await fs.writeFile('dist/indexable-urls.txt',urls.join('\n')+'\n');
console.log(`SEO audit: ${urls.length} URLs, ${reachable.size} reachable, ${checkedAssets.size} assets; ${failures.length} failures, ${warnings.length} warnings.`);
for(const failure of failures)console.error(failure.route+': '+failure.message);
process.exitCode=failures.length?1:0;
