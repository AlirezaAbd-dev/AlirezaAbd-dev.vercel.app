import { Chip } from "@mui/material";
import Image from "next/image";

const AboutMeSkillItem = (props: {
  skill: { name: string; color: string; icon: any };
}) => {
  return (
    <Chip
      label={props.skill.name}
      sx={{
        bgcolor: props.skill.color,
        color: "text.primary",
        backgroundImage: `linear-gradient(to right, transparent, ${props.skill.color})`,
        mt: "30px",
        mx: "10px",
        fontSize: "18px",
        py: 2,
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
