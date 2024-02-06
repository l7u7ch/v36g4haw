---
title: 'Algolia の InstantSearch.js を用いて URL ルーティングを実装する'
publishedAt: '2020-03-30T14:42:00+0900'
updatedAt: '2020-12-15T14:41:35+0900'
heroImage: ''
---

## 1. はじめに

Algolia は，検索サイトに必要なインターフェースを [InstantsSearch.js](https://github.com/algolia/instantsearch.js/) として提供しています。 URL ルーティングも InstantsSearch.js に含まれています。本記事では，URL ルーティングに関する情報を記述します。

## 2. サンプルコード

[CodeSandbox](https://codesandbox.io/s/github/algolia/doc-code-samples/tree/master/Vue+InstantSearch/routing-basic) で基本的な URL ルーティングのサンプルコードが公開されています。動作を確認すると，検索ボックスやページネーション，検索フィルタの動作状況が URL パラメータに反映されていることがわかります。

![](93f2af417e9c95912cf2eadac4408720.png)

## 3. コードリーディング

[CodeSandbox](https://codesandbox.io/s/github/algolia/doc-code-samples/tree/master/Vue+InstantSearch/routing-basic) で公開されている App.vue の一部を以下に示します。特に重要な部分は，ハイライトしている 17, 43, 44, 54〜57 行目です。[ドキュメント](https://www.algolia.com/doc/guides/building-search-ui/going-further/routing-urls/vue/)によると _historyRouter_ と _simpleStateMapping_ をオーバーライドすることで，SEO フレンドリーな URL 設計にすることもできるそうです。

```html {linenos=table,hl_lines=[17,43,44,"54-57"]}
<template>
  <div>
    <header class="header">
      <h1 class="header-title"><a href="/">Basic routing</a></h1>
      <p class="header-subtitle">
        using
        <a href="https://github.com/algolia/vue-instantsearch"> Vue InstantSearch </a>
      </p>
    </header>

    <div class="container">
      <ais-instant-search :search-client="searchClient" index-name="instant_search" :routing="routing">
        <div class="search-panel">
          <div class="search-panel__filters">
            <ais-refinement-list attribute="brand" searchable />
          </div>

          <div class="search-panel__results">
            <ais-search-box placeholder="Search here…" class="searchbox" />
            <ais-hits>
              <template slot="item" slot-scope="{ item }">
                <h1><ais-highlight :hit="item" attribute="name" /></h1>
                <p><ais-highlight :hit="item" attribute="description" /></p>
              </template>
            </ais-hits>

            <div class="pagination"><ais-pagination /></div>
          </div>
        </div>
      </ais-instant-search>
    </div>
  </div>
</template>

<script>
  import algoliasearch from 'algoliasearch/lite'
  import { history as historyRouter } from 'instantsearch.js/es/lib/routers'
  import { simple as simpleStateMapping } from 'instantsearch.js/es/lib/stateMappings'
  import 'instantsearch.css/themes/algolia-min.css'

  export default {
    data() {
      return {
        searchClient: algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76'),
        routing: {
          router: historyRouter(),
          stateMapping: simpleStateMapping(),
        },
      }
    },
  }
</script>
```

## 4. おわりに

ここまで，URL ルーティングに関する情報について記述してきました。基本的にはデフォルト設定で，SEO 対策が必要になったら追加実装で良いと思います。また，[ドキュメント](https://www.algolia.com/doc/guides/building-search-ui/going-further/routing-urls/vue/)によると [Vue Router](https://router.vuejs.org/) や [Nuxt.js](https://nuxtjs.org/) とも統合できるようです。

## 環境情報

- algoliasearch Ver.3.33.0
- instantsearch.js Ver.3.7.0
- vue-instantsearch Ver.2.2.1
- Vue.js Ver.2.6.10
- Node.js Ver.8.10.0
- Zorin OS 15.2 Core (Ubuntu 18.04 LTS)
