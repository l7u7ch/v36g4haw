---
title: 'GatsbyJS サイトに Google Adsense を導入する方法 (2023 年版)'
publishedAt: '2023-09-18T14:22:23.031Z'
updatedAt: '2023-09-18T16:26:07.035Z'
heroImage: './e9711ec9.png'
---

## 1. はじめに

GatsbyJS を使用して作成した Web サイトに Google Adsense を導入する方法は，既に様々なものがインターネット上に公開されています。しかし，これらの情報の中には古くなったり，現在の環境での動作が保証されないものも散見されます。そこで本記事では，執筆時点で確認できる方法を調査・検証した結果を記述します。

## 2. プラグイン

まず初めにプラグインを利用した方法が考えられます。筆者が調査した範囲では 2 つのプラグイン [^1] [^2] が確認できました。また，1 つ目のプラグイン [^1] は古いので 2 つ目のプラグイン [^2] を使用することを推奨するという情報も確認できました。しかし，2 つ目のプラグイン [^2] も GitHub で確認すると最終更新から 3 年以上経過しています。また，筆者の開発環境下では正常に動作しませんでした。そのため，プラグインを利用した方法は非推奨と結論づけます。

[^1]: gatsby-plugin-google-adsense | Gatsby, [https://www.gatsbyjs.com/plugins/gatsby-plugin-google-adsense/](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-adsense/).
[^2]: @isamrish/gatsby-plugin-google-adsense | Gatsby, [https://www.gatsbyjs.com/plugins/@isamrish/gatsby-plugin-google-adsense/](https://www.gatsbyjs.com/plugins/@isamrish/gatsby-plugin-google-adsense/).

## 3. Gatsby Server Rendering APIs

2 つ目の方法として Gatsby Server Rendering APIs の **setHeadComponents** を利用した方法が考えられます。**setHeadComponents** は，プロジェクトフォルダ直下に配置した **gatsby-ssr.jsx** 内に記述することで出力される HTML の head 内に任意のコードを挿入することができます。以下に，既存記事 [^3] で示されているコードに修正を加えたコードを示します。以下のコードを実際に使用する際は <YOUR CLIENT ID\> の部分を各自の値に置換して使用してください。

```jsx
// gatsby-ssr.jsx

import React from 'react'

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=<YOUR CLIENT ID>"
      crossOrigin="anonymous"
    />,
  ])
}
```

[^3]: Gatsby のサイトに Google AdSense の審査を受けるためのコードを追加する - at backyard, [https://shinshin86.hateblo.jp/entry/2022/12/25/111212](https://shinshin86.hateblo.jp/entry/2022/12/25/111212).

## 4. Gatsby Head API

3 つ目の方法として Gatsby Head API を利用した方法が考えられます。Gatsby Head API は Gatsby Ver.4.19.0 から導入された機能であり，Web ページの document head に要素を追加することができます。この Gatsby Head API を利用したコードを以下に示します。以下のコードを実際に使用する際は <YOUR CLIENT ID\> の部分を各自の値に置換して使用してください。

```jsx
// src/pages/index.jsx

import * as React from 'react'

const head = () => {
  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=<YOUR CLIENT ID>"
        crossorigin="anonymous"
      />
    </>
  )
}

export default head
```

## 5. おわりに

ここまで，GatsbyJS を使用して作成した Web サイトに Google Adsense を導入する方法について調査したことをまとめてきました。本ブログサイトでは，Google Adsense を導入する以前から Gatsby Head API を利用していたので，第 4 章で紹介した Gatsby Head API を利用した方法を導入しています。Gatsby Server Rendering APIs を利用した方法と Gatsby Head API を利用した方法でビルド速度や出力された Web サイトのパフォーマンスに及ぼす影響などは測定していませんが，単純に head 内にタグを挿入するだけなので大きな差はないと思われます。また，上記で示したコードは，Google Adsense の申請手続や自動広告には対応していますが，任意の位置に広告を掲載する場合は別途，コードの追加や修正が必要です。
