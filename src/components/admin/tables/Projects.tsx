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
import { Project } from '../forms/ProjectForm';
import { useState } from 'react';
import ProjectsModal from '../modals/ProjectsModal';

type ProjectsProps = {
   projects: Project[];
   selectedItem?: Project;
   setSelectedItem: (project?: Project) => void;
};

export default function Projects(props: ProjectsProps) {
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
                     <TableCell align='center'>نام پروژه</TableCell>
                     <TableCell align='center'>آدرس عکس</TableCell>
                     <TableCell align='center'>لینک رفرنس</TableCell>
                     <TableCell align='center'>عملیات</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {props?.projects?.map((p) => {
                     const isActive = props.selectedItem?._id === p._id;

                     return (
                        <TableRow
                           key={p.name}
                           sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                           }}
                        >
                           <TableCell align='center'>{p.name}</TableCell>
                           <TableCell align='center'>{p.image}</TableCell>
                           <TableCell align='center'>{p.reference}</TableCell>
                           <TableCell align='center'>
                              <IconButton
                                 onClick={() => {
                                    if (isActive)
                                       return props.setSelectedItem(undefined);

                                    props.setSelectedItem({
                                       _id: p._id,
                                       image: p.image,
                                       name: p.name,
                                       reference: p.reference,
                                    });
                                 }}
                                 color={isActive ? 'error' : 'info'}
                              >
                                 {isActive ? <Close /> : <Edit />}
                              </IconButton>
                              <IconButton
                                 onClick={() => {
                                    setDeleteSelected(p._id);
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
         <ProjectsModal
            deleteSelected={deleteSelected}
            setDeleteSelected={setDeleteSelected}
         />
      </Box>
   );
}
