"use client";
import { Suspense, lazy, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { GitHub, Telegram, Instagram } from "@mui/icons-material";
import Image from "next/image";

import AlphabetPersian from "../../constants/alphabetPersian";
import ThemeActionButton from "../ThemeActionButton";

import avatar from "../../assets/avatar.png";

const RandomReveal = lazy(() => import("../../dynamic-imports/useRandomReveal"));

const SidebarHeader = () => {
  const [reveal, setReveal] = useState(false);
  const [isRevealStart, setIsRevealStart] = useState(false);

  useEffect(() => {
      setIsRevealStart(true);
  }, []);

  const theme = useTheme();

  return (
    <>
      <ThemeActionButton />
      {!avatar ? (
        <Skeleton
          variant="circular"
          sx={{
            width: "150px",
            height: "150px",
            margin: "0 auto",
          }}
        />
      ) : (
        <Avatar
          variant="circular"
          sx={{
            height: "auto",
            width: "90%",
            margin: "0 auto",
            bgcolor: "transparent",
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
              xl: "flex",
            },
          }}
        >
          <Image src={avatar} alt="علیرضا عابدی" width={200} height={200} />
        </Avatar>
      )}
      {/*</Hidden>*/}
      <Typography
        variant="h6"
        color={
          theme.palette.mode === "dark" ? "primary.light" : "secondary.main"
        }
      >
        <Typography variant="caption">{`{" `}</Typography>
        <Suspense fallback=" ">
          <RandomReveal
            isPlaying={isRevealStart}
            duration={3}
            characters="علیرضا عابدی"
            characterSet={AlphabetPersian}
            onComplete={() => {
              setReveal(true);
            }}
          />
        </Suspense>
        <Typography variant="caption">{` "}`}</Typography>
      </Typography>
      {reveal && (
        <Typography variant="caption" color={"text.primary"}>
          <Suspense fallback=" ">
            <RandomReveal
              isPlaying={isRevealStart}
              duration={3}
              characters="توسعه دهنده فول استک"
              characterSet={AlphabetPersian}
            />
          </Suspense>
        </Typography>
      )}

      <Box sx={{ m: "10px auto", textAlign: "center" }}>
        <IconButton aria-label="Github" sx={{ width: 40, height: 40 }}>
          <a
            href="https://github.com/0AliReza0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </a>
        </IconButton>
        <IconButton aria-label="Telegram" sx={{ width: 40, height: 40 }}>
          <a
            href="https://t.me/AlirezaAbd_Dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Telegram sx={{ color: "#0093f5" }} />
          </a>
        </IconButton>
        <IconButton aria-label="Instagram" sx={{ width: 40, height: 40 }}>
          <a
            href="https://www.instagram.com/alirezaabd.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram sx={{ color: "#ba23ab" }} />
          </a>
        </IconButton>
      </Box>
    </>
  );
};

export default SidebarHeader;
