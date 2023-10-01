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
import { EducationType } from '../forms/EducationForm';

function createData(
   cert: string,
   duration: string,
   university: string,
   major: string,
) {
   return { cert, duration, university, major };
}

const rows = [
   createData(
      'دیپلم',
      '1400 - 1402',
      'دانشکده شهید چمران',
      'کامپیوتر - نرم افزار',
   ),
   createData(
      'فوق دیپلم',
      '1402 - 1404',
      'دانشکده شهید چمران',
      'کامپیوتر - نرم افزار',
   ),
];

type EducationsProps = {
   educations: EducationType[];
};

export default function Educations(props: EducationsProps) {
   return (
      <Box width={'100%'}>
         <TableContainer component={Paper}>
            <Table
               sx={{ minWidth: 650 }}
               aria-label='simple table'
            >
               <TableHead>
                  <TableRow>
                     <TableCell align='center'>مدرک</TableCell>
                     <TableCell align='center'>مدت</TableCell>
                     <TableCell align='center'>رشته</TableCell>
                     <TableCell align='center'>محل تحصیل</TableCell>
                     <TableCell align='center'>عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {props.educations.map((row) => (
                     <TableRow
                        key={row.certificate}
                        sx={{
                           '&:last-child td, &:last-child th': { border: 0 },
                        }}
                     >
                        <TableCell align='center'>{row.certificate}</TableCell>
                        <TableCell align='center'>{row.duration}</TableCell>
                        <TableCell align='center'>{row.major}</TableCell>
                        <TableCell align='center'>{row.university}</TableCell>
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
