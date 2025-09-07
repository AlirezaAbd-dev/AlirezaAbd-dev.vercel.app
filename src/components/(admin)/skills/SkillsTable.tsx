import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Skill } from '@/services/aboutMe/useSkillsQuery';
import Image from 'next/image';
import { Box, IconButton, Typography } from '@mui/material';
import SkillsDeleteDialog from './SkillsDeleteDialog';
import { Edit } from '@mui/icons-material';
import SkillEditDialog from './SkillEditDialog';

type Props = {
  skills: Skill[];
};

export default function SkillsTable(props: Props) {
  return (
    <TableContainer
      dir='rtl'
      component={Paper}
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label='simple table'
      >
        <TableHead>
          <TableRow>
            <TableCell>نام</TableCell>
            <TableCell>میزان مهارت</TableCell>
            <TableCell>آیکون</TableCell>
            <TableCell>رنگ</TableCell>
            <TableCell>عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.skills.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component='th'
                scope='row'
              >
                {row.name}
              </TableCell>
              <TableCell>{row.value}%</TableCell>
              <TableCell>
                <Image
                  src={row.icon}
                  width={20}
                  height={20}
                  alt={row.name}
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    width={20}
                    height={20}
                    borderRadius={20}
                    bgcolor={row.color}
                  ></Box>
                  <Typography>{row.color}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <SkillEditDialog skill={row} />
                <SkillsDeleteDialog skill={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
