tag=$(git describe --tags --abbrev=0)
echo "latest tag: $tag"
commits=$(git log --pretty="%h" "$tag"...HEAD)
echo $commits
mapfile -t commitList <<< "$commits"

regex="^(fix|feat):"
shouldDeploy=false
for i in "${commitList[@]}"; do
  sub=$(git log --pretty="%s" -1 "$i")
  echo "commit: $sub"
  if [[ "$sub" =~ $regex ]]; then
    shouldDeploy=true
    break
  fi
done

echo "Need to Deploy: $shouldDeploy"
if [ $shouldDeploy == false ]; then
  echo 'exiting..'
  exit 0
fi

git config user.name "Hari G"
git config user.email "ghari81189@gmail.com"

yarn
yarn deploy -p $1
git push
tag=$(git describe --tags --abbrev=0)
git push origin "$tag"
