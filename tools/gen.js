const fs=require('fs');
const chars=JSON.parse(fs.readFileSync('chars.json','utf8'));
const {kana,alias}=require('./kana.js');
const TYPE_OVERRIDE=require('./type-override.js');
const norm=(s)=>s.normalize('NFKC').replace(/[\s～〜~]/g,'');
const kmap=new Map(Object.entries(kana).map(([k,v])=>[norm(k),v]));
const amap=new Map(Object.entries(alias).map(([k,v])=>[norm(k),v]));
const used=new Set();
const BRAND={
  '銀座':'サミー','タイヨーエレック':'サミー','ロデオ':'サミー',
  'ミズホ':'ユニバーサル','メーシー':'ユニバーサル','エレコ':'ユニバーサル','アクロス':'ユニバーサル','ユニバーサルブロス':'ユニバーサル',
  'オリンピア':'平和','オリンピアエステート':'平和','アムテックス':'平和',
  'ジェイビー':'SANKYO',
  'KPE':'コナミアミューズメント','グレードワン':'コナミアミューズメント','ファイトクラブ':'コナミアミューズメント',
  '山佐ネクスト':'山佐','セブンリーグ':'山佐',
  'パオン・ディーピー':'大都技研','サボハニ':'大都技研',
  'ピーセカンド':'パイオニア',
  'オーゼキ':'ネット','カルミナ':'ネット',
  'JFJ':'藤商事','オレンジ':'藤商事',
  'サンスリー':'三洋物産',
  'レオスター':'エンターライズ',
  'SUN SUN SUN':'京楽','京楽産業.':'京楽',
  'EXCITE':'ニューギン',
  'ヤーマ':'ベルコ',
  'オーイズミラボ':'オーイズミ',
  'アイドル':'Daiichi',
  'オッケー.':'オッケー',
};
const years=["2022","2023","2024","2025","2026"];
const f1=(n)=>n==null?null:n.toFixed(1);
const out=chars.map(c=>{
  const key=norm(c.n);
  const k=c.k||kmap.get(key)||''; if(!k) console.error('NO KANA',c.n);
  const a=amap.get(key)||''; if(a) used.add(key);
  return { n:c.n, k, a, i:c.i, mk:BRAND[c.mk]||c.mk, mk0:c.mk, ty:TYPE_OVERRIDE[c.n]||c.ty,
    yi: years.indexOf(String(c.y)), d:c.d,
    j1: c.j1==null?null:f1(c.j1)+'枚/G', j1n:c.j1,
    j2: c.j2==null?null:f1(c.j2)+'枚/G', j2n:c.j2,
    cu: c.cu==null?null:c.cu.toFixed(2).replace(/0$/,'')+'円', cun:c.cu,
    cm: c.cm==null?null:f1(c.cm)+'G', cmn:c.cm };
});
for(const k of amap.keys()) if(!used.has(k)) console.error('ALIAS UNUSED',k);
out.sort((x,y)=>x.d<y.d?1:-1);
const data={lists:{years:years.map(y=>y+'年')},chars:out};
fs.writeFileSync('data.src.js','// パチスロサミットONLINE (pachislot-summit.com) のスマスロ機種一覧と フリック7 (flick7.net) の公表値を元に生成\nwindow.SMASLO_DATA='+JSON.stringify(data)+';\n');
console.log(out.length, out[0], out[100]);
const cnt=(k)=>{const c={};out.forEach(o=>c[o[k]]=(c[o[k]]||0)+1);return c;};
console.log(cnt('ty'),cnt('yi'),cnt('j1'));
