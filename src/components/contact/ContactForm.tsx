'use client';
import { useMemo } from 'react';
import { Button, CardActions } from '@mui/material';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { contactValidationSchema } from '../../validations/contactValidation';
import FormInputs from '../../components/contact/FormInputs';
import { useStore } from '@/store/store';

export interface initialFormType {
   fullname: string;
   subject: string;
   message: string;
}

const ContactForm = () => {
   const email = useStore((state) => state.data?.email);

   const contactInputNames: initialFormType = useMemo(() => {
      return {
         fullname: '',
         subject: '',
         message: '',
      };
   }, []);

   const formik = useFormik({
      initialValues: contactInputNames,
      validationSchema: toFormikValidationSchema(contactValidationSchema),
      onSubmit: (values) => {
         window.location.assign(
            `mailto:${email}?subject=${
               values.fullname + '-' + values.subject
            }&body=${values.message}`,
         );
      },
   });

   return (
      <form
         autoComplete='off'
         onSubmit={formik.handleSubmit}
      >
         {/* INPUTS */}
         <FormInputs formik={formik} />
         <CardActions sx={{ alignItems: 'center', flexDirection: 'column' }}>
            {/* SUBMIT BUTTON */}
            <Button
               type='submit'
               // @ts-ignore
               color='greenAccent'
               variant='contained'
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
