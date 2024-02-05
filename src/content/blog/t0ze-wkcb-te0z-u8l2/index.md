---
title: 'ファイル名をハッシュ値にリネームする CLI を開発する'
publishedAt: '2019-10-20T00:00:00+0900'
updatedAt: '2020-12-21T05:58:04+0900'
heroImage: ''
---

## 1. はじめに

筆者は，画像や動画などのメディアデータのファイル名をハッシュ値を設定して保存します。少ないファイルであれば md5sum コマンドなどのハッシュ関数コマンドを用いて得られたハッシュ値をファイル名に設定します。しかし，ファイル数に比例して作業量も増加します。この課題に対して [hashmv](https://github.com/dyama/hashmv) を用いて解決してきました。しかし，MD5 しか使用できないことや，ファイル名が大文字に設定されることなどの不満点が出てきました。その他の解決策として，Stack Overflow に掲載されている[方法](https://stackoverflow.com/questions/8201729/rename-files-to-md5-sum-extension-bash)が挙げられます。本記事では，Stack Overflow に掲載されている Bsah コマンドをベースとした CLI の開発について記述します。また，本記事内で行っている作業は，以下の環境下で実行したものです。

- Bash Ver.4.4.20
- Zorin OS 15 Core (Ubuntu 18.04 LTS)

## 2. 動作検証

まず初めに，適当なフォルダ内に適当なファイルを配置し，Stack Overflow に掲載されている Bash コマンドが正常に動作するかを検証します。より厳密な検証を行うためには，ハッシュ値が公開されているファイルを準備し，ハッシュ値が一致するかを検証する必要があります。本記事では省略します。

```bash
$ ls
> image1.png  image2.png  image3.png
$ md5sum * | sed -e 's/\([^ ]*\) \(.*\(\..*\)\)$/mv -v \2 \1\3/' | sh
> renamed 'image1.png' -> '2c4253d2d29f4355ad361ab007c84555.png'
> renamed 'image2.png' -> 'ac0e01ab32c94f81cfdde525a898749b.png'
> renamed 'image3.png' -> 'e3a9b315d4a225a7ff069a2fef189fea.png'
$ ls
> 2c4253d2d29f4355ad361ab007c84555.png  e3a9b315d4a225a7ff069a2fef189fea.png ac0e01ab32c94f81cfdde525a898749b.png
```

## 3. スクリプト作成

適当なファイルを作成し，シェバンとコマンドを記述します。その後，実行権限を追加してパスが通っているフォルダに配置します。

```bash
$ echo '#!/bin/bash' > h4sh
$ echo "md5sum \$@ | sed -e 's/\([^ ]*\) \(.*\(\..*\)\)$/mv -v \2 \1\3/' | sh" >> h4sh
$ chmod 755 h4sh
$ sudo mv h4sh /usr/local/bin/
```

## 4. 動作確認

作成したスクリプトを上記と同様の環境下で実行し，正常に動作することを確認します。

```bash
$ ls
> image1.png  image2.png  image3.png
$ h4sh *
> renamed 'image1.png' -> '2c4253d2d29f4355ad361ab007c84555.png'
> renamed 'image2.png' -> 'ac0e01ab32c94f81cfdde525a898749b.png'
> renamed 'image3.png' -> 'e3a9b315d4a225a7ff069a2fef189fea.png'
$ ls
> 2c4253d2d29f4355ad361ab007c84555.png  e3a9b315d4a225a7ff069a2fef189fea.png ac0e01ab32c94f81cfdde525a898749b.png
```

## 5. おわりに

ここまで，本記事では，Stack Overflow に掲載されている Bsah コマンドをベースとした CLI の開発について記述してきました。Stack Overflow に掲載されている Bash コマンドは md5sum コマンドを用いていますが，sha1sum や sha256sum などのハッシュ関数コマンドも使用可能です。
