import { z } from 'zod';

export default z.object({
   company: z.string({ required_error: 'نام سازمان را وارد نمایید!' }),
   time: z.string({ required_error: 'زمان را وارد نمایید!' }),
   post: z.string({ required_error: 'سمت خود را وارد نمایید!' }),
});
