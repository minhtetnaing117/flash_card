import React from "react";
import AddFlashCard from "../components/AddFlashCard";
import { Container, Typography, Paper, Box } from "@mui/material";
import { supabase } from "../supabaseClient";

const AddPage = () => {
  const handleAdd = async (newCard) => {
    const { data, error } = await supabase
      .from("flashcards")
      .insert([newCard]);

    if (error) {
      console.error("Error adding flashcard:", error);
      alert("Failed to add flashcard.");
    } else {
      alert("Flashcard added successfully!");
      console.log("Added:", data);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Page Title */}
      <Typography variant="h5" align="center" gutterBottom>
        Add New Flashcard
      </Typography>

      {/* Form Container */}
      <Paper elevation={0} sx={{ p: 3 }}>
        <Box>
          {/* AddFlashCard component */}
          <AddFlashCard onAdd={handleAdd} />
        </Box>
      </Paper>
    </Container>
  );
};

export default AddPage;
