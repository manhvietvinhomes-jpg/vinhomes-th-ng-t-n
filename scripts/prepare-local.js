import fs from 'node:fs';
import {randomBytes} from 'node:crypto';
if(!fs.existsSync('.dev.vars')){
 fs.writeFileSync('.dev.vars','ADMIN_PASSWORD='+randomBytes(36).toString('base64url')+'\n',{mode:0o600,flag:'wx'});
 console.log('Created ignored local-only admin secret. No production credentials were changed.');
}else console.log('Preserved existing .dev.vars.');
