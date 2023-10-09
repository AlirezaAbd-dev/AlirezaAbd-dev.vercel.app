'use client';
import { useStore } from '@/store/store';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';

const HomeSubtitle = () => {
   const [index, setIndex] = useState(0);

   const theme = useTheme();
   const introductions = useStore((state) => state.data?.introductions);

   const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

   const strings = useMemo(
      () => introductions?.map((i) => [i.text]),
      [introductions],
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
               {strings?.[index % strings.length]}
            </Typography>
         </TextTransition>
      </Box>
   );
};

export default HomeSubtitle;
