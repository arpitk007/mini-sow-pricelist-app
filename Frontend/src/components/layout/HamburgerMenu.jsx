import React from "react";
import { 
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";
import {Link} from "react-router-dom";

const HamburgerMenu = ({ open, onClose }) => {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List sx={{ width: 250 }}>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/login" onClick={onClose}>
                        <ListItemText primary="Login" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/terms" onClick={onClose}>
                        <ListItemText primary="Terms" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/pricelist" onClick={onClose}>
                        <ListItemText primary="Pricelist" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <ListItem sx={{ p: 2, py: 1, fontSize: 12, color: 'text.secondary' }}>
                © 2024 Mini Sow App
            </ListItem>
        </Drawer>
    );
};

export default HamburgerMenu;