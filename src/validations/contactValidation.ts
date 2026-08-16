// import * as Yup from "yup";
import { z } from 'zod';

export const contactValidationSchema = z.object({
  fullname: z.string().min(1, 'نام و نام خانوادگی الزامی میباشد'),
  subject: z.string().min(1, 'نوشتن عنوان الزامی میباشد'),
  message: z.string().min(1, 'نوشتن پیام الزامی میباشد'),
  recaptcha: z.string().min(1, 'کپچا الزامی میباشد'),
});

