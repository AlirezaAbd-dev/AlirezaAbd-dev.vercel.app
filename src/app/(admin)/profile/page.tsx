'use client';

import useAuth from '@/services/login/useAuth';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';

const Profile = () => {
  return (
    <Card
      sx={{
        width: '100%',
        height: '100vh',
      }}
    >
      <Box dir='rtl'>
        <Typography>Profile</Typography>
      </Box>
    </Card>
  );
};

export default Profile;
