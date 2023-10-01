import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import Educations from '../tables/Educations';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import educationValidation from '@/validations/educationValidation';
import { zodResolver } from '@hookform/resolvers/zod';

export type EducationType = {
   _id: string;
   certificate: string;
   duration: string;
   university: string;
   major: string;
};

type EducationFormProps = {
   educations: EducationType[];
};

type EducationFormType = z.infer<typeof educationValidation>;

const EducationForm = (props: EducationFormProps) => {
   console.log(props.educations);

   const { control, handleSubmit } = useForm<EducationFormType>({
      resolver: zodResolver(educationValidation),
   });

   function educationHandler(value: EducationFormType) {
      console.log(value);
   }

   return (
      <>
         <Typography variant='h6'>تحصیلات</Typography>

         <Educations educations={props.educations} />
         <Box
            component='form'
            onSubmit={handleSubmit(educationHandler)}
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'flex-end',
               justifyContent: 'center',
               gap: 2,
            }}
         >
            <Controller
               name='certificate'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        color='secondary'
                        label='مدرک'
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        helperText={fieldState.error?.message}
                        error={!!fieldState.error}
                     />
                  );
               }}
            />
            <Controller
               name='since'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        color='secondary'
                        label='از سال'
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        helperText={fieldState.error?.message}
                        error={!!fieldState.error}
                     />
                  );
               }}
            />
            <Controller
               name='until'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        color='secondary'
                        label='تا سال'
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        helperText={fieldState.error?.message}
                        error={!!fieldState.error}
                     />
                  );
               }}
            />
            <Controller
               name='major'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        color='secondary'
                        label='رشته'
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        helperText={fieldState.error?.message}
                        error={!!fieldState.error}
                     />
                  );
               }}
            />
            <Controller
               name='university'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        color='secondary'
                        label='محل تحصیل'
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        helperText={fieldState.error?.message}
                        error={!!fieldState.error}
                     />
                  );
               }}
            />

            <Button
               type='submit'
               variant='contained'
            >
               اضافه کردن
            </Button>
         </Box>
      </>
   );
};

export default EducationForm;
