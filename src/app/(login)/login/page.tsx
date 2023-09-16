import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';

const LoginPage = () => {
   return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
         <Typography
            textAlign={'center'}
            variant='h4'
         >
            ورود
         </Typography>
         <TextField
            sx={{ textAlign: 'right' }}
            label='نام کاربری'
         />
         <TextField label='رمز عبور' />

         <Button>ورود</Button>
      </Box>
   );
};

export default LoginPage;
