// ARCHIVE (2026): the 2019 game loaded jQuery only for $.post calls to a PHP
// leaderboard that no longer exists. This stub keeps those calls from erroring
// so the game code itself stays exactly as it was.
window.$ = window.jQuery = {
  post: function () {
    /* leaderboard retired */
  },
};
