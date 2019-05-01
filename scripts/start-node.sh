#!/bin/bash

export NODE_ENV=production

cd /home/node/main
pm2 delete all
pm2 start index.js -i max --merge-logs --log ../logs/app.log
pm2 save