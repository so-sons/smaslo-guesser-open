/* ================================================================
   題材ごとの設定ファイル（スマスロ版・公開リンク版）
   別のアニメ・作品で作るときは、基本的にこのファイルと data.src.js だけを差し替える。
   （app.js / loader.js / index.html / style.css は共通エンジン）
   ================================================================ */
window.GAME_CONFIG = {
  // --- 識別子（localStorage と PeerJS ルームIDの接頭辞。題材ごとに必ず変える） ---
  id: "smaslo-guesser-open",
  // --- 公開URL ---
  siteUrl: "https://so-sons.github.io/smaslo-guesser-open/",

  // --- 見た目の文言 ---
  title: "スマスロゲッサー",
  kicker: "SMART PACHISLOT MACHINE GUESSER",
  heroTitle: "スマスロの機種を\nスペックのヒントから当てよう",
  itemLabel: "機種",        // 「機種名を入力」「メイン機種のみ」などに使う
  unit: "機種",             // 候補数の単位
  credit: "非公式ファンゲームです。機種データは",
  creditLink: { label: "パチスロサミットONLINE", url: "https://www.pachislot-summit.com/model/" },
  creditTail: "の機種一覧と フリック7 (flick7.net) のメーカー公表値を元にしています。",

  // --- ルール ---
  soloMax: 10,               // ひとりで遊ぶの回数制限
  maxPlayers: 4,             // 対戦の最大人数

  // --- 画像（公開版は権利面の配慮で画像なし） ---
  imageBase: "",
  imageExt: "",

  // --- 機種データの読み方 ---
  fields: { name: "n", kana: "k", alias: "a", image: null, main: null },
  // 候補リストの右側に出す補足（任意）
  suggestSub: (c) => c.mk + "・" + c.d.slice(0, 4),

  // --- ヒント項目（この順でタイルが並ぶ） ---
  //  type: "exact"   … 一致 / 不一致
  //        "ordinal" … 順序あり。orderKey（数値）で ▲▼ を出す。labels を指定すると表示名を data.lists から引く
  attrs: [
    { key: "ty",  label: "タイプ",   type: "exact" },
    { key: "mk",  label: "メーカー", type: "exact" },
    { key: "yi",  label: "導入年",   type: "ordinal", labels: "years", up: "正解はもっと後の年", down: "正解はもっと前の年" },
    { key: "j1",  label: "通常純増", type: "ordinal", orderKey: "j1n", up: "正解はもっと多い", down: "正解はもっと少ない" },
    { key: "j2",  label: "最高純増", type: "ordinal", orderKey: "j2n", up: "正解はもっと多い", down: "正解はもっと少ない" },
    { key: "cu",  label: "コイン単価", type: "ordinal", orderKey: "cun", up: "正解はもっと高い", down: "正解はもっと安い" },
    { key: "cm",  label: "コイン持ち", fullLabel: "コイン持ち（50枚あたり）", type: "ordinal", orderKey: "cmn", up: "正解はもっと多い", down: "正解はもっと少ない" },
  ],

  // --- 出題範囲フィルター（チェックボックス）。不要なら null ---
  filter: { key: "yi", label: "出題範囲（導入年）", options: "years" },

  // --- 難易度（main フラグ）。不要なら null ---
  difficulty: null,

  // --- ルール説明の補足 ---
  notes: [
    "純増が「2.7 or 5.0枚/G」のように複数ある機種は、最小値を通常純増・最大値を最高純増としています。1種類のみの機種は両方同じ値です。",
    "純増・コイン単価・コイン持ちはメーカー公表値。ボーナストリガー機・ノーマル機など純増が公表されていない機種は「-」（矢印なし）になります。",
    "メーカーは販売ブランドでまとめています（例：銀座・タイヨーエレック・ロデオ→サミー、ミズホ・メーシー・エレコ→ユニバーサル、オリンピア→平和、KPE→コナミアミューズメント、山佐ネクスト・セブンリーグ→山佐）。",
  ],
};
