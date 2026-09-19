const fs=require('fs');
const ps=JSON.parse(fs.readFileSync('merged.json','utf8'));
const f7=JSON.parse(fs.readFileSync('f7.json','utf8'));
const fsr=JSON.parse(fs.readFileSync('f7search.json','utf8'));
const byName=new Map(f7.map(o=>[o.name,o]));
const manual={ // pachislot-summit name -> flick7 name
 "スマスロ BIRDIE WING -Golf Girls' Story-(バーディーウィング)":"スマスロ BIRDIE WING -Golf Girls' Story-",
 "Lパチスロ 機動戦士ガンダムユニコーン 覚醒DRIVE":"Ｌ ガンダムユニコーン 覚醒DRIVE",
 "銀河英雄伝説 Die Neue These (ディ ノイエ テーゼ)":"銀河英雄伝説 Die Neue These",
 "Lパチスロ 革命機ヴァルヴレイヴ2（Lヴヴヴ2）":"L 革命機ヴァルヴレイヴ2",
 "スマスロ 東京リベンジャーズ(リベスロ)":"スマスロ 東京リベンジャーズ",
 "LToLOVEるダークネス TRANCE ver.8.7":"L ToLOVEる ダークネス トランスVer.8.7",
 "Lうしおととら白面決戦VH":"Lうしおととら 白面決戦",
 "Sister Quest(シスタークエスト)":"Sister Quest",
 "Sky Love(スカイラブ)":"Sky Love",
 "スマスロ バイオハザード™ ヴィレッジ":"スマスロ バイオハザードヴィレッジ",
 "Lパチスロひぐらしのなく頃に":"L ひぐらしのなく頃に 業",
};
// 手動データ（flick7 に無いもの）: [通常純増, 最高純増, コイン単価, コイン持ち]
const extra={
 "Lウミンチュ":[3.8,4.5,4.0,29.9],                       // 岡崎産業 公表値
 "L転生王女と天才令嬢の魔法革命":[4.5,4.5,3.3,32],
 "スマスロ モンスターハンターライズ：サンブレイク":[2.7,6.6,3.2,32],
 "スマスロ 獣王":[8.0,8.0,4.0,32],
 "スマスロパリピ孔明":[4.2,4.2,3.3,31],
 "花笠":[3.2,3.2,5.1,23.0],
 "スマート沖スロ スターハナハナ":[null,null,1.9,39.9],
};
const num=(s)=>{const m=String(s).match(/[\d.]+/);return m?parseFloat(m[0]):null;};
const parseJz=(s)=>{ if(!s||!/\d/.test(s)) return [null,null]; const ns=s.match(/\d+(?:\.\d+)?/g).map(Number); return [Math.min(...ns),Math.max(...ns)]; };
const fixName=(s)=>s.replace(/[（(]L?ヴヴヴ2[)）]|\(リベスロ\)|\(バーディーウィング\)|\(シスタークエスト\)|\(スカイラブ\)|\(ディ ノイエ テーゼ\)/g,'').replace(/™/g,'').replace(/\s+/g,' ').trim();
const out=[]; const nokana=[];
for(const p of ps){
  const f=p.f7||byName.get(manual[p.name]);
  let j1,j2,cu,cm;
  if(f){ [j1,j2]=parseJz(f.jz); cu=num(f.cu); cm=num(f.cm); }
  else if(extra[p.name]){ [j1,j2,cu,cm]=extra[p.name]; }
  else { console.error('NO DATA',p.name); }
  const name=fixName(p.name);
  const sr=f&&fsr.find(x=>x.t===f.name);
  const kana=sr&&sr.k||'';
  if(!kana) nokana.push(name);
  const type=p.type||(f&&f.type)||'';
  out.push({n:name,k:kana,a:'',i:p.img,mk:p.maker,ty:type,y:parseInt(p.day),d:p.day,j1,j2,cu,cm});
}
fs.writeFileSync('chars.json',JSON.stringify(out,null,1));
console.log(out.length,'nokana',nokana.length);
console.log(nokana.join('\n'));
