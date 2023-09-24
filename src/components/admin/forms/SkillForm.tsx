import { Button, TextField, Typography } from '@mui/material';
import React from 'react';

const SkillForm = () => {
   return (
      <>
         <Typography variant='h6'>اضافه کردن مهارت</Typography>

         <TextField
            dir='rtl'
            color='secondary'
            label='مهارت'
         />

         <Button variant='contained'>اضافه کردن</Button>
      </>
   );
};

export default SkillForm;
