import { Skill } from '@/services/aboutMe/useSkillsQuery';
import { Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import SkillForm from './SkillForm';

type Props = {
  skill: Skill;
};

const SkillEditDialog = (props: Props) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const handleClose = () => {
    setSelectedSkill(null);
  };

  const handleOpen = () => {
    setSelectedSkill(props.skill);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Edit sx={{ color: '#ffa726' }} />
      </IconButton>
      <Dialog
        open={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        aria-labelledby='skill-edit-dialog-title'
        aria-describedby='skill-edit-dialog-description'
      >
        <DialogTitle id='skill-edit-dialog-title'>ویرایش مهارت</DialogTitle>
        <DialogContent>
          <DialogContentText id='skill-edit-dialog-description'>
            <SkillForm
              mode='edit'
              skill={props.skill}
              onCloseDialog={handleClose}
            />
          </DialogContentText>

          <Box
            mt={4}
            display={'flex'}
            justifyContent={'flex-end'}
          >
            <Button onClick={handleClose}>انصراف</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SkillEditDialog;
