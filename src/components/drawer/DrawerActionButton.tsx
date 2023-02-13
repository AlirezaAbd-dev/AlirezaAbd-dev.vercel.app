import { MenuRounded } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { useContext } from "react";

import MainContext from '../../context'

const DrawerActionButton = () => {

    const { setDrawerOpen } = useContext(MainContext)

    return (
        <Box sx={{
            position: 'absolute',
            display: {
                xs: 'block',
                sm: 'block',
                md: 'none',
                lg: 'none',
                xl: 'none'
            }
        }}>
            <Fab
                aria-label='Sidebar'
                size='small'
                sx={{
                    m: 2,
                    backgroundColor: 'primary.main'
                }}
                onClick={() => { setDrawerOpen(true) }}
            >
                <MenuRounded />
            </Fab>
        </Box>
    );
}

export default DrawerActionButton;
