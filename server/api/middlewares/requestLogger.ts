import Logger from "../utils/logger";

const chalk = require("chalk");

export const RequestLogger = (req, res, next) => {
  const startHrTime = process.hrtime();
  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    Logger.info(
      chalk.cyanBright.bold(req.path),
      `${chalk.whiteBright.bold(res.statusCode)} (${chalk.whiteBright.bold(
        elapsedTimeInMs
      )} ms)`
    );
  });
  next();
};
