import { z } from 'zod';

export const loginValidation = z.object({
   username: z.string().min(3),
   password: z.string().min(8),
});
