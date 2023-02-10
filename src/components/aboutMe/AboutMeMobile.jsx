import { Avatar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import avatar from "../../assets/avatar.jpg";

const AboutMeMobile = () => {
  return (
    <Grid xs={0} sm={0} md={4} lg={4} xl={4}>
      <Avatar
        src={avatar}
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
        AA
      </Avatar>
    </Grid>
  );
};

export default AboutMeMobile;
