---
title: '【AstroJS】 Markdown のフロントマターで設定した画像を最適化する'
publishedAt: '2024-02-09 09:32'
updatedAt: '2024-02-09 09:32'
heroImage: './4C3672E3EB1FA201BF33681F65415273.webp'
---

## 1. はじめに

`yarn create astro` の blog テンプレートを使えば、すぐにブログサイトを構築することが出来ます。しかし、blog テンプレートで表示される一部の画像は、最適化処理がされていません。これは、`<img>` タグを用いて画像を表示しているのが原因です。AstroJS では、`<Image />` コンポーネントを使用することで画像が最適化されます [^1] 。本記事では、AstroJS の blog テンプレート内で使用されている `<img>` タグを `<Image />` コンポーネントに置換し、画像が最適化されるようにする手順について記述します。また、本記事は Node.js と Yarn がインストールされている前提で記述しています。

[^1]: Astro Docs, Images：https://docs.astro.build/en/guides/images/

```bash
$ node -v
v20.11.0
$ yarn -v
1.22.21
```

## 2. テンプレート

まずは、`yarn create astro` で blog テンプレートを作成します。

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
         ./flaky-field

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

         Enter your project directory using cd ./flaky-field
         Run yarn dev to start the dev server. CTRL+C to stop.
         Add frameworks like react or tailwind using astro add.

         Stuck? Join us at https://astro.build/chat

╭─────╮  Houston:
│ ◠ ◡ ◠  Good luck out there, astronaut! 🚀
╰─────╯
```

## 3. 編集作業

初期設定では、`heroImage` は文字列と定義されているので、これを画像に置換します。コンテンツコレクションについて詳しく知りたい方は AstroJS の公式ドキュメント [^2] を参照ください。

[^2]: Astro Docs, Content Collections：https://docs.astro.build/en/guides/content-collections/

```js title="src/content/config.ts" {6} ins={14} del={13}
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
      heroImage: image(),
    }),
})

export const collections = { blog }
```

次に、画像を表示している `src/pages/blog/index.astro` と `src/layouts/BlogPost.astro` を編集します。それぞれ、`<Image />` コンポーネントをインポートして、`<img>` タグを `<Image />` コンポーネントに置換しています。

```astro title="src/pages/blog/index.astro" ins={2, 6} del={5}
---
import { Image } from 'astro:assets'
---

<img width={720} height={360} src={post.data.heroImage} alt="" />
<Image src={post.data.heroImage} alt={''} />
```

```astro title="src/layouts/BlogPost.astro" ins={2, 6} del={5}
---
import { Image } from 'astro:assets'
---

{heroImage && <img width={1020} height={510} src={heroImage} alt="" />}
<Image src={heroImage} alt={''} />
```

最後に、`src/content/blog/*.md` の `heroImage` で設定されている画像パスを編集します。

```md title="src/content/blog/*.md" ins={3, 6, 9, 12, 15} del={2, 5, 8, 11, 14}
---
heroImage: "/blog-placeholder-1.jpg"
heroImage: "/public/blog-placeholder-1.jpg"

heroImage: "/blog-placeholder-2.jpg"
heroImage: "/public/blog-placeholder-2.jpg"

heroImage: "/blog-placeholder-3.jpg"
heroImage: "/public/blog-placeholder-3.jpg"

heroImage: "/blog-placeholder-4.jpg"
heroImage: "/public/blog-placeholder-4.jpg"

heroImage: "/blog-placeholder-5.jpg"
heroImage: "/public/blog-placeholder-5.jpg"
---
```

これで作業は完了です。`yarn run dev` で起動し、http://localhost:4321/blog/ で表示されている画像のソースを表示させると、以下のように最適化されていると思います。

```html
<img
  src="/_image?href=%2F%40fs%2Froot%2Fwork%2Fwhole-wasp%2Fpublic%2Fblog-placeholder-1.jpg%3ForigWidth%3D960%26origHeight%3D480%26origFormat%3Djpg&amp;f=webp"
  alt=""
  data-astro-cid-5tznm7mj=""
  width="960"
  height="480"
  loading="lazy"
  decoding="async"
  data-astro-source-file="/root/work/whole-wasp/node_modules/astro/components/Image.astro"
  data-astro-source-loc="34:2"
/>
```

## 4. おわりに

ここまで、AstroJS の blog テンプレート内で使用されている `<img>` タグを `<Image />` コンポーネントに置換し、画像が最適化されるようにする手順について記述してきました。AstroJS は、画像の扱いに少し癖 (Markdown 本文で画像を読み込む際に、絶対パスを設定すると最適化されないなど) がある印象です。GatsbyJS [^3] のように GraphQL で統一するということも出来ないので、お作法を覚えるしかないですね。画像周りの知見が溜まったら記事にしたいと思います。

[^3]: トレードオフで Plugin 地獄と GraphQL 地獄に苦しめられる
