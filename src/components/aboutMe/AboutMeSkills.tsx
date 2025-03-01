'use client';
import { SelfImprovementRounded } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';

import useSkillRandom from '../../hooks/useSkillRandom';
import Skill from '../../page-components/Skill';
import { devSkills } from '../../constants/skills';
import HeaderDivider from '../../components/ui/HeaderDivider';

const AboutMeSkills = () => {
  const javascript = useSkillRandom(80);
  const html = useSkillRandom(80);
  const css = useSkillRandom(85);
  const nodeJs = useSkillRandom(70);
  const reactJs = useSkillRandom(90);
  const nextJs = useSkillRandom(85);
  const git = useSkillRandom(65);

  const {
    htmlSkill,
    cssSkill,
    jsSkill,
    reactSkill,
    nodeSkill,
    gitSkill,
    nextJsSkill,
  } = devSkills;

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
        <Skill
          value={html}
          name={htmlSkill.name}
          color={htmlSkill.color}
          icon={htmlSkill.icon}
        />
        <Skill
          value={css}
          name={cssSkill.name}
          color={cssSkill.color}
          icon={cssSkill.icon}
        />
        <Skill
          value={javascript}
          name={jsSkill.name}
          color={jsSkill.color}
          icon={jsSkill.icon}
        />
        <Skill
          value={reactJs}
          name={reactSkill.name}
          color={reactSkill.color}
          icon={reactSkill.icon}
        />
        <Skill
          value={nodeJs}
          name={nodeSkill.name}
          color={nodeSkill.color}
          icon={nodeSkill.icon}
        />
        <Skill
          value={nextJs}
          name={nextJsSkill.name}
          color={nextJsSkill.color}
          icon={nextJsSkill.icon}
        />
        <Skill
          value={git}
          name={gitSkill.name}
          color={gitSkill.color}
          icon={gitSkill.icon}
        />
      </Grid>
    </Grid>
  );
};

export default AboutMeSkills;
