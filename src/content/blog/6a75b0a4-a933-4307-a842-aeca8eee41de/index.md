---
title: 'Coursier を用いた Scala 開発環境構築用 Dockerfile の概要と動作確認'
publishedAt: '2024-10-30 12:00'
updatedAt: '2024-10-30 12:00'
heroImage: './37B10B4547E2760300D7309FCAA8FEA0.webp'
---

## 1. はじめに

近年、Scala の開発環境の構築には [Coursier](https://github.com/coursier/coursier) の利用が一般的です。しかし、執筆時点では公式の Docker イメージが公開されていないため、自身で Dockerfile を作成しました。本記事では、この Dockerfile の概要と動作確認について記述します。

## 2. Dockerfile

今回、作成した Dockerfile は以下の通りです。ベースは Ubuntu を採用しています。後は、シンプルに公式ドキュメントのインストールコマンド [^1] を Dockerfile コマンドに変換しています。しかし、公式ドキュメントのインストールコマンドだけでは、パスが見つからずエラーになるので、最後に手動で環境変数を設定しています。

[^1]: Coursier, Installation：https://get-coursier.io/docs/cli-installation

```dockerfile
FROM ubuntu:latest

RUN apt-get update && apt-get install -y curl gzip

RUN curl -fL https://github.com/coursier/coursier/releases/latest/download/cs-x86_64-pc-linux.gz | gzip -d > cs && \
    chmod +x cs && \
    ./cs setup -y

ENV PATH="$PATH:/root/.local/share/coursier/bin"
```

## 3. 動作確認

`docker build` コマンドで Docker イメージを作成します。`docker run` コマンドで Docker コンテナを立ち上げて、コンテナに入ります。コンテナ内でテスト用の Scala ファイルを作成して実行します。ターミナル上に「Hello, World!」が表示されれば正常に動作しています。

```bash
$ ls
dockerfile
$ docker build -t scala-dev-env .
$ docker run -it scala-dev-env
# ここから Docker コンテナ内
$ mkdir work
$ cd work/
$ cat << EOF > Main.scala
> @main def hello(): Unit =
>   println("Hello, World!")
> EOF
$ ls
Main.scala
$ scala-cli .
Hello, World!
```

## 4. おわりに

ここまで、Coursier を用いた Scala 開発環境構築用 Dockerfile の概要と動作確認について記述してきました。今回、自作した Dockerfile は最適化などを行っていないため、ビルドされた Docker イメージは 1.81GB になります。また、sbt の動作確認なども行えていません。今後は、これらの課題解決に取り組みたいと思います。

```bash
$ docker images
REPOSITORY      TAG       IMAGE ID       CREATED          SIZE
scala-dev-env   latest    4e11bb72c9ae   27 minutes ago   1.81GB
```
