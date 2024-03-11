import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/PythonAirways.jpg'; // Adjust the path as necessary
import './Header.css'; // Make sure this path is correct

function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
    return (
      <header className="header">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className="menu-button"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <div className="logo-wrapper">
          <img src={logo} alt="Aircraft Manager Logo" className="header-logo" />
        </div>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <List>
            <ListItem button component={Link} to="/" onClick={() => setIsDrawerOpen(false)}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/map" onClick={() => setIsDrawerOpen(false)}>
              <ListItemText primary="Map" />
            </ListItem>
          </List>
        </Drawer>
      </header>
    );
  }
  
  export default Header;