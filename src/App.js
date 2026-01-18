import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import FlashcardPage from "./pages/FlashcardPage";
import AddPage from "./pages/AddPage";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const App = () => {
  return (
    <BrowserRouter>
      {/* Material UI AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcards App
          </Typography>

          {/* Nav buttons */}
          <Box>
            <Button
              color="inherit"
              component={NavLink}
              to="/"
              exact="true"
              sx={{
                "&.active": {
                  fontWeight: "bold",
                  borderBottom: "2px solid white",
                },
                textTransform: "none",
              }}
            >
              Flashcards
            </Button>

            <Button
              color="inherit"
              component={NavLink}
              to="/add"
              sx={{
                "&.active": {
                  fontWeight: "bold",
                  borderBottom: "2px solid white",
                },
                textTransform: "none",
              }}
            >
              Add Flashcard
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<FlashcardPage />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
