'use client';

import { CurrencyExchangeRounded } from '@mui/icons-material';
import { Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import HeaderDivider from '../ui/HeaderDivider';
import ProjectCard from './ProjectCard';
import { useStore } from '@/store/store';

export default function MainMyProject() {
   const projects = useStore((state) => state.data?.projects);

   return (
      <Card
         sx={{
            height: '100vh',
            backgroundColor: 'background',
            overflowY: 'scroll',
         }}
      >
         <CardContent>
            <HeaderDivider
               color={'primary.dark'}
               // @ts-ignore
               icon={<CurrencyExchangeRounded color='text.primary' />}
            >
               نمونه کارهای من
            </HeaderDivider>

            <Grid
               container
               sx={{ mx: 3 }}
            >
               {projects?.map((item, index) => (
                  <ProjectCard
                     item={item}
                     index={index}
                     key={index}
                  />
               ))}
            </Grid>
         </CardContent>
      </Card>
   );
}
