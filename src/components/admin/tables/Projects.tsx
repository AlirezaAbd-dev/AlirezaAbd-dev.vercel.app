'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

function createData(
   name: string,
   imageAddress: string,
   detailsAddress: string,
) {
   return { name, imageAddress, detailsAddress };
}

const rows = [
   createData('دیپلم', '1400 - 1402', 'دانشکده شهید چمران'),
   createData('فوق دیپلم', '1402 - 1404', 'دانشکده شهید چمران'),
];

export default function Projects() {
   return (
      <Box width={'100%'}>
         <TableContainer component={Paper}>
            <Table
               sx={{ minWidth: 650 }}
               aria-label='simple table'
            >
               <TableHead>
                  <TableRow>
                     <TableCell align='center'>نام پروژه</TableCell>
                     <TableCell align='center'>آدرس عکس</TableCell>
                     <TableCell align='center'>لینک رفرنس</TableCell>
                     <TableCell align='center'>عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => (
                     <TableRow
                        key={row.name}
                        sx={{
                           '&:last-child td, &:last-child th': { border: 0 },
                        }}
                     >
                        <TableCell align='center'>{row.name}</TableCell>
                        <TableCell align='center'>{row.imageAddress}</TableCell>
                        <TableCell align='center'>
                           {row.detailsAddress}
                        </TableCell>
                        <TableCell align='center'>
                           <IconButton color='error'>
                              <Delete />
                           </IconButton>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
}
