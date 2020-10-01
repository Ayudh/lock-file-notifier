import * as vscode from 'vscode';
import * as path from 'path';

import { existsSync } from 'fs';
import { execPath, noop, REPO_TYPE, YARN_LOCK, PACKAGE_LOCK } from './utils';

let watchListener: vscode.Disposable;
let execRoot: ReturnType<typeof execPath>;
let repoType: REPO_TYPE;

export function activate(_context: vscode.ExtensionContext) {
  console.log('"lock-file-notifier" is now active!');

  let rootPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath || '';
  if (!rootPath) {
    console.log('not a workspace');
    return;
  }

  execRoot = execPath(rootPath);

  const YARN_PATH = path.join(rootPath, YARN_LOCK);
  const PACKAGE_PATH = path.join(rootPath, PACKAGE_LOCK);

  const isYarnRepo = existsSync(YARN_PATH);
  const isNpmRepo = existsSync(PACKAGE_PATH);

  if (!isYarnRepo && !isNpmRepo) {
    console.log(`${YARN_LOCK} or ${PACKAGE_LOCK} not found at ${rootPath}`);
    return;
  }

  repoType = isYarnRepo ? REPO_TYPE.YARN : REPO_TYPE.NPM;
  const watchPath = isYarnRepo ? YARN_LOCK : PACKAGE_LOCK;

  validate();
  console.log(`listening for changes in ${watchPath}`);

  watchListener = vscode.workspace
    .createFileSystemWatcher(new vscode.RelativePattern(rootPath, watchPath))
    .onDidChange(() => {
      validate();
    });
}

function validate() {
  console.log('validating lock file');
  let validation: Promise<void>;
  if (repoType === REPO_TYPE.YARN) {
    validation = yarnCheck();
  } else {
    validation = npmCheck();
  }
  validation.then(noop, handleChange);
}

function yarnCheck() {
  return (execRoot('yarn check --integrity && yarn check --verify-tree') as unknown) as Promise<
    void
  >;
}

function npmCheck() {
  return execRoot('npm i --dry-run --json --no-audit --loglevel=error').then((d: any) => {
    d = JSON.parse(d);
    const keys = ['added', 'removed', 'updated', 'moved', 'failed'];
    const isDirty = keys.some(key => d[key].length > 0);
    return isDirty ? Promise.reject() : Promise.resolve();
  });
}

function getPackageManagerConfig() {
  return vscode.workspace.getConfiguration().get('npm.packageManager') as REPO_TYPE;
}

function setPackageManagerConfig(value: REPO_TYPE) {
  return vscode.workspace.getConfiguration().update('npm.packageManager', value, false);
}

async function executeInstallTask() {
  const packageManagerConfig = getPackageManagerConfig();

  if (packageManagerConfig !== repoType) {
    await setPackageManagerConfig(repoType);
  }

  vscode.tasks.fetchTasks({ type: 'npm' }).then(tasks => {
    tasks.map(task => {
      if (task.name === 'install') {
        vscode.tasks.executeTask(task);
      }
    });
  });
}

function handleChange() {
  const installButton = 'Install dependencies';

  vscode.window.showInformationMessage('Lock file changed', installButton).then(selection => {
    if (selection === installButton) {
      executeInstallTask();
    }
  });
}

export function deactivate() {
  if (watchListener) {
    watchListener.dispose();
  }
}
