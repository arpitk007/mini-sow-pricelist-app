import React, { useState } from 'react';
import{
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HamburgerMenu from './HamburgerMenu.jsx';

const AppShell = ({ title = "Mini Sow App", children }) => {
    const [drawerOpen, setdrawerOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Top App Bar */}
            <AppBar position="static" color="primary" enableColorOnDark> 
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={()=> setdrawerOpen(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <HamburgerMenu open={drawerOpen} onClose={() => setdrawerOpen(false)} />

            {/* Main Content */}
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                {children}
            </Container>
        </Box>
    );
};

export default AppShell;