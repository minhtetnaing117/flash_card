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
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

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
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Flashcard
      </Typography>

      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton component={NavLink} to={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>

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
