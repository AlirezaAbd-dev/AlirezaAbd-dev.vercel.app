import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

type IntroductionsModalProps = {
   deleteSelected: string | undefined;
   setDeleteSelected: (_id: string | undefined) => void;
};

const IntroductionsModal = (props: IntroductionsModalProps) => {
   return (
      <Modal
         open={!!props.deleteSelected}
         onClose={() => props.setDeleteSelected(undefined)}
      >
         <Box
            sx={{
               position: 'absolute' as 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)',
               width: 400,
               bgcolor: 'background.paper',
               border: '2px solid #000',
               boxShadow: 24,
               pt: 2,
               px: 4,
               pb: 3,
            }}
         >
            <Typography variant='h6'>
               آیا مایل به حذف این معرفی هستید؟
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3 }}>
               <Button
                  onClick={() => {
                     props.setDeleteSelected(undefined);
                  }}
               >
                  لغو
               </Button>
               <Button color='error'>حذف</Button>
            </Box>
         </Box>
      </Modal>
   );
};

export default IntroductionsModal;
