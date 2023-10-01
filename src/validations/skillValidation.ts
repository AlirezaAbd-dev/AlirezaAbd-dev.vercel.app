import { z } from 'zod';

export default z.object({
   name: z
      .string({ required_error: 'لطفا نام مهارت را وارد نمایید!' })
      .nonempty({ message: 'لطفا نام مهارت را وارد نمایید!' }),
   rate: z.coerce
      .number({
         required_error: 'لطفا یک عدد وارد نمایید!',
         invalid_type_error: 'لطفا یک عدد وارد نمایید!',
      })
      .min(1, { message: 'عدد مورد نظر باید بین 1 تا 100 باشد!' })
      .max(100, { message: 'عدد مورد نظر باید بین 1 تا 100 باشد!' }),
});
