import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  Container,
  Typography,
  CircularProgress,
  Stack,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import TtsItem, { speakJapaneseAndMyanmar } from "../components/TtsItem";

const TtsPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState([]); // list of unique titles
  const [selectedTitle, setSelectedTitle] = useState("");

  // Fetch all unique titles first
  useEffect(() => {
    const fetchTitles = async () => {
      const { data, error } = await supabase
        .from("flashcards")
        .select("title", { count: "exact" });
      if (!error && data) {
        const uniqueTitles = [...new Set(data.map((d) => d.title))];
        setTitles(uniqueTitles);
        if (uniqueTitles.length > 0) setSelectedTitle(uniqueTitles[0]);
      }
    };
    fetchTitles();
  }, []);

  // Fetch notes whenever selectedTitle changes
  useEffect(() => {
    if (!selectedTitle) return;

    const fetchNotes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("flashcards")
        .select("*")
        .match({ title: selectedTitle });
      if (!error) setNotes(data || []);
      setLoading(false);
    };
    fetchNotes();
  }, [selectedTitle]);

  // Speak all notes sequentially
  const speakAllNotes = async () => {
    for (const note of notes) {
      await speakJapaneseAndMyanmar(note.question, note.myanmar);
      await new Promise((res) => setTimeout(res, 500));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        Text To Speech
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Title</InputLabel>
        <Select
          value={selectedTitle}
          label="Select Title"
          onChange={(e) => setSelectedTitle(e.target.value)}
        >
          {titles.map((title) => (
            <MenuItem key={title} value={title}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <CircularProgress />
      ) : notes.length === 0 ? (
        <Typography color="text.secondary">No data found</Typography>
      ) : (
        <>
          <Stack spacing={1} sx={{ mb: 2 }}>
            {notes.map((note) => (
              <TtsItem key={note.id} note={note} />
            ))}
          </Stack>

          <Button
            variant="contained"
            fullWidth
            onClick={speakAllNotes}
            sx={{ mt: 2 }}
          >
            ▶ Speak All Notes
          </Button>
        </>
      )}
    </Container>
  );
};

export default TtsPage;
