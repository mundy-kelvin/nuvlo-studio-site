// Nuvlo Studio — small progressive enhancements. The site works without this file.
(function () {
  var root = document.documentElement;
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Theme toggle (the stored choice is applied by the inline script in <head>).
  var toggle = document.querySelector('.theme');
  function label() {
    var light = root.getAttribute('data-theme') === 'light';
    toggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  }
  if (toggle) {
    label();
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });
  }

  // Header hides while scrolling down and returns when scrolling up.
  var header = document.querySelector('header.site');
  var lastY = window.scrollY;
  if (header) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      header.classList.toggle('is-hidden', y > lastY && y > 160);
      lastY = y;
    }, { passive: true });
    header.addEventListener('focusin', function () { header.classList.remove('is-hidden'); });
  }

  if (calm || !finePointer) return;

  // Hero: tiles drift with the pointer, each at its own depth.
  var hero = document.querySelector('.hero');
  if (hero) {
    var tiles = hero.querySelectorAll('.tiles .art');
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var dx = (e.clientX - r.left) / r.width - 0.5;
      var dy = (e.clientY - r.top) / r.height - 0.5;
      tiles.forEach(function (t, i) {
        var depth = 14 + (i % 4) * 10;
        t.style.transform = 'translate(' + (-dx * depth).toFixed(1) + 'px,' + (-dy * depth).toFixed(1) + 'px)';
      });
    });
  }
})();
