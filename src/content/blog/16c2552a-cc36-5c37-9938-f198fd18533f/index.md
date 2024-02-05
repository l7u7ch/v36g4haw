---
title: 'Misskey API と Google Apps Script を用いて自分のノート一覧を取得する'
publishedAt: '2023-09-05T01:20:36.390Z'
updatedAt: '2023-09-05T01:20:36.390Z'
heroImage: './18ccbee6.png'
---

## 1. はじめに

Google Apps Script (GAS) を用いて Misskey にノートをポストする方法については既にブログ記事 [^1] で公開されている。しかし，GAS を用いて自分のノート一覧を取得する方法について解説している情報は，調査した限りでは無かった。そこで，本記事では Misskey API と GAS を用いて自分のノート一覧を取得する方法について記述する。

[^1]: なおむし,【コピペで OK】GoogleAppsScript を使って Misskey に投稿する方法, https://note.com/naosim/n/n434e182e351c.

## 2. ソースコード

以下に自分のノート一覧を表示する GAS のソースコードを示します。(1) と (2) の部分に関しては自分の環境に適した値に置き換えてください。アクセストークンに関しては参考文献 [^2] に従って取得してください。以下のソースコードでは権限をすべて無効にしても正常に動作します。fetchMyNotes を実行し，自分のノート一覧が表示されれば正常に動作しています。

[^2]: kanbatch, Misskey のアクセストークン発行方法, https://baskmedia.jp/misskey-access-token/.

```jsx
const BASE_URL = '[YOUR_MISSKEY_INSTANCE_URL]' // (1) (例) https://misskey.io
const API_TOKEN = '[YOUR_API_TOKEN]' // (2)

function fetchMyUserId() {
  const ENDPOINT = '/api/i'
  const OPTIONS = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify({
      i: API_TOKEN,
    }),
  }

  const response = UrlFetchApp.fetch(BASE_URL + ENDPOINT, OPTIONS)
  const userInfo = JSON.parse(response.getContentText())

  const userId = userInfo.id
  Logger.log(userId)
  return userId
}

function fetchMyNotes() {
  const ENDPOINT = '/api/users/notes'
  const OPTIONS = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify({
      i: API_TOKEN, // Required
      userId: fetchMyUserId(), // Required
      limit: 10, // (3) Ooptional
      sinceDate: 0, // (4) Ooptional
      untilDate: 0, // (5) Ooptional
    }),
  }

  const response = UrlFetchApp.fetch(BASE_URL + ENDPOINT, OPTIONS)
  const notes = JSON.parse(response.getContentText())

  for (let note of notes) {
    Logger.log(note.text)
  }
}
```

(3) は取得するノートの数を制御しています。1 ~ 100 の範囲で指定ができ，10 がデフォルト値となっています。また，(4) と (5) は取得するノートの作成日時を制御しています。使用する場合はタイムスタンプ (ミリ秒) で指定する必要があります。例えば 2023 年 9 月 5 日 00:00:00 以前のノートだけを取得する場合は，untilDate に 1693839600000 を設定します。その他のオプションについては Misskey.io の API ドキュメント [^3] を参照ください。また，サーバーによっては API の仕様に差がある場合があるので各時のサーバーが公開している情報を参照ください。

[^3]: Misskey API users/notes, https://misskey.io/api-doc#tag/users/operation/users/notes.

## 3. おわりに

ここまで，Misskey API と GAS を用いて自分のノート一覧を取得する方法について記述してきました。最初は簡単に実装できると思っていたんですが，userId の部分を @XXX の形式だと勘違いして沼りました。上記のソースコードでは，同じ轍を踏まないように関数で userId を取得できるようにしています。また，sinceDate と untilDate の仕様がわからず沼りました。ソースコードを参照して，ようやく仕様を理解することができました。最後に，各自のサーバーの利用規約を守って API を使用しましょう。
