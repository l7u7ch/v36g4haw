---
title: 'Windows 10 の設定項目と ms-settings の対応表'
publishedAt: '2019-04-18T00:00:00+0900'
updatedAt: '2020-12-21T04:02:50+0900'
heroImage: '/src/assets/default-hero-image.png'
---

## 1. はじめに

Windows 10 では，ms-settings と呼ばれる URI スキームを用いることで設定アプリを起動することが可能です。ms-settings に関する情報は [Microsoft Docs](https://docs.microsoft.com/en-us/windows/uwp/launch-resume/launch-settings-app) に公開されています。しかし，アルファベットの昇順でソートされているため，対応する設定項目が見つけづらいです。そこで，実際の Windows 10 の設定項目と ms-settings の対応表を作成しました。

また，本記事で公開している対応表は，以下の環境下で表示されている設定項目のみを抽出して作成しています。そのため，Windows 10 のバージョンや PC のモデルによって，表示されていない設定項目や ms-settings が存在する場合があります。その点はご了承下さい。

- Windows 10 Home Ver.1803 on Surface Pro 6
- Windows 10 Pro Ver.1809 on ThinkPad X260

## 2. システム

| 設定項目                     | URI             |
| ---------------------------- | --------------- |
| ディスプレイ                 | display         |
| サウンド                     | sound           |
| 通知とアクション             | notifications   |
| 集中モード                   | quiethours      |
| 電源とスリープ               | powersleep      |
| バッテリー                   | batterysaver    |
| ストレージ                   | storagepolicies |
| タブレットモード             | tabletmode      |
| マルチタスク                 | multitasking    |
| この PC へのプロジェクション | project         |
| 共有エクスペリエンス         | crossdevice     |
| クリップボード               | clipboard       |
| リモートデスクトップ         | remotedesktop   |
| バージョン情報               | about           |

## 3. デバイス

| 設定項目                     | URI              |
| ---------------------------- | ---------------- |
| Bluetooth とその他のデバイス | bluetooth        |
| プリンターとスキャナー       | printers         |
| マウス                       | mousetouchpad    |
| タッチパッド                 | devices-touchpad |
| 入力                         | typing           |
| ペンと Windows Ink           | pen              |
| 自動再生                     | autoplay         |
| USB                          | usb              |

## 4. 電話

| 設定項目 | URI            |
| -------- | -------------- |
| 電話     | mobile-devices |

## 5. ネットワークとインターネット

| 設定項目               | URI                   |
| ---------------------- | --------------------- |
| 状態                   | network-status        |
| Wi-Fi                  | network-wifi          |
| イーサネット           | network-ethernet      |
| ダイアルアップ         | network-dialup        |
| VPN                    | network-vpn           |
| 機内モード             | network-airplanemode  |
| モバイルホットスポット | network-mobilehotspot |
| データ使用状況         | datausage             |
| プロキシ               | network-proxy         |

## 6. 個人用設定

| 設定項目   | URI                          |
| ---------- | ---------------------------- |
| 背景       | personalization-background   |
| 色         | colors                       |
| ロック画面 | lockscreen                   |
| テーマ     | themes                       |
| フォント   | fonts                        |
| スタート   | personalization-start-places |
| タスクバー | taskbar                      |

## 7. アプリ

| 設定項目             | URI             |
| -------------------- | --------------- |
| アプリと機能         | appsfeatures    |
| 既定のアプリ         | defaultapps     |
| オフラインマップ     | maps            |
| Web サイト用のアプリ | appsforwebsites |
| ビデオの再生         | videoplayback   |
| スタートアップ       | startupapps     |

## 8. アカウント

| 設定項目                     | URI              |
| ---------------------------- | ---------------- |
| ユーザーの情報               | yourinfo         |
| メールとアカウント           | emailandaccounts |
| サインインオプション         | signinoptions    |
| 職場または学校にアクセスする | workplace        |
| 家族とその他のユーザー       | otherusers       |
| 設定の同期                   | sync             |

## 9. 時刻と言語

| 設定項目   | URI              |
| ---------- | ---------------- |
| 日付と時刻 | dateandtime      |
| 地域       | regionformatting |
| 言語       | regionlanguage   |
| 音声認識   | speech           |

## 10. ゲーム

| 設定項目          | URI                   |
| ----------------- | --------------------- |
| ゲームバー        | gaming-gamebar        |
| キャプチャ        | gaming-gamedvr        |
| ブロードキャスト  | gaming-broadcasting   |
| ゲームモード      | gaming-gamemode       |
| Xbox ネットワーク | gaming-xboxnetworking |

## 11. 簡単操作

| 設定項目                     | URI                               |
| ---------------------------- | --------------------------------- |
| ディスプレイ                 | easeofaccess-display              |
| カーソルとポインターのサイズ | easeofaccess-cursorandpointersize |
| 拡大鏡                       | easeofaccess-magnifier            |
| カラーフィルター             | easeofaccess-colorfilter          |
| ハイライト                   | easeofaccess-highcontrast         |
| ナレーター                   | easeofaccess-narrator             |
| オーディオ                   | easeofaccess-audio                |
| 字幕                         | easeofaccess-closedcaptioning     |
| 音声認識                     | easeofaccess-speechrecognition    |
| キーボード                   | easeofaccess-keyboard             |
| マウス                       | easeofaccess-mouse                |
| 視線制御                     | easeofaccess-eyecontrol           |

## 12. Cortana

| 設定項目               | URI                   |
| ---------------------- | --------------------- |
| Cortana に話しかける   | cortana-talktocortana |
| アクセス許可と履歴     | cortana-permissions   |
| デバイス間での Cortana | cortana-notifications |
| 詳細情報               | cortana-moredetails   |

## 13. プライバシー

| 設定項目                     | URI                            |
| ---------------------------- | ------------------------------ |
| 全般                         | privacy-general                |
| 音声認識                     | privacy-speech                 |
| 手書き入力と入力の個人用設定 | privacy-speechtyping           |
| 診断 & フィードバック        | privacy-feedback               |
| アクティビティの履歴         | privacy-activityhistory        |
| 位置情報                     | privacy-location               |
| カメラ                       | privacy-webcam                 |
| マイク                       | privacy-microphone             |
| 通知                         | privacy-notifications          |
| アカウント情報               | privacy-accountinfo            |
| 連絡先                       | privacy-contacts               |
| カレンダー                   | privacy-calendar               |
| 電話履歴                     | privacy-callhistory            |
| メール                       | privacy-email                  |
| タスク                       | privacy-tasks                  |
| メッセージング               | privacy-messaging              |
| 無線                         | privacy-radios                 |
| 他のデバイス                 | privacy-customdevices          |
| バックグラウンドアプリ       | privacy-backgroundapps         |
| アプリの診断                 | privacy-appdiagnostics         |
| ファイルの自動ダウンロード   | privacy-automaticfiledownloads |
| ドキュメント                 | privacy-documents              |
| ピクチャ                     | privacy-pictures               |
| ビデオ                       | privacy-videos                 |
| ファイルシステム             | privacy-broadfilesystemaccess  |

## 14. 更新とセキュリティ

| 設定項目                | URI                   |
| ----------------------- | --------------------- |
| Windows Update          | windowsupdate         |
| 配信の最適化            | delivery-optimization |
| Windows セキュリティ    | windowsdefender       |
| バックアップ            | backup                |
| トラブルシューティング  | troubleshoot          |
| 回復                    | recovery              |
| ライセンス認証          | activation            |
| デバイスの検索          | findmydevice          |
| 開発者向け              | developers            |
| Windows Insider Program | windowsinsider        |
| デバイスの暗号化        | deviceencryption      |

## 15. おわりに

ここまで，Windows 10 の設定 ms-settings の対応表を記載してきました。冒頭でも述べた通り，Windows 10 の設定で表示される設定項目は，ハードウェアと Windows 10 のビルドバージョンに依存します。そのため，使用している端末によっては上記の一覧表と一致しない場合があります。抜けている設定項目や非推奨になっている ms-settings があれば報告していただけると幸いです。
