'use client';
import { SelfImprovementRounded } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';

import Skill from '../../page-components/Skill';
import HeaderDivider from '../../components/ui/HeaderDivider';
import useSkillsQuery from '@/services/aboutMe/useSkillsQuery';
import { Box, Grid2, Skeleton } from '@mui/material';
import SkillSkeleton from '@/page-components/SkillSkeleton';

const AboutMeSkills = () => {
  const { data, isPending } = useSkillsQuery();

  return (
    <Grid container>
      <Grid sx={{ width: 1, mt: 1 }}>
        <HeaderDivider
          color='primary.dark'
          animation={false}
          // @ts-ignore
          icon={<SelfImprovementRounded color='text.primary' />}
        >
          مهارت های من
        </HeaderDivider>

        {isPending &&
          Array(1, 2, 3, 4, 5, 6, 7, 8).map((item) => (
            <SkillSkeleton key={item} />
          ))}

        {!isPending &&
          data?.map((s) => (
            <Skill
              key={s.id}
              value={s.value}
              name={s.name}
              color={s.color}
              icon={s.icon}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default AboutMeSkills;
