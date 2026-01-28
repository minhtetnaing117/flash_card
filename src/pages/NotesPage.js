import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import NoteItem from "../components/NoteItem";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setNotes(data || []);
      setLoading(false);
    };

    fetchNotes();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        Notes
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : notes.length === 0 ? (
        <Typography color="text.secondary">
          No notes found
        </Typography>
      ) : (
        notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))
      )}
    </Container>
  );
};

export default NotesPage;
