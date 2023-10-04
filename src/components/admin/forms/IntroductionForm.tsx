import {
   Button,
   CircularProgress,
   IconButton,
   TextField,
   Typography,
} from '@mui/material';
import { ObjectId } from 'mongoose';
import React, { useEffect, useState } from 'react';
import IntroductionsTable, {
   IntroductionsType,
} from '../tables/IntroductionsTable';
import { Close } from '@mui/icons-material';
import IntroductionsModal from '../modals/IntroductionsModal';
import introductionValidation from '@/validations/introductionValidation';
import {
   addIntroductionAction,
   editIntroductionAction,
} from '@/actions/introductionActions';
import { useRouter } from 'next/navigation';

type IntroductionsFormType = {
   introductions: {
      _id: ObjectId;
      text: string;
   }[];
};

const IntroductionForm = (props: IntroductionsFormType) => {
   const router = useRouter();

   const [selectedItem, setSelectedItem] = useState<IntroductionsType | null>(
      null,
   );
   const [inputValue, setInputValue] = useState('');
   const [deleteSelected, setDeleteSelected] = useState<string | undefined>();
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (selectedItem?._id) {
         setInputValue(selectedItem.text);
      }
   }, [selectedItem]);

   const onSelectItemHandler = (item: IntroductionsType) => {
      setSelectedItem(item);
   };

   const onDeleteSelectedHandler = (_id: string | undefined) => {
      setDeleteSelected(_id);
   };

   const addSubmitHandler = async () => {
      const verified = introductionValidation.safeParse({ text: inputValue });

      if (!verified.success) {
         return setError(verified.error.errors[0].message);
      }

      setIsLoading(true);
      const response = await addIntroductionAction(
         localStorage.getItem('token')!,
         verified.data.text,
      );

      setIsLoading(false);

      if (response.status === 401) {
         localStorage.removeItem('token');
         router.replace('/');
      }

      if (response.status === 200) {
         setError('');
         setInputValue('');
         alert('معرفی با موفقیت اضافه شد!');
      } else {
         alert(response.message || 'خطایی در سرور رخ داد!');
      }
   };

   const editSubmitHandler = async () => {
      if (selectedItem) {
         const verified = introductionValidation.safeParse({
            text: inputValue,
         });

         if (!verified.success) {
            return setError(verified.error.errors[0].message);
         }
         setIsLoading(true);

         const response = await editIntroductionAction(
            localStorage.getItem('token')!,
            selectedItem._id.toString(),
            inputValue,
         );

         setIsLoading(false);

         if (response.status === 401) {
            localStorage.removeItem('token');
            router.replace('/');
         }

         if (response.status === 200) {
            setError('');
            setInputValue('');
            alert('معرفی با موفقیت ویرایش شد!');
         } else {
            alert(response.message || 'خطایی در سرور رخ داد!');
         }
      }
   };

   return (
      <>
         <Typography variant='h6'>معرفی ها</Typography>

         {props?.introductions?.map((i) => (
            <IntroductionsTable
               key={i._id.toString()}
               _id={i._id}
               text={i.text}
               setSelectedItem={onSelectItemHandler}
               setDeleteSelected={onDeleteSelectedHandler}
            />
         ))}

         <TextField
            dir='rtl'
            color='secondary'
            label='از خودت کوتاه تعریف کن'
            sx={{ width: '80%' }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            helperText={error}
            error={!!error}
            InputProps={{
               startAdornment: selectedItem && (
                  <IconButton
                     onClick={() => {
                        setSelectedItem(null);
                        setInputValue('');
                     }}
                     color='error'
                  >
                     <Close />
                  </IconButton>
               ),
            }}
         />

         {selectedItem ? (
            <Button
               type='button'
               variant='contained'
               onClick={editSubmitHandler}
               disabled={isLoading}
            >
               {isLoading ? <CircularProgress size={25} /> : 'ویرایش'}
            </Button>
         ) : (
            <Button
               type='button'
               variant='contained'
               onClick={addSubmitHandler}
               disabled={isLoading}
            >
               {isLoading ? <CircularProgress size={25} /> : 'اضافه کردن'}
            </Button>
         )}

         <IntroductionsModal
            deleteSelected={deleteSelected}
            setDeleteSelected={onDeleteSelectedHandler}
         />
      </>
   );
};

export default IntroductionForm;
