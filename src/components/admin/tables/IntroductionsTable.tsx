import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { ObjectId } from 'mongoose';
import React from 'react';

export type IntroductionsType = {
   _id: ObjectId;
   text: string;
};

type IntroductionsTableProps = IntroductionsType & {
   setSelectedItem: (item: IntroductionsType) => void;
   setDeleteSelected: (_id: string) => void;
};

const IntroductionsTable = (props: IntroductionsTableProps) => {
   return (
      <Box
         key={props._id.toString()}
         sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: 2,
         }}
      >
         <Typography>{props.text}</Typography>
         <IconButton
            onClick={() => {
               props.setSelectedItem({ _id: props._id, text: props.text });
            }}
            color={'info'}
         >
            <Edit />
         </IconButton>
         <IconButton
            onClick={() => {
               props.setDeleteSelected(props._id.toString());
            }}
            color={'error'}
         >
            <Delete />
         </IconButton>
      </Box>
   );
};

export default IntroductionsTable;
