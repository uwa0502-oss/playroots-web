/* Plaroots 共通メニュー（スマホ用）
   上部メニューが隠れる画面幅で「メニュー」ボタンを表示し、主要ページへのリンクを開閉します。
   メニュー項目を変えるときは、下の MENUS を書き換えてください（全ページに反映されます）。 */
(function () {
  var IG = "https://www.instagram.com/plaroots.uwa/";
  var MENUS = {
    site: {
      links: [
        ["HOME", "index.html"],
        ["Plarootsとは", "index.html#about"],
        ["4つの活動", "index.html#services"],
        ["商品", "index.html#products"],
        ["実績・活動", "index.html#works"],
        ["遊び場・空間づくり", "asobi.html"],
        ["安全へのこだわり", "safety.html"],
        ["会社概要", "company.html"],
        ["オンラインショップ", "../kodomo-shop/index.html"],
        ["Instagram", IG]
      ],
      cta: ["ご相談する", "contact.html"]
    },
    shop: {
      links: [
        ["ショップTOP", "index.html"],
        ["木のおもちゃの選び方", "guide.html"],
        ["年齢別ギフト特集", "gift.html"],
        ["安全へのこだわり", "../kodomo-site/safety.html"],
        ["企業サイト", "../kodomo-site/index.html"],
        ["運営会社", "../kodomo-site/company.html"],
        ["Instagram", IG]
      ],
      cta: ["ご相談する", "../kodomo-site/contact.html"]
    }
  };

  var menu = /\/kodomo-shop\//.test(location.pathname) ? MENUS.shop : MENUS.site;
  var header = document.querySelector(".nav-in, .head-in");
  if (!header) return;

  var css = document.createElement("style");
  css.textContent =
    ".mnav-btn{display:none;flex:none;width:44px;height:44px;margin-left:10px;border:1.5px solid #EAE4D7;border-radius:12px;background:#fff;cursor:pointer;align-items:center;justify-content:center;padding:0}" +
    ".mnav-btn span{display:block;width:18px;height:2px;background:#5C7253;border-radius:2px;position:relative;transition:transform .2s ease,background .2s ease}" +
    ".mnav-btn span::before,.mnav-btn span::after{content:'';position:absolute;left:0;width:18px;height:2px;background:#5C7253;border-radius:2px;transition:transform .2s ease}" +
    ".mnav-btn span::before{top:-6px}.mnav-btn span::after{top:6px}" +
    ".mnav-btn[aria-expanded=true] span{background:transparent}" +
    ".mnav-btn[aria-expanded=true] span::before{transform:translateY(6px) rotate(45deg)}" +
    ".mnav-btn[aria-expanded=true] span::after{transform:translateY(-6px) rotate(-45deg)}" +
    ".mnav-on .mnav-btn{display:inline-flex}" +
    ".mnav-panel{position:fixed;left:0;right:0;z-index:100;background:#FBF9F5;border-top:1px solid #EAE4D7;box-shadow:0 18px 30px -18px rgba(59,56,47,.35);overflow-y:auto;padding:8px 22px 24px}" +
    ".mnav-panel[hidden]{display:none}" +
    ".mnav-panel a.mnav-link{display:flex;justify-content:space-between;align-items:center;padding:15px 4px;border-bottom:1px solid #EAE4D7;color:#3B382F;text-decoration:none;font-family:'Zen Maru Gothic','Noto Sans JP',sans-serif;font-weight:700;font-size:15.5px}" +
    ".mnav-panel a.mnav-link::after{content:'→';color:#7D9471;font-weight:400}" +
    ".mnav-panel a.mnav-cta{display:block;margin-top:20px;text-align:center;background:#7D9471;color:#fff;border-radius:999px;padding:15px;text-decoration:none;font-family:'Zen Maru Gothic','Noto Sans JP',sans-serif;font-weight:700;font-size:15px}" +
    "@media(prefers-reduced-motion:reduce){.mnav-btn span,.mnav-btn span::before,.mnav-btn span::after{transition:none}}";
  document.head.appendChild(css);

  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "mnav-btn";
  btn.setAttribute("aria-label", "メニューを開く");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", "mnav-panel");
  btn.innerHTML = "<span></span>";
  header.appendChild(btn);
  // ロゴを左に寄せ、他の要素（ご相談ボタン・メニュー）を右にまとめる
  if (header.firstElementChild) header.firstElementChild.style.marginRight = "auto";

  var panel = document.createElement("nav");
  panel.id = "mnav-panel";
  panel.className = "mnav-panel";
  panel.setAttribute("aria-label", "サイトメニュー");
  panel.hidden = true;
  var html = "";
  menu.links.forEach(function (l) {
    var ext = /^https?:/.test(l[1]) ? ' target="_blank" rel="noopener"' : "";
    html += '<a class="mnav-link" href="' + l[1] + '"' + ext + ">" + l[0] + "</a>";
  });
  html += '<a class="mnav-cta" href="' + menu.cta[1] + '">' + menu.cta[0] + "</a>";
  panel.innerHTML = html;
  document.body.appendChild(panel);

  function open() {
    var top = Math.max(0, header.getBoundingClientRect().bottom);
    panel.style.top = top + "px";
    panel.style.height = (window.innerHeight - top) + "px";
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "メニューを閉じる");
    document.documentElement.style.overflow = "hidden";
  }
  function close() {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "メニューを開く");
    document.documentElement.style.overflow = "";
  }
  btn.addEventListener("click", function () { panel.hidden ? open() : close(); });
  panel.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { close(); btn.focus(); } });

  // 上部メニューが見えている画面幅ではボタンを出さない
  var nav = document.querySelector(".nav-links, .head-nav");
  function sync() {
    var navHidden = !nav || getComputedStyle(nav).display === "none";
    document.documentElement.classList.toggle("mnav-on", navHidden);
    if (!navHidden) close();
  }
  sync();
  window.addEventListener("resize", sync);
})();
