import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabaseClient";
import FlashCard from "../components/FlashCard";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShuffleIcon from "@mui/icons-material/Shuffle";

import {
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const FlashcardPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchFlashcards = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("flashcards")
        .select("*")
        .order("id");

      if (error) {
        console.error("Fetch error:", error);
        setFlashcards([]);
      } else {
        setFlashcards(data || []);
      }

      setLoading(false);
    };

    fetchFlashcards();
  }, []);

  /* ---------------- LEVELS ---------------- */
  const levels = useMemo(() => {
    return Array.from(
      new Set(flashcards.map((c) => c.title).filter(Boolean))
    );
  }, [flashcards]);

  /* ---------------- FILTER ---------------- */
  const filteredFlashcards = useMemo(() => {
    return flashcards.filter((card) => {
      const matchesSearch =
        !search ||
        card.title?.toLowerCase().includes(search.toLowerCase());

      const matchesLevel =
        !selectedLevel || card.title === selectedLevel;

      return matchesSearch && matchesLevel;
    });
  }, [flashcards, search, selectedLevel]);

  /* ---------------- INDEX SAFETY ---------------- */
  useEffect(() => {
    if (filteredFlashcards.length === 0) {
      setIndex(0);
      return;
    }

    if (index >= filteredFlashcards.length) {
      setIndex(0);
    }

    setFlipped(false);
  }, [filteredFlashcards, index]);

  /* ---------------- RANDOM ---------------- */
  const getRandomIndex = () => {
    if (filteredFlashcards.length <= 1) return 0;

    let random;
    do {
      random = Math.floor(Math.random() * filteredFlashcards.length);
    } while (random === index);

    return random;
  };

  const currentCard =
    filteredFlashcards.length > 0
      ? filteredFlashcards[index]
      : null;

  /* ---------------- UI ---------------- */
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Study
      </Typography>

      <TextField
        fullWidth
        label="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, display: "none" }}
      />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Title</InputLabel>
        <Select
          value={selectedLevel}
          label="Title"
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {levels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 4,
          minHeight: 260,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <Typography color="text.secondary">
            Loading…
          </Typography>
        ) : currentCard ? (
          <FlashCard
            text={currentCard}
            flipped={flipped}
            onClick={() => setFlipped((v) => !v)}
          />
        ) : (
          <Typography color="text.secondary">
            No flashcards found
          </Typography>
        )}
      </Paper>

      {!loading && filteredFlashcards.length > 0 && (
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              setFlipped(false);
              setIndex((prev) =>
                prev === 0
                  ? filteredFlashcards.length - 1
                  : prev - 1
              );
            }}
          />

          <Typography fontWeight="bold">
            {index + 1} / {filteredFlashcards.length}
          </Typography>

          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => {
              setFlipped(false);
              setIndex(
                (prev) =>
                  (prev + 1) % filteredFlashcards.length
              );
            }}
          />

          <Button
            variant="contained"
            endIcon={<ShuffleIcon />}
            onClick={() => {
              setFlipped(false);
              setIndex(getRandomIndex());
            }}
          >
            Random
          </Button>
        </Stack>
      )}
    </Container>
  );
};

export default FlashcardPage;
