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

const PAGE_SIZE = 1000;

const TtsPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");

  const playingRef = useRef(false);
  const pausedRef = useRef(false);
  // const [paused, setPaused] = useState(false);

  /* ================= FETCH ALL TITLES (PAGINATED) ================= */
  useEffect(() => {
    const fetchAllTitles = async () => {
      let from = 0;
      let allRows = [];
      let hasMore = true;

      while (hasMore) {
        const { data, error } = await supabase
          .from("flashcards")
          .select("title")
          .range(from, from + PAGE_SIZE - 1);

        if (error) {
          console.error(error);
          break;
        }

        if (data.length < PAGE_SIZE) {
          hasMore = false;
        }

        allRows = [...allRows, ...data];
        from += PAGE_SIZE;
      }

      const uniqueTitles = [
        ...new Set(allRows.map((d) => d.title).filter(Boolean)),
      ];

      setTitles(uniqueTitles);

      if (uniqueTitles.length > 0) {
        setSelectedTitle(uniqueTitles[0]);
      }
    };

    fetchAllTitles();
  }, []);

  /* ================= FETCH NOTES BY TITLE ================= */
  useEffect(() => {
    if (!selectedTitle) return;

    const fetchNotes = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("flashcards")
        .select("id, title, question, answer, myanmar")
        .eq("title", selectedTitle)
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
        setNotes([]);
      } else {
        setNotes(data || []);
      }

      setLoading(false);
    };

    fetchNotes();
  }, [selectedTitle]);

  /* ================= PLAY ONE ================= */
  const handleSelect = async (note) => {
    setSelectedNote(note);
    await speakJapaneseAndMyanmar(note.question);
  };

  /* ================= PLAY ALL ================= */
  const handlePlayAll = async () => {
    playingRef.current = true;
    pausedRef.current = false;
    // setPaused(false);

    for (const note of notes) {
      if (!playingRef.current) break;

      setSelectedNote(note);
      await speakJapaneseAndMyanmar(note.question);

      while (pausedRef.current) {
        await new Promise((r) => setTimeout(r, 200));
      }

      await new Promise((r) => setTimeout(r, 500));
    }

    playingRef.current = false;
  };

  /* ================= STOP ================= */
  const handleStop = () => {
    playingRef.current = false;
    pausedRef.current = false;
    // setPaused(false);
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

      {/* Controls */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={handlePlayAll}
          disabled={notes.length === 0}
        >
          ▶ Play All
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={handleStop}
        >
          ■ Stop
        </Button>
         
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : notes.length === 0 ? (
        <Typography color="text.secondary">
          No notes found
        </Typography>
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
