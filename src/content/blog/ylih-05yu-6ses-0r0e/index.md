---
title: 'Scala でハイフンを含んだランダムな半角英数字を生成する'
publishedAt: '2024-01-25 10:13'
updatedAt: '2024-01-25 10:13'
heroImage: './A4DD68E6A97FB1DD229AEB252D883D4D.png'
---

## 1. はじめに

実現したいことは、Scala で **J2u9-7cGj-FZp1-9rU9** のような 16 桁の半角英数字 + 4 桁ごとにハイフンを挿入した文字列を生成したい。

## 2. 実装例

ランダムな半角英数字を生成するコードに関しては Qiita の記事 [^1] で解説されていたので参考にしました。4 桁ごとにハイフンを挿入する実装に関しては grouped メソッドと mkString メソッドを組み合わせて実現しました。実際のソースコードが以下になります。

[^1]: Scala でランダムなパスワード文字列を生成したい：https://qiita.com/suin/items/bfff121c8481990e1507

```scala title="App.sc"
import scala.util.Random

val x = Random.alphanumeric.take(16).mkString.grouped(4).mkString("-")

println(x) // J2u9-7cGj-FZp1-9rU9
```

ちなみに、大文字 or 小文字で統一する場合は、toLowerCase メソッド or toUpperCase メソッドを噛ませれば実現できます。

```scala title="App.sc"
import scala.util.Random

val x = Random.alphanumeric.take(16).mkString

val y = x.toLowerCase.grouped(4).mkString("-")

val z = x.toUpperCase.grouped(4).mkString("-")

println(y) // h8va-saoa-ee7c-w9ue

println(z) // XGKS-R477-KSIM-SNGH
```

## 3. おまけ

ChatGPT 4 に「Scala 3 で 16 桁の半角英数字 + 4 桁ごとにハイフンを挿入した文字列を生成コード」というプロンプトを投げると以下のソースコードが生成されました。上記のコードと比較すると、冗長ではあるものの、要件は満たしています。

```scala title="App.sc"
import scala.util.Random

@main def generateFormattedRandomCode(): Unit = {
  val codeLength = 16
  val everyNChars = 4

  def generateRandomCode(length: Int): String =
    val characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    Random.shuffle(characters.toList).take(length).mkString

  def insertHyphens(code: String, everyNChars: Int): String =
    code.grouped(everyNChars).mkString("-")

  val randomCode = generateRandomCode(codeLength)
  val formattedCode = insertHyphens(randomCode, everyNChars)
  println(formattedCode) // Vp24-zbIQ-txFN-ATZX
}
```

## 4. おわりに

ここまで、Scala で 16 桁の半角英数字 + 4 桁ごとにハイフンを挿入した文字列を生成するソースコードについて記述してきました。scala.util.Random [^2] では、疑似ランダムな半角英数字を生成する alphanumeric メソッドの他に、一様分布に従った nextInt メソッドやガウス分布に従った nextGaussian メソッドなどがあります。対数正規分布などの分布に基づいた疑似乱数を生成する際は自分で実装するか外部ライブラリを導入する必要があるようです。

[^2]: Scala Standard Library 2.12.4 - scala.util.Random：https://www.scala-lang.org/api/2.12.4/scala/util/Random.html
