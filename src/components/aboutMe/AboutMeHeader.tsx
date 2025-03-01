'use client';
import { CodeRounded } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';

import HeaderDivider from '../../components/ui/HeaderDivider';
import AboutMeMobile from '../../components/aboutMe/AboutMeMobile';
import AboutMeContent from '../../components/aboutMe/AboutMeContent';

const AboutMeHeader = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      sx={{ mx: 1 }}
    >
      <Grid
        size={{
          xs: 12,
          sm: 12,
          md: 8,
          lg: 8,
          xl: 8,
        }}
      >
        <HeaderDivider
          color='secondary.main'
          chipAlign={isMdDown ? 'center' : 'right'}
          //@ts-ignore
          icon={<CodeRounded color='text.primary' />}
        >
          توسعه دهنده فول استک
        </HeaderDivider>

        <AboutMeContent />
      </Grid>
      <AboutMeMobile />
    </Grid>
  );
};

export default AboutMeHeader;
