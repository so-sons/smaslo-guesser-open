const fs=require('fs');
const dec=(s)=>s.replace(/&#8211;/g,'–').replace(/&#038;/g,'&').replace(/&amp;/g,'&').replace(/&#x27;|&#039;/g,"'").replace(/&quot;/g,'"').trim();
const out=[];
for(let i=1;i<=11;i++){
  const s=fs.readFileSync(`ps${i}.html`,'utf8');
  const re=/<li>\s*<a href="(https:\/\/www\.pachislot-summit\.com\/model\/[^"]+)">([\s\S]*?)<\/a>\s*<\/li>/g;
  let m;
  while((m=re.exec(s))){
    const b=m[2];
    const g=(r)=>{const x=b.match(r);return x?dec(x[1]):null;};
    const name=g(/<h3 class="main">([^<]*)<\/h3>/);
    if(!name) continue;
    const img=g(/<img src="([^"]+)"/);
    out.push({url:m[1],name,day:g(/導入日：([^<]*)</),unit:g(/号機：([^<]*)</),maker:g(/メーカー：([^<]*)</),type:g(/タイプ：([^<]*)</),img});
  }
}
fs.writeFileSync('ps.json',JSON.stringify(out,null,1));
console.log(out.length);
const cnt=(k)=>{const c={};out.forEach(o=>c[o[k]]=(c[o[k]]||0)+1);return c;};
console.log(cnt('unit'));console.log(cnt('type'));console.log(cnt('maker'));
console.log(out.slice(0,3), out.slice(-3));
