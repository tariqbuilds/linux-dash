#!/bin/bash
apt-get update && apt-get install git

cd /server/app

npm install --production

node index.js
