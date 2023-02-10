"use client";
import { Card, CardContent, useTheme } from "@mui/material";
import { CurrencyExchangeRounded } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";

import { myProjects } from "@/constants/myProjects";
import HeaderDivider from "@/components/ui/HeaderDivider";
import ProjectCard from "@/components/myProjects/ProjectCard";

const MyProjects = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100vh",
        backgroundColor: "background",
        overflowY: "scroll",
      }}
    >
      <CardContent>
        <HeaderDivider
          color={
            theme.palette.mode === "dark"
              ? "greenAccent.main"
              : "greenAccent.light"
          }
          icon={<CurrencyExchangeRounded color="text.primary" />}
        >
          نمونه کارهای من
        </HeaderDivider>

        <Grid container sx={{ mx: 3 }}>
          {myProjects.map((item, index) => (
            <ProjectCard item={item} index={index} key={index} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyProjects;
