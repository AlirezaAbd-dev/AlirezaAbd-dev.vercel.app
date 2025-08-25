import z from 'zod';

const skillValidation = z.object({
  name: z
    .string({ error: 'نام مهارت الزامی است' })
    .min(1, 'نام مهارت الزامی است'),
  value: z.coerce
    .number({
      error: 'میزان مهارت باید عدد باشد',
    })
    .min(0, { error: 'عدد باید بین 0 تا 100 باشد' })
    .max(100, {
      error: 'عدد باید بین 0 تا 100 باشد',
    }) as z.ZodCoercedNumber<number>,
  icon: z.url('آیکون باید یک لینک معتبر باشد'),
  color: z
    .string({ error: 'رنگ الزامی است' })
    .regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, {
      error: 'رنگ باید یک کد رنگی معتبر باشد',
    }),
});

export type SkillValidationType = z.infer<typeof skillValidation>;
export default skillValidation;
