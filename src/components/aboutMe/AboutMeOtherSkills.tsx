'use client';
import { Box, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import HeaderDivider from '../ui/HeaderDivider';
import AboutMeSkillItem from './AboutMeSkillItem';
import SkateboardingIcon from '@mui/icons-material/Skateboarding';
import useSideSkillsQuery from '@/services/aboutMe/useSideSkillsQuery';

const AboutMeOtherSkills = () => {
  const { data, isPending } = useSideSkillsQuery();

  return (
    <Grid container>
      <Grid sx={{ width: 1, mt: 1 }}>
        <HeaderDivider
          color='greenAccent.main'
          animation={false}
          // @ts-ignore
          icon={<SkateboardingIcon color='text.primary' />}
        >
          سایر مهارت ها
        </HeaderDivider>
        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='center'
        >
          {isPending &&
            Array.from<number>({ length: 23 }).map((_item, index) => (
              <Skeleton
                key={index}
                width={100}
                height={64}
                sx={{ borderRadius: 6, mx: 1 }}
              />
            ))}

          {data?.map((skill) => (
            <AboutMeSkillItem
              key={skill.name}
              skill={skill}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AboutMeOtherSkills;
