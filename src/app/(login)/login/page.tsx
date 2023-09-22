'use client';

import {
   Box,
   Button,
   CircularProgress,
   TextField,
   Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

import loginValidation from './loginValidation';
import { useRouter } from 'next/navigation';

type FormType = z.infer<typeof loginValidation>;

const LoginPage = () => {
   const [isLoading, setIsLoading] = useState(false);

   const router = useRouter();
   const { control, handleSubmit } = useForm<FormType>({
      resolver: zodResolver(loginValidation),
   });

   const onSubmitHandler: SubmitHandler<FormType> = async (data) => {
      try {
         setIsLoading(true);
         const response = await axios.post('/api/login', data);
         localStorage.setItem('token', response.headers.token);
         router.push('/');
      } catch (err: any) {
         if (err.response.data.message) {
            alert(err.response.data.message);
         } else {
            alert('مشکلی در سرور به وجود آمد!');
         }
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
         <Typography
            textAlign={'center'}
            variant='h4'
         >
            ورود
         </Typography>
         <form
            style={{ display: 'flex', flexDirection: 'column', gap: 15 }}
            onSubmit={handleSubmit(onSubmitHandler)}
         >
            <Controller
               control={control}
               name='username'
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        sx={{ textAlign: 'right' }}
                        label='نام کاربری'
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        helperText={
                           fieldState.error && (
                              <Typography color='red'>
                                 {fieldState.error.message}
                              </Typography>
                           )
                        }
                     />
                  );
               }}
            />
            <Controller
               control={control}
               name='password'
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        type='password'
                        sx={{ textAlign: 'right' }}
                        label='رمز عبور'
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        helperText={
                           fieldState.error && (
                              <Typography color='red'>
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
               disabled={isLoading}
            >
               {isLoading ? <CircularProgress size={25} /> : 'ورود'}
            </Button>
         </form>
      </Box>
   );
};

export default LoginPage;
