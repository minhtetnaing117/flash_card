import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";

const AddNotePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    await supabase.from("notes").insert({
      title,
      content,
    });

    setTitle("");
    setContent("");
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add Note
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            minRows={6}
            placeholder="Each line will display separately"
          />

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
          >
            Save
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default AddNotePage;
