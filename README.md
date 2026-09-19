# スマスロゲッサー（公開版）

スマートパチスロ（スマスロ）の機種を、タイプ・メーカー・導入年・通常純増・最高純増・コイン単価・コイン持ちのヒントから当てる推理ゲーム（ポケゲッサー風）。
ルームコードで友達とオンライン対戦できます。

- 公開URL: https://so-sons.github.io/smaslo-guesser-open/
- 非公式ファンゲームです。機種データは [パチスロサミットONLINE](https://www.pachislot-summit.com/model/) のスマスロ機種一覧と [フリック7](https://flick7.net/ranking/coin-unit/) のメーカー公表値（コイン単価・コイン持ち・純増）を元にしています。
- 権利面の配慮から、筐体画像は使っていません。
- 対戦モードの通信は PeerJS（WebRTC）。サーバー不要。
- エンジンは [inaguesser](https://github.com/so-sons/inaguesser) / [smaslo-guesser](https://github.com/so-sons/smaslo-guesser)（カギ付き・画像あり版）と共通。

## カギ付き版との違い
| | smaslo-guesser（カギ付き版） | smaslo-guesser-open（この公開版） |
|---|---|---|
| アクセス | `#k=カギ` 付きリンクのみ | 誰でも |
| データ | `data.bin`（暗号化） | `data.js`（平文） |
| 画像 | あり | なし |
| 検索エンジン | noindex | 許可 |

## ファイル構成
| ファイル | 役割 |
|---|---|
| `config.js` | 題材ごとの設定（タイトル・ヒント項目・フィルター） |
| `data.js` | 機種データ（平文）。`smaslo-guesser` の `data.src.js` から画像URLを除いたもの |
| `loader.js` | `data.js` をゲームに渡すだけ（公開版はカギ検証なし） |
| `index.html` / `style.css` / `app.js` | 共通エンジン |
| `tools/` | 元データの生成スクリプト（`smaslo-guesser` と共通） |

## データ更新のしかた
`smaslo-guesser` 側で `data.src.js` を作り直したあと、画像URLを除いて `data.js` にする：
```bash
node -e "const fs=require('fs');const s=fs.readFileSync('../smaslo-guesser/data.src.js','utf8');const d=JSON.parse(s.slice(s.indexOf('{'),s.lastIndexOf('}')+1));d.chars.forEach(c=>delete c.i);fs.writeFileSync('data.js','window.SMASLO_DATA='+JSON.stringify(d)+';\n')"
git add -A && git commit -m "データ更新" && git push   # 約1分で GitHub Pages に反映
```
