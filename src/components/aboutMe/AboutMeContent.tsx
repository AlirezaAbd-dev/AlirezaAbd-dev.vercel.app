'use client';
import { useEffect, useState } from 'react';
import { Avatar, Box, Skeleton, Slide } from '@mui/material';
import Image from 'next/image';

import DevInfo from '../../page-components/DevInfo';
import avatar from '../../assets/new-avatar.jpg';
import useProfileQuery from '@/services/main/useProfileQuery';
import { gregorianToSolar } from '@/utils/persianData';

const AboutMeContent = () => {
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const { data, isPending } = useProfileQuery();

  useEffect(() => {
    setLoading(true);

    return () => {
      setLoading(false);
    };
  }, []);
  console.log(isImageLoaded);
  if (!isPending && data)
    return (
      <>
        <Box
          sx={{
            width: '100%',
            my: 2,
            justifyContent: 'flex-end',
            display: {
              xs: 'flex',
              sm: 'flex',
              md: 'none',
              lg: 'none',
              xl: 'none',
            },
          }}
        >
          {!isImageLoaded && (
            <Skeleton
              variant='circular'
              animation='pulse'
              width={150}
              height={150}
              sx={{
                display: {
                  xs: 'flex',
                  sm: 'flex',
                  md: 'none',
                },
              }}
            />
          )}
          <Avatar
            variant='circular'
            sx={{
              display: isImageLoaded ? 'block' : 'none',
              width: 150,
              height: 'auto',
              aspectRatio: '1/1',
            }}
          >
            <Image
              priority
              src={data.avatar || avatar}
              alt={data.fullname}
              width={150}
              height={150}
              onLoad={() => {
                setIsImageLoaded(true);
              }}
              style={{
                objectFit: 'fill',
              }}
            />
          </Avatar>
        </Box>
        <Slide
          direction='right'
          in={loading}
          style={{
            transitionDelay: loading ? '500ms' : '0ms',
          }}
        >
          <Box>
            <DevInfo>نام و نام خانوادگی : {data.fullname}</DevInfo>
            <DevInfo>
              سال تولد : {gregorianToSolar(data.birthday, 'YYYY')}
            </DevInfo>
            {/* <DevInfo>سن : 19</DevInfo> */}
            <DevInfo>شهر : {data.birthCity}</DevInfo>
            <DevInfo>{data.email} : ایمیل</DevInfo>
          </Box>
        </Slide>
      </>
    );
};

export default AboutMeContent;
