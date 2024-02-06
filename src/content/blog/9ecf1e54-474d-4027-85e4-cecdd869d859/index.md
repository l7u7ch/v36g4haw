---
title: 'Create React App で生成される React アプリを最小構成にする'
publishedAt: '2020-12-05T07:11:00+0900'
updatedAt: '2020-12-15T14:47:53+0900'
heroImage: ''
---

## 1. はじめに

[Create React App](https://github.com/facebook/create-react-app) は，Facebook 社が開発している React アプリの生成ツールです。Create React App を用いることで React アプリのテンプレートを手軽に生成することが出来るので，モックアップやテスト用の React アプリを生成する際に重宝しています。しかし，デフォルトで生成される React アプリは，不要な CSS ファイルや JavaScript ファイルが含まれています。そこで，本記事では React アプリが起動する最小構成にブラッシュアップする手順について記述します。

本記事内で行っている作業は，以下の環境下で実行したものです。以降，これらのツールはインストール済みの前提で記述していますが，インストール手順は割愛しているので，ご了承下さい。

- Create React App Ver.4.0.1
- npx Ver.6.14.9
- Zorin OS 15.2 Core (Ubuntu 18.04 LTS)

## 2. テンプレートの生成

Create React App の [README.md](https://github.com/facebook/create-react-app) に従って，React アプリのテンプレートを任意のフォルダ内に生成します。[tree](https://www.atmarkit.co.jp/ait/articles/1802/01/news025.html) コマンドを用いて確認すると，正常に React アプリのテンプレートが生成されていることが確認できます。

```bash
$ npx create-react-app my-app
$ ls
my-app
$ cd my-app
$ tree -L 2
.
├── README.md
├── node_modules
│   ├── @babel
│   ├── @bcoe
│   ├── @cnakazawa
│   ├── (割愛)
│   ├── yaml
│   ├── yargs
│   └── yargs-parser
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
└── yarn.lock
```

## 3. 不要なファイルの削除

第 2 章で生成したファイルの中から，不要なファイルを削除します。具体的には，node*modules フォルダ内の*モジュール*，\_package.json*，public フォルダ内の _index.html_，src フォルダ内の _App.js_ と _index.js_ 以外は，不要なため削除します。

```bash
$ tree -L 2
├── README.md
├── node_modules # 必要
│   ├── @babel
│   ├── @bcoe
│   ├── @cnakazawa
│   ├── (割愛)
│   ├── yaml
│   ├── yargs
│   └── yargs-parser
├── package.json # 必要
├── public
│   ├── favicon.ico
│   ├── index.html # 必要
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.js # 必要
│   ├── App.test.js
│   ├── index.css
│   ├── index.js # 必要
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
└── yarn.lock
```

```bash
$ tree -L 2
.
├── node_modules
│   ├── @babel
│   ├── @bcoe
│   ├── @cnakazawa
│   ├── (割愛)
│   ├── yaml
│   ├── yargs
│   └── yargs-parser
├── package.json
├── public
│   └── index.html
└── src
　   ├── App.js
　   └── index.js
```

## 4. ファイル内の修正

第 3 章では，不要なファイルを削除しました。しかし，現状では削除したファイルを参照しているファイルが存在するため，コンパイルエラーが発生し起動することが出来ません。そこで，参照箇所が存在する _App.js_ と _index.js_ のソースコードを改変していきます。_index.html_ にも参照箇所が存在していますが，改変しなくても起動することが出来るため割愛します。

```js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

⬇

function App() {
  return (
    <div className="App">
      Hello, world!
    </div>
  );
}

export default App;
```

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

⬇

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## 5. 動作確認

ターミナル上で _npm start_ を入力し，ブラウザ上に "Hello, world!" が表示されれば成功です。参照箇所が残っている場合は，コンパイル時にエラーが表示されます。その場合は，第 4 章の手順を再度実行してください。

![React App](1fc58617c7aa92a415fabbf665fb280d.png)

## 6. おわりに

ここまで，Create React App で生成した React アプリを最小構成にブラッシュアップする手順について記述してきました。サイズは，172.1MB から 171.5MB と 0.6MB しか削減することは出来ませんでしたが，public フォルダ内と src フォルダ内はスッキリすることが出来ました。
