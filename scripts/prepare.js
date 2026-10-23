import fs from 'node:fs';
const id=(process.argv[2]||'').trim();
if (!/^[0-9a-f]{32}$/i.test(id)) {
  console.error('Lỗi: KV Namespace ID phải gồm đúng 32 ký tự số/chữ a-f.');
  process.exit(1);
}
const file='wrangler.jsonc';
const source=fs.readFileSync(file,'utf8');
if (source.includes('DIEN_ID_KV_CUA_BAN_VAO_DAY')) {
  fs.writeFileSync(file,source.replace('DIEN_ID_KV_CUA_BAN_VAO_DAY',id));
  console.log('✓ Đã lưu KV Namespace ID vào wrangler.jsonc');
} else {
  const updated=source.replace(/"id": "[0-9a-f]{32}"/i,`"id": "${id}"`);
  fs.writeFileSync(file,updated);
  console.log('✓ Đã cập nhật KV Namespace ID');
}
