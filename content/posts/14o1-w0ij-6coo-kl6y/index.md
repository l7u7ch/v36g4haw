---
title: Python 3 で ROT13 (シーザ暗号) を実装する
createdAt: 2018-01-01T00:00:00+0900
updatedAt: 2020-12-21T04:25:35+0900
heroImage: 
---

## 1. はじめに

　Python 3 には [ROT13](https://docs.python.org/ja/3/library/codecs.html#text-transforms) が組み込まれているため，シーザー暗号をフルスクラッチで実装する必要はありません。しかし，鍵が 13 で固定されているため，汎用性に欠けています。そこで，本記事ではシーザー暗号の暗号化，復号化，及び，解析 (ブルートフォースアタック) を行うスクリプトを  Python 3 で実装し，実行結果を確認します。また，本記事内で行っている作業は，以下の環境下で実行したものです。

* Python Ver.3.6.9
* Zorin OS 15.2 Core (Ubuntu 18.04 LTS)

## 2. 暗号化スクリプト

　以下の平文を暗号化するスクリプトを任意のフォルダ内に *encryption.py* というファイル名で保存します。encryption.py を実行し，暗号化したい平文と鍵を入力すると，暗号文が出力されます。

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

def encrypt(str, key):
    ciphertext = ""

    for ch in list(str):
        if 'A' <= ch <= 'Z':
            ciphertext += chr((ord(ch) - ord('A') - key) % 26 + ord('A'))
        elif 'a' <= ch <= 'z':
            ciphertext += chr((ord(ch) - ord('a') - key) % 26 + ord('a'))
        else:
            ciphertext += ch

    return ciphertext

if __name__ == '__main__':
    plaintext = input("PLEASE INPUT PLAINTEXT : ")
    key = input("PLEASE INPUT KEY : ")
    ciphertext = encrypt(plaintext, int(key))

    print("CIPHERTEXT : " + ciphertext)

    input("PLEASE PRESS ANY")
```

```bash
$ python3 encryption.py
PLEASE INPUT PLAINTEXT : Apple
PLEASE INPUT KEY : 13
CIPHERTEXT : Nccyr
PLEASE PRESS ANY
```

## 3. 復号化スクリプト

　以下の暗号文を復号化するスクリプトを任意のフォルダ内に *decryption.py* というファイル名で保存します。decryption.py を実行し，暗号文と鍵を入力すると，復号された平文が出力されます。

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

def deencrypt(str, key):
    plaintext = ""

    for ch in list(str):
        if 'A' <= ch <= 'Z':
            plaintext += chr((ord(ch) - ord('A') + key) % 26 + ord('A'))
        elif 'a' <= ch <= 'z':
            plaintext += chr((ord(ch) - ord('a') + key) % 26 + ord('a'))
        else:
            plaintext += ch

    return plaintext

if __name__ == '__main__':
    ciphertext = input("PLEASE INPUT CIPHERTEXT : ")
    key = input("PLEASE INPUT KEY : ")
    plaintext = deencrypt(ciphertext, int(key))

    print("PLAINTEXTtext : " + plaintext)

    input("PLEASE PRESS ANY")
```

```bash
$ python3 decryption.py
PLEASE INPUT CIPHERTEXT : Nccyr
PLEASE INPUT KEY : 13
PLAINTEXTtext : Apple
PLEASE PRESS ANY
```

## 4. 解析スクリプト

　以下の暗号文をブルートフォースアタックによって解析するスクリプトを任意のフォルダ内に *bfa.py* というファイル名で保存します。bfa.py を実行し，暗号文を入力すると，総当りで解析された平文が出力されます。

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

def deencrypt(str, key):
    plaintext = ""

    for ch in list(str):
        if 'A' <= ch <= 'Z':
            plaintext += chr((ord(ch) - ord('A') + key) % 26 + ord('A'))
        elif 'a' <= ch <= 'z':
            plaintext += chr((ord(ch) - ord('a') + key) % 26 + ord('a'))
        else:
            plaintext += ch

    return plaintext

if __name__ == '__main__':
    ciphertext = input("PLEASE INPUT CIPHERTEXT : ")

    for i in range(1, 26):
        print('{0:2d}'.format(i) + " : " + deencrypt(ciphertext, i))

    input(input("PLEASE PRESS ANY"))
```

```bash
$ python3 bfa.py
PLEASE INPUT CIPHERTEXT : Nccyr
 1 : Oddzs
 2 : Peeat
 3 : Qffbu
 4 : Rggcv
 5 : Shhdw
 6 : Tiiex
 7 : Ujjfy
 8 : Vkkgz
 9 : Wllha
10 : Xmmib
11 : Ynnjc
12 : Zookd
13 : Apple
14 : Bqqmf
15 : Crrng
16 : Dssoh
17 : Ettpi
18 : Fuuqj
19 : Gvvrk
20 : Hwwsl
21 : Ixxtm
22 : Jyyun
23 : Kzzvo
24 : Laawp
25 : Mbbxq
PLEASE PRESS ANY
```

## 5. おわりに

　本記事では，シーザー暗号の暗号化，復号化，及び，解析 (ブルートフォースアタック) を行うスクリプトを Python で実装し，その実行結果を確認することが出来た。世の中には，シーザー暗号の他にユニークな古典暗号が数多く存在しています。そこで，今後はそれらの暗号の実装にも取り組んでいきたいと考えています。