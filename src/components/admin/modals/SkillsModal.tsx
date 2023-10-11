import { deleteSkillAction } from '@/actions/SkillAction';
import {
   Box,
   Button,
   CircularProgress,
   Modal,
   Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type SkillsModalProps = {
   skillSelected: string | undefined;
   setSkillSelected: (_id: string | undefined) => void;
};

const SkillsModal = (props: SkillsModalProps) => {
   const router = useRouter();

   const [loading, setLoading] = useState(false);

   const deleteHandler = async () => {
      if (props.skillSelected) {
         setLoading(true);
         const response = await deleteSkillAction(
            localStorage.getItem('token')!,
            props.skillSelected,
         );
         setLoading(false);

         if (response.status !== 200) {
            if (response.status === 401) {
               props.setSkillSelected(undefined);
               localStorage.removeItem('token');
               router.replace('/');
            }

            return alert(response.message || 'خطایی در سرور رخ داد!');
         }

         if (response.status === 200) {
            props.setSkillSelected(undefined);
            alert('معرفی مورد نظر با موفقیت حذف شد');
         }
      }
   };

   return (
      <Modal
         open={!!props.skillSelected}
         onClose={() => props.setSkillSelected(undefined)}
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
               آیا مایل به حذف این مهارت هستید؟
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3 }}>
               <Button
                  onClick={() => {
                     props.setSkillSelected(undefined);
                  }}
               >
                  لغو
               </Button>
               <Button
                  type='button'
                  onClick={deleteHandler}
                  color='error'
                  disabled={loading}
               >
                  {loading ? (
                     <CircularProgress
                        color='error'
                        size={25}
                     />
                  ) : (
                     'حذف'
                  )}
               </Button>
            </Box>
         </Box>
      </Modal>
   );
};

export default SkillsModal;
