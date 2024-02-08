---
title: 'Tailwind CSS をインストールする'
publishedAt: '2020-12-24T06:10:57+0900'
updatedAt: '2020-12-24T06:10:57+0900'
heroImage: '/src/assets/default-hero-image.png'
---

## 1. はじめに

[Tailwind CSS](https://tailwindcss.com/) は，FLOSS で開発されているユーティリティ指向の CSS フレームワークです。[Bootstrap](https://getbootstrap.com/) や [UIkit](https://getuikit.com/) などのコンポーネント指向の CSS フレームワークと比較すると知名度は高くないですが，新しいパラダイムの CSS フレームワークとして注目され初めています。

本記事は，Tailwind CSS の公式ドキュメントに記載されている 3 つのインストール方法について詳しく解説しています。また，Tailwind CSS のカスタマイズ方法や最適化の方法についても記述しています。

本記事内で行っている作業は以下の環境下で実行したものです。npm や npx はインストール済みの前提で記述しており，インストール手順は割愛していることをご了承ください。

- npm Ver.6.14.9
- npx Ver.6.14.9
- Zorin OS 15.2 Core (Ubuntu 18.04 LTS)

## 2. インストール

Tailwind CSS の[公式ドキュメント](https://tailwindcss.com/docs/installation)では，Tailwind CSS をインストールする方法として，3 つのパターンが記載されています。1 つ目が，PostCSS Plugin として Tailwind CSS をインストールする方法。2 つ目が，Tailwind CLI を用いて Tailwind CSS をインストールする方法。3 つ目が，CDN 経由で Tailwind CSS をインストールする方法です。

### 2.1. PostCSS Plugin

PostCSS Plugin として Tailwind CSS をインストールする方法が最もスタンダードであり，公式ドキュメントでも推奨されています。まずは，初期化処理で _package.json_ を生成した後，動作に必要な 3 つのパッケージ (_tailwindcss_，_postcss_，_autoprefixer_) をインストールします。次に，PostCSS の設定ファイルである _postcss.config.js_ と Tailwind CSS の設定ファイルである _tailwind.config.js_，動作確認用の _index.html_ を生成します。

```bash
$ npm init -y
$ npm install tailwindcss@latest postcss@latest autoprefixer@latest
$ touch postcss.config.js
$ npx tailwindcss init
$ touch index.html
$ ls
index.html    package-lock.json  postcss.config.js
node_modules  package.json       tailwind.config.js
```

上記で生成した _package.json_ と _postcss.config.js_，_index.html_ を，それぞれ以下のように書き換えます。

```json {}
{
  "scripts": {
    "start": "tailwindcss build -o tailwind.css"
  },
  "dependencies": {
    "autoprefixer": "^10.1.0",
    "postcss": "^8.2.1",
    "tailwindcss": "^2.0.2"
  }
}
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

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link href="tailwind.css" rel="stylesheet" />
  </head>

  <body class="bg-black text-white">
    Hello world
  </body>
</html>
```

最後に，ビルド処理を行い，_tailwind.css_ を出力します。_index.html_ を任意の Web ブラウザで開き，黒背景に白文字が表示されれば，正常に Tailwind CSS がインストールされています。

```bash
$ npm start

> tailwindcss build -o tailwind.css

   tailwindcss 2.0.2

   🚀 Building from default CSS... (No input file provided)

   ✅ Finished in 2.3 s
   📦 Size: 3.74MB
   💾 Saved to tailwind.css

$ ls
index.html    package-lock.json  postcss.config.js   tailwind.css
node_modules  package.json       tailwind.config.js
```

### 2.2. Tailwind CLI

PostCSS Plugin として Tailwind CSS をインストールする方法の他に，Tailwind CLI を用いて Tailwind CSS をインストールする方法があります。PostCSS Plugin として Tailwind CSS をインストールする方法とは異なり，Autoprefixer 以外の PostCSS Plugin と組み合わせることが出来ませんが，依存関係のパッケージをインストールすることなく Tailwind CSS を出力することが出来ます。そのため，Autoprefixer 以外の PostCSS Plugin を使用する予定が無い場合は，このインストール方法がオススメです。

インストール手順は非常に簡単です。まず初めに，2.1 節で生成した動作確認用の _index.html_ を任意のディレクトリに保存します。次に，Tailwind CSS の設定ファイルである _tailwind.config.js_ を生成します。次に，ビルド処理を行い，_tailwind.css_ を出力します。最後に，任意の Web ブラウザで index.html を開き，黒背景に白文字が表示されれば，正常に Tailwind CSS がインストールされています。

```bash
$ ls
index.html
$ npx tailwindcss-cli@latest init

   tailwindcss 2.0.2

   ✅ Created Tailwind config file: tailwind.config.js

$ npx tailwindcss-cli@latest build -o tailwind.css

> tailwindcss build -o tailwind.css

   tailwindcss 2.0.2

   🚀 Building from default CSS... (No input file provided)

   ✅ Finished in 2.3 s
   📦 Size: 3.74MB
   💾 Saved to tailwind.css

$ ls
index.html  tailwind.config.js  tailwind.css
```

### 2.3. CDN

Bootstrap や UIkit などの CSS フレームワークと同じく，Tailwind CSS も CDN 経由で配布されています。しかし，カスタマイズや最適化が行えないなどの[理由](https://tailwindcss.com/docs/installation#using-tailwind-via-cdn)から，公式ドキュメントでは非推奨のインストール方法となっています。そのため，Tailwind CSS の学習やモックアップの作成など，カスタマイズや最適化などを行う必要がない場合にのみ採用する，限定的なインストール方法になります。インストール方法は最も簡単で，ビルド済みの _tailwind.min.css_ を読み込むだけです。

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
  </head>

  <body class="bg-black text-white">
    Hello world
  </body>
</html>
```

## 3. カスタム CSS

2 章で記述したインストール方法では，Tailwind CSS が公開しているデフォルトの [CSS](https://unpkg.com/browse/tailwindcss@2.0.2/stubs/defaultConfig.stub.js) をベースに _tailwind.css_ が出力されていました。Tailwind CSS では，ベースとなる CSS をユーザーがカスタマイズ出来る機能が提供されています。

_btn_ クラスを追加する手順とサンプルコードを以下に示します。これ以外にも様々なカスタマイズを行うことが出来ますが，本記事の範囲を超えるため割愛します。詳しく知りたい人は，[基本スタイルの追加](https://tailwindcss.com/docs/adding-base-styles)や[コンポーネントの抽出](https://tailwindcss.com/docs/extracting-components)，[新しいユーティリティの追加](https://tailwindcss.com/docs/adding-new-utilities)などのドキュメントを参照して下さい。

```bash
$ mkdir src dist
$ touch ./src/tailwind.css
$ tree
.
├── dist
└── src
    └── tailwind.css

2 directories, 1 file
```

```css
/* ./src/tailwind.css */
@tailwind base;
@tailwind components;

.btn {
  @apply rounded bg-blue-600 px-4 py-2 text-white;
}

@tailwind utilities;
```

```bash
$ npx tailwindcss-cli@latest build ./src/tailwind.css -o ./dist/tailwind.css

   tailwindcss 2.0.2

   🚀 Building: src/tailwind.css

   ✅ Finished in 2.26 s
   📦 Size: 3.74MB
   💾 Saved to dist/tailwind.css

$ tree
.
├── dist
│   └── tailwind.css
└── src
    └── tailwind.css

2 directories, 2 files
```

## 4. 最適化

上記で出力された _tailwind.css_ のサイズを確認すると 3.74MB という膨大なサイズになっていることがわかります。そのため，Tailwind CSS を本番環境にデプロイする場合，必ず最適化処理を行う必要があります。

幸いなことに，最適化処理機能は Tailwind CSS に含まれているため，プラグインなどで拡張する必要はありません。手順も非常に簡単であり，_tailwind.config.js_ の _purge_ に，Tailwind CSS のクラス名を使用しているファイルを指定するだけです。

2.2 節で構築した環境を例に，最適化処理の手順を以下に示します。tailwind.config.js の purge に，Tailwind CSS のクラス名を使用している _index.html_ のパスを追加します。以下の例では，正規表現を用いてパスを指定しています。

```js { hl_lines=[4] }
// tailwind.config.js
module.exports = {
  purge: ['*.html'],
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

最適化処理を行う際は，_NODE_ENV_ に _production_ を設定してビルドする必要があります。以下に，最適化処理を行っていない場合と行った場合のビルド結果を，それぞれ示します。出力された tailwind.css のファイルサイズを比較すると，3.74MB → 10.67KB と，大幅にサイズが削減されていることが確認できます。

```bash { hl_lines=[10,20] }
$ ls
index.html  tailwind.config.js  tailwind.css
$ npx tailwindcss-cli@latest build -o tailwind.css

   tailwindcss 2.0.2

   🚀 Building from default CSS... (No input file provided)

   ✅ Finished in 2.28 s
   📦 Size: 3.74MB
   💾 Saved to tailwind.css

$ NODE_ENV=production npx tailwindcss-cli@latest build -o tailwind.css

   tailwindcss 2.0.2

   🚀 Building from default CSS... (No input file provided)

   ✅ Finished in 1.94 s
   📦 Size: 10.67KB
   💾 Saved to tailwind.css
```

## 5. おわりに

ここまで，Tailwind CSS の公式ドキュメントに記載されている 3 つのインストール方法について詳しく解説してきました。また，Tailwind CSS のカスタマイズ方法や最適化の方法についても記述してきました。Tailwind CSS の公式ドキュメントでは，[React](https://tailwindcss.com/docs/guides/create-react-app) や [Vue](https://tailwindcss.com/docs/guides/vue-3-vite) などの有名な JavaScript フレームワークに Tailwind CSS をインストールする方法が詳しく記述されているので，本記事と合わせて活用して下さい。
