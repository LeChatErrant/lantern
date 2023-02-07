import { LanternError } from './errors';

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
 * Insert a string into another string
 *
 * @param str The string in which you want to insert value
 * @param index The index from where the value should be inserted
 * @param value The string to be inserted
 * @return Result string
 */
export function insert(str: string, index: number, value: string) {
  return `${str.slice(0, index)}${value}${str.slice(index)}`;
}

/**
 * Remove empty lines from a string
 *
 * @param str String to format
 * @return formated string
 */
export function removeEmptyLines(str: string) {
  return str
    .split('\n')
    .filter((line) => line !== '')
    .join('\n');
}

/**
 * Return the first occurrence between `left` and `right` in `str`
 *
 * @param str String to search in
 * @param left Left operator
 * @param right Right operator
 * @return Content between `left` and `right`
 *
 * @example
 * parseBetween('a + (b + (c + d))', '(', ')'); // Returns 'b + (c + d)'
 */
export function parseBetween(str: string, left: string, right: string) {
  const chars = str.split('');
  let nestedLevel = 0;
  let result = '';

  for (const char of chars) {
    if (char === right) {
      nestedLevel -= 1;
      if (nestedLevel < 0) {
        throw new LanternError(`Parsing error : string ${str} is not valid`);
      }
      if (nestedLevel === 0) {
        return result;
      }
    }

    if (nestedLevel >= 1) {
      result += char;
    }

    if (char === left) {
      nestedLevel += 1;
    }
  }

  if (nestedLevel !== 0) {
    throw new LanternError(`Parsing error : string ${str} is not valid`);
  }
  return result;
}
