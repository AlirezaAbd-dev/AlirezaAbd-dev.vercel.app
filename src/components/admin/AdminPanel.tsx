'use client';

import { useContext, useEffect } from 'react';
import {
   Box,
   Card,
   CircularProgress,
   Divider,
   Typography,
} from '@mui/material';

import Informations from './forms/Informations';
import IntroductionForm from './forms/IntroductionForm';
import SkillForm from './forms/SkillForm';
import EducationForm from './forms/EducationForm';
import ProjectForm from './forms/ProjectForm';
import MainContext from '@/context/index';
import { useStore } from '@/store/store';

const AdminPanel = () => {
   const data = useStore((state) => state.data);

   const { handlePageNumber } = useContext(MainContext);

   useEffect(() => {
      handlePageNumber.call(null, undefined, 4);
   }, [handlePageNumber]);

   if (!data) return <CircularProgress />;

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

         <Informations
            city={data?.city}
            email={data?.email}
            name={data?.name}
            yearOfBirth={data?.yearOfBirth}
         />

         <Divider sx={{ width: '100%' }} />

         <IntroductionForm introductions={data.introductions} />

         <SkillForm skills={data.skills} />

         <EducationForm educations={data.educations} />

         <ProjectForm projects={data.projects}  />
      </Card>
   );
};

export default AdminPanel;
