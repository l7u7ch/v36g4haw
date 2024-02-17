---
title: 'AstroJS で関連記事を出力する【TF-IDF】'
publishedAt: '2024-02-17 21:48'
updatedAt: '2024-02-17 21:48'
heroImage: './10F13387271AC88E036D70FFCC715E8F.webp'
---

## 1. はじめに

読者に他のブログ記事を読んでもらう確率を上げることを考えると、関連記事を表示させることは有効な手段だと思います。WordPress ではプラグインをインストールすることで関連記事を出力することが出来ます。また、Hugo では関連記事を出力する仕組み [^1] が標準機能として実装されています。

[^1]: Hugo, Related content：https://gohugo.io/content-management/related/

残念ながら AstroJS には、関連記事を出力する機能が執筆時点では組み込まれていません。そこで、関連記事を出力する仕組みを実装したいと思います。具体的には、ブログ記事のタイトル同士の関連度を算出します。本記事では、関連度として Term Frequency–Inverse Document Frequency (TF-IDF) を使います。また、TF-IDF を計算するために外部パッケージの `natural` を使います。natural の詳しい情報については、公式ドキュメント [^2] を参照ください。

[^2]: Natural, TF-IDF：https://naturalnode.github.io/natural/tfidf.html

## 2. テンプレート

まず初めに、`yarn create astro` で blog テンプレートを生成します。次に、生成した blog テンプレートのディレクトリに移動して `natural` パッケージをインストールします。これで下準備完了です。

```bash
$ yarn create astro
yarn create v1.22.21
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Installed "create-astro@4.7.3" with binaries:
      - create-astro
[########################################] 40/40
 astro   Launch sequence initiated.

   dir   Where should we create your new project?
         ./dreary-dwarf

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

         Enter your project directory using cd ./dreary-dwarf
         Run yarn dev to start the dev server. CTRL+C to stop.
         Add frameworks like react or tailwind using astro add.

         Stuck? Join us at https://astro.build/chat

╭─────╮  Houston:
│ ◠ ◡ ◠  Good luck out there, astronaut! 🚀
╰─────╯
$ cd dreary-dwarf
$ yarn add natural
yarn add v1.22.21
warning package.json: No license field
warning dreary-dwarf@0.0.1: No license field
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
warning Workspaces can only be enabled in private projects.
[4/4] Building fresh packages...

success Saved lockfile.
warning dreary-dwarf@0.0.1: No license field
warning Workspaces can only be enabled in private projects.
success Saved 9 new dependencies.
info Direct dependencies
└─ natural@6.10.4
info All dependencies
├─ afinn-165-financialmarketnews@3.0.0
├─ afinn-165@1.0.4
├─ apparatus@0.0.10
├─ natural@6.10.4
├─ safe-stable-stringify@2.4.3
├─ stopwords-iso@1.1.0
├─ sylvester@0.0.12
├─ underscore@1.13.6
└─ wordnet-db@3.1.14
```

## 3. TF-IDF

`src/pages/blog/[...slug].astro` にコード (ハイライト部分) を追加します。処理としては、任意のブログ記事のタイトルと全ブログ記事のタイトルの関連度を算出して、関連度が高い順にソートしています。

```astro title="src/pages/blog/[...slug].astro" {17-27}
---
import { type CollectionEntry, getCollection } from 'astro:content'
import BlogPost from '../../layouts/BlogPost.astro'

export async function getStaticPaths() {
  const posts = await getCollection('blog')
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }))
}
type Props = CollectionEntry<'blog'>

const post = Astro.props
const { Content } = await post.render()

import natural from 'natural'
const tfidf = new natural.TfIdf()
const posts = await getCollection('blog')
posts.map((post) => tfidf.addDocument(post.data.title))
tfidf
  .tfidfs(post.data.title)
  .map((measure, index) => {
    return { index: index, measure: measure }
  })
  .sort((a, b) => b['measure'] - a['measure'])
  .forEach((x) => console.log(x, posts[x['index']].data.title))
---

<BlogPost {...post.data}>
  <Content />
</BlogPost>
```

`yarn run dev` で起動して、http://localhost:4322/blog/first-post/ にアクセスした際の実行結果が、以下の通りです。最も関連度が高いものとして First post が出力されているのは、重複しているからなので無視します。次に関連度が高いものとして **Second post** と **Third post** が出力されています。これは、First post の `post` と Second post、Third post の `post` がマッチしているからです。Markdown Style Guide と Using MDX はマッチする単語がないので関連なしになっています。

```bash
{ index: 0, measure: 3.139434283188365 } First post
{ index: 2, measure: 1.2231435513142097 } Second post
{ index: 3, measure: 1.2231435513142097 } Third post
{ index: 1, measure: 0 } Markdown Style Guide
{ index: 4, measure: 0 } Using MDX
```

本記事では、ブログ記事のタイトルで計算していますが、ブログ記事の本文やタグなどで計算することも可能です。

## 4. おわりに

第 3 章で示したコードでは、ブログ記事のタイトルだけで関連度を計算しています。そのため、そこまで精度は高くありません。もう少し精度を上げるとしたら、本文やタグなどを追加する必要があると思います。また、同じようなブログ記事が出力されるといった挙動をする場合があります。これは、変数 `posts` の順序が固定されているために発生します。そのため、本記事では `sort` でランダム性を追加しています。日時でソートして、最新の記事を表示するなどの応用も考えられます。

```ts title="src/pages/blog/[...slug].astro" {3}
const tfidf = new natural.TfIdf()
const posts = await getCollection('blog')
const randomPosts = posts.sort(() => Math.random() - 0.5)
randomPosts.map((post) => tfidf.addDocument(post.data.title))
const relatedPosts = tfidf
  .tfidfs(post.data.title)
  .map((measure, index) => {
    return { index: index, measure: measure }
  })
  .sort((a, b) => b['measure'] - a['measure'])
  .slice(1, 6)
  .map((x) => randomPosts[x['index']])
```
