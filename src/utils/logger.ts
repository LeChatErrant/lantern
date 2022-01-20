import colors from 'colors';

class Logger {
  private silent = false;

  public log(msg = '') {
    if (!this.silent) {
      console.log(msg);
    }
  }

  public info(msg = '') {
    console.log(colors.blue(msg));
  }

  public error(msg = '') {
    console.error(colors.red(msg));
  }

  public success(msg = '') {
    console.log(colors.green(msg));
  }

  public setSilent(silent = true) {
    this.silent = silent;
  }

  public getSilent() {
    return this.silent;
  }
}

const logger = new Logger();

export default logger;
