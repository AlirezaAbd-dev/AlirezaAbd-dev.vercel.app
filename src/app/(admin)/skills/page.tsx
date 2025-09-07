'use client';

import Loading from '@/app/loading';
import SkillsMain from '@/components/(admin)/skills';
import useAuth from '@/services/login/useAuth';

const page = () => {
  const { data } = useAuth('/');

  if (!data) return <Loading />;

  return <SkillsMain />;
};

export default page;
