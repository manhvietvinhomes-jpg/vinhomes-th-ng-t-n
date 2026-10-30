import fs from 'node:fs';import {INITIAL_CONTENT} from '../src/seed.js';import {normalize} from '../src/worker.js';import {RETIRED_IDS,NEWS_POSTS,UTILITY_SLUGS} from '../src/journalism-release.js';
// The read-only release backup is the explicit conflict baseline; no customer data is emitted.
const folder='/workspace/deployment-backups/2026-10-30T08-22-50.262Z';
const keys=JSON.parse(fs.readFileSync(folder+'/kv-values.json','utf8'));const row=keys.find(x=>x.name==='site:content');if(!row)throw Error('Missing original content backup');
const baseline=JSON.parse(Buffer.from(row.valueBase64,'base64').toString('utf8'));baseline.phone='0989294744';baseline.zalo='https://zalo.me/0989294744';
const next=normalize(INITIAL_CONTENT),operations=[];
const put=(array,id,old,target)=>{for(const [field,value] of Object.entries(target)){if(['id','slug'].includes(field)||JSON.stringify(old[field])===JSON.stringify(value))continue;operations.push({array,id,field,...(Object.hasOwn(old,field)?{oldValue:old[field]}:{oldMissing:true}),value});}};
for(const p of next.pages){const old=baseline.pages.find(x=>x.slug===p.slug);if(old)put('pages',p.slug,old,p);else if(UTILITY_SLUGS.includes(p.slug))operations.push({action:'append',array:'pages',id:p.slug,value:p});else throw Error('Unexpected new page');}
for(const p of next.posts){const old=baseline.posts.find(x=>x.id===p.id);if(RETIRED_IDS.includes(p.id)){if(!old)throw Error('Missing archived post');put('posts',p.id,old,{published:false});}else if(NEWS_POSTS.some(x=>x.id===p.id))operations.push({action:'append',array:'posts',id:p.id,value:p});}
for(const field of ['phone','zalo','independentDisclaimer','advisorTitle','advisorBio','amenities','products'])if(baseline[field]!==next[field])operations.push({field,oldValue:baseline[field],value:next[field]});
fs.writeFileSync('content/journalism-migration-patch.json',JSON.stringify({revision:'journalism-2026-10-30',operations},null,2)+'\n');
console.log('Prepared '+operations.length+' conflict-checked operations; no leads included.');
