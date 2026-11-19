(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Menu mobile */
  var burger = document.querySelector(".burger");
  var siteNav = document.getElementById("site-nav");
  if (burger && siteNav) {
    burger.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    siteNav.addEventListener("click", function (e) {
      if (e.target instanceof HTMLAnchorElement) {
        siteNav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && siteNav.classList.contains("is-open")) {
        siteNav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  /* 1+2. Fond hero : bulles SMS qui montent (désactivé si reduce-motion) */
  var bubbleBox = document.getElementById("hero-bubbles");
  if (bubbleBox && !reduceMotion) {
    for (var b = 0; b < 10; b++) {
      var s = document.createElement("span");
      var size = 14 + Math.random() * 30;
      s.className = "hero-bubble " + (b % 2 ? "violet" : "blue");
      s.style.left = (4 + Math.random() * 92) + "%";
      s.style.width = size + "px";
      s.style.height = (size * 0.7) + "px";
      s.style.animationDuration = (9 + Math.random() * 9) + "s";
      s.style.animationDelay = (-Math.random() * 14) + "s";
      bubbleBox.appendChild(s);
    }
  }

  /* 4. Hero : mot rotatif + frappe auto */
  var words = document.querySelectorAll(".rotator-word");
  var wi = 0;
  if (words.length > 1 && !reduceMotion) {
    setInterval(function () {
      words[wi].classList.remove("is-active");
      wi = (wi + 1) % words.length;
      words[wi].classList.add("is-active");
    }, 2600);
  } else if (words.length > 1) {
    for (var k = 1; k < words.length; k++) words[k].hidden = true;
  }
  var heroTyped = document.getElementById("hero-typed");
  var heroCount = document.getElementById("hero-count");
  var heroMsg = "Bonjour Charles, -20% ce samedi avec le code promo 'PROMO1234'. Profitez en rapidement !";
  if (heroTyped && !reduceMotion) {
    var i = 0;
    var timer = setInterval(function () {
      i++;
      heroTyped.textContent = heroMsg.slice(0, i);
      if (heroCount) heroCount.textContent = i + "/160";
      if (i >= heroMsg.length) clearInterval(timer);
    }, 45);
  } else if (heroTyped) {
    heroTyped.textContent = heroMsg;
    if (heroCount) heroCount.textContent = heroMsg.length + "/160";
  }

  /* 1. Simulateur SMS live */
  var simSender = document.getElementById("sim-sender");
  var simText = document.getElementById("sim-text");
  var simPrenom = document.getElementById("sim-prenom");
  var simCode = document.getElementById("sim-code");
  var simPrevSender = document.getElementById("sim-preview-sender");
  var simPrevText = document.getElementById("sim-preview-text");
  var simCount = document.getElementById("sim-count");
  var simWarn = document.getElementById("sim-warn");
  function renderSim() {
    if (!simText) return;
    var sender = (simSender.value || "MA-BOUTIQUE").toUpperCase().slice(0, 11);
    var prenom = (simPrenom && simPrenom.value.trim()) || "Charles";
    var code = (simCode && simCode.value.trim()) || "PROMO1234";
    var text = simText.value.split("{prenom}").join(prenom).split("{code}").join(code);
    simPrevSender.textContent = sender || "MA-BOUTIQUE";
    simPrevText.textContent = text;
    var n = text.length;
    simCount.textContent = n + "/160";
    simCount.classList.toggle("over", n > 160);
    simWarn.hidden = n <= 160;
  }
  if (simText) {
    simSender.addEventListener("input", renderSim);
    simText.addEventListener("input", renderSim);
    if (simPrenom) simPrenom.addEventListener("input", renderSim);
    if (simCode) simCode.addEventListener("input", renderSim);
    renderSim();
  }

  /* Onglets génériques (cas d'usage + code) */
  function wireTabs(tabAttr, panelAttr) {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-' + tabAttr + ']'));
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activateTab(tabs, tab, tabAttr, panelAttr);
      });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          e.preventDefault();
          activateTab(tabs, next, tabAttr, panelAttr);
          next.focus();
        }
      });
    });
  }
  function activateTab(tabs, tab, tabAttr, panelAttr) {
    var scope = tab.closest("section");
    tabs.forEach(function (t) {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
      t.setAttribute("tabindex", "-1");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    scope.querySelectorAll('[data-' + panelAttr + ']').forEach(function (p) {
      var show = p.getAttribute("data-" + panelAttr) === tab.getAttribute("data-" + tabAttr);
      p.hidden = !show;
      p.classList.toggle("is-active", show);
    });
  }
  wireTabs("tab", "panel");
  wireTabs("code", "codeblock");

  /* Boutons copier */
  document.querySelectorAll(".copy[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(btn.getAttribute("data-copy")).then(function () {
        btn.textContent = "Copié !";
        btn.setAttribute("role", "status");
        setTimeout(function () { btn.textContent = "Copier"; }, 1500);
      });
    });
  });
  var copyCode = document.getElementById("copy-code");
  if (copyCode) {
    copyCode.addEventListener("click", function () {
      var visible = document.querySelector("pre[data-codeblock]:not([hidden]) code");
      if (!visible) return;
      navigator.clipboard.writeText(visible.textContent).then(function () {
        copyCode.textContent = "Copié !";
        copyCode.setAttribute("role", "status");
        setTimeout(function () { copyCode.textContent = "Copier"; }, 1500);
      });
    });
  }

  /* 2. Simulateur tarifs par pays (page Tarifs : pays + volume -> cout par service) */
  var TIERS_CI = [
    { units: 100, price: 2000 },
    { units: 1000, price: 15000 },
    { units: 5000, price: 60000 },
    { units: 10000, price: 100000 }
  ];
  var simPays = document.getElementById("sim-pays");
  var simRange = document.getElementById("sim-range");
  var simVol = document.getElementById("sim-vol");
  var simResult = document.getElementById("sim-result");
  var simResultWa = document.getElementById("sim-result-wa");
  var simCta = document.getElementById("sim-cta");
  function fmt(n) { return n.toLocaleString("fr-FR").replace(/,/g, " "); }
  function renderSimTarif() {
    if (!simRange) return;
    var vol = parseInt(simRange.value, 10);
    var pays = simPays ? simPays.value : "ci";
    if (simVol) simVol.textContent = fmt(vol) + " messages";
    simRange.setAttribute("aria-valuetext", fmt(vol) + " messages par mois");
    var smsText;
    if (pays === "ci") {
      var pick = null;
      for (var j = 0; j < TIERS_CI.length; j++) {
        if (TIERS_CI[j].units >= vol) { pick = TIERS_CI[j]; break; }
      }
      if (pick) {
        smsText = "SMS — Côte d’Ivoire : pack " + fmt(pick.units) + " unités, " + fmt(pick.price) + " FCFA (" + fmt(pick.price / pick.units) + " FCFA/unité)";
      } else {
        smsText = "SMS — Côte d’Ivoire : au-delà de 10 000 unités, devis volume.";
      }
    } else {
      smsText = "SMS — Afrique : " + fmt(vol * 25) + " FCFA (25 FCFA/unité)";
    }
    if (simResult) simResult.textContent = smsText;
    if (simResultWa) simResultWa.textContent = "WhatsApp : " + fmt(vol * 3) + " FCFA (3 FCFA/message)";
    if (vol > 10000) {
      if (simCta) { simCta.textContent = "Discuter sur WhatsApp"; simCta.setAttribute("href", "https://wa.me/2250708616289"); }
    } else {
      if (simCta) { simCta.textContent = "Tester gratuitement"; simCta.setAttribute("href", "https://app.izi-sendz.cloud/signup"); }
    }
  }
  if (simRange) {
    simRange.addEventListener("input", renderSimTarif);
    if (simPays) simPays.addEventListener("change", renderSimTarif);
    renderSimTarif();
  }

  /* 5. Reveal on scroll + scrollspy + retour haut */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
  var spyLinks = document.querySelectorAll('.nav a[href^="#"]');
  var spyMap = {};
  spyLinks.forEach(function (a) { spyMap[a.getAttribute("href").slice(1)] = a; });
  var spySections = Object.keys(spyMap).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ("IntersectionObserver" in window && spySections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          spyLinks.forEach(function (a) { a.classList.remove("is-active"); });
          var link = spyMap[e.target.id];
          if (link) link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    spySections.forEach(function (s) { spy.observe(s); });
  }
  var toTop = document.getElementById("to-top");
  window.addEventListener("scroll", function () {
    if (toTop) toTop.classList.toggle("is-show", window.scrollY > 600);
  }, { passive: true });
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
})();
