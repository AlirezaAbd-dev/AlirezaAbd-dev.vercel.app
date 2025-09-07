'use client';

import Loading from '@/app/loading';
import ImagesMain from '@/components/(admin)/images';
import useAuth from '@/services/login/useAuth';
import React from 'react';

const Images = () => {
  const me = useAuth('/');

  if (!me) return <Loading />;

  return <ImagesMain />;
};

export default Images;
