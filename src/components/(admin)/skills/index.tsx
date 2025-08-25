import Loading from '@/app/loading';
import useSkillsQuery from '@/services/aboutMe/useSkillsQuery';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import React from 'react';
import SkillsTable from './SkillsTable';
import SkillForm from './SkillForm';

const SkillsMain = () => {
  const { data: skills, isPending } = useSkillsQuery();

  if (isPending) return <Loading />;

  if (!isPending && skills)
    return (
      <Card sx={{ height: '100vh', width: '100%', overflowY: 'auto', p: 8 }}>
        <Box dir='rtl'>
          <Typography variant='h5'>مهارت ها</Typography>

          <SkillForm />

          {skills.length > 0 && (
            <Box mt={8}>
              <SkillsTable skills={skills} />
            </Box>
          )}
        </Box>
      </Card>
    );
};

export default SkillsMain;
