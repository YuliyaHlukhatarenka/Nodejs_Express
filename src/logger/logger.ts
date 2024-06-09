import { format, transports, createLogger, debug } from "winston"; 
import { v4 as uuid } from "uuid";
import expressWinston from "express-winston";
import moment from "moment";
require("dotenv").config();

export const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? "info" : "debug",
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.Console({
        handleRejections: true,
        handleExceptions: true,
    }),
  ],
});

export const reqIdLogging = (req, res, next) => {
    req.requestMeta = { requestId: uuid() };
    const log = (level, ...rest) => {
        logger[level](
          JSON.stringify({
            requestId: req.requestMeta.requestId,
            message: rest,
          })
        );
    }
    req.logger = {
      debug: log.bind(logger, "debug"),
      info: log.bind(logger, "info"),
      error: log.bind(logger, "error"),
    };
    next();
} 

const getMessage = (req, logger) => `[${moment().format(
    "YYYY-MM-DD HH:mm:ss"
)}] ${logger.level.toUpperCase()} ${req.method} ${req.path}`;

export const loggerMiddleWare = expressWinston.logger({
    winstonInstance: logger,
    meta: false,
    msg: (req) => getMessage(req, logger),
})
