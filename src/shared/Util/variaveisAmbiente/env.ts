import { config } from 'dotenv';
import { z } from 'zod';

import { logger } from '../configLogger';
import { VariaveisDB } from './VariaveisDB';

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env' });
} else {
  config();
}

const envSchema = z
  .object({
    PORT: z.string().default('3001'),
    NODE_ENV: z.enum(['DEV', 'PRODUCTION', 'test']).default('PRODUCTION'),
    SECRET_TOKEN: z.string(),

  });

const envZod = envSchema.safeParse(process.env);

if (envZod.success === false) {
  logger.fatal(envZod.error.format());
  throw new Error('🛑 Invalid environment variables !');
}

const env = {
  ...envZod.data,

  DB: envZod.data.NODE_ENV === 'PRODUCTION' ? VariaveisDB.DB_PRODUCTION : VariaveisDB.DB_LOCAL,
};

export { env };
