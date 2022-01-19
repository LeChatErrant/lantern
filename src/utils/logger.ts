import colors from 'colors';

class Logger {
  log(msg: string) {
    console.log(`\r${msg}`);
  }

  error(msg: string) {
    console.error(colors.red(msg));
  }
}

const logger = new Logger();

export default logger;
