import fs from 'node:fs';
const config=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));
const kv=config.kv_namespaces?.find(x=>x.binding==='OLYMPIC_KV');
if(config.name!=='royal-snow-1e06'||!/^[a-f0-9]{32}$/i.test(kv?.id||''))throw Error('Deployment blocked: verify the Worker and configure the real OLYMPIC_KV namespace ID first.');
console.log('Worker name and KV ID format checked. A current Cloudflare backup and account/domain verification are required before deployment; see RELEASE-V3.md.');
