import { z } from 'zod';

export default z.object({
   text: z
      .string({ required_error: 'لطفا متن معرفی را وارد نمایید!' })
      .nonempty({ message: 'لطفا متن معرفی را وارد نمایید!' }),
});
