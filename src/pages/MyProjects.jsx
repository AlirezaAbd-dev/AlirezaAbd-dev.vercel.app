import { Card, CardContent, useTheme } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { myProjects } from "../constants/myProjects";
import { CurrencyExchangeRounded } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import HeaderDivider from "../components/ui/HeaderDivider";
import ProjectCard from "../components/myProjects/ProjectCard";

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
      <Helmet>
        <title>وبسایت علیرضا عابدی | پروژه های من</title>
      </Helmet>

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
