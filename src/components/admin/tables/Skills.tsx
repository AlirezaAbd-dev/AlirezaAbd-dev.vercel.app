import { Box, IconButton, Typography } from '@mui/material';
import { Skill, SkillFormProps } from '../forms/SkillForm';
import { Close, Delete, Edit } from '@mui/icons-material';
import SkillsModal from '../modals/skillsModal';
import { useState } from 'react';

type SkillsProps = SkillFormProps & {
   selectedSkill: Skill | undefined;
   setSelectedSkill: (skill: Skill | undefined) => void;
};

const Skills = (props: SkillsProps) => {
   const [deleteSelected, setDeleteSelected] = useState<string | undefined>(
      undefined,
   );

   return (
      <Box sx={{ display: 'flex', gap: 5 }}>
         {props.skills.map((s) => {
            const isActive = props.selectedSkill?._id === s._id;
            return (
               <Box
                  sx={{
                     display: 'flex',
                     flexDirection: 'row-reverse',
                     gap: 1,
                     alignItems: 'center',
                     flexWrap: 'wrap',
                  }}
               >
                  <Typography>{s.name}</Typography>
                  <Typography>{s.rate}</Typography>
                  <IconButton
                     color={isActive ? 'error' : 'info'}
                     onClick={() => {
                        if (isActive) {
                           return props.setSelectedSkill(undefined);
                        }
                        props.setSelectedSkill({
                           _id: s._id,
                           name: s.name,
                           rate: s.rate,
                        });
                     }}
                  >
                     {isActive ? <Close /> : <Edit />}
                  </IconButton>
                  <IconButton
                     color='error'
                     onClick={() => {
                        setDeleteSelected(s._id);
                     }}
                  >
                     <Delete />
                  </IconButton>
               </Box>
            );
         })}
         <SkillsModal
            skillSelected={deleteSelected}
            setSkillSelected={setDeleteSelected}
         />
      </Box>
   );
};

export default Skills;
