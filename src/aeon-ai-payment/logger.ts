import config from './config';

type ConsoleType = Pick<
  typeof console,
  'debug' | 'log' | 'info' | 'warn' | 'error'
>;

class ConsoleWrapper implements ConsoleType {
  enabled = true;

  setEnabled(value: boolean) {
    this.enabled = value;
  }
  log(...args: any[]) {
    if (this.enabled) {
      console.log(...args);
    }
  }
  info(...args: any[]) {
    if (this.enabled) {
      console.info(...args);
    }
  }
  warn(...args: any[]) {
    if (this.enabled) {
      console.warn(...args);
    }
  }
  error(...args: any[]) {
    if (this.enabled) {
      console.error(...args);
    }
  }
  debug(...args: any[]) {
    if (this.enabled) {
      console.debug(...args);
    }
  }
}

const logger = new ConsoleWrapper();
logger.setEnabled(config.logger);
export default logger;
