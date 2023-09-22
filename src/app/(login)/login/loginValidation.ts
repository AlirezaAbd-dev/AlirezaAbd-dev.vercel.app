import { z } from 'zod';

export default z.object({
   username: z
      .string({ required_error: 'لطفا نام کاربری را وارد نمایید!' })
      .min(3, { message: 'نام کابری باید حداقل 3 کراکتر باشد!' }),
   password: z
      .string({ required_error: 'لطفا رمز عبور را وارد نمایید!' })
      .min(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد!' }),
});
