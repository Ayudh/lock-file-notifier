# Lock File Notifier

[![VS Marketplace](https://vsmarketplacebadge.apphb.com/version-short/ayudh.lock-file-notifier.svg)](https://marketplace.visualstudio.com/items?itemName=ayudh.lock-file-notifier)
[![Source Code](https://img.shields.io/badge/GitHub-source-brightgreen?style=flat&logo=github)](https://github.com/Ayudh/lock-file-notifier)
[![Github Deploy Action](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FAyudh%2Flock-file-notifier%2Fbadge&style=flat)](https://github.com/Ayudh/lock-file-notifier/actions?query=workflow%3ADeploy)
![Downloads](https://vsmarketplacebadge.apphb.com/downloads/ayudh.lock-file-notifier.svg)

VSCode extension which validates `yarn.lock` or `package-lock.json` file and
notifies if `install` step needs to run.

When changes are pulled from remote origin, we may forget to run `install`
step. This extension listens for changes in `yarn.lock` or `package-lock.json`
and validates in the background against `node_modules`. Prompts to run
install step.

![Demo](demo.gif)

---

Add the below setting corresponding to repo type

`.vscode/settings.json` config for NPM / Yarn:

```json
{
  "npm.packageManager": "npm" / "yarn"
}
```

The setting is automatically added if there is a conflict with
repo and default package manager.

Note: Extension is in development phase. See below for WIP actions.

#### To Do

- [x] NPM support
- [x] display prompt to run install step
- [x] display progress bar in UI during validation
- [ ] create a status bar item to trigger validation
- [ ] support multi-workspace with list of lock files provided as input
- [ ] listen for changes in workspace if lock file is created after opening
