---
title: 'Hugo + Tailwind CSS + Alpine.js + Netlify CMS を用いた JAMStack なブログサイトの開発後記'
publishedAt: '2020-12-03T20:54:49+0900'
updatedAt: '2020-12-16T22:24:19+0900'
heroImage: '/src/assets/default-hero-image.png'
---

## 1. はじめに

本ブログサイトは，Go 言語製の静的サイトジェネレーターである Hugo とユーティリティ指向の CSS フレームワークである Tailwind CSS，軽量型の JavaScript フレームワークである Alpine.js，Netlify 社が提供している静的ウェブサイトである Netlify，同じく Netlify 社が提供しているヘッドレス CMS である Netlify CMS を用いて構築しています。

開発の過程において，JAMStack なブログサイトの開発で頻繁に用いられているソフトウェアとサービスを可能な限り調査しました。そこで，本記事では JAMStack なブログサイトを構築，もしくは運用しようと考えている人に向け，上記のソフトウェアとサービスの概要，選択した理由，使用した感想などを記述します。具体的な使用方法や運用手順は割愛しているのでご了承下さい。

## 2. Hugo

[![Hugo](95a8716b0089229bb8afced7b37a656c.png)](https://gohugo.io/)

Hugo は，Go 言語製の静的サイトジェネレーターであり，静的サイトジェネレーターの中でもトップクラスの[人気](https://jamstack.org/generators/)と[パフォーマンス](https://qiita.com/tnzk/items/4863e2c559f6b71b72e0#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)が特徴的です。同じく人気の静的サイトジェネレーターとして [Next.js](https://nextjs.org/) と [Gatsby](http://gatsbyjs.org/) が挙げられます。Next.js は Gatsby は，簡単に [AMP](https://developers.google.com/amp) や [GraphQL](https://graphql.org/) などの最新技術に対応することができ，Hugo より表現力が豊かです。しかし，要件分析の時点で Markdown をベースとした運用を想定していた点とビルドのパフォーマンスから最終的に Hugo を採用することにしました。

要求分析の段階では，Go 言語製の静的サイトジェネレーターであり，Go 言語標準のテンプレートエンジンや組み込み関数を用いているため，Go 言語に関する固有の知識が必要になるかもしれないという懸念点がありました。しかし，ブログサイトを構築する分には Go 言語固有の知識が必要になる場面は存在しませんでした。

また，[Pagination](https://gohugo.io/templates/pagination/) や [Table of Contents](https://gohugo.io/content-management/toc/) など，ブログサイトに必要な機能は標準で実装されているため，開発過程で Hugo 本体のソースコードを改変する場面も発生しませんでした。

## 3. Tailwind CSS

[![Tailwind CSS](a1f75b55d405d9ac433e2983077071a0.png)](https://tailwindcss.com/)

Tailwind CSS は，ユーティリティ指向の CSS フレームワークであり，バニラ CSS を書かなくてもユニークな UI を構築することが可能です。有名な CSS フレームワークとして [Bootstrap](https://getbootstrap.com/) や [UIkit](https://getuikit.com/) などが挙げられます。これらの CSS フレームワークは，既存のコンポーネントを組み合わせることで UI を構築していくコンポーネント指向の CSS フレームワークです。

本ブログサイトは，Bootstrap → UIkit → Tailwind CSS の順で CSS フレームワークを採用してきました。コンポーネント指向の CSS フレームワークは，既存のコンポーネントを組み合わせるだけなので，非デザイナーの筆者でも簡単に統一されたデザインの UI を構築することが出来ました。しかし，既存のコンポーネントをカスタマイズする場合や足りないコンポーネントを追加する場合は，バニラ CSS を記述する必要があり，UI の独自性が上がるほど CSS フレームワークの利点が下がるジレンマに陥りました。

上記のジレンマを解消するため，ユーティリティ指向の CSS フレームワークである Tailwind CSS に乗り換えました。結果的に，バニラ CSS を 1 行も記述することなく独自の UI を構築することができ，CSS ファイルのサイズも大幅に削減することが出来ました。

## 4. Alpine.js

[![Alpine.js](1882fd943d136ffe66c49cb5d6a3eb70.png)](https://github.com/alpinejs/alpine)

Alpine.js は，軽量型の JavaScript フレームワークであり，[Vue.js](https://vuejs.org/) と [AngularJS](https://angularjs.org/) の影響を大きく受けています。また，公式が「Alpine.js は，Tailwind CSS の JavaScript 版」と明言しているため，Tailwind CSS との相性も良いと推測できます。

Bootstrap や UIkit は，DOM を操作する動的なコンポーネントも含まれていますが，Tailwind CSS には含まれていません。そこで，動的なコンポーネントはフルスクラッチで実装する必要がありました。結果的に，[Tab](https://getuikit.com/docs/tab) や [Toggle](https://getuikit.com/docs/toggle#toggle) などの代表的なコンポーネントは，Alpine.js を用いることでバニラ JavaScript を記述することなく実装することが出来ました。

## 5. Netlify CMS

[![Netlify CMS](bcc35f2c28064277c42b4f60a0b988e8.png)](https://www.netlifycms.org/)

Netlify CMS は，Netlify 社が提供しているヘッドレス CMS であり，対応している[静的サイトジェネレーター](https://www.netlifycms.org/docs/start-with-a-template/)と組み合わせることによって，[WordPress](https://wordpress.org/) のように Web 上から記事の作成や編集，投稿を行うことが出来ます。Netlify CMS の他にも数多くの[ヘッドレス CMS](https://jamstack.org/headless-cms/) が存在していますが，公式で Hugo が対応している点と既に静的ウェブサイトホスティングサービスの Netlify を愛用していた点から Netlify CMS を採用しました。

Netlify CMS によって，記事の作成や編集，投稿のタイミングで発生する Git コマンドの入力省略化，Netlify CMS Editor による Markdown の記述効率化，Shortcode の[ブロックコンポーネント化](https://www.netlifycms.org/docs/hugo/#using-hugo-shortcodes-in-the-markdown-editor)による記述効率化など，様々な工程を効率化することが出来ました。しかし，Web 上ではリアルタイムで下書き記事のプレビューが行えないのが欠点です。

## 6. おわりに

ここまで，JAMStack なブログサイトの開発過程で使用した Hugo，Tailwind CSS，Alpine.js，Netlify CMS の概要，選択した理由，使用した感想などについて記述してきました。本記事で紹介した組み合わせは，あくまでも筆者が調査した範囲かつ筆者の要件を満たす組み合わせのため，最適解ではありません。JAMStack なブログサイト開発の一例として参考にしていただけると幸いです。
