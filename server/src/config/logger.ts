import winston from 'winston';

import { env } from './env';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const developmentFormat = combine(
  colorize(),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp: ts, stack }) => {
    const base = `${String(ts)} [${level}] ${String(message)}`;
    return stack ? `${base}\n${String(stack)}` : base;
  }),
);

const productionFormat = combine(
  timestamp(),
  errors({ stack: true }),
  winston.format.json(),
);

const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: env.NODE_ENV === 'development' ? developmentFormat : productionFormat,
  transports: [
    new winston.transports.Console(),
    ...(env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]
      : []),
  ],
});

export default logger;
