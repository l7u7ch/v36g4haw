---
title: 'Slidev のオススメポイントとイマイチポイント'
publishedAt: '2023-09-05T01:20:36.390Z'
updatedAt: '2023-09-05T01:20:36.390Z'
heroImage: './7a507c0d.png'
---

## 1. はじめに

筆者は，プレゼンテーションスライドを作る際，Google Slides を愛用しています。Google Slides に対して大きな不満は無いですが，WYSIWYG なツールの特性上，コンテンツとデザインが混同してしまう場合が多々ありました。この問題を軽減するため，マークアップ言語をベースにプレゼンテーションスライドを作れるツールを探していました。その探索過程で Slidev に出会い，実験的にライトニングトークイベント用のプレゼンテーションスライドを作成しました。本記事は Slidev を用いたプレゼンテーションスライドの作成過程で感じた Slidev のオススメポイントとイマイチポイントをまとめた記事になります。

## 2. 基本情報

Slidev は，Markdown をプレゼンテーションスライドに変換することができる Free/Libre and Open Source Software (FLOSS) です。[Vite](https://vitejs.dev/) や [Windi CSS](https://windicss.org/) を用いて開発されており，美しいプレゼンテーションスライドを作成することが出来ます。詳細は，Slidev の [GitHub](https://github.com/slidevjs/slidev) や [Twitter](https://twitter.com/Slidevjs)，[デモスライド](https://demo.sli.dev/starter/)を参照ください。類似の FLOSS として [Marp](https://marp.app/) などが挙げられます。

## 3. オススメポイント

### 3.1. Markdown Syntax

Slidev では，基本的な [Markdown Syntax](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) をサポートしています。基本的な Markdown Syntax に加え，「Syntax Highlighting」や「LaTeX」，「Mermaid」などもサポートされており，テキストからグラフィカルなプレゼンテーションスライドを作成することが出来ます。

#### 3.1.1. Syntax Highlighting

Slidev では，Syntax Highlighter として [Prism](https://prismjs.com/) と [Shiki](https://github.com/shikijs/shiki) をサポートしています。ページをスライドさせるたびに任意の行をハイライトさせるなどの細やかな制御を行うこと出来ます。詳細については公式ドキュメントの [Code Blocks](https://sli.dev/guide/syntax.html#code-blocks) や [Demo Slide](https://demo.sli.dev/starter/4) を参照ください。

#### 3.1.2. LaTeX

Slidev では，[KaTeX](https://katex.org/) が組み込まれており，LaTeX 構文を Inline と Block で表示させることが出来ます。詳細については公式ドキュメントの [LaTeX](https://sli.dev/guide/syntax.html#latex) や [Demo Slide](https://demo.sli.dev/starter/8) を参照ください。

#### 3.1.3 Mermaid

Slidev では，[Mermaid](https://mermaid-js.github.io/mermaid/#/) が組み込まれており，テキストを Diagrams や Graphs に変換して表示させることが出来ます。詳細については公式ドキュメントの [Diagrams](https://sli.dev/guide/syntax.html#diagrams) や [Demo Slide](https://demo.sli.dev/starter/9) を参照ください。

### 3.2. ナビゲーション

Slidev では，実行画面の左下に非常に便利な機能が詰まったナビゲーションが表示されます。本節では，各機能を簡易的に解説します。

#### 3.2.1. スライドオーバービュー

プレゼンテーションスライド作成時に全ページを俯瞰して見る際に便利です。

![https://sli.dev/screenshots/slides-overview.png](https://sli.dev/screenshots/slides-overview.png)

#### 3.2.2. ダークモード

ライトモードとダークモードを切り替えることが出来ます。テキストカラーなども自動的に調整してくれます。後述しますが，PDF としてプレゼンテーションスライドをエクスポートした際はライトモードのカラーで出力されます。調査した範囲では，ダークモードのカラーで出力することは出来ないようです。

#### 3.2.3. カメラビュー

カメラビューでは，デバイスのカメラが起動し，リアルタイムで表示することが出来ます。対面でのプレゼンテーションでは使用する機会は無いと思いますが，オンラインでのプレゼンテーションでは，外部アプリケーションを導入することなく顔出しが出来るようになります。詳細については公式ドキュメントの [Camera View](https://sli.dev/guide/recording.html#camera-view) を参照ください。

#### 3.2.4. レコーディング

レコーディングでは，外部アプリケーションを導入することなくプレゼンテーションの内容を mp4 や mkv などで録画・保存することが出来ます。カメラビューと組み合わせることによって，Slidev 単体のみでオンラインイベント用の録画データを作成することが出来ます。詳細については公式ドキュメントの [Recording](https://sli.dev/guide/recording.html#recording-1) を参照ください。

#### 3.2.5. ドローイング

ドローイングでは，作成したプレゼンテーションスライド上にリアルタイムでラインやグラフを記述することが出来ます。だたし，Good Notes 5 に実装されているような，一定時間経過後に自動的に消えるラインは実装されていません。詳細については公式ドキュメントの [Drawing](https://sli.dev/guide/drawing.html) を参照ください。

#### 3.2.6. プレゼンターモード

プレゼンターモードでは，Microsoft PowerPoint の Presenter View のように「次のスライド」や「経過時間」，「ノート」などを表示することが出来ます。このような情報が可視化されることで，プレゼンテーションのクオリティをワンランク上げることが出来ます。詳細については公式ドキュメントの [Presenter Mode](https://sli.dev/guide/presenter-mode.html) を参照ください。

![https://sli.dev/screenshots/presenter-mode.png](https://sli.dev/screenshots/presenter-mode.png)

#### 3.2.7. 統合エディタ

Slidev では，[CodeMirror](https://codemirror.net/) という統合エディタが内蔵されており，プレゼンテーションスライドを確認しながらリアルタイムで編集することが出来ます。後述しますが，内蔵されている統合エディタではプレゼンテーションスライドを追加・削除することが出来ないので，コンテンツとデザインの微調整する推敲フェーズで使うことが多いと思います。

![https://sli.dev/screenshots/integrated-editor.png](https://sli.dev/screenshots/integrated-editor.png)

## 4. イマイチポイント

### 4.1. 環境構築

Slidev を使用するには npm や yarn などの Node Package Manager が必要になります。エンジニアの人であれば，既に環境が整っている。または，簡単に環境を構築することが出来ると思います。しかし，非エンジニアの人にとっては，環境構築は非常に高いハードルになると思います。その他のツールと比較しても，Microsoft PowerPoint や Google Slides などは，数クリックすればプレゼンテーションスライドを作り始めることが出来ます。類似ツールの Marp でも，Visual Studio Code と拡張機能をインストールすればプレゼンテーションスライドを作り始めることが出来ます。そのため，相対的に比較してイマイチなポイントだと感じました。(そもそも，非エンジニアの人が，こんなニッチなジャンルのツールを使うのか？という声も聞こえてきそうですが…)

### 4.2. グラフ・アニメーション

Slidev でも，Web サイトを開発する工程と同様に，コンポーネントを配置することでグラフィカルなスライドを作ることは出来ます。同様に，Vue のアニメーション機能を用いて動的なスライドを作ることは出来ます。しかし，Microsoft PowerPoint や Google Slides などの直感的にグラフやアニメーションを作ることが出来るツールと比較すると，非常にコストが高い作業になります。これは Slidev 単体に対するイマイチなポイントではなく，Markdown ベースのプレゼンテーションツール全体に対するイマイチなポイントでもあります。

### 4.3. エクスポートした PDF と PNG が強制的にライトモードになる

Slidev では，PDF と PNG，Single Page Applications (SPA) の形式でエクスポートすることが出来ます。「3.2.2. ダークモード」で記述した通り，Slidev はライトモードとダークモードを切り替えることが出来ます。しかし，エクスポートした PDF と PNG は強制的にライトモードになります。SPA は，ローカルで実行している環境と同様にライトモードとダークモードを切り替えることが出来ます。調査した範囲では，エクスポートした PDF と PNG をダークモードにするオプションは見つかりませんでした。折角，ダークモードでデザインを整えても，出力することが出来ないのはイマイチなポイントだと感じました。

### 4.4. 内蔵されている統合エディタでページの追加・削除が出来ない

上記で，Slidev には統合エディタである [CodeMirror](https://codemirror.net/) が内蔵されていることを述べました。プレゼンテーションスライドを確認しながらリアルタイムで編集することが出来るので非常に便利ですが，ページの追加・削除が出来ません。正確には，統合エディタでハイフンを３つ入力することで，新規ページを追加することは出来ます。ページの削除は **slides.md** を直接編集する必要があります。そのため，プレゼンテーションスライドを作る際は Visual Studio Code などのテキストエディタが必要になります。ページの追加・削除が出来れば，オールインワンなワークフローでプレゼンテーションスライドを作成することが出来るので，イマイチなポイントだと感じました。

### 4.5. 実行時に End Page が強制的に追加される

Slidev では，ローカルで実行した場合と SPA でエクスポートした場合に，End Page が強制的に追加される仕様になっています。**layouts/end.vue** を配置することによって，End Page のデザインは変更することが出来ます。しかし，生成しないようにするオプションなどは調査した範囲では見つかりませんでした。また，PDF と PNG でエクスポートした場合は，End Page は生成されないようです。強制的に生成される End Page の影響で，ページ数などがズレるため，イマイチなポイントだと感じました。

## 5. その他

### 5.1. カスタムコンポーネント

Slidev では，**components/** ディレクトリに Vue コンポーネントを配置することによって，カスタムコンポーネントを追加することが出来ます。カスタムコンポーネントによって，プレゼンテーションスライドの表現力を上げることが出来ます。しかし，標準でプレゼンテーションスライドを作成するには十分な機能が搭載されているので，カスタムコンポーネントを使用する機会は少ないように思います。カスタムコンポーネントの詳細については，公式ドキュメントの [Custom Components](https://sli.dev/builtin/components.html#custom-components) を参照ください。

### 5.2. Windi CSS

Slidev では Windi CSS が組み込まれており，リアルタイムでプレゼンテーションスライドのデザインを変更することが出来ます。しかし，使いこなすには基礎的な CSS の知識が必要になります。派生元の Tailwind CSS を使ったことがあれば，直感的な操作が可能だと思います。Windi CSS の詳細については，公式ドキュメントの [Configure Windi CSS](https://sli.dev/custom/config-windicss.html) を参照ください。

### 5.3. SPA + ホスティングサーバ

Slidev は，Static Site Generator である Vue が組み込まれているので，SPA としてエクスポートすることが出来ます。エクスポートした SPA をホスティングサーバーにアップロードすることで URL さえ共有できれば，任意の端末からプレゼンテーションスライドを表示させることが出来ます。これにより，プレゼンテーションのバリエーションを増やすことが出来ます。しかし，SPA でエクスポートしたプレゼンテーションスライドでは「Camera View」と「Recording」，「統合エディタを用いたリアルタイム編集」が使用不可になることに注意が必要です。

### 5.4. 対応エクスポート

Slidev は，PDF と PNG，SPA のエクスポートに対応しています。PDF と PNG にエクスポートする際は，追加で [playwright-chromium](https://playwright.dev/docs/library#download-single-browser-binary) のインストールが必要になります。詳細は公式ドキュメントの [Exporting](https://sli.dev/guide/exporting.html) を参照ください。類似ツールの Marp では，Microsoft PowerPoint のファイル形式である pptx に対応していますが，Slidev では対応していません。しかし，提出フォーマットが pptx のみである場面は経験上，稀であり，PDF と PNG のエクスポートに対応していれば，大半の場面に対応可能であると考えられます。そのため，pptx のエクスポートに対応してないことが欠点になる場面も稀であると考えられます。

## 6. おわりに

ここまで，Slidev を用いたプレゼンテーションスライドの作成過程で感じた Slidev のオススメポイントとイマイチポイントについて記述してきました。Slidev は執筆時点 (2022 年 09 月 23 日) で Ver.0.36.5 と，正式版でないにもかかわらず非常に完成度の高い FLOSS だと感じました。また，現在も継続的に開発が行われています。そのため，本記事で挙げたイマイチなポイントも，徐々に改善されていくと思います。「4.1. 環境構築」で環境構築に関するハードルを指摘しましたが，そのコストを差し引いてもプラスの部分が多いと思うで，ぜひ，非エンジンの方も触って欲しいと思います。
