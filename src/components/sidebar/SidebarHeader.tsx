'use client';

import { useState } from 'react';
import { Avatar, Box, IconButton, Skeleton, useTheme } from '@mui/material';
import { GitHub, Telegram, Instagram } from '@mui/icons-material';
import Image from 'next/image';

import ThemeActionButton from '../ThemeActionButton';

import avatar from '../../assets/avatar.png';
import { queryClient } from '@/containers/AppContainer/AppQueryClientProvider';
import QueryKeys from '@/constants/queryKeys';
import useProfileQuery from '@/services/main/useProfileQuery';

const SidebarHeader = () => {
  const theme = useTheme();

  const { data } = useProfileQuery();
  if (data)
    return (
      <>
        <ThemeActionButton />
        <Avatar
          variant='circular'
          sx={{
            height: 'auto',
            width: '90%',
            margin: '0 auto',
            bgcolor: 'transparent',
            display: {
              xs: 'none',
              sm: 'none',
              md: 'flex',
              lg: 'flex',
              xl: 'flex',
            },
          }}
        >
          <Image
            src={avatar}
            alt={data.fullname}
            width={200}
            height={200}
          />
        </Avatar>
        <h1
          style={{
            fontSize: '20px',
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.secondary.main,
          }}
        >
          {data.fullname}
        </h1>
        <h2 style={{ fontSize: '12px', color: theme.palette.text.primary }}>
          توسعه دهنده فول استک
        </h2>

        <Box sx={{ m: '10px auto', textAlign: 'center' }}>
          <IconButton
            aria-label='Github'
            sx={{ width: 40, height: 40 }}
          >
            <a
              href={data.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <GitHub />
            </a>
          </IconButton>
          <IconButton
            aria-label='Telegram'
            sx={{ width: 40, height: 40 }}
          >
            <a
              href={data.telegramUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Telegram sx={{ color: '#0093f5' }} />
            </a>
          </IconButton>
          <IconButton
            aria-label={'Instagram'}
            sx={{ width: 40, height: 40 }}
          >
            <a
              href={data.instagramUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Instagram sx={{ color: '#ba23ab' }} />
            </a>
          </IconButton>
        </Box>
      </>
    );
};

export default SidebarHeader;
