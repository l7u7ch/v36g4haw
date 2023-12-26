---
title: GHTorrent の MSR 2014 Mining Challenge Dataset の使い方
createdAt: 2023-12-26 00:45
updatedAt: 2023-12-26 20:21
heroImage: b71d9338.png
---

## 1. はじめに

　GHTorrent [^1] は、GitHub の公開イベントデータを収集し、研究者が容易にアクセスできるように整理した大規模なデータセットです。このプロジェクトは GitHub の公式 API を使用して、プルリクエスト、コミット、イシューなどの活動に関連するデータを継続的に取得し、これらのデータを MongoDB 形式と MySQL 形式で公開しています。

[^1]: Gousios, Georgios. 2013. “The GHTorent Dataset and Tool Suite.” In Proceedings of the 10th Working Conference on Mining Software Repositories, 233–36. MSR ’13. IEEE Press.

　執筆時点で GHTorrent プロジェクトは既に停止しており、公式サイトにもアクセスすることが出来ません。しかし、[Wayback Machine](https://archive.org/web/) 上にアーカイブとして残っており、データもサルベージすることが可能です。

　MSR 2014 Mining Challenge Dataset は、オリジナルの GHTorrent データセットを縮小したバージョンです。このデータセットには、プログラミング言語ごとにスター数が多い 90 個のプロジェクトと、そのフォークが含まれています。詳しい情報は MSR 2014 Mining Challenge Dataset の Web ページ [^2] を参照ください。

[^2]: MSR 2014 Mining Challenge Dataset：https://web.archive.org/web/20220505002737/https://ghtorrent.org/msr14.html

　本記事では、MySQL 形式の MSR 2014 Mining Challenge Dataset を、ローカル環境の MySQL にインポートして使用する手順について記述します。以降の作業は Ubuntu 22.04 LTS + MySQL Ver.8.0.35 環境下で実行したものです。また、MySQL はインストール済みの前提で記述しています。MySQL のインストール方法などについては割愛していることを、ご了承ください。

## 2. データセットのインポートと使用方法

　一応、MSR 2014 Mining Challenge Dataset の Web ページ [^2] にインポートする手順は記載されていますが、MySQL の文法が古いため、MySQL 8.0 系で Web サイトに記載されているコマンドを実行するとエラーが出ます。MySQL 8.0 系の文法に書き直したコードを以下に示します。

```sql
$ wget http://ghtorrent-downloads.ewi.tudelft.nl/datasets/msr14-mysql.gz
$ mysql -u root -p
Enter password: # root のパスワードを入力する
mysql> create user 'msr14'@'%' identified by 'msr14';
mysql> create database msr14;
mysql> GRANT ALL PRIVILEGES ON msr14.* TO 'msr14'@'%';
mysql> flush privileges;
mysql> exit
$ zcat msr14-mysql.gz | mysql -u msr14 -p
Enter password: # msr14 と入力する
$ mysql -u msr14 -p
Enter password: # msr14 と入力する
mysql> SELECT language, COUNT(*) FROM projects WHERE forked_from IS NULL GROUP BY language;
+------------+----------+
| language   | COUNT(*) |
+------------+----------+
| Scala      |        9 |
| R          |        4 |
| C++        |        8 |
| JavaScript |        9 |
| TypeScript |        1 |
| C          |       10 |
| C#         |        8 |
| Go         |        1 |
| Java       |        8 |
| CSS        |        3 |
| PHP        |        9 |
| Python     |       10 |
| Ruby       |       10 |
| NULL       |        1 |
+------------+----------+
14 rows in set (0.01 sec)
```

## 3. おわりに

　ここまで、MySQL 形式の MSR 2014 Mining Challenge Dataset を、ローカル環境の MySQL にインポートして使用する手順について記述してきました。MySQL に慣れている人はターミナル上で分析しても良いと思いますが、慣れていない人は [DBeaver](https://dbeaver.io/) などの GUI で MySQL を操作できる GUI ツールなどを駆使して分析すると良いと思います。
