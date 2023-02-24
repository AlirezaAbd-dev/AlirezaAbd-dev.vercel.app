"use client"
import { Box, Divider } from '@mui/material'
import { grey } from '@mui/material/colors'
import { SidebarFooter, SidebarHeader, SidebarTabs } from './index'

const SidebarContent = () => {
    return (
        <Box
            sx={{
                justifyContent: 'center',
                textAlign: 'center',
                mt: 2
            }}
        >
            <SidebarHeader />

            <Divider variant='middle' color={grey[500]} />

            <SidebarTabs />

            <Divider variant="middle" color={grey[500]} sx={{ mt: 2 }} />

            <SidebarFooter />
        </Box>
    )
}

export default SidebarContent