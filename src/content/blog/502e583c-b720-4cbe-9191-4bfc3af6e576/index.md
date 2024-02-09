---
title: 'AstroJS における画像ファイルの取り扱い説明書'
publishedAt: '2024-02-09 23:43'
updatedAt: '2024-02-09 23:43'
heroImage: './4D3B2279BA3B5824D1FCE6BB8E91A1AD.webp'
---

## 1. はじめに

AstroJS では、デフォルトで画像処理ライブラリの [Sharp](https://github.com/lovell/sharp) が組み込まれており、同じく AstroJS にデフォルトで組み込まれている `<Image>` コンポーネントを用いることで、画像を最適化してくれます。外部パッケージのインストールや設定なしで、最適化処理が行われるのはユーザーフレンドリーだと思います。その一方で、画像ファイルを読み込み際に、独特の **お作法** が存在します。慣れないうちは、この **お作法** のせいで頭を悩ませると思います。本記事では、AstroJS における画像ファイルの読み込み挙動について、可能な限り網羅的に解説したものになります。また、本記事は Node.js と Yarn がインストールされている前提で記述しています。

```bash
$ node -v
v20.11.0
$ yarn -v
1.22.21
```

## 2. 検証環境

検証環境として、`yarn create astro` で生成される blog テンプレートに、以下の画像ファイルを追加したものを使います。画像ファイルは、あくまでもサンプルなので、任意の画像ファイルで大丈夫です。

- public/[Apple.jpg](https://unsplash.com/ja/%E5%86%99%E7%9C%9F/%E9%9D%92%E3%81%84%E8%A1%A8%E9%9D%A2%E3%81%AB%E8%B5%A4%E3%81%84%E3%83%AA%E3%83%B3%E3%82%B4%E3%81%AE%E5%AE%9F-MardkT836BU)
- src/assets/[Banana.jpg](https://unsplash.com/ja/%E5%86%99%E7%9C%9F/%E9%9D%92%E3%81%84%E8%A1%A8%E9%9D%A2%E3%81%AB%E9%BB%84%E8%89%B2%E3%81%84%E3%83%90%E3%83%8A%E3%83%8A%E3%81%AE%E5%AE%9F-aEwNCA_uiVg)
- src/content/blog/[Cherry.jpg](https://unsplash.com/ja/%E5%86%99%E7%9C%9F/%E8%B5%A4%E3%81%84%E8%A1%A8%E9%9D%A2%E3%81%AB%E8%B5%A4%E3%81%84%E4%B8%B8%E3%81%84%E6%9E%9C%E5%AE%9F--ftMr1bhSWg)

```bash
$ yarn create astro
yarn create v1.22.21
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Installed "create-astro@4.7.2" with binaries:
      - create-astro
[########################################] 40/40
 astro   Launch sequence initiated.

   dir   Where should we create your new project?
         ./satellite-solstice

  tmpl   How would you like to start your new project?
         Use blog template

    ts   Do you plan to write TypeScript?
         Yes

   use   How strict should TypeScript be?
         Strict

  deps   Install dependencies?
         Yes

   git   Initialize a new git repository?
         No
      ◼  Sounds good! You can always run git init manually.

      ✔  Project initialized!
         ■ Template copied
         ■ TypeScript customized
         ■ Dependencies installed

  next   Liftoff confirmed. Explore your project!

         Enter your project directory using cd ./satellite-solstice
         Run yarn dev to start the dev server. CTRL+C to stop.
         Add frameworks like react or tailwind using astro add.

         Stuck? Join us at https://astro.build/chat

╭─────╮  Houston:
│ ◠ ◡ ◠  Good luck out there, astronaut! 🚀
╰─────╯
Done in 46.94s.
```

## 3. Astro ファイル

### 3.1. \<img> タグ

AstroJS で最もシンプルに画像を表示させる方法は、`public` フォルダに画像ファイルを配置して `<img>` タグで表示する方法です。以下の、どの記法でも画像が表示されます。AstroJS では、`public` フォルダに配置されたファイルはビルド時に、そのまま root にコピーされます。GatsbyJS や Hugo の `static` フォルダと同じ役割です。

```astro title="src/pages/index.astro"
---

---

<img src="Apple.jpg" />
<img src="/Apple.jpg" />
<img src="./Apple.jpg" />
```

他に、`<img>` タグを用いて画像ファイルを表示する方法を色々と検証してみました。結果としては、`public` フォルダに配置している画像ファイルを `<img>` タグで表示する場合は、上記の方法で表示するが良いと思います。また、`src` フォルダに配置している画像ファイルを `<img>` タグで表示する場合は、絶対パスを用いるのが良いと思います。

```astro title="src/pages/index.astro"
---

---

<!-- 絶対パス -->
<img src="/public/Apple.jpg" /> ← WARN が出力される
<img src="/src/assets/Banana.jpg" />
<img src="/src/content/blog/Cherry.jpg" />

<!-- 相対パス -->
<img src="../../public/Apple.jpg" /> ← WARN が出力される
<img src="../assets/Banana.jpg" /> ← 404 Not Found
<img src="../content/blog/Cherry.jpg" /> ← 404 Not Found
```

AstroJS では、import 文を用いて画像ファイルを読むことが出来ます。読み込まれた画像ファイルは、`ImageMetadata` 型のデータとして扱うことが出来ます。絶対パスで読み込んでも、相対パスで読み込んでも、挙動は同じです。また、`<img>` タグの src プロパティに直接、ファイルパスを設定する方法とは異なり、`import localImage from '[ファイル名]'` で読み込むことは出来ません。

```astro title="src/pages/index.astro"
---
// 正しい絶対パス
import localImage from '/public/Apple.jpg'
import localImage from '/src/assets/Banana.jpg'
import localImage from '/src/content/blog/Cherry.jpg'

// 正しい相対パス
import localImage from '../../public/Apple.jpg'
import localImage from '../assets/Banana.jpg'
import localImage from '../content/blog/Cherry.jpg'

// 誤ったパス
import localImage from 'Apple.jpg'
import localImage from '/Apple.jpg'
import localImage from './Apple.jpg'
---

<img src={localImage.src} width={localImage.width} height={localImage.height} />
```

### 3.2. \<Image> コンポーネント

`<img>` タグを用いて表示される画像ファイルは、最適化が行われません [^1] 。画像を最適化したい場合は、`<Image>` コンポーネントを用いります。`<Image>` コンポーネントは、src プロパティと alt プロパティが必須です。更に詳しい仕様については、AstroJS の公式ドキュメント [^1] を参照ください。

[^1]: Astro Docs, Images：https://docs.astro.build/en/guides/images/

```astro title="src/pages/index.astro"
---
import { Image } from 'astro:assets'

import localImage from '/src/assets/Banana.jpg' // 絶対パス
or
import localImage from '../assets/Banana.jpg' // 相対パス
---

<Image src={localImage} alt="説明文" />
```

## 4. Markdown ファイル

### 4.1. コンテンツ部分

AstroJS では、`src` フォルダ内の Markdown ファイルは、自動的に HTML に変換されます。画像ファイルを絶対パスで指定しても、相対パスで指定しても、画像自体は表示されます。しかし、絶対パスで指定した場合は、最適化処理が行われません。一方、相対パスで指定した場合は、最適化されます。そのため、Markdown コンテンツ部分で画像を表示する場合は、相対パスで指定する方が良いと思います。

```bash title="src/content/blog/first-post.md"
# 絶対パス：最適化されない
![](/public/Apple.jpg) ← WARN が出力される
![](/src/assets/Banana.jpg)
![](/src/content/blog/Cherry.jpg)

# 相対パス：最適化される
![](../../../public/Apple.jpg)
![](../../assets/Banana.jpg)
![](Cherry.jpg)
![](/Cherry.jpg) ← 404 Not Found
![](./Cherry.jpg)
```

### 4.2. フロントマター部分

Markdown のフロントマター部分では、本文部分とは異なり、絶対パスで指定しても相対パスで指定しても最適化されます。ただし、Markdown ファイルと同じディレクトリに画像ファイルを配置する場合、`heroImage: '[FILE]'` と `heroImage: '/[FILE]'` はエラーが発生するので注意が必要です。また、Markdown のフロントマターで設定した画像は、デフォルトでは最適化されません。Markdown のフロントマターで設定した画像を最適化する方法については、筆者の別記事 [^2] を参照ください。

```md title="src/content/blog/first-post.md"
---
# 絶対パス：最適化される
heroImage: '/public/Apple.jpg'             OK
heroImage: '/src/assets/Banana.jpg'        OK
heroImage: '/src/content/blog/Cherry.jpg'  OK

# 相対パス：最適化される
heroImage: '../../../public/Apple.jpg'     OK
heroImage: '../../assets/Banana.jpg'       OK
heroImage: 'Cherry.jpg'                    ERROR
heroImage: '/Cherry.jpg'                   ERROR
heroImage: './Cherry.jpg'                  OK
---
```

[^2]: 【AstroJS】 Markdown のフロントマターで設定した画像を最適化する：https://xenexe.info/e360becc-d7d0-49f9-bf8b-0ee74430f50d/

## 5. おわりに

ここまで、AstroJS における画像ファイルの読み込み挙動について、可能な限り網羅的に解説してきました。上記のコードは全て念入りにレビューしていますが、ヒューマンエラーで誤った情報がないとも限りません。また、AstroJS のアップデートで、仕様が変わる可能があります。何か、おかしな点がありましたら、連絡ください。

余談ですが、GatsbyJS の場合だと GraphQL が画像ファイルの読み込み処理を抽象化してくれていたので、ここまで難しい作業になりませんでした。あの憎かった GraphQL を再評価する日が来るとは思いませんでした。
