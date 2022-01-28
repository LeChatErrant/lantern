import clear from 'clear';
import colors from 'colors';
import figlet from 'figlet';

import { version } from '../../package.json';

import logger from './logger';
import { PrismaModel } from './prisma';

/**
 * Clear screen and display clean CLI banner
 *
 *   _                       _
 *  | |       __ _   _ __   | |_    ___   _ __   _ __
 *  | |      / _` | | '_ \  | __|  / _ \ | '__| | '_ \
 *  | |___  | (_| | | | | | | |_  |  __/ | |    | | | |
 *  |_____|  \__,_| |_| |_|  \__|  \___| |_|    |_| |_|
 *
 *  Lantern CLI v3.2.0
 */
export function displayCLIBanner() {
  clear();
  logger.log(
    colors.yellow(
      figlet.textSync('Lantern', { horizontalLayout: 'full' }),
    ),
  );
  logger.info(`Lantern CLI v${version}`);
  logger.info();
}

/**
 * Clear the terminal then display a Prisma model
 *
 * @param model Prisma model
 */
export function displayModel(model: PrismaModel) {
  console.clear();
  logger.log(model.toString());
  logger.log();
}

/**
 * Convert an enum value (MY_VALUE) to a displayable string (my value, colored in blue)
 *
 * @param str String to convert
 * @return Formatted string
 */
export function enumToDisplayable(str: string) {
  return colors.blue(str.toLowerCase().replace('_', ' '));
}

export const customPrompt = colors.blue('Custom');
export const cancelPrompt = colors.red('Cancel');
export const inputPromptSuffix = '\n❯';
