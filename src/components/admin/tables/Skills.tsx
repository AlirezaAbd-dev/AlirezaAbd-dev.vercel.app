import { Box } from '@mui/material';
import { SkillFormProps } from '../forms/SkillForm';

const Skills = (props: SkillFormProps) => {
   console.log(props.skills);
   return (
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>yoyo</Box>
   );
};

export default Skills;
