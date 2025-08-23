import { Profile } from '@/services/main/useProfileQuery';
import z from 'zod';

const profileValidation = z.object({
  fullname: z
    .string({ error: 'نام و نام خانوادگی الزامی است' })
    .min(2, 'نام و نام خانوادگی الزامی است'),
  email: z.email({ error: 'ایمیل معتبر نیست' }),
  avatar: z.url({ message: 'آدرس تصویر معتبر نیست' }),
  birthCity: z
    .string({ error: 'شهر تولد الزامی است' })
    .min(1, 'شهر تولد الزامی است'),
  birthday: z
    .string({ error: 'تاریخ تولد الزامی است' })
    .min(1, 'تاریخ تولد الزامی است'),
  telegramUrl: z.url({ message: 'آدرس تلگرام معتبر نیست' }),
  instagramUrl: z.url({ message: 'آدرس اینستاگرام معتبر نیست' }),
  githubUrl: z.url({ message: 'آدرس گیت‌هاب معتبر نیست' }),
});

export type ProfileValidationType = z.infer<typeof profileValidation>;
export default profileValidation;
