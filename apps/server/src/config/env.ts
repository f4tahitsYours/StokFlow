import { config } from 'dotenv';

// Load environment variables
config();

interface EnvConfig {
  NODE_ENV: string;
  PORT: number;
  API_BASE_URL: string;
  CORS_ORIGIN: string;
}

function validateEnv(): EnvConfig {
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${PORT}`;
  const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

  if (isNaN(PORT)) {
    throw new Error('PORT must be a valid number');
  }

  return {
    NODE_ENV,
    PORT,
    API_BASE_URL,
    CORS_ORIGIN,
  };
}

export const env = validateEnv();
