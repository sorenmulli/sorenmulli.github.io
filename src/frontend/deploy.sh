#!/bin/bash
shopt -s extglob

# Sikrer, at wd er øverst i Angular-applikationen
cd "$(dirname "$0")/../.."

# Bygger og rykker til øverst i git-repoet

rm -rf !(.git|.gitignore|src|docs)

cd src/frontend
ng build --prod
yes | cp -rf dist/frontend/* ../..
rm -rf dist

# Pusher til git
git add -A
git commit -m"$1"
git pull
git push








