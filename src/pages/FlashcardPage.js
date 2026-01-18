import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import FlashCard from "../components/FlashCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
    Container,
    Typography,
    Button,
    Stack,
    Paper
} from "@mui/material";

const FlashcardPage = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        const { data, error } = await supabase
            .from("flashcards")
            .select("*")
            .order("id");

        if (!error) setFlashcards(data || []);
    };

    if (flashcards.length === 0) {
        return (
            <Container maxWidth="sm">
                <Typography variant="h5" align="center" sx={{ mt: 4 }}>
                    Flashcard Study
                </Typography>
                <Typography align="center" sx={{ mt: 2 }}>
                    No flashcards available
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 }, py: 4 }}>
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                Flashcard Study
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    p: { xs: 2, sm: 3 },
                    mb: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: { xs: "50%", sm: "50%" }, // ensures some height for mobile
                }}
            >
                <FlashCard
                    text={flashcards[index]}
                    flipped={flipped}
                    onClick={() => setFlipped(!flipped)}
                    style={{ maxWidth: "100%" }} // prevents overflow on small screens
                />
            </Paper>


            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    fullWidth={{ xs: true, sm: false }}
                    onClick={() => {
                        setFlipped(false);
                        setIndex((index - 1 + flashcards.length) % flashcards.length);
                    }}
                >
                    {/* Previous */}
                </Button>

                <Typography fontWeight="bold" sx={{ mt: { xs: 1, sm: 0 } }}>
                    {index + 1} / {flashcards.length}
                </Typography>

                <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    fullWidth={{ xs: true, sm: false }}
                    onClick={() => {
                        setFlipped(false);
                        setIndex((index + 1) % flashcards.length);
                    }}
                >
                    {/* Next */}
                </Button>
            </Stack>
        </Container>
    );
};

export default FlashcardPage;
