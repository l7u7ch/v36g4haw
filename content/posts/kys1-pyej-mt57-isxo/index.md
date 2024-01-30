---
title: Scalafmt を sbt のプラグインとしてインストール・実行する方法
createdAt: 2019-05-16T00:00:00+09:00
updatedAt: 2019-05-16T00:00:00+09:00
heroImage: 
---

## 1. はじめに
　Scala の自動整形ツールは，[Scalafmt](https://scalameta.org/scalafmt/) と [Scalariform](http://scala-ide.org/scalariform/) が有名です。筆者は，開発頻度も高く，ドキュメントも充実している Scalafmt を愛用しています。[IntelliJ IDEA](https://www.jetbrains.com/idea/) の[プラグイン](https://plugins.jetbrains.com/plugin/8236-scalafmt)として Scalafmt を使用する場合は簡単に導入できますが，sbt のプラグインとして Scalafmt を使用する場合[^1]は一手間かかります。そこで，本記事では Scalafmt を sbt のプラグインとしてインストール・実行する方法について記述します。

[^1]: Visual Studio や Atom など，IntelliJ 以外の IDE，テキストエディタを使用する場合

## 2. 環境情報
　次章以降で行う作業は以下の環境下で行ったものである。

 * mintty Ver.3.0.0
 * Bash Ver.4.4.19
 * sbt Ver.1.2.8
 * Windows 10 Pro Ver.1809

## 3. 事前準備
　任意のフォルダ内に以下のようにファイルとフォルダを作成・配置します。

```bash
[dir]
  ├── project
  │   └── plugins.sbt
  └── main.scala
```

　sbt のバージョンによって plugins.sbt の記述方式が変わってくるので Scalafmt の[ドキュメント](https://scalameta.org/scalafmt/docs/installation.html#sbt)を確認してください。

```bash
addSbtPlugin("com.geirsson" % "sbt-scalafmt" % "1.5.1")
```

　任意でインテンドを挿入してコーディングエラーを再現しています。

```scala:title=main.scala
object Main extends App {
    println("Hello")
}
```

## 4. インストール・実行
　任意のフォルダ直下で以下のコマンドを実行すると Scalafmt が自動的にインストール・実行されます。

```bash
$ sbt scalafmt
```

　インテンドが修正されていれば成功です。

```scala:title=main.scala
object Main extends App {
  println("Hello")
}
```

## 5. おわりに
　FAQ や .scalafmt.conf などについては Scalafmt の[ドキュメント](https://scalameta.org/scalafmt/)に詳しく記述されているので，そちらを参照してください。最後に，本記事が少しでも Scala ユーザーの助けになれば幸いです。