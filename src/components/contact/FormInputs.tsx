import { Face6Rounded, SubjectRounded } from '@mui/icons-material';
import { CardContent, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import { ChangeEventHandler } from 'react';
import { initialFormType } from './ContactForm';

const FormInputs = ({
   formik,
}: {
   formik: {
      touched: FormikTouched<initialFormType>;
      errors: FormikErrors<initialFormType>;
      values: FormikValues;
      handleChange: ChangeEventHandler;
   };
}) => {
   return (
      <CardContent>
         <Grid container>
            <Grid
               xs={12}
               sx={{ direction: 'ltr' }}
            >
               <Grid
                  container
                  spacing={2}
                  flexDirection={'column'}
               >
                  <Grid
                     xs={12}
                     md={12}
                  >
                     <TextField
                        fullWidth
                        size='small'
                        color='warning'
                        label='نام و نام خانوادگی'
                        name='fullname'
                        variant='outlined'
                        helperText={
                           formik.touched.fullname && formik.errors.fullname
                        }
                        error={Boolean(
                           formik.touched.fullname && formik.errors.fullname,
                        )}
                        value={formik.values?.fullname}
                        onChange={formik.handleChange}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position='end'>
                                 <Face6Rounded />
                              </InputAdornment>
                           ),
                        }}
                     />
                  </Grid>
                  <Grid
                     xs={12}
                     md={12}
                  >
                     <TextField
                        fullWidth
                        size='small'
                        color='warning'
                        label='عنوان'
                        name='subject'
                        variant='outlined'
                        helperText={
                           formik.touched.subject && formik.errors.subject
                        }
                        error={Boolean(
                           formik.touched.subject && formik.errors.subject,
                        )}
                        value={formik.values?.subject}
                        onChange={formik.handleChange}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position='end'>
                                 <SubjectRounded />
                              </InputAdornment>
                           ),
                        }}
                     />
                  </Grid>
                  <Grid
                     xs={12}
                     md={12}
                  >
                     <TextField
                        fullWidth
                        multiline
                        rows={6}
                        size='small'
                        color='warning'
                        label='متن پیام'
                        name='message'
                        variant='outlined'
                        helperText={
                           formik.touched.message && formik.errors.message
                        }
                        error={Boolean(
                           formik.touched.message && formik.errors.message,
                        )}
                        value={formik.values?.message}
                        onChange={formik.handleChange}
                     />
                  </Grid>
               </Grid>
            </Grid>
         </Grid>
      </CardContent>
   );
};

export default FormInputs;
