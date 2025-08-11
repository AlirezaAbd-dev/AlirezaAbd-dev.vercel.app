'use client';
import { SelfImprovementRounded } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';

import Skill from '../../page-components/Skill';
import { devSkills } from '../../constants/skills';
import HeaderDivider from '../../components/ui/HeaderDivider';
import useSkillsQuery from '@/services/aboutMe/useSkillsQuery';

const AboutMeSkills = () => {
  const { data, isPending } = useSkillsQuery();

  const {
    htmlSkill,
    cssSkill,
    jsSkill,
    reactSkill,
    nodeSkill,
    gitSkill,
    nextJsSkill,
  } = devSkills;

  if (!isPending && data)
    return (
      <Grid container>
        <Grid sx={{ width: 1, mt: 1 }}>
          <HeaderDivider
            color='primary.dark'
            animation={false}
            // @ts-ignore
            icon={<SelfImprovementRounded color='text.primary' />}
          >
            مهارت های من
          </HeaderDivider>

          {data.map((s) => (
            <Skill
              key={s.id}
              value={s.value}
              name={s.name}
              color={s.color}
              icon={s.icon}
            />
          ))}

          <Skill
            value={80}
            name={htmlSkill.name}
            color={htmlSkill.color}
            icon={htmlSkill.icon}
          />
          <Skill
            value={85}
            name={cssSkill.name}
            color={cssSkill.color}
            icon={cssSkill.icon}
          />
          <Skill
            value={80}
            name={jsSkill.name}
            color={jsSkill.color}
            icon={jsSkill.icon}
          />
          <Skill
            value={90}
            name={reactSkill.name}
            color={reactSkill.color}
            icon={reactSkill.icon}
          />
          <Skill
            value={70}
            name={nodeSkill.name}
            color={nodeSkill.color}
            icon={nodeSkill.icon}
          />
          <Skill
            value={85}
            name={nextJsSkill.name}
            color={nextJsSkill.color}
            icon={nextJsSkill.icon}
          />
          <Skill
            value={65}
            name={gitSkill.name}
            color={gitSkill.color}
            icon={gitSkill.icon}
          />
        </Grid>
      </Grid>
    );
};

export default AboutMeSkills;
