import z from 'zod';

const loginValidation = z.object({
  username: z
    .string({ error: 'نام کاربری الزامی است' })
    .min(1, 'نام کاربری الزامی است'),
  password: z
    .string({ error: 'رمز عبور الزامی است' })
    .min(1, 'رمز عبور الزامی است'),
});

export type LoginValidationType = z.infer<typeof loginValidation>;
export default loginValidation;
