# Yarn Vendoring

We utilize Yarn's `yarn-path` configuration in `.yarnrc` file to ensure
the version of yarn used at execution time is consistent for everyone.
Yarn checks the `.yarnrc` file to determine if yarn should delegate
the command to a vendored version at the provided path.

## How to update
To update to the latest version of Yarn as our vendored version:
- Run this command
```sh
yarn policies set-version 1.x.x
```
- Remove the previous version

Note: To initialize Yarn Vendoring run `yarn policies set-version 1.x.x`
for Yarn v1 `yarn set version ^1` for v2
