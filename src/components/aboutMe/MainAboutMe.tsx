'use client';

import { Card, CardContent } from '@mui/material';
import EducationTimeline from '../timeline/EducationTimeline';
import AboutMeHeader from './AboutMeHeader';
import AboutMeSkills from './AboutMeSkills';

export default function MainAboutMe() {
   return (
      <Card
         sx={{
            height: '100vh',
            backgroundColor: 'background.secondary',
            overflowY: 'scroll',
            borderRadius: 0,
         }}
      >
         <CardContent>
            <AboutMeHeader />

            <AboutMeSkills />

            <EducationTimeline />
         </CardContent>
      </Card>
   );
}
