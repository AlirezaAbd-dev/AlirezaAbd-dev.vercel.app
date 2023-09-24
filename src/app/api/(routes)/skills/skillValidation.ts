import { z } from 'zod';

export default z.object({
   name: z.string({ required_error: 'نام مهارت خود را وارد نمایید!' }),
   rate: z
      .number({ required_error: 'لطفا میزان مهارت خود را وارد نمایید!' })
      .min(0, { message: 'میزان مهارت نباید کمتر از 0 و بیشتر از 100 باشد!' })
      .max(100, {
         message: 'میزان مهارت نباید کمتر از 0 و بیشتر از 100 باشد!',
      }),
});
