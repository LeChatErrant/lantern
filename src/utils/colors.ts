import colors from 'colors';

// Some colors are wrapped in bold since they are not well displayed on some terminals (mac, for example)
// It needs to be bold to be correctly displayed

export function bold(str: string) {
  return colors.bold(str);
}

export function blue(str: string) {
  return bold(colors.blue(str));
}

export function green(str: string) {
  return bold(colors.green(str));
}

export function red(str: string) {
  return bold(colors.red(str));
}

export function yellow(str: string) {
  return bold(colors.yellow(str));
}

export function grey(str: string) {
  return colors.grey(str);
}
