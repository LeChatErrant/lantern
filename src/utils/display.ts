import clear from 'clear';
import figlet from 'figlet';

import { version } from '../../package.json';

import logger from './logger';
import { PrismaModel } from './prisma';
import { blue, red, yellow } from './colors';

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
    yellow(
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
 * Convert an enum value to a displayable string
 *
 * @param str String to convert
 * @return Formatted string

 * @example
 * enumToDisplayable('MY_ENUM_VALUE'); // 'my enum value'
 */
export function enumToDisplayable(str: string) {
  return blue(str.toLowerCase().replace('_', ' '));
}

/**
 * Convert an array of string to a literal enumeration

 * @param arr Array of strings
 * @return Formatted string

 * @example
 * arrayToDisplayableEnum(['item1', 'item2', 'item3']); // 'item1, item2 and item3'
 */
export function arrayToDisplayableEnum(arr: string[]) {
  if (arr.length === 0) {
    return '';
  } else if (arr.length === 1) {
    return arr[0];
  } else {
    const last = arr.pop();
    return [arr.join(', '), last].join(' and ');
  }
}

/**
 * Return the right amount of spaces needed to align `str` tail with all string in `arr`
 *
 * @param str String you want to align tail
 * @param arr Array of string to be aligned with
 * @return String composed of multiple spaces, to align the tail of `str`
 */
export function alignTail(str: string, arr: string[]) {
  const maxLength = arr.reduce((acc, val) => val.length > acc ? val.length : acc, 0);
  return ' '.repeat(maxLength + 1 - str.length);
}

export const customPrompt = blue('Custom');
export const cancelPrompt = red('Cancel');
export const inputPromptSuffix = '\n❯';
