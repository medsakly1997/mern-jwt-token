const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/auth-mern";
export const PORT = getEnv("PORT", "4000");
export const NODE_ENV = getEnv("NODE_ENV", "development");
export const APP_ORIGIN = getEnv("APP_ORIGIN", "http://localhost:4000");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
