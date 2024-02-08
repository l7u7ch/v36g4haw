---
title: 'Python 3 + OpenCV を用いて動画の長さを取得する'
publishedAt: '2018-02-06T00:00:00+0900'
updatedAt: '2020-12-22T06:52:15+0900'
heroImage: '/src/assets/default-hero-image.png'
---

## 1. はじめに

[OpenCV](https://opencv.org/) は，画像解析や機械学習などの機能が実装されている FLOSS のライブラリです。C/C++ 以外にも，Java や Python など，様々なプログラミング言語向けのラッパーが開発，配布されています。また，OpenCV は画像だけでなく動画も操作することが出来ます。本記事は，Python 3 + OpenCV を用いて動画の長さを取得する手順について記述します。

また，本記事内で行っている作業は以下の環境下で実行したものです。Python や OpenCV はインストール済みの前提で記述しており，インストール手順は割愛していることをご了承ください。

- OpenCV Ver.4.4.0.46
- Python Ver.3.6.9
- Zorin OS 15 Core (Ubuntu 18.04 LTS)

## 2. 解析用動画準備

解析用の動画として，Pixabay で公開されている[動画](https://pixabay.com/ja/videos/%E6%9C%88-%E6%B3%8A-%E6%9C%88%E5%85%89-%E7%A9%BA-%E7%A5%9E%E7%A7%98%E7%9A%84%E3%81%A7%E3%81%99-59026/)を活用します。Pixabay からダウンロードした動画を，任意のディレクトリに **sample.mp4** として保存します。Mediainfo コマンドを用いて，ダウンロードした動画のメディア情報を取得すると，30 秒 15 ミリ秒の動画であることがわかります。

```bash
$ ls
sample.mp4
$ mediainfo sample.mp4
General
Complete name                            : sample.mp4
Format                                   : MPEG-4
Format profile                           : Base Media / Version 2
Codec ID                                 : mp42 (mp42/mp41/isom/avc1)
File size                                : 6.11 MiB
Duration                                 : 30 s 15 ms
Overall bit rate                         : 1 708 kb/s
(省略)
Stream size                              : 928 KiB (15%)
Encoded date                             : UTC 2020-12-15 00:38:33
Tagged date                              : UTC 2020-12-15 00:38:33
```

## 3. スクリプト

以下のスクリプトを，上記でダウンロードした動画と同じディレクトリ内に **app.py** というファイル名で保存します。OpenCV によって，動画のフレーム数 (8 行目) とフレームレート (9 行目) を取得するが出来ます。取得したフレーム数をフレームレートで割ることで，動画の長さ (秒) を取得することが出来ます。

```python {linenos=table}
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import cv2

if __name__ == '__main__':
    cap = cv2.VideoCapture("sample.mp4")                  # 動画を読み込む
    video_frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT) # フレーム数を取得する
    video_fps = cap.get(cv2.CAP_PROP_FPS)                 # フレームレートを取得する
    video_len_sec = video_frame_count / video_fps         # 長さ（秒）を計算する
    print(video_len_sec)                                  # 長さ（秒）を出力する
```

## 4. 動作確認

上記で保存した **app.py** を実行します。秒数が表示されれば正常に動作しています。Mediainfo コマンドを用いた解析結果では，30 秒 15 ミリ秒でしたが，OpenCV を用いた解析結果では 30 秒と，ミリ秒以下が切り捨てられていることがわかります。そのため，OpenCV を用いて詳細な解析を行う際は注意が必要です。

```bash
$ python3 app.py
30.0
```

## 5. おわりに

ここまで，Python 3 + OpenCV を用いて動画の長さを取得する手順について記述してきました。第 4 章でも述べた通り，OpenCV を用いた解析ではミリ秒以下が切り捨てられているため，OpenCV を用いて詳細な解析を行う際は注意が必要です。
