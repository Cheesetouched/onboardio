import * as chalk from "chalk";

export default class Logger {
  static info(tag, message, meta = null) {
    console.info(chalk.cyanBright.bold(`[${tag}]`), `: ${message}`);
    if (meta) {
      console.debug(meta);
    }
  }

  static warn(tag, message, meta = null) {
    console.log(chalk.yellow.bold(`[${tag}]`), `: ${message}`);
    if (meta) {
      console.debug(meta);
    }
  }

  static debug(tag, message, meta = null) {
    console.debug(chalk.greenBright(`[${tag}]`), `: ${message}`);
    if (meta) {
      console.debug(meta);
    }
  }

  static error(tag, message, meta = null) {
    console.error(chalk.red.bold(`[${tag}]`), `: ${message}`);
    if (meta) {
      console.debug(meta);
    }
  }

  static fatal(tag, message, meta = null) {
    console.error(chalk.redBright.bold(`[${tag}]`), `: ${message}`);
    if (meta) {
      console.debug(meta);
    }
  }
}
