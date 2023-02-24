"use client";
import { Card, CardContent, useTheme } from "@mui/material";
import { CurrencyExchangeRounded } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";

import { myProjects } from "../../constants/myProjects";
import HeaderDivider from "../../components/ui/HeaderDivider";
import ProjectCard from "../../components/myProjects/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "علیرضا عابدی | پروژه های من",
  description: `در این صفحه میتوانید پروژه هایی که توسط من ساخته شده را ببینید و برای
  دیدن جزئیات بیشتر میتوانید با کلیک روی دکمه اطلاعات بیشتر وارد
  ریپازیتوری پروژه در گیتهاب شوید.`,
};

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
          // @ts-ignore
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
