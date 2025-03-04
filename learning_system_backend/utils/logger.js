import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Define log levels and colors
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

// Add colors to winston
winston.addColors(logColors);

// Create the logger
const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }), // Colorize the entire log message
    winston.format.printf(
      (info) => `[${info.timestamp}] [${info.level}] ${info.message}`
    )
  ),
  transports: [
    // Console transport (colored logs)
    new winston.transports.Console({
      level: 'debug', // Log everything to the console
    }),
    // File transport (daily rotation)
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info', // Log only info and above to the file
    }),
  ],
});

export default logger;
