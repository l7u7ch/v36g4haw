---
title: 'Bluesky API と Google Apps Script (GAS) でポストを投稿・取得・削除する'
publishedAt: '2024-02-17 14:38'
updatedAt: '2024-02-17 14:38'
heroImage: './2D4FE2EAAE8CF7B91CDB8D33E4447179.webp'
---

## 1. はじめに

2024年02月06日、Bluesky の招待制度を解除されたので、筆者もアカウントを作成しました。新しいサービスを使い始めたら、まずは API 周りを調査しないといけません。本記事では、 Bluesky API について調査した結果と、Bluesky API を GAS で叩いて遊んだ結果をまとめたものになります。Bluesky API に関しては公式ドキュメント [^1] が公開されているので、詳しい仕様については、そちらを参照ください。

[^1]: Bluesky, Get Started：https://www.docs.bsky.app/docs/get-started

## 2. ポストを投稿する

Bluesky API 経由でポストを投稿する方法は簡単で、`com.atproto.server.createSession` を叩いて認証セッションを作成して、`com.atproto.repo.createRecord` を叩いてポストを投稿します。

以下のサンプルコードを実行する際は、`[USER_IDENTIFIER]` と `[APP_PASSWORD]` を変更した後、`main` 関数を実行します。`[USER_IDENTIFIER]` は、登録済みのメールアドレスまたは Handle (xxx.bsky.social) を設定してください。また、`[APP_PASSWORD]` にアカウント登録時のパスワードを設定するのは非推奨です。

```js
function main() {
  createRecord('テストポスト')
}

// https://www.docs.bsky.app/docs/api/com-atproto-server-create-session
function createSession() {
  const url = 'https://bsky.social/xrpc/com.atproto.server.createSession'

  const payload = {
    identifier: '[USER_IDENTIFIER]',
    password: '[APP_PASSWORD]',
  }

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    payload: JSON.stringify(payload),
  }

  const response = UrlFetchApp.fetch(url, options)
  return JSON.parse(response.getContentText())
}

// https://www.docs.bsky.app/docs/api/com-atproto-repo-create-record
function createRecord(msg) {
  const url = 'https://bsky.social/xrpc/com.atproto.repo.createRecord'

  const payload = {
    repo: createSession().handle,
    collection: 'app.bsky.feed.post',
    record: {
      text: msg,
      createdAt: new Date().toISOString(),
    },
  }

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + createSession().accessJwt,
    },
    payload: JSON.stringify(payload),
  }

  UrlFetchApp.fetch(url, options)
}
```

## 3. 自分のポストを取得する

Bluesky API 経由で自分のポストを取得する方法は簡単で、`com.atproto.server.createSession` を叩いて認証セッションを作成して、`app.bsky.feed.getAuthorFeed` を叩いて自分のポストを取得します。デフォルトでは最新のポスト、50 件が取得される仕様です。取得件数を変動させたり古いポストを取得するには、`limit` や `cursor` を変更します。詳しくは公式のドキュメントを参照ください。

以下のサンプルコードを実行する際は、`[USER_IDENTIFIER]` と `[APP_PASSWORD]` を変更した後、`main` 関数を実行します。`[USER_IDENTIFIER]` は、登録済みのメールアドレスまたは Handle (xxx.bsky.social) を設定してください。また、`[APP_PASSWORD]` にアカウント登録時のパスワードを設定するのは非推奨です。

```js
function main() {
  getAuthorFeed().feed.map((x) => console.log(x))
}

// https://www.docs.bsky.app/docs/api/com-atproto-server-create-session
function createSession() {
  const url = 'https://bsky.social/xrpc/com.atproto.server.createSession'

  const payload = {
    identifier: '[USER_IDENTIFIER]',
    password: '[APP_PASSWORD]',
  }

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    payload: JSON.stringify(payload),
  }

  const response = UrlFetchApp.fetch(url, options)
  return JSON.parse(response.getContentText())
}

// https://www.docs.bsky.app/docs/api/app-bsky-feed-get-author-feed
function getAuthorFeed() {
  const url = `https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed?actor=${createSession().handle}`

  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + createSession().accessJwt,
    },
  }

  const response = UrlFetchApp.fetch(url, options)
  return JSON.parse(response.getContentText())
}
```

## 4. 自分のポストを削除する

Bluesky API 経由で自分のポストを削除する場合、ポストの `Record Key` を取得する必要があります。Record Key は、Bluesky の Web クライアントで確認することが出来ます。任意のポストを Bluesky の Web クライアントで表示させると、URL として https://bsky.app/profile/xxx.bsky.social/post/3kksx5ddx6d24 などと表示されます。この `3kksx5ddx6d24` が Record Key にあたります。

以下のサンプルコードは、上記で示した getAuthorFeed 関数を利用して、最新ポストの Record Key を取得し、削除するものです。正常に実行されると、自分の最新ポストが削除されるので注意してください。

以下のサンプルコードを実行する際は、`[USER_IDENTIFIER]` と `[APP_PASSWORD]` を変更した後、`main` 関数を実行します。`[USER_IDENTIFIER]` は、登録済みのメールアドレスまたは Handle (xxx.bsky.social) を設定してください。また、`[APP_PASSWORD]` にアカウント登録時のパスワードを設定するのは非推奨です。

```js
function main() {
  const rkey = getAuthorFeed().feed.shift().post.uri.split('/').pop()
  deleteRecord(rkey)
}

// https://www.docs.bsky.app/docs/api/com-atproto-server-create-session
function createSession() {
  const url = 'https://bsky.social/xrpc/com.atproto.server.createSession'

  const payload = {
    identifier: '[USER_IDENTIFIER]',
    password: '[APP_PASSWORD]',
  }

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    payload: JSON.stringify(payload),
  }

  const response = UrlFetchApp.fetch(url, options)
  return JSON.parse(response.getContentText())
}

// https://www.docs.bsky.app/docs/api/app-bsky-feed-get-author-feed
function getAuthorFeed() {
  const url = `https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed?actor=${createSession().handle}`

  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + createSession().accessJwt,
    },
  }

  const response = UrlFetchApp.fetch(url, options)
  return JSON.parse(response.getContentText())
}

// https://www.docs.bsky.app/docs/api/com-atproto-repo-delete-record
function deleteRecord(rkey) {
  const url = 'https://bsky.social/xrpc/com.atproto.repo.deleteRecord'

  const payload = {
    repo: createSession().handle,
    collection: 'app.bsky.feed.post',
    rkey: rkey,
  }

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + createSession().accessJwt,
    },
    payload: JSON.stringify(payload),
  }

  UrlFetchApp.fetch(url, options)
}
```

## 5. おわりに

執筆時点では、招待制度を解除されてユーザーが増えた影響か、結構 API の使用制限 (RateLimitExceeded) に引っかかります。一応、GitHub Discussions [^2] では **3000 リクエスト / 5 分** に設定されているそうですが、一時的に厳しくなっている可能性もありますね。Bluesky 自体が開発途上なので、API 周りのおいおい整備されていくと思います。いつまで無料で遊べるかもわからないので、今のうちに遊んでおこうと思います。

[^2]: GitHub Discussions, Are there rate limits for the API?：https://github.com/bluesky-social/atproto/discussions/697
