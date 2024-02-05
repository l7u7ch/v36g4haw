---
title: 'ImageMagick の convert コマンドを用いて画像と PDF を双方向変換する'
publishedAt: '2019-11-06T01:25:54+0900'
updatedAt: '2020-12-21T05:42:46+0900'
heroImage: ''
---

## 1. はじめに

[ImageMagick](https://imagemagick.org/index.php) は，200 種類以上のフォーマットに対応しているコマンドライン群です。本記事では，ImageMagick に同梱されている convert コマンドを用いて画像ファイルを PDF に変換する手順と PDF ファイルから画像ファイルを抽出する手順について記述します。また，本記事内で行っている作業は，以下の環境下で実行したものです。

- ImageMagick Ver.6.9.7-4
- Zorin OS 15 Core (Ubuntu 18.04 LTS)

## 2. 事前準備

画像ファイルを PDF ファイルに変換する際，**not authorized** というエラーが出力される場合があります。インターネット上に公開されている[記事](https://linux.just4fun.biz/?Linux%E7%92%B0%E5%A2%83%E8%A8%AD%E5%AE%9A/ImageMagick%E3%81%AEconvert%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%A7%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%8C%E5%87%BA%E3%82%8B%E5%A0%B4%E5%90%88%E3%81%AE%E5%AF%BE%E5%87%A6%E6%96%B9%E6%B3%95)によると，**/etc/ImageMagick-6/policy.xml** の 76 行目に記述されている以下のコードを削除，またはコメントアウトすることで回避することが出来ます。また，macOS 版の ImageMagick でも同様の手順でエラーを回避可能です。しかし，**policy.xml** の場所が Ubuntu とは異なるため，インターネット上に公開されている[記事](https://qiita.com/atuyosi/items/b782ab2130570b72aa93)を参考にしてください。

```xml {linenos=table, linenostart=76}
<policy domain="coder" rights="none" pattern="PDF" />
```

## 3. 画像 ➔ PDF

10 個の PNG ファイルを convert コマンドを用いて PDF に変換する手順を以下に示します。convert コマンドは，正規表現を用いて入力ファイルを選択することが可能です。しかし，正規表現を用いた場合は **10.png** が望ましくない位置に設定された PDF ファイルが出力されます。そこで，ls コマンドと sort コマンドを用いて調整しています。

```bash
$ ls -lh
合計 2.1M
-rw-r--r-- 1 admin admin 243K 11月  0 00:00 1.png
-rw-r--r-- 1 admin admin 208K 11月  0 00:00 10.png
-rw-r--r-- 1 admin admin 210K 11月  0 00:00 2.png
-rw-r--r-- 1 admin admin 232K 11月  0 00:00 3.png
-rw-r--r-- 1 admin admin 219K 11月  0 00:00 4.png
-rw-r--r-- 1 admin admin 203K 11月  0 00:00 5.png
-rw-r--r-- 1 admin admin 195K 11月  0 00:00 6.png
-rw-r--r-- 1 admin admin 218K 11月  0 00:00 7.png
-rw-r--r-- 1 admin admin 199K 11月  0 00:00 8.png
-rw-r--r-- 1 admin admin 207K 11月  0 00:00 9.png
$ convert `ls | sort -n` out.pdf
$ ls -lh out.pdf
-rw-r--r-- 1 admin admin 2.2M 11月  0 00:01 out.pdf
```

## 4. PDF ➔ 画像

PDF ファイルから画像ファイルを抽出する手順を以下に示します。出力された PNG ファイルのファイルサイズが約 3 倍に増加していることがわかります。この結果より，オプション無しで convert コマンドを実行した場合，非可逆な変換が行われていることがわかります。

```bash
$ convert out.pdf img.png
$ ls -lh
合計 8.2M
-rw-r--r-- 1 admin admin 846K 11月  0 00:02 img-0.png
-rw-r--r-- 1 admin admin 743K 11月  0 00:02 img-1.png
-rw-r--r-- 1 admin admin 314K 11月  0 00:02 img-2.png
-rw-r--r-- 1 admin admin 333K 11月  0 00:02 img-3.png
-rw-r--r-- 1 admin admin 275K 11月  0 00:02 img-4.png
-rw-r--r-- 1 admin admin 689K 11月  0 00:02 img-5.png
-rw-r--r-- 1 admin admin 770K 11月  0 00:02 img-6.png
-rw-r--r-- 1 admin admin 708K 11月  0 00:02 img-7.png
-rw-r--r-- 1 admin admin 713K 11月  0 00:02 img-8.png
-rw-r--r-- 1 admin admin 733K 11月  0 00:02 img-9.png
-rw-r--r-- 1 admin admin 2.2M 11月  0 00:01 out.pdf
```

## 5. おわりに

ここまで，ImageMagick に同梱されている convert コマンドを用いて画像ファイルを PDF に変換する手順と PDF ファイルから画像ファイルを抽出する手順について記述してきました。4 章の結果より，convert コマンドを用いた変換は不可逆であるということがわかりました。convert コマンドを用いて可逆的な変換が可能か。また，他のコマンドラインツールに関する情報収集などを今後の課題にしたいと思います。
