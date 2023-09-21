import { z } from 'zod';

export const informationValidator = z.object({
   fullname: z.string(),
   birthYear: z.number(),
   city: z.string(),
   email: z.string().email(),
});
