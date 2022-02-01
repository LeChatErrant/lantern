import { spawn } from 'child_process';

import { ExecError } from './errors';
import { blue, underline } from './colors';
import logger from './logger';

/**
 * Launch a shell command in a child process and return a promise resolving when the command is finished
 * Stdout and stderr are printed through logger in real time
 * At the end, return the whole stdout and stderr buffer
 *
 * @param cwd Directory from which to launch the command
 * @param command The shell command you want to launch
 * @param args Optional args to pass to the command
 *
 * @example
 * const { stdout, stderr } = await launch('/app', 'ls', '-la');
 */
export async function launch(cwd: string, command: string, ...args: string[]) {
  const displayableCommand = command + (args.length > 0 ? ' ' : '') + args.join(' ');
  logger.log(`Executing ${blue(displayableCommand)} in directory ${cwd}`);

  const process = spawn(command, args, { cwd, stdio: 'inherit' });

  return new Promise<void>((resolve, reject) => {
    process.on('close', (code: number) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new ExecError(`${underline(displayableCommand)} in directory ${cwd} exited with code ${code.toString()}`));
      }
    });
  });
}