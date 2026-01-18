import React from "react";
import AddFlashCard from "../components/AddFlashCard";
import { Container, Typography, Paper, Box } from "@mui/material";

const AddPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Page Title */}
      <Typography variant="h5" align="center" gutterBottom>
        Add New Flashcard
      </Typography>

      {/* Form Container */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box>
          {/* AddFlashCard component */}
          <AddFlashCard />
        </Box>
      </Paper>
    </Container>
  );
};

export default AddPage;
