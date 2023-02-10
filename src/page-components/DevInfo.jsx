import { KeyboardArrowLeftRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';

const DevInfo = ({children}) => {
    return (
        <Typography variant="body1" color="text.primary" textAlign="left" sx={{ mt: 2 }}>
            {children}
            <KeyboardArrowLeftRounded
                sx={{ verticalAlign: 'bottom', color: 'primary.main' }}
            />
        </Typography>
    );
}

export default DevInfo;