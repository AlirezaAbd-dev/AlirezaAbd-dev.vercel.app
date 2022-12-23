import {
  Button,
  CardActions,
} from "@mui/material";
import { contactValidationSchema } from "../../pages/validations/contactValidation";
import { useFormik } from "formik";
import FormReCAPTCHA from "./FormReCAPTCHA";
import FormInputs from "./FormInputs";

const ContactForm = () => {
  const contactInputNames = {
    fullname: "",
    subject: "",
    message: "",
    recaptcha: "",
  };

  const formik = useFormik({
    initialValues: contactInputNames,
    validationSchema: contactValidationSchema,
    onSubmit: (values) => {
      console.log("Form Values: " + values);
      window.location.assign(`mailto:alireza.abedi9310@gmail.com?subject=${values.fullname+"-"+values.subject}&body=${values.message}`)
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
          color="greenAccent"
          variant="contained"
          sx={{ mt: 2 }}
          fullWidth
        >
          ارسال پیام
        </Button>
      </CardActions>
    </form>
  );
};

export default ContactForm;
