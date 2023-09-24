import { z } from 'zod';

export default z.object({
   certificate: z.string({ required_error: 'مدرک خود را وارد نمایید!' }),
   since: z
      .number({ required_error: 'زمان شروع تحصیل را وارد نمایید!' })
      .min(1300, { message: 'زمان شروع تحصیل باید بین 1300 تا 1450 باشد!' })
      .max(1450, { message: 'زمان شروع تحصیل باید بین 1300 تا 1450 باشد!' }),
   until: z
      .number({ required_error: 'زمان پایان تحصیل را وارد نمایید!' })
      .min(1300, { message: 'زمان پایان تحصیل باید بین 1300 تا 1450 باشد!' })
      .max(1450, { message: 'زمان پایان تحصیل باید بین 1300 تا 1450 باشد!' }),
   major: z.string({ required_error: 'نام رشته تحصیلی خود را وارد نمایید!' }),
   university: z.string({
      required_error: 'نام دانشگاهی که در آن تحصیل کردید را وارد نمایید!',
   }),
});
