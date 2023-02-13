// import * as Yup from "yup";
import { z } from "zod";

// export const contactValidationSchema = Yup.object().shape({
//     fullname: Yup.string().required('نام و نام خانوادگی الزامی میباشد'),
//     subject: Yup.string().required('نوشتن عنوان الزامی میباشد'),
//     message: Yup.string().required('نوشتن پیام الزامی میباشد'),
//     recaptcha: Yup.string().required('کپچا الزامی میباشد'),
// })

export const contactValidationSchema = z.object({
  fullname: z.string({
    required_error: "نام و نام خانوادگی الزامی میباشد",
  }),
  subject: z.string({
    required_error: "نوشتن عنوان الزامی میباشد",
  }),
  message: z.string({
    required_error: "نوشتن پیام الزامی میباشد",
  }),
  recaptcha: z.string({
    required_error: "کپچا الزامی میباشد",
  }),
});
