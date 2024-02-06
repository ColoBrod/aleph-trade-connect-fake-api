#!/usr/bin/bash

user="root"
host="62.113.111.120"
# host="92.53.91.152"

echo "[*] => Copying files..."
scp ./index.js $user@$host:/var/www/demo.wmf24.ru/back/index.js
scp ./data-export-beverages.mjs $user@$host:/var/www/demo.wmf24.ru/back/data-export-beverages.mjs
scp ./data-export-cleanings.mjs $user@$host:/var/www/demo.wmf24.ru/back/data-export-cleanings.mjs
scp ./data-export-events.mjs $user@$host:/var/www/demo.wmf24.ru/back/data-export-events.mjs
scp ./data-export-time.mjs $user@$host:/var/www/demo.wmf24.ru/back/data-export-time.mjs
echo "[*] => Completed!"


 
