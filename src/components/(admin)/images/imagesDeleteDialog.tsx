import useDeleteImageMutation from '@/services/(admin)/images/useDeleteImageMutation';
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
  image: string;
};

const ImagesDeleteDialog = (props: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { mutateAsync: deleteImage, isPending } = useDeleteImageMutation();

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleDelete = async () => {
    if (selectedImage) {
      await deleteImage({ key: selectedImage });
      handleClose();
    }
  };

  return (
    <>
      <IconButton
        onClick={() =>
          setSelectedImage(
            props.image.split(process.env.NEXT_PUBLIC_STORAGE_URL + '/')[1],
          )
        }
      >
        <Delete sx={{ color: '#f44336' }} />
      </IconButton>
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        aria-labelledby='skill-delete-dialog-title'
        aria-describedby='skill-delete-dialog-description'
      >
        <DialogTitle id='skill-delete-dialog-title'>حذف مهارت</DialogTitle>
        <DialogContent>
          <DialogContentText id='skill-delete-dialog-description'>
            آیا از حذف این عکس مطمئن هستید؟
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

export default ImagesDeleteDialog;
