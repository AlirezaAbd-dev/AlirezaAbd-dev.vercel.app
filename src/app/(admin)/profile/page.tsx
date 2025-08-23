'use client';

import Loading from '@/app/loading';
import ProfileMain from '@/components/(admin)/profile';
import useAuth from '@/services/login/useAuth';
import React from 'react';

const Profile = () => {
  const { data: me } = useAuth('/');

  if (!me) return <Loading />;

  if (me) return <ProfileMain profile={me} />;
};

export default Profile;
