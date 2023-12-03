---
title: Parsec の Client と Host のオススメ設定
createdAt: 2023-12-03 06:54
updatedAt: 2023-12-03 07:08
heroImage: 386beb1b.png
---

## 1. はじめに

　Parsec は、Unity Technologies が提供しているリモートデスクトップアプリケーションです。従来のリモートデスクトップアプリケーションと比較して、設定がシンプルで低遅延なことが特徴的です。Parsec は、初期設定でも十分なパフォーマンスを発揮してくれますが、チューニングしてやることで、より快適に作業することが出来ます。本記事では、Parsec のオススメ設定について記述します。以降の内容は、以下の環境下で設定したものです。また、Parsec は有料プランとして WARP と Parsec for Teams を提供していますが、本記事では無料プランで設定可能な項目のみについて記述しています。有料プランで提供される設定項目 (Enhanced Pen や Virtual Displays など) は割愛しているので、ご了承ください。

- Parsec Version：Build 150-90e
- Client OS：Windows 11 Home
- Host OS：Windows 11 Pro

## 2. Client Settings

| Client Settings Item | Default Value | Setting Value |
| --- | --- | --- |
| Overlay | On | Off |
| Overlay Warnings | On | Off |
| Swap Command and Ctrl for MacOS | Off | Off |
| Window Mode | Fullscreen | Windowed |
| Renderer | Direct3D 11 | Direct3D 11 |
| VSync | On | On |
| Decoder | 環境依存 | Software 以外 |
| H.265 (HEVC) | Off | On |
| Immersive Mode | Off | Keyboard |

　Overlay と Overlay Warnings は、個人的に邪魔なので Off に設定しています。Menu に関しては、Ctlt + Shift + M で ON / OFF が切り替えることが出来ます。Swap Command and Ctrl for MacOS は、MacOS に接続することはないので Off に設定しています。Window Mode は、Windowed に設定していますが完全に好みです。Window Mode も、Ctlt + Shift + W で Fullscreen / Windowed を切り替えることが出来ます。Renderer は Windows の場合、Direct3D 11、Direct3D 12 (Beta)、Vulkan (Experimental) から選択することが出来ます。色々と試してみましたがパフォーマンスに大きな差が発生しなかったので stable な Direct3D 11 に設定しています。VSync は Off にするとフレームレートの向上や遅延の軽減が期待出来ますが、自分の環境だと頻繁にスクリーンテアリングが発生するので On に設定しています。Decoder はクライアントのハードウェアによって、NVIDIA、Intel、AMD、Software などが選択できます。色々と試してみましたがパフォーマンスに大きな差が発生しませんでした。一応、ハードウェアエンコードの方がパフォーマンスが出るはずなので、ここでは Software 以外を設定しています。H.265 (HEVC) は、H.264 と比較すると圧縮効率が高い代わりにホスト側のハードウェアが対応している必要があります。ホスト側のハードウェアが H.265 に対応していない場合は自動的に H.264 に切り替えてくれるので、とりあえず H.265 を On に設定しておいた方が得だと思います。Immersive Mode は、Off だと Alt + Tab や Windows + R を入力した際に、クライアント側の Windows とホスト側の Windows が反応してしまいます。また、Mouse と Both を設定するとマウスがロックされるので、Keyboard を設定するのがオススメです。

## 3. Host Settings

| Host Settings Item | Default Value | Setting Value |
| --- | --- | --- |
| Hosting Enabled | Enabled | Enabled |
| Host Name | 空白 | 空白 |
| Resolution | Use Client Resolution | Use Client Resolution |
| Bandwidth Limit | 10 Mbps | 50 Mbps |
| Fallback To Virtual Display | Off | On |
| FPS | 60 | 60 |
| Idle Kick Timer | 0 | 0 |
| Exclusive Input Mode | Off | Off |
| Display | 環境依存 | 環境依存 |
| Audio | 環境依存 | 環境依存 |
| Echo Cancelling | New | New |
| Echo Selection | Discord | Discord |
| Parsec Virtual USB Gamepads | Enabled | Enabled |
| Virtual Gamepad Type | Xbox 360 | Xbox 360 |
| Quality | Lowest Latency | Highest Quality |

　Hosting Enabled は、基本的に Disable に設定して、ホストして接続されるコンピュータのみ Enabled に設定することをオススメします。Bandwidth Limit は、帯域幅を 3 Mbps から 50 Mbps に制限することが出来ます。帯域幅が小さければ小さいほど転送される映像が低画質になるので、特別な事情がない限り MAX の 50 Mbps に設定することをオススメします。Fallback To Virtual Display を On にすることで、物理ディスプレイが接続されていない場合のみ仮想ディスプレイを追加することが出来ます。この設定によってダミープラグを使う必要がなくなります。物理ディスプレイを接続している場合は Off でいいと思います。Quality は Highest Quality に設定していますが、Lowest Latency や Balanced と比較して Encode と Bitrate の値に大きな差はありません。また、体感としても差を感じることが出来ませんでした。4K や 240 FPS の環境下で差が発生する可能性はありますが、FHD + 60 FPS の環境下では差を観測、体感することは出来ませんでした。

## 4. おわりに

　ここまで、Parsec のオススメ設定について記述してきました。Parsec を初めて触った時は、Microsoft Remote Desktop や Chrome Remote Desktop などと比較して、遅延の低さに驚きました。ローカルネットワーク環境だと、レイテンシーが 10～20 ms 程度です。60 FPS ≒ 0.0166 sec = 16.6 ms で考えると 1 F 程度の遅延です。外出先でも 20～40 ms 程度であり、2 F 程度の遅延です。競技レベルのゲームは厳しいですが、大体の作業はストレスなく出来るレベルだと思います。