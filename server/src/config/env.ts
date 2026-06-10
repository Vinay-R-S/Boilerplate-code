const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const optional = (key: string, fallback: string): string =>
  process.env[key] ?? fallback;

export const env = {
  NODE_ENV: optional('NODE_ENV', 'development') as 'development' | 'production' | 'test',
  PORT: Number(optional('PORT', '3000')),

  DB_HOST: optional('DB_HOST', 'localhost'),
  DB_PORT: Number(optional('DB_PORT', '3306')),
  DB_NAME: required('DB_NAME'),
  DB_USER: required('DB_USER'),
  DB_PASSWORD: required('DB_PASSWORD'),
  DB_POOL_MAX: Number(optional('DB_POOL_MAX', '10')),
  DB_POOL_MIN: Number(optional('DB_POOL_MIN', '0')),
  DB_POOL_ACQUIRE: Number(optional('DB_POOL_ACQUIRE', '30000')),
  DB_POOL_IDLE: Number(optional('DB_POOL_IDLE', '10000')),

  JWT_SECRET: required('JWT_SECRET'),
  JWT_EXPIRES_IN: optional('JWT_EXPIRES_IN', '7d'),

  CORS_ORIGIN: optional('CORS_ORIGIN', 'http://localhost:5173'),

  LOG_LEVEL: optional('LOG_LEVEL', 'info'),
} as const;
