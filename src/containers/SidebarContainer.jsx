import { useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const SidebarContainer = ({ children }) => {
  const theme = useTheme();
  return (
    <Grid
      xs={0}
      sm={0}
      md={3}
      lg={2}
      xl={2}
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? grey[900] : grey[200],
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {children}
    </Grid>
  );
};

export default SidebarContainer;
