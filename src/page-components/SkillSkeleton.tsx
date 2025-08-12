import { Box, Grid2, Skeleton } from '@mui/material';
import React from 'react';

const SkillSkeleton = () => {
  return (
    <Box mt={4}>
      <Grid2 container>
        <Grid2 size={{ md: 9, xs: 7 }}></Grid2>
        <Grid2 size={{ md: 1, xs: 3 }}>
          <Skeleton
            variant='rounded'
            sx={{
              justifySelf: 'end',
              width: '100%',
              height: '48px',
              borderRadius: '16px',
            }}
          />
        </Grid2>
        <Grid2 size={{ md: 2, xs: 1 }}></Grid2>
      </Grid2>
      <Skeleton sx={{ mt: '8px' }} />
    </Box>
  );
};

export default SkillSkeleton;
