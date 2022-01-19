import colors from 'colors';

class Logger {
  private silent = false;

  public log(msg: string) {
    if (!this.silent) {
      console.log(msg);
    }
  }

  public error(msg: string) {
    console.error(colors.red(msg));
  }

  public success(msg: string) {
    console.log(colors.green(msg));
  }

  public setSilent(silent = true) {
    this.silent = silent;
  }
}

const logger = new Logger();

export default logger;
