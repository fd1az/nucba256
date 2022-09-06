import * as winston from "winston";

const { combine, timestamp, label, prettyPrint } = winston.format;

const logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [new winston.transports.Console()],
});

export default logger;
