'use client';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ability } from '@/services/main/useAbilitiesQuery';

type Props = {
  abilities: Ability[];
};

const HomeSubtitle = (props: Props) => {
  const [index, setIndex] = useState(0);

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const strings = useMemo(() => props.abilities.map((a) => a.content), []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <AnimatePresence mode='wait'>
        <motion.div
          key={index} // important for triggering animation on change
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'inline-block' }}
        >
          <Typography
            variant={isSmDown ? 'h6' : 'h5'}
            color='text.primary'
            sx={{ mt: 4 }}
          >
            {strings[index % strings.length]}
          </Typography>
        </motion.div>
      </AnimatePresence>

      <Typography
        variant={isSmDown ? 'h6' : 'h5'}
        color='text.primary'
        sx={{ mt: 4, mr: 1 }}
      >
        من یک
      </Typography>
    </Box>
  );
};

export default HomeSubtitle;
