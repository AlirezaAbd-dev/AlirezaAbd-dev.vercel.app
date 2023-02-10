"use client"
import Grid from "@mui/material/Unstable_Grid2";

const PagesContainer = ({children}) => {
    return (
        <Grid
            xs={12}
            sm={12}
            md={9}
            lg={10}
            xl={10}
            sx={{backgroundColor: 'background'}}
        >
            {children}
        </Grid>
    )
}

export default PagesContainer