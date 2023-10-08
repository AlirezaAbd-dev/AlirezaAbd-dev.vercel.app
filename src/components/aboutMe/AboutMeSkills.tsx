'use client';

import { SelfImprovementRounded } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';

import Skill from '../../page-components/Skill';
import HeaderDivider from '../../components/ui/HeaderDivider';
import { useStore } from '@/store/store';
import { useTheme } from '@mui/material';

const AboutMeSkills = () => {
   const data = useStore((state) => state.data);
   const theme = useTheme();

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
            {data?.skills?.map((s) => {
               return (
                  <Skill
                     value={s.rate}
                     name={s.name}
                     color={theme.palette.primary.dark}
                  />
               );
            })}
         </Grid>
      </Grid>
   );
};

export default AboutMeSkills;
