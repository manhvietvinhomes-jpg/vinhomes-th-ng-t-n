import {ADMIN_PATH} from '../src/admin-config.js';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from 'playwright-core';
import {randomBytes} from 'node:crypto';
const base=process.env.SMOKE_BASE||'http://127.0.0.1:8787';
if(!['127.0.0.1','localhost'].includes(new URL(base).hostname))throw Error('This smoke test writes synthetic leads; use local runtime only.');
const password=(await fs.readFile('.dev.vars','utf8')).match(/^ADMIN_PASSWORD=(.+)$/m)?.[1];
assert.ok(password,'Missing local .dev.vars password');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const errors=[],results=[];
const expectedTitle='Vinhomes Olympic Thường Tín: Quy hoạch, vị trí và pháp lý';
await fs.mkdir('dist/screenshots',{recursive:true});
try{
 for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
  const context=await browser.newContext({viewport:{width,height}});
  await context.route('https://fonts.googleapis.com/**',r=>r.fulfill({contentType:'text/css',body:''}));
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/','/tin-tuc/','/tong-quan/','/tin-tuc/tri-le-thu-hoi-dat-13-10-2026/']){
   const res=await page.goto(base+route);assert.equal(res.status(),200,route);
   await page.locator('h1').waitFor();
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
   assert.equal(overflow,false,name+': horizontal overflow at '+route);
   assert.equal(await page.locator('h1').count(),1);
   const brokenImages=await page.evaluate(async()=>{const images=[...document.images];for(const image of images)image.loading='eager';await Promise.all(images.map(image=>image.decode().catch(()=>{})));return images.filter(image=>!image.naturalWidth).map(image=>image.getAttribute('src'))});
   assert.deepEqual(brokenImages,[],name+': broken images at '+route);
   if(route==='/'){await page.locator('#news .news-card').first().waitFor();assert.equal(await page.locator('#news .news-card').count(),4);assert.equal(await page.title(),expectedTitle);assert.match((await page.locator('h1').textContent()).replace(/\s+/g,' '),/Vinhomes Olympic Thường Tín – Đô thị thể thao phía Nam Hà Nội/);assert.equal(await page.locator('a[href="#"]').count(),0);}
   if(name==='mobile'&&route.includes('tri-le')){
    await page.locator('#seoNavBtn').click();assert.equal(await page.locator('#seoNavBtn').getAttribute('aria-expanded'),'true');
    await page.locator('#seoNavBtn').click();
   }
   results.push({viewport:name,route,status:res.status(),overflow});
   if(route==='/'||route.includes('tri-le'))await page.screenshot({path:`dist/screenshots/${name}-${route==='/'?'home':'article'}.png`,fullPage:true});
  }
  await context.close();
 }
 const nojs=await browser.newContext({javaScriptEnabled:false});const staticPage=await nojs.newPage();await staticPage.goto(base+'/');assert.equal(await staticPage.title(),expectedTitle);assert.equal(await staticPage.locator('#gallery img').count(),4);assert.match((await staticPage.locator('h1').textContent()).replace(/\s+/g,' '),/Vinhomes Olympic Thường Tín – Đô thị thể thao phía Nam Hà Nội/);for(const path of ['/tong-quan/','/vi-tri/','/san-pham/','/tin-tuc/'])assert.equal(await staticPage.locator('#nav a[href="'+path+'"]').count(),1);await nojs.close();
 const context=await browser.newContext({extraHTTPHeaders:{'CF-Connecting-IP':'2001:db8:'+randomBytes(12).toString('hex').match(/.{4}/g).join(':')}});
 await context.route('https://fonts.googleapis.com/**',r=>r.fulfill({contentType:'text/css',body:''}));
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/');
 await page.locator('#leadName').fill('Kiểm thử nội bộ Codex');await page.locator('#leadPhone').fill('0900000000');
 await page.locator('#leadConsent').check();
 await page.locator('#leadForm button[type=submit]').click();
 await page.locator('#formStatus').filter({hasText:'Đã nhận'}).waitFor();
 await page.goto(base+ADMIN_PATH);await page.locator('#adminPassword').fill(password);
 await page.locator('#loginForm button').click();await page.locator('#adminApp').waitFor({state:'visible'});
 await page.locator('[data-tab="posts"]').click();
 const faqAnswer=page.locator('textarea[data-faq-array="posts"][data-faq-key="answer"]').first();await faqAnswer.waitFor();
 const originalAnswer=await faqAnswer.inputValue();
 await faqAnswer.fill(originalAnswer+' Kiểm thử lưu FAQ nội bộ.');
 const faqSaved=page.waitForResponse(r=>r.url().endsWith('/api/admin/content')&&r.request().method()==='PUT');await page.locator('#saveAllBtn').click();assert.equal((await faqSaved).status(),200);
 await faqAnswer.fill(originalAnswer);const faqRestored=page.waitForResponse(r=>r.url().endsWith('/api/admin/content')&&r.request().method()==='PUT');await page.locator('#saveAllBtn').click();assert.equal((await faqRestored).status(),200);
 const before=await context.request.get(base+'/api/admin/content');assert.equal(before.status(),200);
 const data=(await before.json()).content;
 assert.equal(data.posts.filter(x=>x.published).length,4);
 const saved=await context.request.put(base+'/api/admin/content',{headers:{Origin:base},data});assert.equal(saved.status(),200);
 const again=(await(await context.request.get(base+'/api/admin/content')).json()).content;
 assert.deepEqual(again,data);
 const leads=(await(await context.request.get(base+'/api/admin/leads')).json()).leads;
 const synthetic=leads.filter(x=>x.name==='Kiểm thử nội bộ Codex');assert.ok(synthetic.length>0);
 for(const lead of synthetic){const res=await context.request.delete(base+'/api/admin/leads/'+lead.id,{headers:{Origin:base}});assert.equal(res.status(),200)}
 await context.close();assert.deepEqual(errors,[]);
 const report={checkedAt:new Date().toISOString(),results,form:'submitted and found in authenticated CMS; synthetic lead deleted',cms:'login and 4-post save/reload passed',errors};
 await fs.writeFile('dist/browser-smoke.json',JSON.stringify(report,null,2)+'\n');
 console.log('Browser smoke: 8 desktop/mobile page checks, form → CMS → delete, login and 4-post round trip passed.');
}finally{await browser.close()}
