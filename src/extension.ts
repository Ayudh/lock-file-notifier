import * as vscode from 'vscode';
import * as path from 'path';

import { existsSync, watch, FSWatcher } from 'fs';
import { execPath, noop } from './utils';

const YARN_LOCK = 'yarn.lock';
let watchListener: FSWatcher;
let execRoot: ReturnType<typeof execPath>;

export function activate(_context: vscode.ExtensionContext) {
  console.log('"lock-file-notifier" is now active!');

  let rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath || '';
  if (!rootPath) {
    console.log('not a workspace');
    return;
  }

  execRoot = execPath(rootPath);

  const YARN_PATH = path.join(rootPath, YARN_LOCK);

  if (!existsSync(YARN_PATH)) {
    console.log(`${YARN_LOCK} not found at ${rootPath}`);
    return;
  }

  validate();
  console.log(`listening for changes in ${YARN_PATH}`);
  watchListener = watch(YARN_PATH, () => {
    validate();
  });
}

function validate() {
  console.log('validating lock file');
  yarnCheck();
}

function yarnCheck() {
  execRoot('yarn check --integrity && yarn check --verify-tree').then(noop, handleChange);
}

function handleChange() {
  vscode.window.showInformationMessage('Lock file changed. Run "yarn" to get updated.', 'ok');
}

export function deactivate() {
  if (watchListener) {
    watchListener.close();
  }
}
