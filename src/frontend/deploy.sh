#!/bin/bash
shopt -s extglob

# Sikrer, at wd er øverst i Angular-applikationen
cd "$(dirname "$0")/../.."
git branch gh-pages
git checkout gh-pages

# Rydder op i dir
# rm -rf !(.git|.gitignore|src|docs)

# Fjerner cache >:O
cd src/frontend
rm -rf node_modules/.cache

# # Til gh-pages branch
# ng deploy

# Til master branch

# Bygger og rykker til øverst i git-repoet
ng build --prod
yes | cp -rf dist/frontend/* ../..
rm -rf dist

# # Pusher til git
git add -A
git commit -m"{$1:-'Nyt build'}"
git push origin gh-pages -f
git checkout master










