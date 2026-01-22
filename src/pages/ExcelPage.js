import React from "react";
import AddExcel from "../components/AddExcel";
import { Container, Typography, Paper, Box } from "@mui/material";

const ExcelPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Page Title */}
      <Typography variant="h5" align="center" gutterBottom>
        Add New Excel
      </Typography>

      {/* Form Container */}
      <Paper elevation={0} sx={{ p: 3 }}>
        <Box>
          {/* AddFlashCard component */}
          <AddExcel />
        </Box>
      </Paper>
    </Container>
  );
};

export default ExcelPage;
