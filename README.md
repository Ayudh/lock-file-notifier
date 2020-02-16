# Lock File Notifier

VSCode extension which validates `yarn.lock` or `package-lock.json` file and
notifies if `install` step needs to run.

When changes are pulled from remote origin, we may forget to run `install`
step. This extension listens for changes in `yarn.lock` or `package-lock.json`
and validates in the background against `node_modules`. Prompts to run
install step.

Note: Extension is in development phase. See below for WIP actions.

#### To Do

- [ ] display prompt to run install step
- [ ] NPM support
- [ ] debounce lock file change event
- [ ] display progress bar in UI during validation
- [ ] support multi-workspace with list of lock files provided as input
