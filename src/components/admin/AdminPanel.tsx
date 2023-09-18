'use client';

import { useContext, useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';

import Informations from './forms/Informations';
import IntroductionForm from './forms/IntroductionForm';
import SkillForm from './forms/SkillForm';
import EducationForm from './forms/EducationForm';
import ProjectForm from './forms/ProjectForm';
import MainContext from '@/context/index';

const AdminPanel = () => {
   const { handlePageNumber } = useContext(MainContext);

   useEffect(() => {
      handlePageNumber.call(null, undefined, 4);
   }, []);

   return (
      <Card
         sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-end',
            width: '100%',
            height: '100vh',
            p: 5,
            overflowY: 'scroll',
         }}
      >
         <Box
            width={'100%'}
            textAlign={'center'}
         >
            <Typography variant='h5'>پنل ادمین</Typography>
         </Box>

         <Informations />

         <IntroductionForm />

         <SkillForm />

         <EducationForm />

         <ProjectForm />
      </Card>
   );
};

export default AdminPanel;
