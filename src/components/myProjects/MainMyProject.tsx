'use client';

import { CurrencyExchangeRounded } from '@mui/icons-material';
import { Card, CardContent, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import HeaderDivider from '../ui/HeaderDivider';
import ProjectCard from './ProjectCard';
import useProjectsQuery from '@/services/myProjects/useProjectsQuery';
import ProjectCardSkeleton from './ProjectCardSkeleton';

export default function MainMyProject() {
  const theme = useTheme();

  const { data, isPending } = useProjectsQuery();

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
          color={
            theme.palette.mode === 'dark'
              ? 'greenAccent.main'
              : 'greenAccent.light'
          }
          // @ts-ignore
          icon={<CurrencyExchangeRounded color='text.primary' />}
        >
          نمونه کارهای من
        </HeaderDivider>

        <Grid
          container
          sx={{ mx: 3 }}
        >
          {isPending &&
            Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}

          {!isPending &&
            data?.map((item, index) => (
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
