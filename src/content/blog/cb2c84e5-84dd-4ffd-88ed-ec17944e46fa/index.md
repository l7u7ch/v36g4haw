---
title: 'NetLogo 6.4.0 リストの基本操作'
publishedAt: '2024-05-26 04:45'
updatedAt: '2024-05-26 04:45'
heroImage: './791FDC1B5817A6B7C917B26BF5FD1D4E.webp'
---

## 1. はじめに

NetLogo は、エージェントベースのモデリングとシミュレーションに特化したプログラミング言語および開発環境です。このツールは、特に社会科学や生物学の研究者に利用されており、複雑なシステムのシミュレーションを簡単に行うことができます。NetLogo の主な特徴は、複数のエージェントが同時に動作し、それぞれが独自のルールに従って行動することです。これにより、個々のエージェントの相互作用から生じる全体の動作やパターンを観察することが可能です。List は、NetLogo で使用されるデータ構造の一つです。これは、複数の値を一つの変数にまとめて管理するための方法です。リストは、数値や文字列、他のリストなどを要素として持つことができ、データの操作や管理が容易になります。

本記事では、NetLogo の List について、リファレンス形式で記述します。また、以下のコードは NetLogo Ver.6.4.0 で実行テストしたコードです。異なるバージョンでは、正常に動作しない場合があるので、ご注意ください。

## 2. リストの定義

Int 型、String 型、Boolean 型のリストを定義することが出来ます。

```logo
;; Int 型のリスト
let myListInt [ 1 2 3 4 5 ]
print myListInt ;; [1 2 3 4 5]

;; String 型のリスト
let myListStr [ a b c ]
print myListStr ;; [a b c]

;; Boolean 型のリスト
let myListBool [ true false true false ]
print myListBool ;; [true false true false]
```

ネストリストも定義することが出来ます。

```logo
let myNestList [
  [0 1 2]
  [3 4 5]
  [6 7 8]
]

print myNestList ;; [[0 1 2] [3 4 5] [6 7 8]]
```

異なる型のリストは、定義することが出来ません。

```logo
;; Error
let errorList [ 1 2 3 a b c true false true ]

;; Error
let errorList [
  [0 1 2]
  [a b c]
  [true false true]
]
```

## 3. 要素の追加

```logo
let myList [ 1 2 3 4 5 ]

;; リストの最後に要素を追加
set myList lput 6 myList
print myList ;; [1 2 3 4 5 6]

;; リストの最初に要素を追加
set myList fput 0 myList
print myList ;; [0 1 2 3 4 5 6]
```

## 4. 要素の取得

```logo
let myList [ 1 2 3 4 5 ]

;; N 番目の要素を取得
print item 1 myList ;; 2

;; 最初の要素を取得
print first myList ;; 1

;; 最後の要素を取得
print last myList ;; 5

;; インデックス 1 から 3 までの要素を取得
print sublist myList 1 3 ;; [2 3]
```

## 5. 要素の変更

```logo
let myList [ 1 2 3 4 5 ]

set myList replace-item 2 myList 9

print myList ;; [1 2 9 4 5]
```

## 6. 要素の削除

```logo
let myList [ 1 2 3 4 5 ]

;; 最初に見つかった 3 を削除
print remove 3 myList ;; [1 2 4 5]

;; 最初の要素を削除
print  but-first myList ;; [2 3 4 5]

;; 最後の要素を削除
print but-last myList ;; [1 2 3 4]
```

## 7. リストの反復処理

```logo
let myList [ 1 2 3 4 5 ]

foreach myList print

foreach myList [ x -> print x ]

;; 各要素を2倍にする
print map [ x -> x * 2 ] myList ;; [2 4 6 8 10]

;; 2より大きい要素だけを抽出
print filter [ x -> x > 2 ] myList ;; [3 4 5]

;; リストの合計を計算
print reduce [ [x y] -> x + y ] myList ;; 15
```

## 8. リストの長さを取得

```logo
let myList [ 1 2 3 4 5 ]

print length myList ;; 5
```

## 9. リストの結合

```logo
let myList1 [ 0 1 2 ]
let myList2 [ 3 4 5 ]

print sentence myList1 myList2 ;; [0 1 2 3 4 5]
```

## 10. その他

```logo
let myList [ 3 2 5 1 4 ]

;; 最大要素を取得
print max myList ;; 5

;; 最小要素を取得
print min myList ;; 1

;; リストをソート
print sort myList ;; [1 2 3 4 5]

;; リストを逆転
print reverse myList ;; [4 1 5 2 3]

;; リストを逆ソート
print reverse sort myList ;; [5 4 3 2 1]
```

## 11. おわりに

ここまで、NetLogo の List について記述してきました。foreach、map、filter、reduce が実装されているので、簡単な関数型プログラミングも出来そうです。更に詳しい情報に関しては公式ドキュメント [^1] を参照ください。

[^1]: NetLogo User Manual Programming Guide：https://ccl.northwestern.edu/netlogo/2.0/docs/programming.html#lists
