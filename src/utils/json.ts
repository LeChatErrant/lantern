/**
 * Stringify a data in a readable way, with indents and line break
 *
 * @param json Json to beautify
 * @return Printable string
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function beautifyJson(json: any) {
  return JSON.stringify(json, null, 2);
}

/**
 * Sort keys of a JSON alphabetically
 *
 * @param json Json to sort
 * @return Sorted json
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function sortJsonKeys(json: Record<string, any>) {
  return JSON.parse(JSON.stringify(json, Object.keys(json).sort()));
}
