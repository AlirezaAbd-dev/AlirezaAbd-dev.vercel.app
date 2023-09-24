import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import Projects from '../tables/Projects';

const ProjectForm = () => {
   return (
      <>
         <Typography variant='h6'>اضافه کردن نمونه کار</Typography>

         <Projects />

         <TextField
            dir='rtl'
            color='secondary'
            label='نام پروژه'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='آدرس عکس'
         />
         <TextField
            dir='rtl'
            color='secondary'
            label='لینک رفرنس'
         />

         <Button variant='contained'>اضافه کردن</Button>
      </>
   );
};

export default ProjectForm;
