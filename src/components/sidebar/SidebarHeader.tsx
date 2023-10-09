'use client';

import { Avatar, Box, IconButton, useTheme } from '@mui/material';
import { Telegram, LinkedIn } from '@mui/icons-material';
import Eitaa from '../../assets/eitaa-svgrepo-com.svg';
import Image from 'next/image';

import ThemeActionButton from '../ThemeActionButton';

import avatar from '../../assets/avatar.png';
import { useStore } from '@/store/store';

const SidebarHeader = () => {
   const theme = useTheme();
   const data = useStore((state) => state.data);

   return (
      <>
         <ThemeActionButton />
         <Avatar
            variant='circular'
            sx={{
               border: `3px solid ${theme.palette.primary.main}`,
               height: 'auto',
               width: '75%',
               aspectRatio: 1 / 1,
               margin: '0 auto',
               display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'flex',
                  lg: 'flex',
                  xl: 'flex',
               },
            }}
         >
            <Image
               src={avatar}
               alt={data?.name || ''}
               width={200}
               height={200}
            />
         </Avatar>
         <h1
            style={{
               fontSize: '20px',
               color:
                  theme.palette.mode === 'dark'
                     ? theme.palette.primary.light
                     : theme.palette.secondary.main,
            }}
         >
            {data?.name || 'بی نام'}
         </h1>

         <Box sx={{ m: '10px auto', textAlign: 'center' }}>
            <IconButton
               aria-label='Telegram'
               sx={{ width: 40, height: 40 }}
            >
               <a
                  href='https://t.me/ali_mozhdehi'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                     display: 'inline-flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <Telegram sx={{ color: '#0093f5' }} />
               </a>
            </IconButton>
            <IconButton
               aria-label='Instagram'
               sx={{
                  width: 40,
                  height: 40,
               }}
            >
               <a
                  href='https://eitaa.com/ali_mozhdehi'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                     display: 'inline-flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <Image
                     src={Eitaa}
                     alt='eitaa'
                  />
               </a>
            </IconButton>
            <IconButton
               aria-label='LinkedIn'
               sx={{ width: 40, height: 40 }}
            >
               <a
                  href='https://linkedin.com/in/ali-mozhdehi-3ba306176'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                     display: 'inline-flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <LinkedIn sx={{ color: '#0023bb' }} />
               </a>
            </IconButton>
         </Box>
      </>
   );
};

export default SidebarHeader;
