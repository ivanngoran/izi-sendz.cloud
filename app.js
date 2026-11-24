(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var TICKS = '<svg class="ticks" viewBox="0 0 18 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m1 6 3.5 3.5L11 3"/><path d="m7 9.5.5.5L14 3"/></svg>';

  /* ---------- Header, menu mobile, flottants ---------- */
  var header = $("#header");
  var toTop = $("#to-top");
  var mobileCta = $("#mobile-cta");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    document.body.classList.toggle("scrolled", y > 24);
    if (toTop) toTop.classList.toggle("is-show", y > 700);
    if (mobileCta) mobileCta.classList.toggle("is-show", y > 520);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });

  var burger = $("#burger"), drawer = $("#drawer");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    document.body.style.overflow = open ? "hidden" : "";
    if (header && open) header.classList.add("is-scrolled");
    if (!open) onScroll();
  }
  if (burger && drawer) {
    burger.addEventListener("click", function () { setDrawer(!drawer.classList.contains("is-open")); });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) setDrawer(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) { setDrawer(false); burger.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 960) setDrawer(false); });
  }

  /* ---------- Hero : conversations qui défilent ---------- */
  var SCENES = [
    { sender: "MA-BOUTIQUE", sub: "Expéditeur vérifié", av: "MB", ch: "sms",
      msgs: [{ t: "Bonjour Awa, -20% ce samedi avec le code promo 'WEEKEND20'. Profitez-en vite !", at: "09:00" }],
      life: ["Enregistré", "Envoyé", "Livré"], status: "Livré", time: "Accusé reçu · 09:00" },
    { sender: "Clinique Les Palmiers", sub: "Compte professionnel", av: "CP", ch: "wa",
      msgs: [{ t: "Bonjour M. Koné, rappel : RDV demain à 10h. Répondez OUI pour confirmer.", at: "18:30" },
             { t: "OUI", me: true, at: "18:32" },
             { t: "Merci, votre rendez-vous est confirmé. À demain !", at: "18:32" }],
      life: ["Envoyé", "Livré", "Lu"], status: "Lu · Confirmé", time: "Réponse automatique · 18:32" },
    { sender: "MA-BANQUE", sub: "Expéditeur vérifié", av: "MB", ch: "sms",
      msgs: [{ t: "Votre code de connexion : 482913. Il expire dans 5 min. Ne le partagez avec personne.", at: "14:07" }],
      life: ["Enregistré", "Envoyé", "Livré"], status: "OTP livré", time: "Repli SMS · 14:07" }
  ];
  var screen = $("#hero-screen"), chat = $("#hero-chat");
  function bubbleHTML(m, ch) {
    var tick = m.me ? "" : (ch === "wa" ? TICKS.replace('class="ticks"', 'class="ticks read"') : "");
    return '<span class="txt"></span><span class="meta">' + m.at + " " + tick + "</span>";
  }
  function playScene(i) {
    var s = SCENES[i];
    screen.classList.toggle("wa-theme", s.ch === "wa");
    $("#hero-sender").textContent = s.sender;
    $("#hero-sub").textContent = s.sub;
    $("#hero-avatar").textContent = s.av;
    var chan = $("#hero-chan");
    chan.textContent = s.ch === "wa" ? "WhatsApp" : "SMS";
    chan.classList.toggle("wa", s.ch === "wa");
    var life = $("#fc-life");
    life.innerHTML = s.life.map(function (l) { return "<span>" + l + "</span>"; }).join("");
    chat.innerHTML = '<span class="chat-day">Aujourd\'hui</span>';
    var delay = 400;
    s.msgs.forEach(function (m) {
      setTimeout(function () {
        var typing = document.createElement("div");
        typing.className = "bubble typing" + (m.me ? " me" : "");
        typing.innerHTML = "<i></i><i></i><i></i>";
        chat.appendChild(typing);
        setTimeout(function () {
          typing.className = "bubble" + (m.me ? " me" : "");
          typing.innerHTML = bubbleHTML(m, s.ch);
          $(".txt", typing).textContent = m.t;
        }, 900);
      }, delay);
      delay += 1900;
    });
    var spans = $$("span", life);
    spans.forEach(function (sp, k) { setTimeout(function () { sp.classList.add("on"); }, 500 + k * 700); });
    setTimeout(function () { $("#fc-status").textContent = s.status; $("#fc-time").textContent = s.time; }, 500 + spans.length * 700);
  }
  if (screen && chat && !reduceMotion) {
    var scene = 0;
    setTimeout(function loop() {
      scene = (scene + 1) % SCENES.length;
      playScene(scene);
      setTimeout(loop, 7000);
    }, 4500);
    // Légère inclinaison du téléphone au survol
    var phone = $("#hero-phone"), stage = $(".hero-stage");
    if (phone && stage && window.matchMedia("(pointer: fine)").matches) {
      stage.addEventListener("pointermove", function (e) {
        var r = stage.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        phone.style.transform = "rotateY(" + (-12 + x * 14) + "deg) rotateX(" + (4 - y * 10) + "deg)";
      });
      stage.addEventListener("pointerleave", function () { phone.style.transform = ""; });
    }
  }

  /* ---------- Studio : simulateur de message ---------- */
  var simText = $("#sim-text");
  if (simText) {
    var simSender = $("#sim-sender"), simPrenom = $("#sim-prenom"), simCode = $("#sim-code");
    var simScreen = $("#sim-screen"), channel = "sms";
    function renderSim() {
      var sender = (simSender.value || "MA-BOUTIQUE").slice(0, 11);
      if (channel === "sms") sender = sender.toUpperCase();
      var text = simText.value
        .split("{prenom}").join(simPrenom.value.trim() || "Awa")
        .split("{code}").join(simCode.value.trim() || "WEEKEND20");
      $("#sim-preview-sender").textContent = sender;
      $("#sim-avatar").textContent = sender.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "IZ";
      $("#sim-preview-text").textContent = text || "Votre message apparaîtra ici.";
      var n = text.length;
      var bar = $("#sim-bar");
      if (channel === "sms") {
        var units = n <= 160 ? 1 : Math.ceil(n / 153);
        $("#sim-count").textContent = n + "/160";
        $("#sim-units").textContent = units + (units > 1 ? " unités" : " unité");
        $("i", bar).style.width = Math.min(100, (n / 160) * 100) + "%";
        bar.classList.toggle("over", n > 160);
        $("#sim-warn").hidden = n <= 160;
      } else {
        $("#sim-count").textContent = String(n);
        $("#sim-units").textContent = "1 message WhatsApp";
        $("i", bar).style.width = Math.min(100, (n / 1024) * 100) + "%";
        bar.classList.remove("over");
        $("#sim-warn").hidden = true;
      }
    }
    function setChannel(ch) {
      channel = ch;
      $$(".seg button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-ch") === ch ? "true" : "false"); });
      simScreen.classList.toggle("wa-theme", ch === "wa");
      var chan = $("#sim-chan");
      chan.textContent = ch === "wa" ? "WhatsApp" : "SMS";
      chan.classList.toggle("wa", ch === "wa");
      $("#sim-preview-sub").textContent = ch === "wa" ? "Compte professionnel" : "Expéditeur vérifié";
      $("#sim-sender-hint").textContent = ch === "wa" ? "Nom de votre compte" : "11 caractères max";
      $("#sim-ticks").innerHTML = ch === "wa" ? TICKS.replace('class="ticks"', 'class="ticks read"') : "";
      $("#sim-bubble").classList.toggle("me", false);
      renderSim();
    }
    $$(".seg button").forEach(function (b) { b.addEventListener("click", function () { setChannel(b.getAttribute("data-ch")); }); });
    $$("[data-insert]").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-insert"), s = simText.selectionStart, e = simText.selectionEnd;
        simText.value = simText.value.slice(0, s) + v + simText.value.slice(e);
        simText.focus();
        simText.setSelectionRange(s + v.length, s + v.length);
        renderSim();
      });
    });
    [simSender, simText, simPrenom, simCode].forEach(function (el) { el.addEventListener("input", renderSim); });
    setChannel("sms");
  }

  /* ---------- Onglets accessibles ---------- */
  function wireTabs(tabs, getPanels, attr) {
    function activate(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.setAttribute("tabindex", on ? "0" : "-1");
      });
      getPanels().forEach(function (p) { p.hidden = p.getAttribute(attr.panel) !== tab.getAttribute(attr.tab); });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { activate(tab); });
      tab.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") n = tabs[0];
        if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); activate(n, true); }
      });
    });
  }
  var ucTabs = $$(".tabs [data-tab]");
  if (ucTabs.length) wireTabs(ucTabs, function () { return $$("[data-panel]"); }, { tab: "data-tab", panel: "data-panel" });
  $$(".term").forEach(function (term) {
    var tabs = $$("[data-code]", term);
    if (tabs.length) wireTabs(tabs, function () { return $$("pre[data-codeblock]", term); }, { tab: "data-code", panel: "data-codeblock" });
  });

  /* ---------- Copier ---------- */
  function copyText(text, btn, label) {
    function done(ok) {
      btn.textContent = ok ? "Copié !" : "Sélectionné";
      setTimeout(function () { btn.textContent = label; }, 1600);
    }
    try {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    } catch (e) { done(false); }
  }
  $$("[data-copy]").forEach(function (b) {
    var label = b.textContent;
    b.addEventListener("click", function () { copyText(b.getAttribute("data-copy"), b, label); });
  });
  $$("[data-copy-code]").forEach(function (b) {
    var label = b.textContent;
    b.addEventListener("click", function () {
      var pre = $("pre[data-codeblock]:not([hidden]) code", b.closest(".term"));
      if (!pre) return;
      copyText(pre.textContent, b, label);
      var r = document.createRange(); r.selectNodeContents(pre);
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
    });
  });

  /* ---------- Coloration syntaxique légère ---------- */
  var KW = /\b(const|await|var|using|new|import|true|false|null|echo|print|method|headers|body)\b/g;
  $$("pre[data-hl] code").forEach(function (code) {
    var src = code.textContent;
    var out = "", re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\$\w+|\b[A-Z_]{4,}\b)|(\b\d+\b)/g, last = 0, m;
    function escp(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
    function plain(s) { return escp(s).replace(KW, '<span class="k">$1</span>'); }
    while ((m = re.exec(src))) {
      out += plain(src.slice(last, m.index));
      if (m[1]) out += '<span class="s">' + escp(m[1]) + "</span>";
      else if (m[2]) out += '<span class="f">' + escp(m[2]) + "</span>";
      else out += '<span class="n">' + m[3] + "</span>";
      last = re.lastIndex;
    }
    code.innerHTML = out + plain(src.slice(last));
  });

    /* ---------- Tarifs par pays (data/pricing.json) ---------- */
  var finder = $("#price-finder");
  if (finder) {
    var sel = $("#pf-country"), range = $("#pf-range"), table = $("#pf-table"), search = $("#pf-search");
    var DATA = null, byCode = {}, detected = null;
    var STORE = "izi-pays";
    var curNames = null;
    try { curNames = new Intl.DisplayNames(["fr"], { type: "currency" }); } catch (e) {}
    var strip = function (t) { return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
    var money = function (v, cur) {
      var o = { style: "currency", currency: cur };
      if (v >= 100) { o.minimumFractionDigits = 0; o.maximumFractionDigits = 0; }
      else if (v < 1) { o.maximumSignificantDigits = 2; }
      try { return new Intl.NumberFormat("fr-FR", o).format(v); }
      catch (e) { return (Math.round(v * 100) / 100).toLocaleString("fr-FR") + " " + cur; }
    };
    var conv = function (xof, cur) { var r = DATA.rates.ratesPerEUR; return xof / r.XOF * r[cur]; };
    var trio = function (xof, cur) { return money(conv(xof, cur), cur) + " · " + money(conv(xof, "EUR"), "EUR") + " · " + money(conv(xof, "USD"), "USD"); };
    var out = function (k, v) { $$('[data-out="' + k + '"]', finder).forEach(function (el) { el.textContent = v; }); };
    var detect = function () {
      var tz = "";
      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
      for (var i = 0; i < DATA.countries.length; i++) if (DATA.countries[i].timezones.indexOf(tz) !== -1) return DATA.countries[i].code;
      var langs = navigator.languages || [navigator.language || ""];
      for (var j = 0; j < langs.length; j++) {
        var m = /[-_]([A-Za-z]{2})$/.exec(langs[j] || "");
        if (m && byCode[m[1].toUpperCase()]) return m[1].toUpperCase();
      }
      return null;
    };
    var render = function () {
      var c = byCode[sel.value] || byCode[DATA.defaultCountry];
      var vol = parseInt(range.value, 10);
      var nb = new Intl.NumberFormat("fr-FR").format(vol).replace(/\u202f/g, "\u00a0");
      $("#pf-vol").textContent = nb;
      range.setAttribute("aria-valuetext", nb + " messages par mois");
      out("vol", nb);
      [["sms", c.sms], ["wa", c.whatsapp]].forEach(function (x) {
        out(x[0] + "-local", money(conv(x[1], c.currency), c.currency));
        out(x[0] + "-eur", money(conv(x[1], "EUR"), "EUR"));
        out(x[0] + "-usd", money(conv(x[1], "USD"), "USD"));
        out(x[0] + "-tot", trio(x[1] * vol, c.currency));
      });
      var name = curNames ? curNames.of(c.currency) : c.currency;
      $("#pf-currency").textContent = "Monnaie locale : " + name + " · " + c.currency;
      $("#pf-detected").hidden = c.code !== detected;
    };
    var filter = function () {
      if (!search || !table) return;
      var q = strip(search.value.trim());
      $$("tr", table).forEach(function (tr) { tr.hidden = !!q && strip(tr.getAttribute("data-name")).indexOf(q) === -1; });
    };
    var renderTable = function () {
      if (!table) return;
      table.innerHTML = DATA.countries.map(function (c) {
        var cells = [c.sms, c.whatsapp].map(function (p) {
          return '<td class="num">' + money(conv(p, c.currency), c.currency) + '</td><td class="num">' + money(conv(p, "EUR"), "EUR") + '</td><td class="num">' + money(conv(p, "USD"), "USD") + "</td>";
        }).join("");
        return '<tr data-code="' + c.code + '" data-name="' + c.name + '"' + (c.code === sel.value ? ' class="is-current"' : "") + "><td>" + c.name + "</td><td><code>" + c.currency + "</code></td>" + cells + "</tr>";
      }).join("");
      filter();
    };
    fetch(finder.getAttribute("data-pricing-src")).then(function (r) { return r.json(); }).then(function (d) {
      DATA = d;
      d.countries.forEach(function (c) { byCode[c.code] = c; });
      sel.innerHTML = d.countries.map(function (c) { return '<option value="' + c.code + '">' + c.name + "</option>"; }).join("");
      detected = detect();
      var saved = null;
      try { saved = localStorage.getItem(STORE); } catch (e) {}
      sel.value = (saved && byCode[saved]) ? saved : (detected || d.defaultCountry);
      var p = d.rates.updatedAt.split("-");
      $("#pf-date").textContent = p[2] + "/" + p[1] + "/" + p[0];
      sel.addEventListener("change", function () {
        try { localStorage.setItem(STORE, sel.value); } catch (e) {}
        render(); renderTable();
      });
      range.addEventListener("input", render);
      if (search) search.addEventListener("input", filter);
      if (table) table.addEventListener("click", function (e) {
        var tr = e.target.closest("tr[data-code]");
        if (!tr) return;
        sel.value = tr.getAttribute("data-code");
        sel.dispatchEvent(new Event("change"));
        finder.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      });
      render(); renderTable();
    }).catch(function () { /* la version statique (Côte d'Ivoire) reste affichée */ });
  }

})();
