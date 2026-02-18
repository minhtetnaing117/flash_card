import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "../supabaseClient";
import {
    Box,
    Button,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    IconButton,
    CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CrudPage = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [titleFilter, setTitleFilter] = useState(""); // ✅ NEW
    const [form, setForm] = useState({
        title: "",
        question: "",
        answer: "",
        myanmar: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    /* ================= FETCH ================= */
    const fetchFlashcards = async () => {
        setLoading(true);

        // const { data, error } = await supabase
        //     .from("flashcards")
        //     .select("id, title, question, answer, myanmar")
        //     .order("created_at", { ascending: false });

        // if (!error) setFlashcards(data || []);
        // else console.error(error);

        let from = 0;
        let allRows = [];
        let hasMore = true;
        const PAGE_SIZE = 1000;

        while (hasMore) {
            const { data, error } = await supabase
                .from("flashcards")
                .select("id, title, question, answer, myanmar")
                .range(from, from + PAGE_SIZE - 1);

            if (error) {
                console.error(error);
                break;
            }

            if (data.length < PAGE_SIZE) hasMore = false;

            allRows = [...allRows, ...data];
            from += PAGE_SIZE;
        }

        // optionally remove duplicates based on question
        const uniqueFlashcards = [
            ...new Map(allRows.map((item) => [item.question?.trim(), item])).values()
        ];

        setFlashcards(uniqueFlashcards);

        setLoading(false);
    };

    useEffect(() => {
        fetchFlashcards();
    }, []);

    /* ================= DUPLICATE DETECTION ================= */
    const duplicateMap = useMemo(() => {
        const count = {};

        flashcards.forEach((card) => {
            const q = card.question?.trim().toLowerCase();
            if (!q) return;
            count[q] = (count[q] || 0) + 1;
        });

        return count;
    }, [flashcards]);

    const isDuplicate = (question) => {
        const q = question?.trim().toLowerCase();
        return duplicateMap[q] > 1;
    };

    /* ================= FILTER LOGIC ================= */
    const filteredFlashcards = useMemo(() => {
        if (!titleFilter.trim()) return flashcards;

        return flashcards.filter((card) =>
            card.title
                ?.toLowerCase()
                .includes(titleFilter.trim().toLowerCase())
        );
    }, [flashcards, titleFilter]);

    /* ================= SUBMIT ================= */
    const handleSubmit = async () => {
        if (!form.title.trim() || !form.question.trim()) return;

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

    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        await supabase.from("flashcards").delete().eq("id", id);
        fetchFlashcards();
    };

    /* ================= EDIT ================= */
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

            {/* ================= TITLE FILTER ================= */}
            {/* <TextField
                fullWidth
                label="Filter by Title"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                margin="normal"
            /> */}

            {/* ================= FORM ================= */}

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

            {/* ================= LIST ================= */}
            <TextField
                fullWidth
                label="Filter by Title"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                margin="normal"
            />

            <Box mt={4}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <List>
                        {filteredFlashcards.map((card) => {
                            const duplicate = isDuplicate(card.question);

                            return (
                                <ListItem key={card.id} disablePadding>
                                    <ListItemButton
                                        sx={{
                                            borderLeft: duplicate
                                                ? "5px solid red"
                                                : "none",
                                            backgroundColor: duplicate
                                                ? "rgba(255,0,0,0.08)"
                                                : "inherit",
                                            transition: "0.2s",
                                            "&:hover": {
                                                backgroundColor: duplicate
                                                    ? "rgba(255,0,0,0.15)"
                                                    : "rgba(0,0,0,0.04)",
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <>
                                                    {card.title} - {card.question}
                                                    {duplicate && (
                                                        <Typography
                                                            component="span"
                                                            color="error"
                                                            sx={{ ml: 1, fontWeight: "bold" }}
                                                        >
                                                            (Duplicate)
                                                        </Typography>
                                                    )}
                                                </>
                                            }
                                            secondary={`${card.answer} | ${card.myanmar}`}
                                        />
                                    </ListItemButton>

                                    <Box>
                                        <IconButton onClick={() => handleEdit(card)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(card.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </Box>
        </Box>
    );
};

export default CrudPage;
