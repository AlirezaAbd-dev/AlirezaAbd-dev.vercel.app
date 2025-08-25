'use client';

import SkillsMain from '@/components/(admin)/skills';
import useAuth from '@/services/login/useAuth';

const page = () => {
  useAuth();

  return <SkillsMain />;
};

export default page;
