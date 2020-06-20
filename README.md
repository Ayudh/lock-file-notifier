# Lock File Notifier

[![VS Marketplace](https://vsmarketplacebadge.apphb.com/version-short/ayudh.lock-file-notifier.svg)](https://marketplace.visualstudio.com/items?itemName=ayudh.lock-file-notifier)
[![Github Deploy Action](https://img.shields.io/github/workflow/status/ayudh/lock-file-notifier/Deploy)](https://github.com/Ayudh/lock-file-notifier/actions?query=workflow%3ADeploy)
![Downloads](https://vsmarketplacebadge.apphb.com/downloads/ayudh.lock-file-notifier.svg)

VSCode extension which validates `yarn.lock` or `package-lock.json` file and
notifies if `install` step needs to run.

When changes are pulled from remote origin, we may forget to run `install`
step. This extension listens for changes in `yarn.lock` or `package-lock.json`
and validates in the background against `node_modules`. Prompts to run
install step.

Note: Extension is in development phase. See below for WIP actions.

#### To Do

- [x] NPM support
- [ ] display prompt to run install step
- [ ] debounce lock file change event
- [ ] display progress bar in UI during validation
- [ ] support multi-workspace with list of lock files provided as input
- [ ] listen for changes in workspace if lock file is created after opening
