import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import FlashcardPage from "./pages/FlashcardPage";
import AddPage from "./pages/AddPage";
import ExcelPage from "./pages/ExcelPage";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from '@mui/material/Divider';

const navItems = [
  { label: "Study", path: "/" },
  { label: "Add", path: "/add" },
  { label: "Excel", path: "/excel_add" },
];

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawer = (
    // <Box
    //   sx={{ width: 250, backgroundColor: "#3f8ee7", height: "100%" }}
    //   role="presentation"
    //   onClick={toggleDrawer(false)}
    // >
    //   <Typography variant="h6" sx={{ p: 2 }}>
    //     Flashcard
    //   </Typography>

    //   <List>
    //     {navItems.map((item) => (
    //       <ListItem key={item.path} disablePadding>
    //         <ListItemButton component={NavLink} to={item.path}>
    //           <ListItemText primary={item.label} />
    //         </ListItemButton>
    //       </ListItem>
    //     ))}
    //   </List>
    // </Box>

    <Box
      sx={{
        width: 250,
        height: '100%',
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: 'column',
      }}
      role="presentation"
    >
      {/* Header */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Menu</Typography>
      </Box>

      <Divider />

      {/* Menu Items */}
      {/* <List sx={{ flexGrow: 1 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleDrawer(false)}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={toggleDrawer(false)}>
            <ListItemText primary="Flashcards" />
          </ListItemButton>
        </ListItem>
      </List> */}

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton component={NavLink} to={item.path} onClick={toggleDrawer(false)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Box sx={{ p: 2, fontSize: 12, opacity: 0.7 }}>
        © 2026 Flashcard App
      </Box>
    </Box>

  );

  return (
    <BrowserRouter>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  component={NavLink}
                  to={item.path}
                  sx={{
                    textTransform: "none",
                    "&.active": {
                      fontWeight: "bold",
                      borderBottom: "2px solid white",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
      >
        {drawer}
      </SwipeableDrawer>


      {/* Routes */}
      <Routes>
        <Route path="/" element={<FlashcardPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/excel_add" element={<ExcelPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
