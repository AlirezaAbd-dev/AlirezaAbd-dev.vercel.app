import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Delete, Edit } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import ImagesDeleteDialog from './imagesDeleteDialog';

type Props = {
  images: string[];
};

export default function ImagesSection(props: Props) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ImageList sx={{ width: '100%', height: 600 }}>
      <ImageListItem
        key='Subheader'
        cols={isSm ? 1 : 2}
      ></ImageListItem>
      {props.images.map((item) => (
        <ImageListItem key={item}>
          <img
            srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item}?w=248&fit=crop&auto=format`}
            alt={item}
            loading='lazy'
          />
          <ImageListItemBar
            actionIcon={
              <>
                <IconButton>
                  <Edit color='warning' />
                </IconButton>
                <ImagesDeleteDialog image={item} />
              </>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  },
];
