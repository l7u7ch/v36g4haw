---
title: '【AstroJS】 Tailwind CSS のクラス名を自動的にソートする 【VSCode】'
publishedAt: '2024-02-18 19:17'
updatedAt: '2024-02-18 19:17'
heroImage: './C52EF69FEA84343452B665DE3EC740C1.webp'
---

## 1. はじめに

Tailwind CSS は、クラス名を自動的にソートしてくれる Prettier Plugin [^1] を公式が提供してくれています。React 系のプロジェクトでは、`prettier` パッケージと `prettier-plugin-tailwindcss` パッケージをインストールして設定することで、クラス名を自動的にソートすることが出来ます。更に、VSCode と組み合わせることで、ファイル保存時に自動的にクラス名をソートする開発環境も構築することが出来ます。

[^1]: GitHub, tailwindlabs/prettier-plugin-tailwindcss：https://github.com/tailwindlabs/prettier-plugin-tailwindcss

AstroJS + Tailwind CSS + VSCode の組み合わせで、クラス名を自動的にソート機能を有効にするには、`prettier` パッケージと `prettier-plugin-tailwindcss` パッケージに加えて `prettier-plugin-astro` パッケージの導入が必要など、追加の設定が必要になります [^4] 。本記事では、その手順について記述します。また、本記事は Node.js と Yarn がインストールされている前提で記述しています。

[^4]: Setup Astro 3.0 with Tailwind CSS Prettier Plugin：https://webreaper.dev/posts/astro-prettier-tailwind-setup/

```bash
$ node -v
v20.11.0
$ yarn -v
1.22.21
```

## 2. テンプレートを生成する

まず初めに、公式ドキュメント [^2] [^3] に従って AstroJS と Tailwind CSS の環境を構築します。具体的には `yarn create astro` と `yarn astro add tailwind` を実行するだけで、自動的にテンプレートを生成してくれます。

[^2]: Astro Docs, Install Astro with the Automatic CLI：https://docs.astro.build/en/install/auto/
[^3]: Astro Docs, @astrojs/tailwind：https://docs.astro.build/en/guides/integrations-guide/tailwind/

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
         ./whole-meteor

  tmpl   How would you like to start your new project?
         Include sample files

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

         Enter your project directory using cd ./whole-meteor
         Run yarn dev to start the dev server. CTRL+C to stop.
         Add frameworks like react or tailwind using astro add.

         Stuck? Join us at https://astro.build/chat

╭─────╮  Houston:
│ ◠ ◡ ◠  Good luck out there, astronaut! 🚀
╰─────╯
$ cd whole-meteor
$ yarn astro add tailwind
yarn run v1.22.21
warning package.json: No license field
$ astro add tailwind
✔ Resolving packages...
18:32:24
  Astro will run the following command:
  If you skip this step, you can always run it yourself later

 ╭───────────────────────────────────────────────────────╮
 │ yarn add @astrojs/tailwind@^5.1.0 tailwindcss@^3.4.1  │
 ╰───────────────────────────────────────────────────────╯

✔ Continue? … yes
✔ Installing dependencies...
18:32:27
  Astro will generate a minimal ./tailwind.config.mjs file.

✔ Continue? … yes
18:32:28
  Astro will make the following changes to your config file:

 ╭ astro.config.mjs ─────────────────────────────╮
 │ import { defineConfig } from 'astro/config';  │
 │                                               │
 │ import tailwind from "@astrojs/tailwind";     │
 │                                               │
 │ // https://astro.build/config                 │
 │ export default defineConfig({                 │
 │   integrations: [tailwind()]                  │
 │ });                                           │
 ╰───────────────────────────────────────────────╯

✔ Continue? … yes
18:32:29
   success  Added the following integration to your project:
  - @astrojs/tailwind
Done in 8.09s.
```

## 3. パッケージをインストールする

次に、パッケージをインストールします。具体的には、`prettier`、`prettier-plugin-tailwindcss`、`prettier-plugin-astro` をインストールします。Yarn を使ってインストールする場合は、以下のコマンドでパッケージをインストールすることが出来ます。

```bash
$ yarn add --dev prettier prettier-plugin-tailwindcss prettier-plugin-astro
```

`prettier-plugin-tailwindcss` と `prettier-plugin-astro` は Prettier のプラグインなので、パッケージをインストールだけでは動作しません。プラグインを読み込むために、`.prettierrc` というファイルを AstroJS が生成したディレクトリの直下に作成し、以下のコードを追加します。

```bash {7}
$ touch .prettierrc
$ ls -la
total 244
drwxrwxr-x   6 root root   4096 Feb 18 18:44 .
drwxr-xr-x   7 root root   4096 Feb 18 18:30 ..
-rw-r--r--   1 root root    229 Feb 15 23:11 .gitignore
-rw-r--r--   1 root root      0 Feb 18 18:44 .prettierrc
drwxrwxr-x   2 root root   4096 Feb 18 18:30 .vscode
-rw-r--r--   1 root root   2360 Feb 15 23:11 README.md
-rw-r--r--   1 root root    181 Feb 18 18:32 astro.config.mjs
drwxr-xr-x 400 root root  20480 Feb 18 18:32 node_modules
-rw-r--r--   1 root root    408 Feb 18 18:32 package.json
drwxrwxr-x   2 root root   4096 Feb 18 18:30 public
drwxrwxr-x   5 root root   4096 Feb 18 18:30 src
-rw-r--r--   1 root root    176 Feb 18 18:32 tailwind.config.mjs
-rw-r--r--   1 root root     41 Feb 18 18:30 tsconfig.json
-rw-r--r--   1 root root 183602 Feb 18 18:32 yarn.lock
```

`prettier-plugin-astro` と `prettier-plugin-tailwindcss` の順番を逆にすると正常に動作しないので、順番も大事です。

```json title=".prettierrc"
{
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"]
}
```

## 4. VSCode を設定する

ここからは、VSCode 上での作業になります。まず、VSCode 拡張機能の [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) をインストールします。本記事では、拡張機能の具体的なインストール手順については割愛します。次に、VSCode の設定ファイル (settings.json) に以下のコードを追加します。以下のコードを追加することで、.astro ファイルのデフォルトコードフォーマットを Prettier に設定する + Prettier が .astro ファイルをコードフォーマット対象と認識するように設定出来ます。

```json title="settings.json"
{
  // .astro ファイルのデフォルトコードフォーマットを Prettier に設定する
  "[astro]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  // Prettier が .astro ファイルをコードフォーマット対象と認識する
  "prettier.documentSelectors": ["**/*.astro"]
}
```

## 5. おわりに

以上で作業は全て完了です。あとは、適当な .astro ファイル内に Tailwind CSS のコードを記述して、ソート機能が正常に動作するか確認してください。もし正常に動作しない場合は、以下のリストで抜けが無いか確認してみてください。

- [ ] `@astrojs/tailwind` パッケージと `tailwindcss` パッケージをインストールされている
- [ ] `astro.config.mjs` ファイルに Tailwind CSS の設定コードが追加されている
- [ ] Prettier に関する以下のパッケージがインストールされている
  - prettier
  - prettier-plugin-tailwindcss
  - prettier-plugin-astro
- [ ] `.prettierrc` を作成してプラグインを読み込んでいる
- [ ] VSCode の `settings.json` で設定コードが追加されている
