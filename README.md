# プレイルーツ — 企業サイト＋ECサイト（分離構成）

エド・インター、ボーネルンドなどの業界標準にならい、
「企業サイト」と「ECサイト」を分離した構成です。フォルダごと公開できます。

## フォルダ構成

```
kodomo-web/
├─ index.html        ← 入口（企業サイトへ自動転送）
├─ kodomo-site/      ★ 企業サイト（B2B・信頼づくり）
│   ├─ index.html         会社紹介トップ
│   ├─ safety.html        安全へのこだわり
│   ├─ asobi.html           あそび環境づくり
│   ├─ assets/            画像置き場
│   └─ microCMS接続ガイド.md
└─ kodomo-shop/      ★ ECサイト（B2C・販売）
    ├─ index.html         ショップトップ（ランキング／選び方入口）
    ├─ gift.html          年齢別ギフト特集（microCMS対応）
    └─ assets/            画像置き場
```

## 2つのサイトのつながり

- 企業サイトのナビ右端「🛒 公式オンラインショップ」→ ショップへ
- ショップの最上部バー「← プレイルーツ 企業サイト」→ 企業サイトへ
- ショップの「私たちが、どうやって道具をつくっているか」→ 安全へのこだわりへ

## 公開のしかた

この `kodomo-web` フォルダごと、Netlify Drop（https://app.netlify.com/drop）に
ドラッグ＆ドロップしてください。前回と同じ手順です。

公開後のURLは次のようになります。
- 企業サイト … https://＜サイト名＞.netlify.app/kodomo-site/
- ショップ   … https://＜サイト名＞.netlify.app/kodomo-shop/

※ 前回公開したサイト（chimerical-starlight-bf022a）を更新する場合は、
   Netlifyの該当プロジェクトを開き「Deploys」画面にこのフォルダを
   ドラッグ＆ドロップすると、同じURLのまま中身が置き換わります。

## 将来的な発展（任意）

本格運用の際は、それぞれに独自ドメインを割り当てる構成が業界標準です。
例：企業サイト kodomo-lab.jp ／ ショップ shop.kodomo-lab.jp
Netlifyでサイトを2つに分けて登録すれば実現できます（ご希望あればガイドします）。
