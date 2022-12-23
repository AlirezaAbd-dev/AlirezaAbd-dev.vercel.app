import * as Yup from 'yup'

export const contactValidationSchema = Yup.object().shape({
    fullname: Yup.string().required('نام و نام خانوادگی الزامی میباشد'),
    subject: Yup.string().required('نوشتن عنوان الزامی میباشد'),
    message: Yup.string().required('نوشتن پیام الزامی میباشد'),
    recaptcha: Yup.string().required('کپچا الزامی میباشد'),
})