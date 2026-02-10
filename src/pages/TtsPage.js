import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import TtsItem from "../components/TtsItem";
import { speakJapaneseAndMyanmar } from "../components/TtsItemUtils";
import { supabase } from "../supabaseClient";

const TtsPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const playingRef = useRef(false); // track if "Play All" is active
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  // Fetch all unique titles first
  useEffect(() => {
    const fetchTitles = async () => {
      const { data, error } = await supabase.from("flashcards").select("title");
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
        .eq("title", selectedTitle);

      if (!error) setNotes(data || []);
      setLoading(false);
    };
    fetchNotes();
  }, [selectedTitle]);

  const handleSelect = async (note) => {
    setSelectedNote(note);
    await speakJapaneseAndMyanmar(note.question);
  };

  // Play all notes sequentially
  const handlePlayAll = async () => {
    playingRef.current = true;
    pausedRef.current = false;
    setPaused(false);

    for (const note of notes) {
      if (!playingRef.current) break;

      setSelectedNote(note);
      await speakJapaneseAndMyanmar(note.question);

      // wait while paused
      while (pausedRef.current) {
        await new Promise((r) => setTimeout(r, 200));
      }

      await new Promise((r) => setTimeout(r, 500));
    }

    playingRef.current = false;
  };


  // const handlePause = () => {
  //   if (!window.speechSynthesis.speaking) return;
  //   window.speechSynthesis.pause();
  //   pausedRef.current = true;
  //   setPaused(true);
  // };

  // const handleResume = () => {
  //   if (!window.speechSynthesis.paused) return;
  //   window.speechSynthesis.resume();
  //   pausedRef.current = false;
  //   setPaused(false);
  // };


  // Stop any playing speech
  const handleStop = () => {
    playingRef.current = false;
    pausedRef.current = false;
    setPaused(false);
    window.speechSynthesis.cancel();
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        Focus Listening Practice
      </Typography>

      {/* Title Filter */}
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

      {/* Play All / Stop Buttons */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlayAll}
          disabled={notes.length === 0}
        >
          ▶ Play All
        </Button>
        {/* <Button
          variant="outlined"
          color="warning"
          onClick={handlePause}
          disabled={!window.speechSynthesis.speaking}
          disabled={paused}
        >
          ⏸ Pause
        </Button> */}
        <Button
          variant="outlined"
          color="error"
          onClick={handleStop}
          // disabled={notes.length === 0}
          disabled={paused}
        >
          ■ Stop
        </Button>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : notes.length === 0 ? (
        <Typography color="text.secondary">No notes found</Typography>
      ) : (
        <Stack spacing={1}>
          {notes.map((note) => (
            <TtsItem
              key={note.id}
              note={note}
              selected={selectedNote?.id === note.id}
              onSelect={handleSelect}
            />
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default TtsPage;
