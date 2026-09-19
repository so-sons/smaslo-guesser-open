# データ生成スクリプト

`data.src.js` を作り直すときの手順（Node のみ。作業ディレクトリは `tools/`）。

```bash
cd tools
# 1) パチスロサミットONLINE のスマスロ機種一覧（11ページ）を取得 → ps1.html … ps11.html
for i in $(seq 1 11); do curl -sL -A "Mozilla/5.0" "https://www.pachislot-summit.com/model/?freeword&unit%5B0%5D=%E3%82%B9%E3%83%9E%E3%82%B9%E3%83%AD&marker&type&day_year&day_month&paged=$i" -o ps$i.html; done
node parse-ps.js            # → ps.json（名前・導入日・メーカー・タイプ・画像URL）
# 2) フリック7 のコイン単価ランキング（公表値）と機種検索（かな）を取得
curl -sL -A "Mozilla/5.0" https://flick7.net/ranking/coin-unit/ -o f1.html
curl -sL -A "Mozilla/5.0" https://flick7.net/search/ -o fs.html
node parse-f7.js            # → f7.json（コイン単価・コイン持ち・純増）
node -e "const s=require('fs').readFileSync('fs.html','utf8');const i=s.indexOf('[{\"t\":');require('fs').writeFileSync('f7search.json',s.slice(i,s.indexOf('}]',i)+2).replace(/&amp;/g,'&'))"
# 3) 名前でつき合わせ → merged.json（合わなかった機種は match.js の出力を見て build.js の manual / extra に追記）
node match.js
node build.js               # → chars.json（kana.js に無いかなは手入力）
node gen.js                 # → data.src.js（メーカーは gen.js の BRAND 表で販売ブランドに統合、タイプは type-override.js で上書き）
# 4) 画像URLの接頭辞を config.imageBase に合わせて削り、リポジトリ直下へ
node -e "const fs=require('fs');fs.writeFileSync('../data.src.js',fs.readFileSync('data.src.js','utf8').split('https://www.pachislot-summit.com/wp/wp-content/uploads/').join(''))"
cd .. && node build-data.js
```

純増「a or b枚/G」は最小値を通常純増、最大値を最高純増にする。BT機・ノーマル機など純増が無いものは null。
