from pathlib import Path
import base64, json, re
root=Path(__file__).resolve().parents[1]
static=root/'public'
html=(static/'index.html').read_text(encoding='utf8')
css=(static/'site.css').read_text(encoding='utf8')
js=(static/'site.js').read_text(encoding='utf8')
data=json.loads((static/'seed.json').read_text(encoding='utf8'))
for key in ('olympic-concept','waterfront','city','sport'):
    path=f'/assets/{key}.webp'
    inline='data:image/webp;base64,'+base64.b64encode((static/path.lstrip('/')).read_bytes()).decode()
    html=html.replace(path,inline)
    css=css.replace(path,inline)
    for k in ('heroImage',):
        if data.get(k)==path: data[k]=inline
    for collection in ('products','gallery','posts'):
        for item in data[collection]:
            if item.get('image')==path:item['image']=inline
# Demo only supports data URI when rendering internal images.
js=js.replace("const safeImg=url=>{const s=String(url||'');", "const safeImg=url=>{const s=String(url||'');if(s.startsWith('data:image/webp;base64,'))return s;")
js=js.replace("async function load(){", "async function load(){apply(window.__OLYMPIC_DEMO);return;")
js += "\n// Demo offline: do not pretend that submitted customer data is stored.\ndocument.getElementById('leadForm').addEventListener('submit', e=>{e.preventDefault();e.stopImmediatePropagation();document.getElementById('formStatus').textContent='Đây là bản xem thử. Form chỉ hoạt động sau khi triển khai Cloudflare KV.'},true);"
html=html.replace('<link rel="stylesheet" href="/site.css"><script defer src="/site.js"></script>', '')
html=html.replace('</head>', '<style>'+css+'</style></head>')
# Eliminate inline closing SCRIPT markers by escaping U+003c to avoid premature script termination.
payload=json.dumps(data,ensure_ascii=False).replace('<','\\u003c')
html=html.replace('</body>', '<script>window.__OLYMPIC_DEMO='+payload+';</script><script>'+js+'</script></body>')
html=html.replace('<div class="topline">', '<div style="padding:10px;text-align:center;background:#d6b06c;color:#15273a;font-size:12px;font-weight:700">BẢN DEMO XEM TRƯỚC – Chưa kết nối lưu dữ liệu hay trang quản trị</div><div class="topline">')
(root/'XEM-TRUOC-WEBSITE.html').write_text(html,encoding='utf8')
print('Demo length',len(html))
