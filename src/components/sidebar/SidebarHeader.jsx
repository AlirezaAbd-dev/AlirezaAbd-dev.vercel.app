import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { RandomReveal } from "react-random-reveal";

import AlphabetPersian from "../../constants/alphabetPersian";
import avatar from "../../assets/avatar.png";
import { useState } from "react";
import { GitHub, Telegram, Instagram } from "@mui/icons-material";
import ThemeActionButton from "../ThemeActionButton";

const SidebarHeader = () => {
  const [reveal, setReveal] = useState(false);

const theme = useTheme()

  return (
    <>
      <ThemeActionButton /> 
      <Avatar
        src={avatar}
        variant="circular"
        sx={{
          height: "auto",
          width: "90%",
          margin: "0 auto",
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
            lg: "flex",
            xl: "flex",
          },
        }}
      >
        AA
      </Avatar>
      {/*</Hidden>*/}
      <Typography variant="h6" color={theme.palette.mode === 'dark' ? "primary.light" : 'secondary.main'}>
        <Typography variant="caption">
          {`{" `}
        </Typography>
        <RandomReveal
          isPlaying
          duration={3}
          characters="علیرضا عابدی"
          characterSet={AlphabetPersian}
          onComplete={() => {
            setReveal(true);
          }}
        />
        <Typography variant="caption">
          {` "}`}
        </Typography>
      </Typography>
      {reveal && (
        <Typography variant="caption" color={"text.primary"}>
          <RandomReveal
            isPlaying
            duration={3}
            characters="توسعه دهنده فول استک"
            characterSet={AlphabetPersian}
          />
        </Typography>
      )}

      <Box components="div" sx={{ m: "10px auto", textAlign: "center" }}>
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
            href="https://t.me/aliCR7reza"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Telegram sx={{ color: "#0093f5" }} />
          </a>
        </IconButton>
        <IconButton aria-label="Instagram" sx={{ width: 40, height: 40 }}>
          <a
            href="https://www.instagram.com/0alicr7reza0"
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
