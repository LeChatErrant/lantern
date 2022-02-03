import { blue, green, red, yellow } from './colors';

class Logger {
  private silent = false;

  public log(msg = '') {
    if (!this.silent) {
      console.log(msg);
    }
  }

  public info(msg = '') {
    console.log(blue(msg));
  }

  public warn(msg = '') {
    console.info(yellow(msg));
  }

  public error(msg = '') {
    console.error(red(msg));
  }

  public success(msg = '') {
    console.log(green(msg));
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
