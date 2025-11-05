import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // corporate blue
        },
    
        secondary: {
            main: '#00a152' // accent shade
        },
        background: {
            default: '#f9f9f9',
            paper: '#fff',
        },
    },
    typography: {
        fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
    },    
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
        },
    },
});

export default theme;