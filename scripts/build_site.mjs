import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
try{process.loadEnvFile(root+'.env');}catch(error){if(error.code!=='ENOENT')throw error;}
const endpoint=new URL(process.env.WAITLIST_API_URL??'');
if(endpoint.pathname!=='/api/public/actions'||endpoint.username||endpoint.password||endpoint.search||endpoint.hash)throw Error('Invalid public waitlist endpoint.');
if(endpoint.protocol!=='https:'&&!['localhost','127.0.0.1'].includes(endpoint.hostname))throw Error('HTTPS is required.');
await rm(root+'dist',{recursive:true,force:true});await mkdir(root+'dist');await cp(root+'public',root+'dist',{recursive:true});
const script=await readFile(root+'public/site.js','utf8');
if(!script.includes("'__WAITLIST_ENDPOINT__'"))throw Error('Missing endpoint marker.');
await writeFile(root+'dist/site.js',script.replace("'__WAITLIST_ENDPOINT__'",JSON.stringify(endpoint.href)));
const copy=JSON.parse(script.match(/const COPY = (.+);/)[1]);
const escape=value=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
let html=await readFile(root+'public/index.html','utf8');
for(const [tag,key]of [['h1','headline'],['p','lead'],['label','label'],['button','button']])html=html.replace(new RegExp(`(<${tag}[^>]*data-text="${key}"[^>]*>)(</${tag}>)`),`$1${escape(copy.ar[key])}$2`);
await writeFile(root+'dist/index.html',html);
console.log('Built the static Moeen landing page with the public enrollment action.');
