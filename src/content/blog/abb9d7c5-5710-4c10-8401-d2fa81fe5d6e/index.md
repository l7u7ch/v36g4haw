---
title: 'UWP 版の Inkscape の設定を初期化する'
publishedAt: '2019-09-05T00:00:00+0900'
updatedAt: '2020-12-21T04:45:37+0900'
heroImage: ''
---

## 1. はじめに

Inkscape はオープンソースで開発されているベクトル画像編集ソフトウェアです。ネイティブ版の Inkscape に関する初期化方法はネット上に公開されています。しかし，UWP 版の Inkscape に関する初期化方法が調査した範囲ないで確認できませんでした。そこで，本記事では，UWP 版の Inkscape の設定を初期化する方法について記述します。

## 2. ネイティブ版

[ネット記事](https://npokasc.com/pc/post-14020/)によると，ネイティブ版の Inkscape は _%username%\AppData\Roaming\inkscape\\_ の直下に存在する _preferences.xml_ を削除することで初期化されるそうです。しかし，UWP 版の Inkscape は，ネイティブ版の Inkscape と異なった場所にフォルダを作成するので，ネイティブ版の Inkscape と同じ手順で初期化することができません。

## 3. UWP 版

[Stack Overflow](https://stackoverflow.com/questions/52934042/uwp-settings-file) によると，UWP アプリケーションは _%username%\AppData\Local\Packages\\_ の直下にアプリケーションフォルダを作成するのが通例だそうです。ローカルマシンで確認すると，_%username%\AppData\Local\Packages\\_ の直下に Inkscape の名前が入ったフォルダを確認することができます。更に，LocalCache → Roaming → inkscape とフォルダを移動すると，_preferences.xml_ ファイルが確認できます。_preferences.xml_ ファイルを削除し，Inkscape の設定が初期化されれば成功です。

## 4. おわりに

ここまで，UWP 版の Inkscape の設定を初期化する方法について記述してきました。ネイティブ版と UWP 版で，設定ファイルの場所が異なっていることは予想出来ましたが，UWP アプリの設定ファイルが予想外の場所に保存されていたので詰まりました。本記事が，UWP 版の Inkscape を愛用しているユーザーの一助になれば幸いです。
