import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
// import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import FlashcardPage from "./pages/FlashcardPage";
import AddPage from "./pages/AddPage";
import ExcelPage from "./pages/ExcelPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";

import { supabase } from "./supabaseClient";

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
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

const navItems = [
  { label: "Study", path: "/", adminOnly: false },
  { label: "Add", path: "/add", adminOnly: true },
  { label: "Excel", path: "/excel_add", adminOnly: true },
  // { label: "Logout", path: "/logout", adminOnly: true },
];

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery("(max-width:600px)");
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (!user) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!error && data?.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const visibleNavItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Menu</Typography>
      </Box>

      <Divider />

      {/* MAIN NAV */}
      <List sx={{ flexGrow: 1 }}>
        {visibleNavItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={toggleDrawer(false)}
              sx={{
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.15)",
                },
                "&.active": {
                  bgcolor: "rgba(255,255,255,0.25)",
                  fontWeight: "bold",
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* LOGOUT AT BOTTOM */}
      {isAuthenticated && (
        <>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to="/logout"
                onClick={toggleDrawer(false)}
                sx={{
                  color: "error.light",
                  "&:hover": {
                    bgcolor: "rgba(255,0,0,0.15)",
                  },
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );



  return (
    <BrowserRouter>
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

          {/* <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard   
          </Typography> */}

          {/* <Link href="#" underline="none" color="inherit">
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Flashcard
            </Typography>
          </Link> */}

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
            }}
            component={RouterLink}
            to="/"
          >
            Flashcard
          </Typography>

          {!isMobile && (
            <Box>
              {visibleNavItems.map((item) => (
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

              {isAuthenticated && (
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/logout"
                  sx={{ textTransform: "none", ml: 2 }}
                >
                  Logout
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {drawer}
      </SwipeableDrawer>

      <Routes>
        <Route path="/" element={<FlashcardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        <Route
          path="/add"
          element={
            isAuthenticated && isAdmin ? (
              <AddPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/excel_add"
          element={
            isAuthenticated && isAdmin ? (
              <ExcelPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
