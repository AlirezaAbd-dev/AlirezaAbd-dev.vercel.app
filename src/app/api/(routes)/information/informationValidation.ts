import { z } from 'zod';

export const informationValidator = z.object({
   fullname: z.string({
      required_error: 'نام و نام خانوادگی خود را وارد کنید.',
   }),
   birthYear: z
      .number({ required_error: 'تاریخ تولد خود را وارد نمایید!' })
      .min(1300, { message: 'تاریخ تولد باید بین 1300 تا 1400 باشد!' })
      .max(1400, { message: 'تاریخ تولد باید بین 1300 تا 1400 باشد!' }),
   city: z.string({ required_error: 'نام شهر خود را وارد نمایید!' }),
   email: z
      .string({ required_error: 'ایمیل خود را وارد نمایید!' })
      .email({ message: 'لطفا یک ایمیل معتبر وارد نمایید!' }),
   phone: z
      .string({ required_error: 'لطفا شماره تلفن خود را وارد نمایید!' })
      .regex(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/, {
         message: 'شماره تلفن را به درستی وارد نمایید!',
      }),
});
