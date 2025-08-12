import { Box, Skeleton, useTheme } from '@mui/material';
import React from 'react';

const CustomSkeleton = () => {
  const theme = useTheme();

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={2}
      sx={{
        height: 120,
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'end'}
      >
        <Skeleton
          sx={{
            width: 50,
            [theme.breakpoints.up('md')]: {
              width: 80,
            },
          }}
        />
        <Skeleton
          sx={{
            width: 40,
            [theme.breakpoints.up('md')]: {
              width: 50,
            },
          }}
        />
        <Skeleton
          sx={{
            width: 80,
            [theme.breakpoints.up('md')]: {
              width: 150,
            },
          }}
        />
        <Skeleton
          sx={{
            width: 100,
            [theme.breakpoints.up('md')]: {
              width: 200,
            },
          }}
        />
      </Box>
      <Skeleton
        width={4}
        sx={{ height: 160 }}
      />
      <Box
        sx={{
          width: 100,
          [theme.breakpoints.up('md')]: {
            width: 200,
          },
        }}
      ></Box>
    </Box>
  );
};

const EducationTimelineSkeleton = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      mt={4}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <CustomSkeleton key={index} />
      ))}
    </Box>
  );
};

export default EducationTimelineSkeleton;
