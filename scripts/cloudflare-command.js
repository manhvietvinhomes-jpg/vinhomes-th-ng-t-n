import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const config=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));
const mode=process.argv[2];
const targets={backup:['scripts/cloudflare-backup.js'],deploy:['node_modules/wrangler/bin/wrangler.js','deploy'],audit:['scripts/audit-seo.js','--base=https://vinhomesthuongtin.vn']};
if(!targets[mode])throw Error('Expected backup, deploy or audit.');
const account=config.account_id||process.env.CLOUDFLARE_ACCOUNT_ID;
if(!/^[a-f0-9]{32}$/i.test(account||''))throw Error('Configure the verified Cloudflare account ID first.');
// Use the verified repository account rather than a mismatched injected value.
// Node 24 uses the provided HTTPS proxy; ordinary Node 22 networks work directly.
const result=spawnSync(process.execPath,targets[mode],{stdio:'inherit',env:{...process.env,CLOUDFLARE_ACCOUNT_ID:account,NODE_USE_ENV_PROXY:'1'}});
if(result.error)throw result.error;process.exitCode=result.status??1;
