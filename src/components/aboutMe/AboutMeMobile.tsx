"use client";
import { Avatar, Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";

import avatar from "../../assets/avatar.jpg";

const AboutMeMobile = () => {
  return (
    <Grid xs={0} sm={0} md={4} lg={4} xl={4}>
      {!avatar ? (
        <Skeleton variant="rounded" animation="pulse" width={250} height={250} sx={{
          m: '0 auto'
        }} />
      ) : (
        <Avatar
          variant="rounded"
          sx={{
            height: 250,
            width: 250,
            margin: "0 auto",
            display: {
              xs: "none",
              sm: "none",
              md: "block",
              lg: "block",
              xl: "block",
            },
          }}
        >
          <Image src={avatar} alt="علیرضا عابدی" width={250} height={250} />
        </Avatar>
      )}
    </Grid>
  );
};

export default AboutMeMobile;
