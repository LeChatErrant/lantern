import npm from 'npm';
import colors from 'colors';
import figlet from 'figlet';
import clear from 'clear';

/**
 * Capitalize the given string
 *
 * @param str The string to capitalize
 * @return The capitalized string
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Insert a string into an other string
 *
 * @param str The string in which you want to insert value
 * @param index The index from where the value should be inserted
 * @param value The string to be inserted
 */
export function insert(str: string, index: number, value: string) {
  return `${str.slice(0, index)}${value}${str.slice(index)}`;
}

export function displayCLIBanner() {
  clear();
  console.log(
    colors.green(
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
