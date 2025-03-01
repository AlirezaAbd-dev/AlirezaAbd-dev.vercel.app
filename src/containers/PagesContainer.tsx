'use client';
import Grid from '@mui/material/Grid2';
import { ReactNode } from 'react';

const PagesContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      size={{
        xs: 12,
        sm: 12,
        md: 9,
        lg: 10,
        xl: 10,
      }}
      sx={{ backgroundColor: 'background' }}
    >
      {children}
    </Grid>
  );
};

export default PagesContainer;
