import { buildFooter } from './build_footer.mjs';
import { buildNavigation } from './build_navigation.mjs';
import { buildProductPages } from './build_product_pages.mjs';
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
try{process.loadEnvFile(root+'.env');}catch(error){if(error.code!=='ENOENT')throw error;}
const endpoint=new URL(process.env.WAITLIST_API_URL??'');
if(endpoint.pathname!=='/api/public/actions'||endpoint.username||endpoint.password||endpoint.search||endpoint.hash)throw Error('Invalid public waitlist endpoint.');
if(endpoint.protocol!=='https:'&&!['localhost','127.0.0.1'].includes(endpoint.hostname))throw Error('HTTPS is required.');
// Keep fictional customer proof in the local preview only.
const production=Boolean(process.env.RENDER);
const landing=await readFile(root+'public/index.html','utf8');
const publishable=production
  ? landing.replace(/^[ \t]*<(section|a)\b[^>]* data-placeholder="proof"[^>]*>[\s\S]*?<\/\1>\n?/gm,'')
  : landing;
if(!landing.includes('<!-- SITE_NAVIGATION -->'))throw Error('Missing site navigation marker.');
if(production && /data-placeholder="proof"/.test(publishable))throw Error('Placeholder proof remains in the production landing page.');
await rm(root+'dist',{recursive:true,force:true});
await mkdir(root+'dist');
await cp(root+'public',root+'dist',{
  recursive:true,
  filter:source=>!production || !source.startsWith(root+'public/assets/fonts/thmanyah'),
});
await writeFile(root+'dist/index.html',publishable.replace('<!-- SITE_NAVIGATION -->',buildNavigation()).replace('<!-- SITE_FOOTER -->',buildFooter()));
if(production){
  const styles=await readFile(root+'dist/assets/landing.css','utf8');
  const previewFontFiles=/,\n    url\(\/assets\/fonts\/thmanyahsans-[A-Za-z]+\.woff2\) format\("woff2"\)/g;
  await writeFile(root+'dist/assets/landing.css',styles.replace(previewFontFiles,''));
}
const script=await readFile(root+'public/site.js','utf8');
if(!script.includes("'__WAITLIST_ENDPOINT__'"))throw Error('Missing endpoint marker.');
await writeFile(root+'dist/site.js',script.replace("'__WAITLIST_ENDPOINT__'",JSON.stringify(endpoint.href)));
const copy=JSON.parse(script.match(/const COPY = (.+);/)[1]);
const escape=value=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
let html=await readFile(root+'public/waitlist/index.html','utf8');
for(const [tag,key]of [['h1','headline'],['p','lead'],['label','label'],['button','button']])html=html.replace(new RegExp(`(<${tag}[^>]*data-text="${key}"[^>]*>)(</${tag}>)`),`$1${escape(copy.ar[key])}$2`);
await writeFile(root+'dist/waitlist/index.html',html);
console.log('Built the Moeen landing page and the waitlist page with the public enrollment action.');
await buildProductPages(root, endpoint.origin, landing);
