'use client';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';

const HomeSubtitle = () => {
  const [index, setIndex] = useState(0);

  const theme = useTheme();

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const strings = useMemo(
    () => [
      'توسعه‌دهنده فول استک هستم',
      'دانشجوی نرم‌افزار هستم',
      'طرفدار جاوااسکریپت و دات‌نت هستم',
      'عاشق یادگیری هستم',
      'خالق نرم‌افزار هستم',
      'بهینه‌ساز کد هستم',
      'کاوشگر برنامه‌نویسی هستم',
    ],
    [],
  );

  useEffect(() => {
    const textInterval = setInterval(() => {
      setIndex((prevIndex) => {
        return prevIndex + 1;
      });
    }, 3000);

    return () => {
      clearInterval(textInterval);
    };
  }, [strings]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <TextTransition
        springConfig={presets.wobbly}
        inline={true}
        direction='up'
      >
        <Typography
          variant={isSmDown ? 'h6' : 'h5'}
          color='text.primary'
          sx={{
            mt: 4,
          }}
        >
          {strings[index % strings.length]}
        </Typography>
      </TextTransition>
      <Typography
        variant={isSmDown ? 'h6' : 'h5'}
        color='text.primary'
        sx={{
          mt: 4,
          mr: 1,
        }}
      >
        من یک
      </Typography>
    </Box>
  );
};

export default HomeSubtitle;
