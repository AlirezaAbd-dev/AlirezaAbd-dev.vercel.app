import { informationValidator } from '@/app/api/(routes)/information/informationValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type InformationType = {
   name?: string;
   yearOfBirth?: number;
   city?: string;
   email?: string;
};

type InformationDataType = z.infer<typeof informationValidator>;

const Informations = ({ name, yearOfBirth, city, email }: InformationType) => {
   const { control, handleSubmit } = useForm<InformationDataType>({
      defaultValues: {
         email: email,
         birthYear: yearOfBirth,
         city,
         fullname: name,
      },
      resolver: zodResolver(informationValidator),
   });

   function onSubmitHandler(value: InformationDataType) {
      console.log(value);
   }

   return (
      <>
         <Typography variant='h6'>مشخصات</Typography>
         <form
            style={{
               display: 'inherit',
               flexDirection: 'inherit',
               justifyContent: 'inherit',
               alignItems: 'inherit',
               gap: 'inherit',
            }}
            onSubmit={handleSubmit(onSubmitHandler)}
         >
            <Controller
               name='fullname'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        color='secondary'
                        label='نام و نام خانوادگی'
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        value={field.value}
                        helperText={
                           fieldState.error && (
                              <Typography color={'red'}>
                                 {fieldState.error.message}
                              </Typography>
                           )
                        }
                     />
                  );
               }}
            />
            <Controller
               name='birthYear'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        color='secondary'
                        label='سال تولد'
                        type='number'
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        value={field.value}
                        helperText={
                           fieldState.error && (
                              <Typography color={'red'}>
                                 {fieldState.error.message}
                              </Typography>
                           )
                        }
                     />
                  );
               }}
            />
            <Controller
               name='city'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        color='secondary'
                        label='شهر'
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        value={field.value}
                        helperText={
                           fieldState.error && (
                              <Typography color={'red'}>
                                 {fieldState.error.message}
                              </Typography>
                           )
                        }
                     />
                  );
               }}
            />
            <Controller
               name='email'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        color='secondary'
                        label='ایمیل'
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        value={field.value}
                        helperText={
                           fieldState.error && (
                              <Typography color={'red'}>
                                 {fieldState.error.message}
                              </Typography>
                           )
                        }
                     />
                  );
               }}
            />
            <Button
               type='submit'
               variant='contained'
            >
               تایید
            </Button>
         </form>
      </>
   );
};

export default Informations;
