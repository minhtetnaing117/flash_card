import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CrudPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [form, setForm] = useState({
    title: "",
    question: "",
    answer: "",
    myanmar: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFlashcards = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("flashcards")
      .select("id, title, question, answer, myanmar")
      .order("created_at", { ascending: false });

    if (!error) setFlashcards(data);
    else console.error(error);

    setLoading(false);
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const handleSubmit = async () => {
    if (!form.title.trim()) return;

    if (editingId) {
      await supabase
        .from("flashcards")
        .update(form)
        .eq("id", editingId);
    } else {
      await supabase
        .from("flashcards")
        .insert([form]);
    }

    setForm({
      title: "",
      question: "",
      answer: "",
      myanmar: "",
    });

    setEditingId(null);
    fetchFlashcards();
  };

  const handleDelete = async (id) => {
    await supabase.from("flashcards").delete().eq("id", id);
    fetchFlashcards();
  };

  const handleEdit = (card) => {
    setForm({
      title: card.title,
      question: card.question,
      answer: card.answer,
      myanmar: card.myanmar,
    });
    setEditingId(card.id);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Flashcards CRUD
      </Typography>

      <TextField
        fullWidth
        label="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        margin="normal"
      />

      <TextField
        fullWidth
        label="Question"
        value={form.question}
        onChange={(e) =>
          setForm({ ...form, question: e.target.value })
        }
        margin="normal"
      />

      <TextField
        fullWidth
        label="Answer"
        value={form.answer}
        onChange={(e) =>
          setForm({ ...form, answer: e.target.value })
        }
        margin="normal"
      />

      <TextField
        fullWidth
        label="Myanmar"
        value={form.myanmar}
        onChange={(e) =>
          setForm({ ...form, myanmar: e.target.value })
        }
        margin="normal"
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        {editingId ? "Update" : "Add"}
      </Button>

      <Box mt={4}>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {flashcards.map((card) => (
              <ListItem
                key={card.id}
                secondaryAction={
                  <>
                    <IconButton onClick={() => handleEdit(card)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(card.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={`${card.title} - ${card.question}`}
                  secondary={`${card.answer} | ${card.myanmar}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default CrudPage;
