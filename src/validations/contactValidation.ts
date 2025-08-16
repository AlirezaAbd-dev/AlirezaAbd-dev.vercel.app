// import * as Yup from "yup";
import { z } from 'zod';

export const contactValidationSchema = z.object({
  fullname: z
    .string({
      error: 'نام و نام خانوادگی الزامی میباشد',
    })
    .nonempty({ error: 'نام و نام خانوادگی الزامی میباشد' }),
  subject: z
    .string({
      error: 'نوشتن عنوان الزامی میباشد',
    })
    .nonempty({
      error: 'نوشتن عنوان الزامی میباشد',
    }),
  message: z
    .string({
      error: 'نوشتن پیام الزامی میباشد',
    })
    .nonempty({
      error: 'نوشتن پیام الزامی میباشد',
    }),
  recaptcha: z
    .string({
      error: 'کپچا الزامی میباشد',
    })
    .nonempty({
      error: 'کپچا الزامی میباشد',
    }),
});
