import clear from 'clear';
import colors from 'colors';
import figlet from 'figlet';

import { version } from '../../package.json';

/**
 * Clear screen and display CLI banner
 *
 *   _                       _
 *  | |       __ _   _ __   | |_    ___   _ __   _ __
 *  | |      / _` | | '_ \  | __|  / _ \ | '__| | '_ \
 *  | |___  | (_| | | | | | | |_  |  __/ | |    | | | |
 *  |_____|  \__,_| |_| |_|  \__|  \___| |_|    |_| |_|
 */
export function displayCLIBanner() {
  clear();
  console.log(
    colors.yellow(
      figlet.textSync('Lantern', { horizontalLayout: 'full' }),
    ),
  );
  console.log(
    colors.blue(`Lantern CLI v${version}`),
  );
}
