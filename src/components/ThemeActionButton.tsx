import { Box, Fab, useTheme } from '@mui/material';
import { NightlightOutlined, WbSunnyOutlined } from '@mui/icons-material';
import { useContext } from 'react';

import mainContext from '../context';

const ThemeActionButton = () => {
   const theme = useTheme();
   const { handleThemeChange } = useContext(mainContext);

   return (
      <Box
         sx={{
            position: {
               sm: 'block',
               md: 'absolute',
            },
            mb: 2,
            textAlign: 'left',
         }}
      >
         <Fab
            aria-label='ThemeChanger'
            variant='extended'
            size='small'
            color={'primary'}
            onClick={handleThemeChange}
            sx={{
               ml: 2,
               color: 'background',
               bgcolor: 'primary.main',
            }}
         >
            {theme.palette.mode === 'dark' ? (
               <NightlightOutlined />
            ) : (
               <WbSunnyOutlined />
            )}
         </Fab>
      </Box>
   );
};

export default ThemeActionButton;
