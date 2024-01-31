#!/bin/bash

current_datetime=$(date +"%Y-%m-%d %H:%M")
folder_name=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 4 | tr '\n' '-' | sed 's/-$//')
folder_path="./content/posts/${folder_name}"
mkdir -p "$folder_path"
cat << EOF > "${folder_path}/index.md"
---
title: UNTITLE
createdAt: $current_datetime
updatedAt: $current_datetime
heroImage: 
---
EOF