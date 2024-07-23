import { createLogger, format, transports } from "winston";
const { timestamp, combine, label, printf } = format;

const myFormat = printf(({ level, message, timestamp, label }) => {
  return `${timestamp} [${label}]: ${message}`;
});
export default class WinstonLogger {
  public static logger = createLogger({
    format: combine(timestamp(), myFormat),
    transports: new transports.Console()
  });
}


//