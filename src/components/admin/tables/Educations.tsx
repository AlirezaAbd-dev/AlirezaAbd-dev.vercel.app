'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material';
import { Close, Delete, Edit } from '@mui/icons-material';
import { EducationType, SelectedEducationType } from '../forms/EducationForm';
import { useState } from 'react';
import EducationsModal from '../modals/EducationsModal';

type EducationsProps = {
   educations: EducationType[];
   selectedItem?: SelectedEducationType;
   setSelectedItem: (education?: SelectedEducationType) => void;
};

export default function Educations(props: EducationsProps) {
   const [deleteSelected, setDeleteSelected] = useState<string>();

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
                  {props.educations.map((e) => {
                     const isActive = props.selectedItem?._id === e._id;

                     return (
                        <TableRow
                           key={e.certificate}
                           sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                           }}
                        >
                           <TableCell align='center'>{e.certificate}</TableCell>
                           <TableCell align='center'>{e.duration}</TableCell>
                           <TableCell align='center'>{e.major}</TableCell>
                           <TableCell align='center'>{e.university}</TableCell>
                           <TableCell align='center'>
                              <IconButton
                                 onClick={() => {
                                    if (isActive) {
                                       return props.setSelectedItem(undefined);
                                    }
                                    const duration = e.duration.split(' - ');

                                    props.setSelectedItem({
                                       _id: e._id,
                                       certificate: e.certificate,
                                       major: e.major,
                                       university: e.university,
                                       since: +duration[0],
                                       until: +duration[1],
                                    });
                                 }}
                                 color={isActive ? 'error' : 'info'}
                              >
                                 {isActive ? <Close /> : <Edit />}
                              </IconButton>
                              <IconButton
                                 onClick={() => {
                                    setDeleteSelected(e._id);
                                 }}
                                 color='error'
                              >
                                 <Delete />
                              </IconButton>
                           </TableCell>
                        </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainer>
         <EducationsModal
            deleteSelected={deleteSelected}
            setDeleteSelected={setDeleteSelected}
         />
      </Box>
   );
}
