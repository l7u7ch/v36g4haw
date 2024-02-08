---
title: 'Hugo に Tailwind CSS をインストールする'
publishedAt: '2021-01-24T14:37:18+0900'
updatedAt: '2021-01-24T14:37:18+0900'
heroImage: '/src/assets/default-hero-image.png'
---

## 1. はじめに

Hugo には，_assets_ ディレクトリ下に配置している CSS ファイルやメディアファイルなどのアセットを処理する [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/) が標準で実装されており，[PostCSS](https://gohugo.io/hugo-pipes/postcss/) も操作することも出来ます。また，Tailwind CSS をインストールする方法として Tailwind CLI や CDN を活用した方法の他，PostCSS のプラグインとしてインストールする方法があります。本記事では，これらの機能と特徴を活用して Hugo に Tailwind CSS をインストールする手順について記述します。

本記事で行っている作業は，以下の環境下で実行したものです。また，npm と Hugo はインストール済みの前提で記述しており，インストール手順は割愛していることをご了承ください

- npm Ver.6.14.11
- Hugo Ver.0.80.0
- Zorin OS 15 Core (Ubuntu 18.04 LTS)

## 2. 環境構築

(1) まず初めに，Hugo のテンプレートを生成します。(2) 次に，必要なファイルである _index.html_ と _style.css_，_postcss.config.js_ を作成します。(3) 最後に，必要なパッケージである _tailwindcss_ と _postcss-cli_，_autoprefixer_ をインストールします。Tailwind CSS の[インストールガイド](https://tailwindcss.com/docs/installation)では，_postcss_ をインストールしていますが，Hugo Pipes では _postcss-cli_ が必要なため注意が必要です。

```bash
# (1)
$ hugo new site quickstart
$ cd quickstart

# (2)
$ mkdir assets
$ touch assets/style.css
$ touch layouts/index.html
$ touch postcss.config.js

# (3)
$ npm init -y
$ npm install tailwindcss@latest postcss-cli@latest autoprefixer@latest
```

Hugo Pipes の[ドキュメント](https://gohugo.io/hugo-pipes/postcss/)と Tailwind CSS の[インストールガイド](https://tailwindcss.com/docs/installation)，Tailwind UI の [CTA Sections](https://tailwindui.com/components/marketing/sections/cta-sections) を参考に，上記で作成した _index.html_ と _style.css_，_postcss.config.js_ を以下のように書き換えます。

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">

<head>
  <link rel="stylesheet" href="{{ (resources.Get "style.css" | resources.PostCSS | minify | fingerprint).Permalink }}">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hugo + Tailwind CSS</title>
</head>

<body>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block">Ready to dive in?</span>
        <span class="block text-indigo-600">Start your free trial today.</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Get started
          </a>
        </div>
        <div class="ml-3 inline-flex rounded-md shadow">
          <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
            Learn more
          </a>
        </div>
      </div>
    </div>
  </div>
</body>

</html>
```

```css
/* style.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
// postcss.config.js

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 3. 動作確認

Hugo Serer を起動し，任意の Web ブラウザでアクセスします。以下のような画面が表示されれば正常にインストールが完了しています。また，Hugo Serer を起動する際に Tailwind CSS をビルドするため，バニラの状態と比較して Hugo Serer の起動に時間がかかります。

```bash
$ hugo server --gc --minify

                   | EN
-------------------+-----
  Pages            |  4
  Paginator pages  |  0
  Non-page files   |  0
  Static files     |  0
  Processed images |  0
  Aliases          |  0
  Sitemaps         |  1
  Cleaned          |  0

Built in X ms
Environment: "development"
Serving pages from memory
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

![実行結果](06c88207710f84db06d989616cab7fbd.png)

## 4. おわりに

ここまで，Hugo に Tailwind CSS をインストールする手順について記述してきました。本記事は，開発環境を想定した内容になっています。本番環境にデプロイする場合は，[PurgeCSS](https://tailwindcss.com/docs/optimizing-for-production) の設定と _NODE_ENV_ を _production_ に設定することを，お忘れなく。
