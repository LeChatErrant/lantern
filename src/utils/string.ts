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
 */
export function insert(str: string, index: number, value: string) {
  return `${str.slice(0, index)}${value}${str.slice(index)}`;
}
