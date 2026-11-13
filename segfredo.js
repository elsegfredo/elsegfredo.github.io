// El Segfredo – kleine Helfer. Keine Cookies, kein Tracking, keine externen Anfragen.
(function () {
  // Menü auf dem Handy
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("hauptnav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Terminal tippt Zeile für Zeile (nur wenn Bewegung erwünscht ist)
  var term = document.getElementById("terminal");
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!term || calm) return;
  var lines = Array.prototype.slice.call(term.querySelectorAll("p"));
  var cursorLine = lines.pop();
  lines.forEach(function (p) { p.hidden = true; });

  function typeLine(p, done) {
    p.hidden = false;
    if (!p.classList.contains("t-cmd")) { setTimeout(done, 380); return; }
    var full = p.textContent;
    p.textContent = "";
    var i = 0;
    (function step() {
      p.textContent = full.slice(0, ++i);
      if (i < full.length) setTimeout(step, 45 + Math.random() * 40);
      else setTimeout(done, 450);
    })();
  }

  var n = 0;
  (function next() {
    if (n >= lines.length) return;
    typeLine(lines[n++], next);
  })();
  term.appendChild(cursorLine);
})();
