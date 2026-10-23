import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import worker from '../src/worker.js';
const root=path.resolve('public');
const mime=(file)=>({'.css':'text/css','.js':'application/javascript','.html':'text/html','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json'}[path.extname(file)]||'application/octet-stream');
const env={OLYMPIC_KV:{async get(){return null}},ASSETS:{async fetch(req){const u=new URL(req.url);let target=path.resolve(root,'.'+(u.pathname==='/'?'/index.html':u.pathname));if(!target.startsWith(root+path.sep))return new Response('Forbidden',{status:403});if(u.pathname==='/admin/'||u.pathname==='/admin')target=path.resolve(root,'admin/index.html');try{const data=await readFile(target);return new Response(data,{headers:{'content-type':mime(target)}})}catch{return new Response('Not found',{status:404})}}}};
const s=http.createServer(async(req,res)=>{
 try{
 const u='https://vinhomesthuongtin.vn'+req.url;
 const response=await worker.fetch(new Request(u,{method:req.method}),env);
 res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch(err){res.writeHead(500);res.end(err.message)}
});
s.listen(4177,'127.0.0.1',()=>console.log('Local preview listening on http://127.0.0.1:4177/'));
