import { exec } from 'child_process';

export const noop = () => {};

export function execPath(path: string) {
  return (cmd: string) =>
    new Promise<string>((resolve, reject) => {
      console.log(`running ${cmd} at ${path}`);
      exec(cmd, { cwd: path }, (error, stdout, stderr) => {
        console.log({ error, stdout, stderr });
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
}
