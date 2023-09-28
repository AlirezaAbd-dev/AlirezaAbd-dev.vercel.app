import { Button, TextField, Typography } from '@mui/material';
import { ObjectId } from 'mongoose';
import React from 'react';

type IntroductionsFormType = {
   introductions: {
      _id: ObjectId;
      text: string;
   }[];
};

const IntroductionForm = (props: IntroductionsFormType) => {
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
