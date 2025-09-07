import Loading from '@/app/loading';
import useImagesQuery from '@/services/(admin)/images/useImagesQuery';
import { Card, Grid2, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import ImagesSection from './imagesSection';

const ImagesMain = () => {
  const { data, isPending } = useImagesQuery();

  if (isPending) return <Loading />;

  if (!isPending && data) {
    const images = data.map(
      (img) => `${process.env.NEXT_PUBLIC_STORAGE_URL}/${img}`,
    );

    return (
      <Card
        dir='rtl'
        sx={{ width: '100%', height: '100vh', overflowY: 'auto', p: 8 }}
      >
        <Typography
          variant='h4'
          component='div'
          sx={{ p: 2 }}
        >
          گالری تصاویر
        </Typography>

        <ImagesSection images={images} />
      </Card>
    );
  }
};

export default ImagesMain;
