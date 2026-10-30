// One-time, idempotent migration. Keeps unrelated content and refuses field conflicts.
import fs from 'node:fs/promises';import {createHash} from 'node:crypto';
const base='https://vinhomesthuongtin.vn',apply=process.argv.includes('--apply');
const patchFile=process.argv.find(x=>x.startsWith('--patch='))?.slice(8)||'content/seo-revision-patch.json';
const patch=JSON.parse(await fs.readFile(patchFile,'utf8'));
const password=(await fs.readFile('/workspace/deployment-secrets/royal-snow-1e06-admin-password.txt','utf8')).trim();
const headers={'Content-Type':'application/json',Origin:base};
const login=await fetch(base+'/api/admin/login',{method:'POST',headers,body:JSON.stringify({password})});if(!login.ok)throw Error('CMS login failed.');
const cookie=login.headers.get('set-cookie')?.split(';')[0];if(!cookie)throw Error('No session cookie.');const auth={...headers,Cookie:cookie};
async function read(){const r=await fetch(base+'/api/admin/content',{headers:auth});if(!r.ok)throw Error('Cannot read CMS content.');return(await r.json()).content}
const original=await read(),content=structuredClone(original),changes=[],conflicts=[];
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
for(const operation of patch.operations){
 if(operation.action==='append'){
  const items=content[operation.array];if(!Array.isArray(items)){conflicts.push('Missing collection '+operation.array);continue;}
  const key=operation.array==='pages'?'slug':'id';const current=items.find(x=>x[key]===operation.id);
  if(current){if(!equal(current,operation.value))conflicts.push(operation.array+'/'+operation.id+': existing appended item differs');continue;}
  items.push(structuredClone(operation.value));changes.push(operation.array+'/'+operation.id+': append');continue;
 }
 const target=operation.array?content[operation.array]?.find(x=>(operation.array==='pages'?x.slug:x.id)===operation.id):content;
 if(!target){conflicts.push(`${operation.array}/${operation.id}: missing item`);continue;}
 const current=target[operation.field];if(equal(current,operation.value))continue;
 const isOld=operation.oldMissing?([null,undefined,''].includes(current)||Array.isArray(current)&&current.length===0):equal(current,operation.oldValue);
 if(!isOld){conflicts.push([operation.array,operation.id,operation.field].filter(Boolean).join('/'));continue;}
 target[operation.field]=operation.value;changes.push([operation.array,operation.id,operation.field].filter(Boolean).join('/'));
}
if(conflicts.length)throw Error('Preserved conflicting CMS edits; no content was written. Fields: '+conflicts.join(', '));
if(apply&&changes.length){
 const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');if(hash(await read())!==hash(original))throw Error('CMS changed during preparation; retry after reviewing current edits.');
 const response=await fetch(base+'/api/admin/content',{method:'PUT',headers:auth,body:JSON.stringify(content)});if(!response.ok){const failure=await response.json().catch(()=>({}));throw Error('CMS save failed: '+(failure.error||response.status));}const returned=(await response.json()).content;
 for(const operation of patch.operations){const target=operation.array?returned[operation.array]?.find(x=>(operation.array==='pages'?x.slug:x.id)===operation.id):returned;if(!equal(operation.action==='append'?target:target?.[operation.field],operation.value))throw Error('Saved content differs from intended patch. Inspect backup before continuing.');}
}
const report={checkedAt:new Date().toISOString(),revision:patch.revision,mode:apply?'apply':'dry-run',changedFields:changes,publishedPostCount:content.posts.filter(p=>p.published).length,unrelatedItemsPreserved:true};
await fs.mkdir('dist',{recursive:true});await fs.writeFile('dist/'+patch.revision+'-'+(apply?'applied':'dry-run')+'.json',JSON.stringify(report,null,2)+'\n');
console.log(`${report.mode}: ${changes.length} fields, no conflicts, ${report.publishedPostCount} published posts retained. No leads touched.`);
await fetch(base+'/api/admin/logout',{method:'POST',headers:auth});
