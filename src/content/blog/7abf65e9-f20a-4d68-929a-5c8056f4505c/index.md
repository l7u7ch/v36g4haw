---
title: 'Algolia が提供している動作検証機能の『UI Demos』を構築する'
publishedAt: '2020-03-15T14:58:00+0900'
updatedAt: '2020-12-15T14:38:47+0900'
heroImage: ''
---

## 1. はじめに

[Algolia](https://www.algolia.com/) は，検索エンジンを SaaS モデルで提供しているサービスであり，データの管理や検索アルゴリズムの設定を Web 上で行うことが可能です。また，管理しているデータの確認や設定した検索アルゴリズムの動作検証を行うために『UI Demos』が提供されています。本記事では，『UI Demos』を構築する手順としてサンプルデータの作成方法と『UI Demos』の設定方法について記述します。

## 2. Index の作成

Algolia にアクセスすると Index の作成を求められるので，指示に従って Index を作成します。本記事では，_demo_ という名前で作成します。

![](d24bbe82199d72dc8a128803acd6b7aa.png)

## 3. JSON の作成・転送

サンプルデータが手元に存在する場合は，そのサンプルデータを用いてデモサイトを作成します。しかし，サンプルデータが手元に存在しない場合は，サンプルデータジェネレーターなどを用いてサンプルデータを作成します。本記事では，[JSON Generator](https://www.json-generator.com/) を利用してサンプルデータを作成します。

![](72c098540dc7a8e00e2c00268b7244df.png)

サンプルデータを JSON ファイルとしてローカルに保存します。Algolia のトップページから「Indices」→「demo」→「Upload record(s)」→「Upload file」を選択し，ローカルに保存した JSON ファイルを Algolia に転送します。

![](a2188d2a486fd09712c343d2ecddeeeb.png)

## 4. UI Demos の作成

サンプルデータの転送が完了したら，「UI Demos」→「Generate a UI demo」を選択します。_title_ は適当な名前を入力し，_Primary attribute_ は _about_ を設定します。

![](8d30dc9321adac927418b513c0225365.png)

設定が完了したら _Create_ をクリックして UI Demo を作成します。UI Demo の作成が完了したら，show ボタン (目のアイコン) をクリックして UI Demo にアクセスします。以下のような画面にアクセスできたら UI Demo が正常に作成されています。検索バーに文字を入力して，検索エンジンが正常に動作しているか確かめて下さい。

![](1635374093a6db168dc9bd15148de668.png)

_Primary attribute_ と _Secondary attribute_，_Tertiary attribute_ に入力した変数名が，検索対象になります。また，_Image attribute_ に画像の URL を入力すると UI Demo にサムネイルが表示され，_URL attribute_ に URL を入力を入力すると UI Demo にリンクが付与されます。最後に，作成された UI Demo は，オープンアクセスの状態になっているので，セキュリティが気になる人は _Username_ と _Password_ を入力することでアクセス制限をかけることができます。

## 5. おわりに

ここまで，『UI Demos』を構築する手順としてサンプルデータの作成方法と『UI Demos』の設定方法について記述してきました。高機能な検索エンジンが手軽に使えるのは魅力的です。色々な場面で活用することができそうです。
