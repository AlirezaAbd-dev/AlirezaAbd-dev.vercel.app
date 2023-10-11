import envSchema from './envSchema';
import { z } from 'zod';

declare global {
   namespace NodeJS {
      interface ProcessEnv extends z.infer<typeof envSchema> {}
   }
}

envSchema.parse(process.env);
