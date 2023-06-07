"use client";
import { useEffect, useState } from "react";
import { Avatar, Box, Skeleton, Slide } from "@mui/material";
import Image from "next/image";

import DevInfo from "../../page-components/DevInfo";
import avatar from "../../assets/new-avatar.jpg";

const AboutMeContent = () => {
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
        {!isImageLoaded && (
          <Skeleton
            variant="circular"
            animation="pulse"
            width={150}
            height={150}
            sx={{
              display: {
                xs: "flex",
                sm: "flex",
                md: "none",
              },
            }}
          />
        )}
        <Avatar
          variant="circular"
          sx={{
            display: isImageLoaded ? "block" : "none",
            width: 150,
            height: "auto",
          }}
        >
          <Image
            priority
            src={avatar}
            alt="علیرضا عابدی"
            width={150}
            height={150}
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
        </Avatar>
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
          <DevInfo>سال تولد : ۱۳۸۲</DevInfo>
          {/* <DevInfo>سن : 19</DevInfo> */}
          <DevInfo>شهر : رشت</DevInfo>
          <DevInfo>alireza.abedi9310@gmail.com : ایمیل</DevInfo>
        </Box>
      </Slide>
    </>
  );
};

export default AboutMeContent;
