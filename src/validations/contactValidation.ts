import { z } from "zod";

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
});
