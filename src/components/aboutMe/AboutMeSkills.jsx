import { SelfImprovementRounded } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import Skill from "../../pages/components/Skill";
import { devSkills } from "../../constants/skills";
import { useEffect, useState } from "react";
import HeaderDivider from "../ui/HeaderDivider";

const AboutMeSkills = () => {
  const [javascript, setJavascript] = useState(0);
  const [html, setHtml] = useState(0);
  const [css, setCss] = useState(0);
  const [nodeJs, setNodeJs] = useState(0);
  const [reactJs, setReactJs] = useState(0);
  const [reactNative, setReactNative] = useState(0);
  const [git, setGit] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setJavascript((prevState) => {
        const diff = Math.random() * 10;
        return Math.min(prevState + diff, 80);
      });
      setHtml((prevState) => {
        const diff = Math.random() * 10;
        return Math.min(prevState + diff, 80);
      });
      setCss((prevState) => {
        const diff = Math.random() * 10;
        return Math.min(prevState + diff, 85);
      });
      setNodeJs((prevState) => {
        const diff = Math.random() * 10;
        return Math.min(prevState + diff, 50);
      });
      setReactJs((prevState) => {
        const diff = Math.random() * 10;
        return Math.min(prevState + diff, 90);
      });
      setReactNative((prevState) => {
        const diff = Math.random() * 10;
        return Math.min(prevState + diff, 60);
      });
      setGit((prevState) => {
        const diff = Math.random() * 10;
        return Math.min(prevState + diff, 50);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const {
    htmlSkill,
    cssSkill,
    jsSkill,
    reactSkill,
    nodeSkill,
    gitSkill,
    reactNativeSkill,
  } = devSkills;

  return (
    <Grid container>
      <Grid sx={{ width: 1, mt: 1 }}>
        <HeaderDivider
          color="primary.dark"
          animation={false}
          icon={<SelfImprovementRounded color="text.primary" />}
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
          value={reactNative}
          name={reactNativeSkill.name}
          color={reactNativeSkill.color}
          icon={reactNativeSkill.icon}
        />
        <Skill
          value={nodeJs}
          name={nodeSkill.name}
          color={nodeSkill.color}
          icon={nodeSkill.icon}
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
