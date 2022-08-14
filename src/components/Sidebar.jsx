import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  Link,
} from "react-router-dom";
import { allCategories } from '../Data';
import AuthContext   from "../hooks/AuthProvider";
import { useContext } from "react";
export default function Sidebar() {
  
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      style={{backgroundColor:'indigo'}}
      sx={{ width: 250, color:'white' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <List>
        {allCategories.map((text, index) => (
          <ListItem key={index.id} disablePadding>
            <Link style={{ textDecoration: 'none', color: 'white' }} to={`/ProductList/${text.id}`}>
            <ListItemButton>
              <ListItemIcon sx={{color:'white'}} >
              {text.comp}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 4 }}
          >
          <MenuRoundedIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuRoundedIcon>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
