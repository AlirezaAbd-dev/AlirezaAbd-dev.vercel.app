import {
   Box,
   Button,
   CircularProgress,
   TextField,
   Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Educations from '../tables/Educations';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import educationValidation from '@/validations/educationValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { addEducationAction } from '@/actions/educationAction';
import { useRouter } from 'next/navigation';

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

type SelectedEducationType = Prettify<
   Omit<EducationType, 'duration'> & {
      since: number;
      until: number;
   }
>;

export type EducationFormType = z.infer<typeof educationValidation>;

const EducationForm = (props: EducationFormProps) => {
   const router = useRouter();
   const [selectedItem, setSelectedItem] = useState<SelectedEducationType>();
   const [loading, setLoading] = useState(false);

   const { control, handleSubmit, reset } = useForm<EducationFormType>({
      resolver: zodResolver(educationValidation),
   });

   async function educationHandler(value: EducationFormType) {
      setLoading(true);
      let response;
      if (selectedItem) {
      } else {
         response = await addEducationAction(
            localStorage.getItem('token')!,
            value,
         );
      }
      if (!response) return;

      if (response.status !== 200) {
         if (response.status === 401) {
            localStorage.removeItem('token');
            router.replace('/');
         }

         return alert(response.message.message || 'خطایی در سرور رخ داد!');
      }

      if (response.status === 200) {
         reset();
         alert('تحصیلات با موفقیت اضافه شد!');
      }
      setLoading(false);
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
               disabled={loading}
            >
               {loading ? <CircularProgress size={25} /> : 'اضافه کردن'}
            </Button>
         </Box>
      </>
   );
};

export default EducationForm;
