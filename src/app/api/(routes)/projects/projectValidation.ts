import { z } from 'zod';

export default z.object({
   name: z.string({ required_error: 'نام پروژه خود را وارد نمایید!' }),
   image: z
      .string({ required_error: 'آدرس عکس پروژه خود را وارد نمایید!' })
      .url({ message: 'لطفا آدرس عکس را به درستی وارد نمایید!' }),
   reference: z
      .string()
      .url({ message: 'لطفا ادرس رفرنس را به درستی وارد نمایید!' })
      .optional(),
});
