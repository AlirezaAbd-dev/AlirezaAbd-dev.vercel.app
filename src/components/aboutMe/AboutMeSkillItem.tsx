import { SideSkill } from '@/services/aboutMe/useSideSkillsQuery';
import { Chip } from '@mui/material';
import Image from 'next/image';

const AboutMeSkillItem = (props: { skill: Omit<SideSkill, 'id'> }) => {
  return (
    <Chip
      label={props.skill.name}
      sx={{
        color: 'text.primary',
        mt: '30px',
        mx: '10px',
        fontSize: '18px',
        py: 2,
      }}
      style={{
        backgroundImage: `linear-gradient(90deg, transparent, ${props.skill.color})`,
      }}
      icon={
        <Image
          src={props.skill.icon}
          alt={props.skill.name}
          width={60}
          height={60}
        />
      }
    />
  );
};

export default AboutMeSkillItem;
