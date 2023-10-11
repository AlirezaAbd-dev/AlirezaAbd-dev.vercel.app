import { z } from 'zod';

export default z.object({
   certificate: z
      .string({ required_error: 'لطفا نام مدرک خود را وارد نمایید!' })
      .nonempty({ message: 'لطفا نام مدرک خود را وارد نمایید!' }),
   since: z.coerce
      .number({
         required_error: 'لطفا تاریخ شروع تحصیل را وارد نمایید!',
         invalid_type_error: 'لطفا تاریخ شروع تحصیل را وارد نمایید!',
      })
      .min(1300, { message: 'تاریخ باید بین 1300 تا 1450 باشد!' })
      .max(1450, { message: 'تاریخ باید بین 1300 تا 1450 باشد!' }),
   until: z.coerce
      .number({
         required_error: 'لطفا تاریخ پایان تحصیل را وارد نمایید!',
         invalid_type_error: 'لطفا تاریخ شروع تحصیل را وارد نمایید!',
      })
      .min(1300, { message: 'تاریخ باید بین 1300 تا 1450 باشد!' })
      .max(1450, { message: 'تاریخ باید بین 1300 تا 1450 باشد!' }),
   university: z
      .string({ required_error: 'لطفا نام دانشگاه محل تحصیل را وارد نمایید!' })
      .nonempty({ message: 'لطفا نام دانشگاه محل تحصیل را وارد نمایید!' }),
   major: z
      .string({ required_error: 'لطفا رشته تحصیلی را وارد نمایید!' })
      .nonempty({ message: 'لطفا رشته تحصیلی را وارد نمایید!' }),
});
