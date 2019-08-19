# Sikrer, at wd er øverst i Angular-applikationen
cd "$(dirname "$0")"
cd frontend

# Bygger og rykker til øverst i git-repoet
ng build --prod
yes | cp -rf dist/frontend/* ../..
rm -rf dist

# Pusher til git
git add -A
git commit -m"Nyt build"
git pull
git push








