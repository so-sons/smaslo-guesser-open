const fs=require('fs');
const ps=JSON.parse(fs.readFileSync('ps.json','utf8'));
const f7=JSON.parse(fs.readFileSync('f7.json','utf8'));
const dup={}; f7.forEach(o=>dup[o.name]=(dup[o.name]||0)+1); console.log('f7 dup:',Object.entries(dup).filter(e=>e[1]>1).length, 'uniq', Object.keys(dup).length);
const norm=(s)=>s.normalize('NFKC').toLowerCase()
  .replace(/[\s　]/g,'')
  .replace(/[！!?？。、,，・:：\-－‐–—~～〜'’"“”「」『』()（）\[\]【】]/g,'')
  .replace(/^(スマスロ|パチスロ|ぱちスロ|スロット|smartスロット|l|s|ｌ)+/,'')
  .replace(/^(スマスロ|パチスロ|ぱちスロ|スロット|l|s)+/,'')
  .replace(/ver|ヴァージョン/g,'');
const fmap=new Map(); f7.forEach(o=>{const k=norm(o.name); if(!fmap.has(k)) fmap.set(k,o);});
let hit=0; const miss=[];
ps.forEach(p=>{const k=norm(p.name); const f=fmap.get(k); if(f){p.f7=f;hit++;} else miss.push(p.name+'  ['+k+']');});
console.log('hit',hit,'miss',miss.length);
console.log(miss.join('\n'));
fs.writeFileSync('merged.json',JSON.stringify(ps,null,1));
