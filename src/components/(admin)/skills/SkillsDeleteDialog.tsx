import useDeleteSkillMutation from '@/services/(admin)/skills/useDeleteSkillMutation';
import { Skill } from '@/services/aboutMe/useSkillsQuery';
import { Delete } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useState } from 'react';

type Props = {
  skill: Skill;
};

const SkillsDeleteDialog = (props: Props) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const { mutateAsync: deleteSkill, isPending } = useDeleteSkillMutation();

  const handleClose = () => {
    setSelectedSkill(null);
  };

  const handleDelete = async () => {
    if (selectedSkill) {
      await deleteSkill(selectedSkill.id);
      handleClose();
    }
  };

  return (
    <>
      <IconButton onClick={() => setSelectedSkill(props.skill)}>
        <Delete sx={{ color: '#f44336' }} />
      </IconButton>
      <Dialog
        open={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        aria-labelledby='skill-delete-dialog-title'
        aria-describedby='skill-delete-dialog-description'
      >
        <DialogTitle id='skill-delete-dialog-title'>حذف مهارت</DialogTitle>
        <DialogContent>
          <DialogContentText id='skill-delete-dialog-description'>
            آیا از حذف مهارت {selectedSkill?.name} مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>انصراف</Button>
          <Button
            onClick={handleDelete}
            autoFocus
            color='error'
            loading={isPending}
            disabled={isPending}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SkillsDeleteDialog;
