---
title: 'リモートデスクトップアプリ Parsec の Client と Host の個人的オススメ設定 for Windows'
publishedAt: '2023-12-03 06:54'
updatedAt: '2024-01-28 10:38'
heroImage: './386beb1b.png'
---

## 1. はじめに

Parsec [^1] は、Unity Technologies が提供しているリモートデスクトップアプリケーションです。従来のリモートデスクトップアプリケーション (VNC や Chrome Remote Desktop など) と比較して、設定がシンプルで低遅延なことが特徴的です。Parsec は、初期設定でも十分なパフォーマンスを発揮してくれますが、チューニングしてやることで、より快適に作業することが出来ます。本記事では、Parsec のオススメ設定について記述します。

以降の内容は、以下の環境下で設定したものです。また、Parsec は有料プランとして WARP と Parsec for Teams を提供していますが、本記事では無料プランで設定可能な項目のみについて記述しています。有料プランで提供される設定項目 (Enhanced Pen や Virtual Displays など) は割愛しているので、ご了承ください。

[^1]: Connect to Work or Games from Anywhere | Parsec：https://parsec.app/

- Parsec Version：Build 150-91e
- Client OS：Windows 11 Home
- Host OS：Windows 11 Pro

## 2. Client Settings

| Client Settings Item            | Default Value | Setting Value |
| ------------------------------- | ------------- | ------------- |
| Overlay                         | On            | Off           |
| Overlay Warnings                | On            | Off           |
| Swap Command and Ctrl for MacOS | Off           | Off           |
| Window Mode                     | Fullscreen    | Windowed      |
| Renderer                        | Direct3D 11   | Direct3D 11   |
| VSync                           | On            | On            |
| Decoder                         | 環境依存      | Software 以外 |
| H.265 (HEVC)                    | Off           | On            |
| Immersive Mode                  | Off           | Keyboard      |

**Overlay** は、接続時に表示されるボタンを表示するか非表示にするかを設定する項目です。このボタンは、接続時に Ctlt + Shift + M で 表示 / 非表示 が切り替えることが出来るので、お好みで設定していいと思います。**Overlay Warnings** は ON にすると、接続中、通信が不安的な時などに警告を表示してくれます。Overlay とは異なり、接続中に 表示 / 非表示 の切り替えは出来ません。どちらの設定も、パフォーマンスに大きく影響するものではないので、お好みで設定して大丈夫だと思います。個人的には、基本的に Overlay も Overlay Warnings も OFF に設定しておき、動作が不安定な場合のみ Overlay Warnings を ON にするというのがオススメの設定です。

**Swap Command and Ctrl for MacOS** は、設定項目名どおり、Command と Ctrl を入れ替える設定項目です。ホスト OS に MacOS を使用する方向けの設定項目です。筆者は、MacOS に接続することはないので OFF に設定しています。

**Window Mode** は、Windowed に設定していますが完全に好みです。Window Mode も、Ctlt + Shift + W で Fullscreen / Windowed を切り替えることが出来ます。一応、Fullscreen の方が一般的にはハードウェアの負担が少ないと言われていますが、筆者の環境では顕著な差は見られませんでした。

**Renderer** は、Windows の場合、Direct3D 11、Direct3D 12 (Beta)、Vulkan (Experimental) から選択することが出来ます。色々と試してみましたが、パフォーマンスに大きな差が発生しなかったので stable な Direct3D 11 に設定しています。今後、Direct3D 12 が Beta から正式版になったタイミングで、Direct3D 12 に切り替えるという感じでいいと思います。

**VSync** は OFF にするとフレームレートの向上や遅延の軽減が期待出来ますが、自分の環境だと頻繁にスクリーンテアリングが発生するので ON に設定しています。

**Decoder** はクライアントのハードウェアによって、NVIDIA、Intel、AMD、Software などが選択できます。色々と試してみましたがパフォーマンスに大きな差が発生しませんでした。一応、ハードウェアエンコードの方がパフォーマンスが出るはずなので、ここでは Software 以外を設定しています。

**H.265 (HEVC)** は、H.264 と比較すると圧縮効率が高い代わりにホスト側のハードウェアが対応している必要があります。ホスト側のハードウェアが H.265 に対応していない場合は自動的に H.264 に切り替えてくれるので、とりあえず H.265 を ON に設定しておいた方が得だと思います。

**Immersive Mode** は、OFF だと Alt + Tab や Windows + R を入力した際に、クライアント側の Windows とホスト側の Windows が反応してしまいます。また、Mouse と Both を設定するとマウスがロックされるので、Keyboard を設定するのがオススメです。

## 3. Host Settings

| Host Settings Item          | Default Value         | Setting Value         |
| --------------------------- | --------------------- | --------------------- |
| Hosting Enabled             | Enabled               | Enabled               |
| Host Name                   | 空白                  | 空白                  |
| Resolution                  | Use Client Resolution | Use Client Resolution |
| Bandwidth Limit             | 10 Mbps               | 50 Mbps               |
| Fallback To Virtual Display | Off                   | On                    |
| FPS                         | 60                    | 60                    |
| Idle Kick Timer             | 0                     | 0                     |
| Exclusive Input Mode        | Off                   | Off                   |
| Display                     | 環境依存              | 環境依存              |
| Audio                       | 環境依存              | 環境依存              |
| Echo Cancelling             | New                   | New                   |
| Echo Selection              | Discord               | Discord               |
| Parsec Virtual USB Gamepads | Enabled               | Enabled               |
| Virtual Gamepad Type        | Xbox 360              | Xbox 360              |
| Quality                     | Lowest Latency        | Balanced              |

**Hosting Enabled** は、操作している PC をホストとして許可するかを設定する項目です。セキュリティの観点から、基本的に Disable に設定して、ホストして接続されるコンピュータのみ Enabled に設定することをオススメします。

**Host Name** は、Computers の画面で表示されるホストの名前を設定することが出来ます。ホストを複数台、管理する場合は設定するとわかりやすくなると思います。筆者が管理しているホストは 1 台で、特に、こだわりもないので空白に設定しています。

**Resolution** は、クライアント側の解像度を設定することが出来ます。Use Client Resolution に設定すると、クライアントが指定した解像度に設定されます。ホスト側の通信帯域が限られているので解像度を制限して帯域を確保するというシチュエーションは考えられますが、基本的には Use Client Resolution で大丈夫だと思います。

**Bandwidth Limit** は、帯域幅を 3 Mbps から 50 Mbps に制限することが出来ます。帯域幅が小さければ小さいほど転送される映像が低画質になるので、特別な事情がない限り MAX の 50 Mbps に設定することをオススメします。

**Fallback To Virtual Display** を ON にすることで、物理ディスプレイが接続されていない場合のみ仮想ディスプレイを追加することが出来ます。この設定によってダミープラグを使う必要がなくなります。左記の通り、物理ディスプレイが接続されている場合は仮想ディスプレイは追加されないような制御なので、特別な理由がない限り、とりあえず ON でいいと思います。

**FPS** は、筆者の使用しているディスプレイが 60Hz なので、デフォルトの 60 に設定しています。現在、30 ～ 240 まで設定することが出来ますが、増やせば増やすほど Bitrate が増加するので注意が必要です。また、この項目は接続中にも動的に変更することが出来ます。

**Idle Kick Timer** は、アイドル状態のクライアントがキックされるまでの分数を設定できます。0 に設定することで、アイドルキックを OFF に出来ます。特に変更する理由がないので、デフォルトの 0 に設定しています。

**Exclusive Input Mode** は、ON にすることで複数のクライアントが同時にマウスを操作することを許可します。この設定は複数人でゲームをプレイする際に ON する必要がありますが、基本的には OFF で大丈夫だと思います。

**Display**、**Audio**、**Echo Cancelling**、**Echo Selection** も基本的にはデフォルト値で大丈夫だと思います。ホスト OS 側で Slack や Discor を立ち上げてビデオ通話する際は適宜、変更する必要があると思います。

**Virtual Gamepad Type** は、接続時にゲストに割り当てられる仮想ゲームパッドのタイプを設定することが出来ます。筆者は、Xbox コントローラーを使用するので Xbox 360 に設定しています。ここは各自が使用するコントローラーに合わせて変更してください。

**Quality** は、画質とレイテンシーのどちらを優先するか設定できる項目です。Balanced に設定していますが、Lowest Latency や Highest Quality と比較して Encode と Bitrate の値に大きな差はありませんでした。また、体感としても差を感じることが出来ませんでした。4K や 240 FPS の環境下で差が発生する可能性はありますが、FHD + 60 FPS の環境下では差を観測、体感することは出来ませんでした。

## 4. おわりに

Parsec を初めて触った時は、Microsoft Remote Desktop や Chrome Remote Desktop などと比較して、遅延の低さに驚きました。筆者のローカルネットワーク環境 (有線) だと、レイテンシーが 10 ～ 20 ms 程度です。60 FPS ≒ 0.0166 sec = 16.6 ms で考えると 1F 程度の遅延です。外出先でも 20 ～ 40 ms 程度であり、2F 程度の遅延です。競技レベルのゲームは厳しいですが、大体の作業はストレスなく出来るレベルだと思います。

ここまで、Parsec のオススメ設定について記述してきました。各設定項目の詳細な最新情報は、Parsec の公式ドキュメント [^2] を参照ください。また、上記の設定は、あくまでも一個人の経験則から導き出したものであり、最適パフォーマンスを保証するものではないことを、ご了承ください。

[^2]: All Advanced Configuration Options – Parsec：https://support.parsec.app/hc/en-us/articles/360001562772-All-Advanced-Configuration-Options
