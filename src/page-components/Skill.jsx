"use client";
import {
  Divider,
  Chip,
  Typography,
  Box,
  LinearProgress,
  Badge,
  Skeleton,
} from "@mui/material";
import Image from "next/image";

const Skill = ({ icon, color, name, value }) => {
  return (
    <>
      <Divider
        textAlign="right"
        sx={{
          "&::before, &::after": {
            borderColor: `${color}.main`,
          },
          mt: 3,
          mb: 1,
        }}
      >
        <Chip
          icon={icon ? <Image src={icon} alt={name} width={30} /> : (
            <Skeleton variant="circular" animation="wave" width={30} height={30} />
          )}
          color={color}
          label={name}
          sx={{ color: "#000", p: 3 }}
        />
      </Divider>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", ml: 1 }}>
          <LinearProgress
            variant="determinate"
            value={value}
            color={color}
            sx={{
              height: 10,
              borderRadius: 2,
            }}
          />
        </Box>
        <Box sx={{ minWidth: 35, mr: 2 }}>
          <Typography variant="body2" >
            <Badge
              variant="standard"
              badgeContent={`${Math.round(value)}%`}
              color={color}
            />
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Skill;
