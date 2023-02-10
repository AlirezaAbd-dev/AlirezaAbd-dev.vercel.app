import { Avatar, Box, Slide } from "@mui/material";
import { useEffect, useState } from "react";

import DevInfo from "../../pages/components/DevInfo";
import avatar from "../../assets/avatar.jpg";

const AboutMeContent = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          my: 2,
          justifyContent: "flex-end",
          display: {
            xs: "flex",
            sm: "flex",
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}
      >
        <Avatar
          variant="circular"
          src={avatar}
          sx={{ width: 150, height: "auto" }}
        />
      </Box>
      <Slide
        direction="right"
        in={loading}
        style={{
          transitionDelay: loading ? "500ms" : "0ms",
        }}
      >
        <Box>
          <DevInfo>نام و نام خانوادگی : علیرضا عابدی</DevInfo>
          {/* <DevInfo>سال تولد : 1382</DevInfo> */}
          <DevInfo>سن : 19</DevInfo>
          <DevInfo>شهر : رشت</DevInfo>
          <DevInfo>alireza.abedi9310@gmail.com : ایمیل</DevInfo>
        </Box>
      </Slide>
    </>
  );
};

export default AboutMeContent;
