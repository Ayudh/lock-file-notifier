git config user.name "Hari G"
git config user.email "ghari81189@gmail.com"

yarn
yarn deploy -p $1
git push
tag=$(git describe --tags --abbrev=0)
git push origin "$tag"
