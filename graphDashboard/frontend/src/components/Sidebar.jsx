import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <CssBaseline />
      <Drawer variant="permanent" sx={{ width: 100, flexShrink: 0 }}>
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/editor">
            <ListItemText primary="Editor" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
