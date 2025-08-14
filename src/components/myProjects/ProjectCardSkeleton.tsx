import { Grid2, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

const ProjectCardSkeleton = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid2
      size={{
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
      }}
      sx={{
        px: 2,
        my: 2,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Skeleton
        width={'100%'}
        height={isSmDown ? 300 : 600}
      />
    </Grid2>
  );
};

export default ProjectCardSkeleton;
