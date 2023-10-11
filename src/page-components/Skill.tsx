'use client';
import {
   Divider,
   Chip,
   Typography,
   Box,
   LinearProgress,
   Badge,
} from '@mui/material';

const Skill = ({
   color,
   name,
   value,
}: {
   name: string;
   color: string;
   value: number;
}) => {
   return (
      <>
         <Divider
            textAlign='right'
            sx={{
               '&::before, &::after': {
                  borderColor: color,
               },
               mt: 3,
               mb: 1,
            }}
         >
            <Chip
               label={name}
               sx={{ p: 3, background: color }}
            />
         </Divider>
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', ml: 1 }}>
               <LinearProgress
                  variant='determinate'
                  value={value}
                  sx={{
                     height: 10,
                     borderRadius: 2,
                     '& .muirtl-qd76qg-MuiLinearProgress-bar1': {
                        bgcolor: color,
                     },
                  }}
               />
            </Box>
            <Box sx={{ minWidth: 35, mr: 2 }}>
               <Typography variant='body2'>
                  <Badge
                     variant='standard'
                     badgeContent={`${Math.round(value)}%`}
                     sx={{
                        '& .MuiBadge-badge': {
                           bgcolor: color,
                        },
                     }}
                  />
               </Typography>
            </Box>
         </Box>
      </>
   );
};

export default Skill;
