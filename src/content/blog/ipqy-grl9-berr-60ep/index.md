---
title: 'badblocks のテスト結果に含まれるエラーの詳細'
publishedAt: '2019-05-28T00:00:00+0900'
updatedAt: '2020-12-21T03:43:14+0900'
heroImage: '/src/assets/default-hero-image.png'
---

## 1. はじめに

badblocks は，ストレージデバイスの不良ブロックを検出するプログラムであり，ストレージデバイスの健康状態を測定するために使用されます。[map page](https://linux.die.net/man/8/badblocks) によると，Remy Card 氏によって開発され，現在は Theodore Ts'o 氏によってメンテナンスされています。本記事では，badblocks のテスト結果に含まれるエラーの詳細について調査した結果をまとめています。

## 2. 疑問

正常なストレージデバイスと不正ブロックが含まれるストレージデバイスに，それぞれ badblocks を実行すると以下のようなテスト結果が出力されます。

```bash
Pass completed, 0 bad blocks found. (0/0/0 errors)
```

```bash
Pass completed, 128 bad blocks found. (128/0/0 errors)
```

"Pass completed, X bad blocks found." の後ろに位置する丸括弧内には，3 つのエラーが表示されています。しかし，これらのエラーに関する情報は [map page](https://linux.die.net/man/8/badblocks) に記載されていません。それぞれのエラーが何を意味するのかを調べます。

## 3. 回答

[ArchWiki](https://wiki.archlinux.jp/index.php/Badblocks) や Stack Exchange の[スレッド](https://unix.stackexchange.com/questions/65349/how-to-interpret-badblocks-output)によると「読み取りエラー・書き込みエラー・破損エラー」と分類されています。また，Server Fault の[スレッド](https://serverfault.com/questions/664705/badblocks-output-read-write-compare-errors-explanation)では 以下のように分類されています。

- 読み取りエラー:　読み込めなかったブロック数
- 書き込みエラー:　書き込めなかったブロック数
- 破損エラー:　　　書き込んだデータと読み込んだデータが異なるブロック数

## 4. おわりに

ここまで，badblocks のテスト結果に含まれるエラーの詳細に関する調査結果について記述してきました。badblocks は FLOSS で開発されているため，ソースコードが公開されています。そのため，より詳細に知りたい人は[ソースコード](https://git.kernel.org/pub/scm/fs/ext2/e2fsprogs.git/tree/misc/badblocks.c)を参照してみてください。
