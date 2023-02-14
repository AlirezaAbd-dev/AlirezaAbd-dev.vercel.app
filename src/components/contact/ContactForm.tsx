"use client";
import { useMemo } from "react";
import { Button, CardActions } from "@mui/material";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { contactValidationSchema } from "../../validations/contactValidation";
import FormReCAPTCHA from "../../components/contact/FormReCAPTCHA";
import FormInputs from "../../components/contact/FormInputs";

export interface initialFormType {
  fullname: string;
  subject: string;
  message: string;
  recaptcha: string;
}

const ContactForm = () => {
  const contactInputNames: initialFormType = useMemo(() => {
    return {
      fullname: "",
      subject: "",
      message: "",
      recaptcha: "",
    };
  }, []);

  const formik = useFormik({
    initialValues: contactInputNames,
    validationSchema: toFormikValidationSchema(contactValidationSchema),
    onSubmit: (values) => {
      window.location.assign(
        `mailto:alireza.abedi9310@gmail.com?subject=${
          values.fullname + "-" + values.subject
        }&body=${values.message}`
      );
    },
  });

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      {/* INPUTS */}
      <FormInputs formik={formik} />
      <CardActions sx={{ alignItems: "center", flexDirection: "column" }}>
        {/* REACAPTCHA */}
        <FormReCAPTCHA formik={formik} />

        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          // @ts-ignore
          color="greenAccent"
          variant="contained"
          sx={{ mt: 2, color: 'text.primary' }}
          fullWidth
        >
          ارسال پیام
        </Button>
      </CardActions>
    </form>
  );
};

export default ContactForm;
