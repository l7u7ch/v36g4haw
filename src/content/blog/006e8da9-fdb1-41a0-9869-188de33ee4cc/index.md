---
title: 'Tailwind CSS に Prefix を追加する'
publishedAt: '2020-12-28T16:55:30+0900'
updatedAt: '2020-12-28T16:55:30+0900'
heroImage: '/src/assets/default-hero-image.png'
---

## 1. はじめに

複数の CSS フレームワークを組み合わせて利用する場合，_btn_ や _nav_ などの使用頻度が高いクラス名が衝突することがあります。そのため，一部の CSS フレームワークでは，特有の Prefix を追加することで，衝突を回避しています。例えば，[UIkit](https://getuikit.com/) の _uk-_ などが挙げられます。

しかし，デフォルトの Tailwind CSS では Prefix が追加されていません。そこで，本記事では Tailwind CSS に Prefix を追加する手順について記述します。また，以降の章で行っている作業は，以下の環境下で実行したものです。なお，npx はインストール済みの前提で記述しており，インストール手順は割愛していることをご了承ください。

- npx Ver.6.14.9
- Zorin OS 15.2 Core (Ubuntu 18.04 LTS)

## 2. 設定変更

まず初めに，Tailwind CLI を用いて，Tailwind CSS の設定ファイルである _tailwind.config.js_ を生成します。

```bash
$ npx tailwindcss-cli@latest init
$ ls
tailwind.config.js
```

次に，[公式ドキュメント](https://tailwindcss.com/docs/configuration#prefix)に従い，上記で生成した _tailwind.config.js_ を以下のように書き換えます。_tw-_ の部分を書き換えることによって，任意の Prefix を設定することが出来ます。

```js {linenos=table,hl_lines=[2]}
module.exports = {
  prefix: 'tw-',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

最後に，ビルド処理を行い，_tailwind.css_ を生成します。上記で行った設定が正常に反映されていれば，_tw-_ が Prefix として追加された tailwind.css が生成されます。

```bash
$ npx tailwindcss-cli@latest build -o tailwind.css

   tailwindcss 2.0.2

   🚀 Building from default CSS... (No input file provided)

   ✅ Finished in 3.62 s
   📦 Size: 3.86MB
   💾 Saved to tailwind.css

$ ls
tailwind.config.js  tailwind.css
```

## 3. 動作確認

動作確認用の _index.html_ を生成し，以下のように書き換えます。その後，index.html を任意のブラウザで開き，黒背景に白文字が表示されれば正常に動作しています。

```bash
$ touch index.html
$ ls
index.html  tailwind.config.js  tailwind.css
```

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link href="tailwind.css" rel="stylesheet" />
  </head>

  <body class="tw-text-white tw-bg-black">
    Hello world
  </body>
</html>
```

## 4. おわりに

ここまで，Tailwind CSS に Prefix を追加する手順について記述してきました。Prefix を追加することで，クラス名の衝突を回避することが出来ます。しかし，出力される CSS のファイルサイズが増加する，HTML が冗長になるなどのデメリットもあるため，Prefix を追加する際は設計段階で慎重に検討する必要があります。
