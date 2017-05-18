#!/bin/bash
apt-get update

cd app/server

npm install --production

node index.js
