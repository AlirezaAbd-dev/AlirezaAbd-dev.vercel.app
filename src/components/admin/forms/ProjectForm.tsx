import {
   Box,
   Button,
   CircularProgress,
   TextField,
   Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Projects from '../tables/Projects';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import ProjectValidation from '@/validations/projectValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProjectAction, editProjectAction } from '@/actions/projectAction';
import { useRouter } from 'next/navigation';

export type Project = {
   _id: string;
   name: string;
   image: string;
   reference?: string;
};
export type ProjectFormProps = {
   projects: Project[];
};
export type ProjectType = z.infer<typeof ProjectValidation>;

const ProjectForm = (props: ProjectFormProps) => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const [selectedItem, setSelectedItem] = useState<Project>();

   const { control, handleSubmit, reset } = useForm<ProjectType>({
      resolver: zodResolver(ProjectValidation),
      values: selectedItem
         ? {
              name: selectedItem.name,
              image: selectedItem.image,
              reference: selectedItem.reference,
           }
         : { image: '', name: '', reference: '' },
   });

   async function projectHandler(value: ProjectType) {
      console.log(value);
      setLoading(true);
      let response;
      if (!selectedItem) {
         response = await addProjectAction(
            localStorage.getItem('token')!,
            value,
         );
      } else {
         response = await editProjectAction(
            localStorage.getItem('token')!,
            selectedItem._id,
            value,
         );
      }
      setLoading(false);

      if (response.status !== 200) {
         if (response.status === 401) {
            localStorage.removeItem('token');
            router.replace('/');
         }

         return alert(response.message.message);
      }

      if (response.status === 200) {
         reset();
         if (selectedItem) {
            setSelectedItem(undefined);
            return alert('پروژه با موفقیت ویرایش شد');
         }
         alert('پروژه با موفقیت اضافه شد');
      }
   }

   return (
      <>
         <Typography variant='h6'>اضافه کردن نمونه کار</Typography>

         <Projects
            projects={props.projects}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
         />

         <Box
            component={'form'}
            onSubmit={handleSubmit(projectHandler)}
            sx={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'flex-end',
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
                        label='نام پروژه'
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
               name='image'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        label='آدرس عکس'
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
               name='reference'
               control={control}
               render={({ field, fieldState }) => {
                  return (
                     <TextField
                        dir='rtl'
                        label='لینک رفرنس'
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
               {loading ? (
                  <CircularProgress size={25} />
               ) : selectedItem ? (
                  'ویرایش'
               ) : (
                  'اضافه کردن'
               )}
            </Button>
         </Box>
      </>
   );
};

export default ProjectForm;
