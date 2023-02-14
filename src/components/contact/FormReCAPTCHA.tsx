import { Typography, useTheme } from "@mui/material";
import { FormikErrors, FormikHandlers, FormikTouched } from "formik";
import { memo } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { initialFormType } from "./ContactForm";

const FormReCAPTCHA = ({
  formik,
}: {
  formik: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<FormikErrors<initialFormType>> | Promise<void>;
    errors: FormikErrors<initialFormType>;
    touched: FormikTouched<initialFormType>;
  };
}) => {
  const theme = useTheme();

  return (
    <>
      {typeof process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY === "string" && (
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          theme={theme.palette.mode}
          hl="fa"
          onChange={(value) => {
            formik.setFieldValue("recaptcha", value);
          }}
        />
      )}
      {formik.errors.recaptcha && formik.touched.recaptcha && (
        <Typography variant="caption" color="error">
          {formik.errors.recaptcha}
        </Typography>
      )}
    </>
  );
};

export default memo(FormReCAPTCHA);
