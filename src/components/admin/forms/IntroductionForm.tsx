import { Button, IconButton, TextField, Typography } from '@mui/material';
import { ObjectId } from 'mongoose';
import React, { useEffect, useState } from 'react';
import IntroductionsTable, {
   IntroductionsType,
} from '../tables/IntroductionsTable';
import { Close } from '@mui/icons-material';
import IntroductionsModal from '../modals/IntroductionsModal';

type IntroductionsFormType = {
   introductions: {
      _id: ObjectId;
      text: string;
   }[];
};

const IntroductionForm = (props: IntroductionsFormType) => {
   const [selectedItem, setSelectedItem] = useState<IntroductionsType | null>(
      null,
   );
   const [inputValue, setInputValue] = useState('');
   const [deleteSelected, setDeleteSelected] = useState<string | undefined>();

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

   return (
      <>
         <Typography variant='h6'>معرفی ها</Typography>

         {props.introductions.map((i) => (
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
            <Button variant='contained'>ویرایش</Button>
         ) : (
            <Button variant='contained'>اضافه کردن</Button>
         )}

         <IntroductionsModal
            deleteSelected={deleteSelected}
            setDeleteSelected={onDeleteSelectedHandler}
         />
      </>
   );
};

export default IntroductionForm;
