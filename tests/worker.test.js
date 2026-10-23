import test from 'node:test';
import assert from 'node:assert/strict';
import worker, {normalize,imageMime} from '../src/worker.js';
class KV {
  constructor(){this.db=new Map()}
  async get(k,format){const v=this.db.get(k);if(!v)return null;return format==='json'?JSON.parse(v.value):format==='arrayBuffer'?v.value:v.value}
  async put(k,value,opt={}){this.db.set(k,{value,metadata:opt.metadata||null})}
  async delete(k){this.db.delete(k)}
  async list({prefix}){return {keys:[...this.db].filter(([k])=>k.startsWith(prefix)).map(([name,v])=>({name,metadata:v.metadata})),list_complete:true}}
  async getWithMetadata(k){const v=this.db.get(k);return {value:v?.value||null,metadata:v?.metadata||null}}
}
const origin='https://vinhomesthuongtin.vn';
const env={ADMIN_PASSWORD:'ThisIsAStrongPrivatePassword123!',OLYMPIC_KV:new KV(),ASSETS:{fetch:async()=>new Response('ok')}};
const req=(path,method='GET',body=null,cookie='')=>new Request(origin+path,{method,headers:{...(method!=='GET'?{'Origin':origin}:{}),...(body?{'content-type':'application/json'}:{}),...(cookie?{Cookie:cookie}:{})},body:body?JSON.stringify(body):undefined});
test('starter content is available',async()=>{const res=await worker.fetch(req('/api/site'),env);assert.equal(res.status,200);assert.equal((await res.json()).content.advisorName,'Mạnh Việt')});
test('unauthenticated writes are refused',async()=>{const res=await worker.fetch(req('/api/admin/content','PUT',{}),env);assert.equal(res.status,401)});
test('bad login refused, valid login issues secure cookie',async()=>{const bad=await worker.fetch(req('/api/admin/login','POST',{password:'wrongpass'}),env);assert.equal(bad.status,401);const good=await worker.fetch(req('/api/admin/login','POST',{password:env.ADMIN_PASSWORD}),env);assert.equal(good.status,200);const cookie=good.headers.get('set-cookie');assert.match(cookie,/HttpOnly/);assert.match(cookie,/Secure/);assert.match(cookie,/SameSite=Strict/);const session=cookie.split(';')[0];env.testCookie=session;const me=await worker.fetch(req('/api/admin/me','GET',null,session),env);assert.equal(me.status,200)});
test('admin content updates are persisted and sanitized',async()=>{const payload={...normalize({}),heroAccent:'OLYMPIC MỚI',facebook:'javascript:alert(1)',products:[{id:'p',title:'Biệt thự',image:'/assets/waterfront.webp'}]};const res=await worker.fetch(req('/api/admin/content','PUT',payload,env.testCookie),env);assert.equal(res.status,200);const data=await(await worker.fetch(req('/api/site'),env)).json();assert.equal(data.content.heroAccent,'OLYMPIC MỚI');assert.equal(data.content.facebook,'');assert.equal(data.content.products.length,1)});
test('customer forms store leads, enforce consent',async()=>{const invalid=await worker.fetch(req('/api/leads','POST',{name:'Test User',phone:'0986091222'}),env);assert.equal(invalid.status,400);const valid=await worker.fetch(req('/api/leads','POST',{name:'Nguyễn Văn A',phone:'0986091222',note:'Quan tâm dự án',consent:true}),env);assert.equal(valid.status,200);const res=await worker.fetch(req('/api/admin/leads','GET',null,env.testCookie),env);assert.equal((await res.json()).leads.length,1)});
test('image signatures reject invalid types',()=>{assert.equal(imageMime(new Uint8Array([1,2,3]),'image/webp'),null);assert.equal(imageMime(new Uint8Array([0xff,0xd8,0xff]),'image/jpeg'),'image/jpeg')});
test('cross-origin mutating requests are refused',async()=>{const res=await worker.fetch(new Request(origin+'/api/admin/content',{method:'PUT',headers:{Origin:'https://evil.com',Cookie:env.testCookie,'content-type':'application/json'},body:JSON.stringify({})}),env);assert.equal(res.status,403)});
test('administrator can upload, list, and serve a valid image',async()=>{
 const f=new Uint8Array(32);[0x52,0x49,0x46,0x46].forEach((v,i)=>f[i]=v);[0x57,0x45,0x42,0x50].forEach((v,i)=>f[i+8]=v);
 const form=new FormData();form.append('file',new File([f],'anh.webp',{type:'image/webp'}));
 const upload=new Request(origin+'/api/admin/upload',{method:'POST',body:form,headers:{Origin:origin,Cookie:env.testCookie}});
 const res=await worker.fetch(upload,env);assert.equal(res.status,200);
 const {media}=await res.json();assert.match(media.url,/^\/media\//);
 const listing=await worker.fetch(req('/api/admin/media','GET',null,env.testCookie),env);
 assert.equal((await listing.json()).media.length,1);
 const fetched=await worker.fetch(req(media.url),env);assert.equal(fetched.status,200);assert.equal(fetched.headers.get('content-type'),'image/webp');
});
