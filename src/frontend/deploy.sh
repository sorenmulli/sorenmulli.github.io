#!/bin/bash
shopt -s extglob

# Sikrer, at wd er øverst i Angular-applikationen
cd "$(dirname "$0")"

# Bygger og rykker til øverst i git-repoet
# ng build --prod
yes | cp -rf dist/frontend/* ../..

cd ../..
rm !(.git|.gitignore|src|docs)
rm -rf dist

# Pusher til git
# git add -A
# git commit -m"$1"
# git pull
# git push








