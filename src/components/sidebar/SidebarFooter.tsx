"use client";
import { CopyrightRounded, FavoriteRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const SidebarFooter = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
        height: 100,
      }}
    >
      <Typography variant="subtitle2" color="text.primary">
        طراحی شده توسط علیرضا عابدی{" "}
      </Typography>
      <Typography variant="subtitle2">
        <FavoriteRounded
          sx={{
            verticalAlign: "middle",
            color: "redAccent.main",
            height: 20,
          }}
        />{" "}
        با عشق فراوان{" "}
        <FavoriteRounded
          sx={{
            verticalAlign: "middle",
            color: "redAccent.main",
            height: 20,
          }}
        />
      </Typography>
      <Typography variant="caption" color="text.primary" sx={{ mt: 2 }}>
        کپی رایت 1402
        <CopyrightRounded sx={{ verticalAlign: "middle", height: 16 }} />
      </Typography>
    </Box>
  );
};

export default SidebarFooter;
