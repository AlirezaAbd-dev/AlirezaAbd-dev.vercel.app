import {
   Box,
   Button,
   CircularProgress,
   TextField,
   Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Skills from '../tables/Skills';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import skillValidation from '@/validations/skillValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { addSkillAction } from '@/actions/SkillAction';
import { useRouter } from 'next/navigation';

type Skill = {
   _id: string;
   name: string;
   rate: number;
};

export type SkillFormProps = {
   skills: Skill[];
};

type SkillType = z.infer<typeof skillValidation>;

const SkillForm = (props: SkillFormProps) => {
   const { control, handleSubmit, reset } = useForm<SkillType>({
      resolver: zodResolver(skillValidation),
      defaultValues: {
         name: '',
         rate: 1,
      },
   });
   const router = useRouter();

   const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>();
   const [loading, setLoading] = useState(false);

   async function addSkillHandler(value: SkillType) {
      console.log(value);
      if (!selectedSkill) {
         setLoading(true);
         const response = await addSkillAction(
            localStorage.getItem('token')!,
            value.name,
            value.rate,
         );
         setLoading(false);

         if (response.status === 401) {
            localStorage.removeItem('token');
            router.replace('/');
         }

         if (response.status !== 200) {
            return alert(response.message || 'خطایی در سرور رخ داد!');
         }

         if (response.status === 200) {
            reset();
            alert('مهارت با موفقیت اضافه شد!');
         }
      } else {
      }
   }

   return (
      <>
         <Typography variant='h6'>اضافه کردن مهارت</Typography>

         <Skills skills={props.skills} />

         <Box
            component={'form'}
            onSubmit={handleSubmit(addSkillHandler)}
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'flex-end',
               justifyContent: 'center',
               gap: 2,
            }}
         >
            <Controller
               name='name'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        color='secondary'
                        label='مهارت'
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        helperText={fieldState.error?.message}
                     />
                  );
               }}
            />
            <Controller
               name='rate'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        color='secondary'
                        type='number'
                        label='میزان مهارت'
                        value={field.value}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        helperText={fieldState.error?.message}
                     />
                  );
               }}
            />

            <Button
               type='submit'
               variant='contained'
               disabled={loading}
            >
               {loading ? (
                  <CircularProgress size={25} />
               ) : selectedSkill ? (
                  'ویرایش'
               ) : (
                  'اضافه کردن'
               )}
            </Button>
         </Box>
      </>
   );
};

export default SkillForm;
