---
title: CppUnit を Ubuntu 18.04 LTS にインストールする
createdAt: 2020-01-10T00:37:00+0900
updatedAt: 2020-12-15T14:33:22+0900
heroImage: 
---

## 1. はじめに

　[CppUnit](https://freedesktop.org/wiki/Software/cppunit/) は，ユニットテストフレームワークとして有名な JUnit の C++ バージョンです。公式サイトに記載されているビルド手順に従って Ubuntu 18.04 LTS にインストールしようとしてもエラーが発生します。本記事では，CppUnit をマニュアルでコンパイルして，Ubuntu 18.04 LTS にインストールする手順について記述します。

## 2. コンパイル

　まずは，公式サイトに記載されているビルド手順に従ってコンパイルします。

```bash
$ git clone git://anongit.freedesktop.org/git/libreoffice/cppunit/
$ ls
cppunit
$ cd cppunit
$ ./autogen.sh
error: aclocal not found
```

　まず初めに，*error: aclocal not found* というエラーが出力されます。これは，aclocal (Automake) パッケージが存在していないという意味なので，aclocal (GNU Automake) パッケージをインストールし，再度 *autogen.sh* スクリプトを実行します。

```bash
$ sudo apt install automake -y
$ ./autogen.sh
./autogen.sh: need libtoolize tool to build cppunit
```
　次に，*./autogen.sh: need libtoolize tool to build cppunit* というエラーが出力されます。これは，libtoolize (GNU Libtool) パッケージが存在していないという意味なので，libtoolize (GNU Libtool) パッケージをインストールし，再度 *autogen.sh* スクリプトを実行します。

```bash
$ sudo apt install libtool -y
$ ./autogen.sh
libtoolize: putting auxiliary files in '.'.
libtoolize: copying file './ltmain.sh'
libtoolize: putting macros in AC_CONFIG_MACRO_DIRS, 'm4'.
(略)
configure.ac:20: installing './missing'
examples/cppunittest/Makefile.am: installing './depcomp'
parallel-tests: installing './test-driver'
```

　*autogen.sh* スクリプトが正常に実行されていれば，上記のような文字列が出力されます。次に，*configure* スクリプトを実行します。

```bash
$ ./configure
checking for a BSD-compatible install... /usr/bin/install -c
checking whether build environment is sane... yes
checking for a thread-safe mkdir -p... /bin/mkdir -p
(略)
checking whether g++ supports C++11 features with -std=c++11... no
checking whether g++ supports C++11 features with -std=c++0x... no
configure: error: *** A compiler with support for C++11 language features is required.
```

　*configure: error: *** A compiler with support for C++11 language features is required.* というエラーが出力されます。これは，C++ コンパイラが存在していないという意味なので，C++ コンパイラをインストールし，再度 *configure* スクリプトを実行します。

```bash
$ sudo apt install g++ -y
$ ./configure
checking for a BSD-compatible install... /usr/bin/install -c
checking whether build environment is sane... yes
checking for a thread-safe mkdir -p... /bin/mkdir -p
(略)
==============================================================================
Build configuration:
	debug:              no
	docs:               no
	werror:             yes
==============================================================================
```

　*configure* スクリプトが正常に実行されていれば，上記のような文字列が出力されます。最後に，*make* コマンドを用いて CppUnit のソースコードをコンパイルします。

```bash
$ make
make  all-recursive
make[1]: ディレクトリ '/home/[USER_NAME]/cppunit' に入ります
Making all in src
(略)
make[2]: 'all-am' に対して行うべき事はありません.
make[2]: ディレクトリ '/home/[USER_NAME]/cppunit' から出ます
make[1]: ディレクトリ '/home/[USER_NAME]/cppunit' から出ます
```

　*make* コマンドが正常に実行されていれば，上記のような文字列が出力されます。これで CppUnit のコンパイルは完了です。続いて，CppUnit のインストールに移ります。

## 3. インストール

　管理者権限の *make* コマンドに引数 *install* を付与して実行します。

```bash
$ sudo make install
Making install in src
make[1]: ディレクトリ '/home/[USER_NAME]/cppunit/src' に入ります
Making install in cppunit
(略)
 /usr/bin/install -c -m 644 cppunit.pc '/usr/local/lib/pkgconfig'
make[2]: ディレクトリ '/home/[USER_NAME]/cppunit' から出ます
make[1]: ディレクトリ '/home/[USER_NAME]/cppunit' から出ます
```

インストールが正常に完了していれば上記のような文字列が出力されます。これで CppUnit のインストールは完了です。続いて，CppUnit の動作確認に移ります。

## 4. 動作確認

　公開されている CppUnit の[サンプルコード](http://nonbiri-tereka.hatenablog.com/entry/2014/06/25/093327)を，お借りして動作確認を行います。サンプルコードを *sample.cpp* として任意の場所に保存し，コンパイル，実行します。

```bash
$ ls
sample.cpp
$ g++ -std=c++14 -g sample.cpp -L /usr/local/lib -lstdc++ -lcppunit -ldl
$ ./a.out
./a.out: error while loading shared libraries: libcppunit-1.15.so.1: cannot open shared object file: No such file or directory
```

　*libcppunit.so* が参照されていない状態なので，[ネット記事](https://n9d.hatenadiary.org/entry/20080820/1219228809)を参考にしてパスを通し，再度 *a.out* を実行します。

```bash
$ export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib
./a.out
FunctionTest::test_add : OK
FunctionTest::test_diff : assertion
FunctionTest::test_mul : OK
sample.cpp:69:Assertion
Test name: FunctionTest::test_diff
equality assertion failed
- Expected: 1
- Actual  : 100

Failures !!!
Run: 3   Failure total: 1   Failures: 1   Errors: 0
```

　正常に実行されていれば引用元の実行結果と同様の実行結果が出力されます。これで CppUnit の動作確認が完了です。

## 5. おわりに

　ここまで，CppUnit をマニュアルでコンパイルし，Ubuntu 18.04 LTS にインストールする手順について記述してきました。ここ数年で，CppUnit 以外の C++ 用ユニットテストフレームワークが多く登場してきたので CppUnit を使用する機会も減っています。それに伴い，CppUnit に関する新しい記事も減っています。本記事が CppUnit ユーザーの一助になれば幸いです。

## 環境情報

* CppUnit Ver.1.15.1
* g++ Ver.7.4.0
* Bash Ver.4.4.20
* Zorin OS 15 Core (Ubuntu 18.04 LTS)