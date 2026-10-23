// Read-only Cloudflare inventory and backup. No deployment or KV writes.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const account=process.env.CLOUDFLARE_ACCOUNT_ID,token=process.env.CLOUDFLARE_API_TOKEN;
if(!account||!token)throw Error('Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN securely in environment settings. No secret values should be sent in chat.');
if(!/^[a-f0-9]{32}$/i.test(account))throw Error('Invalid account ID.');
const worker='royal-snow-1e06',api='https://api.cloudflare.com/client/v4';
const base=`/accounts/${account}`,workerPath=`${base}/workers/scripts/${worker}`;
const headers={Authorization:`Bearer ${token}`};
async function request(route,raw=false){
 const r=await fetch(api+route,{headers,signal:AbortSignal.timeout(30000)});
 if(!r.ok)throw Error(`Cloudflare read failed: HTTP ${r.status} at ${route.replace(account,'<account>')}`);
 if(raw)return {bytes:Buffer.from(await r.arrayBuffer()),contentType:r.headers.get('content-type')};
 const data=await r.json();if(!data.success)throw Error('Cloudflare API read did not succeed.');return data.result;
}
const domains=await request(`${base}/workers/domains`);
if(!domains.some(x=>x.hostname==='vinhomesthuongtin.vn'&&x.service===worker))throw Error('The selected account does not bind vinhomesthuongtin.vn to royal-snow-1e06. No changes made.');
const settings=await request(workerPath+'/settings');
const deployments=await request(workerPath+'/deployments');
const current=(deployments.deployments||[])[0];
if(!current?.versions?.length)throw Error('Could not identify the current deployment for rollback.');
const namespaces=(settings.bindings||[]).filter(x=>x.type==='kv_namespace'&&x.name==='OLYMPIC_KV');
if(namespaces.length>1)throw Error('Ambiguous KV binding.');
const otherKv=(settings.bindings||[]).filter(x=>x.type==='kv_namespace'&&x.name!=='OLYMPIC_KV');
if(otherKv.length)throw Error('Additional KV bindings exist. Inspect and back them up before using this release procedure.');
const backupRoot='/workspace/deployment-backups';
await fs.mkdir(backupRoot,{recursive:true,mode:0o700});
const folder=path.join(backupRoot,new Date().toISOString().replaceAll(':','-'));
await fs.mkdir(folder,{mode:0o700});
const files=[];
async function save(name,bytes){
 const buffer=Buffer.isBuffer(bytes)?bytes:Buffer.from(JSON.stringify(bytes,null,2)+'\n');
 const target=path.join(folder,name);await fs.writeFile(target,buffer,{mode:0o600,flag:'wx'});
 const hash=x=>createHash('sha256').update(x).digest('hex');
 if(hash(await fs.readFile(target))!==hash(buffer))throw Error('Backup verification failed.');
 files.push({name,bytes:buffer.length,sha256:hash(buffer)});
}
await save('domains.json',domains);await save('settings.json',settings);await save('deployments.json',deployments);
const script=await request(workerPath,true);await save('worker-content.bin',script.bytes);
let cursor='',count=0;
if(namespaces[0]){
 const kv=namespaces[0].namespace_id;
 if(!/^[a-f0-9]{32}$/i.test(kv))throw Error('Invalid namespace ID from Cloudflare.');
 const rows=[];
 do{
  const r=await fetch(`${api}${base}/storage/kv/namespaces/${kv}/keys?limit=1000${cursor?'&cursor='+encodeURIComponent(cursor):''}`,{headers,signal:AbortSignal.timeout(30000)});
  if(!r.ok)throw Error('Cannot enumerate KV keys.');const data=await r.json();if(!data.success)throw Error('KV enumeration failed.');
  for(const item of data.result){
   const value=await request(`${base}/storage/kv/namespaces/${kv}/values/${encodeURIComponent(item.name)}`,true);
   rows.push({...item,valueBase64:value.bytes.toString('base64')});count++;
  }
  const next=data.result_info?.cursor||'';if(next&&next===cursor)throw Error('KV pagination did not advance.');cursor=next;
 }while(cursor);
 await save('kv-values.json',rows);
}
await save('manifest.json',{createdAt:new Date().toISOString(),worker,hostname:'vinhomesthuongtin.vn',workerContentType:script.contentType,kvNamespaceId:namespaces[0]?.namespace_id||null,kvKeyCount:count,rollbackVersions:current.versions,files,limitations:'KV backup is read-only and not atomic. Pause CMS edits during final backup. Static assets can be restored using the recorded Worker version while that version remains available; raw worker-content.bin alone does not reconstruct uploaded assets. Secret values are not exported by Cloudflare. No restore has been attempted.'});
console.log(`Verified read-only backup: ${folder}. KV keys: ${count}. No deployment or data writes performed.`);
if(!namespaces.length)console.log('Worker has no OLYMPIC_KV binding. Create a namespace only after reviewing this backup and account inventory.');
if(!(settings.bindings||[]).some(x=>x.type==='secret_text'&&x.name==='ADMIN_PASSWORD'))console.log('ADMIN_PASSWORD is not present in Worker settings. Configure it securely before public CMS use.');
