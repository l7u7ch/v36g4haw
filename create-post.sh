#!/bin/bash

current_datetime=$(date +"%Y-%m-%d %H:%M")
folder_name=$(uuidgen)
folder_path="./src/content/blog/${folder_name}"
mkdir -p "$folder_path"
cat << EOF > "${folder_path}/index.md"
---
title: 'UNTITLE'
publishedDateTime: '$current_datetime'
updatedDateTime: '$current_datetime'
heroImage: ''
---
EOF