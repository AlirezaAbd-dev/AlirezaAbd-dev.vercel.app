import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import Educations from '../tables/Educations';

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

const EducationForm = (props: EducationFormProps) => {
   console.log(props.educations);
   return (
      <>
         <Typography variant='h6'>تحصیلات</Typography>

         <Educations educations={props.educations} />

         <TextField
            dir='rtl'
            color='secondary'
            label='مدرک'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='از سال'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='تا سال'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='رشته'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='محل تحصیل'
         />

         <Button variant='contained'>اضافه کردن</Button>
      </>
   );
};

export default EducationForm;
