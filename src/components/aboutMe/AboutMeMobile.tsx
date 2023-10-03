'use client';
import { Avatar, Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { useState } from 'react';

import avatar from '../../assets/new-avatar.jpg';
import { useStore } from '@/store/store';

const AboutMeMobile = () => {
   const [isImageLoaded, setIsImageLoaded] = useState(false);
   const data = useStore((state) => state.data);

   return (
      <Grid
         xs={0}
         sm={0}
         md={4}
         lg={4}
         xl={4}
      >
         {!isImageLoaded && (
            <Skeleton
               variant='rounded'
               animation='pulse'
               width={250}
               height={250}
               sx={{
                  m: '0 auto',
                  display: {
                     xs: 'none',
                     sm: 'none',
                     md: 'block',
                  },
               }}
            />
         )}
         <Avatar
            variant='rounded'
            sx={{
               height: 250,
               width: 250,
               margin: '0 auto',
               display: {
                  xs: 'none',
                  sm: 'none',
                  md: isImageLoaded ? 'block' : 'none',
                  lg: isImageLoaded ? 'block' : 'none',
                  xl: isImageLoaded ? 'block' : 'none',
               },
            }}
         >
            <Image
               src={avatar}
               alt={data?.name || ''}
               width={250}
               height={250}
               onLoad={() => {
                  setIsImageLoaded(true);
               }}
            />
         </Avatar>
      </Grid>
   );
};

export default AboutMeMobile;
