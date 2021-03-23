import npm from 'npm';
import chalk from 'chalk';
import figlet from 'figlet';

/**
 * Capitalize the given string
 *
 * @param str The string to capitalize
 * @return The capitalized string
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function displayCLIBanner() {
  console.log(
    chalk.green(
      figlet.textSync('Templated   project - CLI', { horizontalLayout: 'full' }),
    ),
  );
}

export async function npmRun(script: string, args: string[] = []) {
  await new Promise<void>((resolve, reject) => {
    npm.load((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  return new Promise<void>((resolve, reject) => {
    npm.commands['run-script']([script, ...args], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
