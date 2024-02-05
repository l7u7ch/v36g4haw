---
title: 'Antergos (Arch Linux) に日本語入力環境を構築する'
publishedAt: '2018-01-01T00:00:00+09:00'
updatedAt: '2018-12-19T00:00:00+09:00'
heroImage: ''
---

## 1. 概要

多くの Arch Linux から派生したディストリビューションでは，日本語入力を行うためのパッケージはハンドルされていない。そこで，ユーザー自身で日本語入力の環境を構築する必要がある。本記事は，ArchWiki を参考に，日本語入力の環境を構築するための手順を記述したものである。

続く 2 章では，作業を行う環境について記述する。3 から 7 章では，日本語入力を行うための環境構築手順について記述する。8 章では，本記事のまとめを記述する。

## 2. 環境情報

- Fcitx Ver.4.2.9.5
- GNOME Ver.3.28.1
- LightDM Ver.1.28.0
- Linux Kernel Ver.4.19.9-arch1-1-ARCH

## 3. パッケージのインストール

日本語入力を行うために必要なパッケージをインストールする。そのコマンドを以下に示す。

```bash
$ sudo pacman -S fcitx fcitx-mozc fcitx-configtool fcitx-gtk2 fcitx-gtk3 fcitx-qt4 fcitx-qt5
```

## 4. スタートアップスクリプトファイルの作成

Antergos では標準のディスプレイマネージャとして LightDM を採用しているため，スタートアップスクリプトファイルが必要である。そのコマンドを以下に示す。

```bash
$ echo -e \
"export GTK_IM_MODULE=fcitx \
export QT_IM_MODULE=fcitx \
export XMODIFIERS=@im=fcitx" \
> ~/.xprofile
```

## 5. 入力ソースの設定

日本語入力を行うためには，入力ソースを日本語に設定する必要がある。その手順と設定画面を以下に示す。

(1) GNOME の「設定」を表示する
(2) 「地域 & 言語」の項目に移動する
(3) 「入力ソース」に「日本語」を設定する

![](d3add8b9ef6e1795a9581dd3f37efc7c.png)

## 6. Fcitx の設定

日本語入力を行うためには，Fcitx に Mozc を設定する必要がある。そのコマンドと設定画面を以下に示す。

```bash
$ fcitx-configtool
```

![](c7d359c6e7df5c916e0af50185004191.png)

## 7. XMODIFIERS の設定

Skype や Slack などの GUI ソフトウェア上で，日本語入力できない場合がある。その場合は，XMODIFIERS の設定を変更する必要がある。そのコマンドを以下に示す。

```bash
$ gsettings set org.gnome.settings-daemon.plugins.xsettings overrides "{'Gtk/IMModule':<'fcitx'>}"
```

## 8. まとめ

日本語入力環境の構築は設定する項目が多く，手順も複雑である。筆者自身も，初めて日本語入力環境を構築した際に，資料を参照しながら設定と再起動を繰り返した記憶がある。本記事が，少しでも Arch Linux ユーザーの助けになれば幸いである。

## 参照資料

- [Fcitx - ArchWiki](https://wiki.archlinux.jp/index.php/Fcitx)
- [Mozc - ArchWiki](https://wiki.archlinux.jp/index.php/Mozc)
