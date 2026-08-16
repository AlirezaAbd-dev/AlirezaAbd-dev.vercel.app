"use client";
import React, { memo } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormikErrors, FormikTouched } from "formik";
import { useThemeContext } from "../../context/ThemeContext";
import { initialFormType } from "./ContactForm";

interface FormReCAPTCHAProps {
  formik: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<FormikErrors<initialFormType>> | Promise<void>;
    errors: FormikErrors<initialFormType>;
    touched: FormikTouched<initialFormType>;
  };
}

function FormReCAPTCHA({ formik }: FormReCAPTCHAProps) {
  const { mode } = useThemeContext();
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) return null;

  return (
    <div className="flex flex-col items-center justify-center my-3 w-full">
      <div className="overflow-hidden rounded-xl">
        <ReCAPTCHA
          sitekey={siteKey}
          theme={mode === "dark" ? "dark" : "light"}
          hl="fa"
          onChange={(value) => {
            formik.setFieldValue("recaptcha", value || "");
          }}
        />
      </div>
      {formik.errors.recaptcha && formik.touched.recaptcha && (
        <p className="text-xs text-rose-500 mt-1 font-medium text-center">
          {formik.errors.recaptcha}
        </p>
      )}
    </div>
  );
}

export default memo(FormReCAPTCHA);
