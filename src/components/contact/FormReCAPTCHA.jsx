import { Typography, useTheme } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const FormReCAPTCHA = ({ formik }) => {
  const theme = useTheme();

  return (
    <>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        theme={theme.palette.mode}
        hl="fa"
        onChange={(value) => {
          formik.setFieldValue("recaptcha", value);
        }}
      />
      {formik.errors.recaptcha && formik.touched.recaptcha && (
        <Typography variant="caption" color="error">
          {formik.errors.recaptcha}
        </Typography>
      )}
    </>
  );
};

export default FormReCAPTCHA;
