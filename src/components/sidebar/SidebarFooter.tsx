'use client';
import { CopyrightRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const SidebarFooter = () => {
   return (
      <Box
         sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
            alignItems: 'center',
            height: 100,
         }}
      >
         <Typography
            variant='overline'
            color='gray'
         >
            طراحی شده توسط علیرضا عابدی{' '}
         </Typography>
         <Typography
            variant='overline'
            color='gray'
         >
            کپی رایت 1402
            <CopyrightRounded sx={{ verticalAlign: 'middle', height: 16 }} />
         </Typography>
      </Box>
   );
};

export default SidebarFooter;
