import informationAction from '@/actions/informationAction';
import { informationValidation } from '@/validations/informationValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type InformationType = {
   name?: string;
   yearOfBirth?: number;
   city?: string;
   email?: string;
};

export type InformationDataType = z.infer<typeof informationValidation>;

const Informations = ({ name, yearOfBirth, city, email }: InformationType) => {
   const [isLoading, setIsLoading] = useState(false);

   const router = useRouter();

   const { control, handleSubmit } = useForm<InformationDataType>({
      defaultValues: {
         email: email,
         birthYear: yearOfBirth,
         city,
         fullname: name,
      },
      resolver: zodResolver(informationValidation),
   });

   async function onSubmitHandler(value: InformationDataType) {
      setIsLoading(true);

      const response = await informationAction(
         value,
         localStorage.getItem('token')!,
      );

      if (response?.status === 401) {
         localStorage.removeItem('token');
         router.replace('/');
      }

      if (response?.status !== 200) {
         if (response?.message) {
            alert(response?.message.message);
         } else {
            alert('خطایی در سرور به وجود آمد!');
         }
      }

      if (response?.status === 200) {
         alert('اطلاعات با موفقیت ویرایش شدند!');
      }

      setIsLoading(false);
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
               disabled={isLoading}
            >
               {isLoading ? (
                  <CircularProgress
                     color='info'
                     size={25}
                  />
               ) : (
                  'تایید'
               )}
            </Button>
         </form>
      </>
   );
};

export default Informations;
