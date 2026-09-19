const fs=require('fs');
const dec=(s)=>s.replace(/&amp;amp;/g,'&').replace(/&amp;/g,'&').replace(/&#x27;|&#039;/g,"'").replace(/&quot;/g,'"').replace(/<[^>]+>/g,'').trim();
const s=fs.readFileSync('f1.html','utf8');
const re=/<tr><td class="rank num">(\d+)<\/td><td class="lbl"><a href="([^"]+)">([^<]*)<\/a>(?:<i[^>]*>実践値<\/i>)?<span class="rel">([^<]*)<\/span><\/td><td class="rk-br"[^>]*><\/td><td class="num">([^<]*)<\/td><td class="num">([^<]*)<\/td><td class="num cu-inc">([^<]*)<\/td><\/tr>/g;
let m; const out=[];
while((m=re.exec(s))){
  const [type,maker,ym]=dec(m[4]).split('・');
  out.push({name:dec(m[3]),href:m[2],type,maker,ym,cu:dec(m[5]),cm:dec(m[6]),jz:dec(m[7])});
}
fs.writeFileSync('f7.json',JSON.stringify(out,null,1));
console.log(out.length);
console.log([...new Set(out.map(o=>o.jz))].sort().join(' | '));
console.log([...new Set(out.map(o=>o.type))]);
