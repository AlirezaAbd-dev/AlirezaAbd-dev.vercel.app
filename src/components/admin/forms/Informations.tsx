import { Button, TextField, Typography } from '@mui/material';
import React from 'react';

const Informations = () => {
   return (
      <>
         <Typography variant='h6'>مشخصات</Typography>

         <TextField
            dir='rtl'
            color='secondary'
            label='نام و نام خانوادگی'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='سال تولد'
            type='number'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='شهر'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='ایمیل'
         />
         <Button variant='contained'>تایید</Button>
      </>
   );
};

export default Informations;
