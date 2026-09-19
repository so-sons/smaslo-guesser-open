/* 公開版：カギなし。data.js（平文）の window.SMASLO_DATA をそのままゲームに渡す */
(() => {
  document.getElementById("gate").hidden = true;
  document.getElementById("app").hidden = false;
  window.GAME_START(window.SMASLO_DATA);
})();
