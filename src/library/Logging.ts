import chalk from "chalk"; /* It's important to install chalk@^4.1.2 and not a later version since they only support ESM and not CommonJS */
//import { defaults } from "joi";

export default class Logging {
  public static log = (args: any): void => this.info(args);
  public static info = (args: any): void =>
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO]`),
      typeof args === "string" ? chalk.blueBright(args) : args
    );
  public static warn = (args: any): void =>
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}] [WARNING]`),
      typeof args === "string" ? chalk.yellowBright(args) : args
    );
  public static error = (args: any): void =>
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [ERROR]`),
      typeof args === "string" ? chalk.redBright(args) : args
    );
}
