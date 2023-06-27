import { Chip } from "@mui/material";
import Image from "next/image";

const AboutMeSkillItem = (props: {
  skill: { name: string; color: string; icon: any };
}) => {
  return (
    <Chip
      label={props.skill.name}
      sx={{
        color: "text.primary",
        mt: "30px",
        mx: "10px",
        fontSize: "18px",
        py: 2,
      }}
      style={{
        backgroundImage: `linear-gradient(90deg, transparent, transparent, ${props.skill.color})`,
      }}
      icon={
        <Image
          src={props.skill.icon.src}
          alt={props.skill.name}
          width={60}
          height={60}
        />
      }
    />
  );
};

export default AboutMeSkillItem;
