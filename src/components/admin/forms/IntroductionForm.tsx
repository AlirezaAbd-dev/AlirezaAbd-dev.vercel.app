import { Button, TextField, Typography } from '@mui/material';
import React from 'react';

const IntroductionForm = () => {
   return (
      <>
         <Typography variant='h6'>معرفی ها</Typography>

         <TextField
            dir='rtl'
            color='secondary'
            label='از خودت کوتاه تعریف کن'
            sx={{ width: '80%' }}
         />

         <Button variant='contained'>اضافه کردن</Button>
      </>
   );
};

export default IntroductionForm;
