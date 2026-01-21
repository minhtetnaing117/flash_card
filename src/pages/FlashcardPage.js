import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabaseClient";
import FlashCard from "../components/FlashCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {
    Container,
    Typography,
    Button,
    Stack,
    Paper,

} from "@mui/material";

const FlashcardPage = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    // const [age, setAge] = React.useState('');

    const levels = Array.from(new Set(flashcards.map(c => c.title))).filter(Boolean); // dynamic levels
    const [selectedLevel, setSelectedLevel] = useState("");
    const [search, setSearch] = useState("");

    // const handleChange = (event: SelectChangeEvent) => {
    //     setSearch(event.target.value);
        // setSearch(levels)
        // console.log("LEVELS:", levels);
    // };

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        const { data, error } = await supabase
            .from("flashcards")
            .select("*")
            .order("id");

        if (error) {
            console.error(error);
            return;
        }

        setFlashcards(data || []);
    };

    // 1️⃣ Filter by title (question)
    const filteredFlashcards = useMemo(() => {
        return flashcards.filter((card) => {
            const matchesSearch = !search || card.title?.toLowerCase().includes(search.toLowerCase());
            const matchesLevel = !selectedLevel || card.title === selectedLevel;
            return matchesSearch && matchesLevel;
        });
    }, [flashcards, search, selectedLevel]);


    // 2️⃣ Keep index safe when filter changes
    useEffect(() => {
        setIndex(0);
        setFlipped(false);
    }, [search]);

    // if (filteredFlashcards.length === 0) {
    //     return (
    //         <Container maxWidth="sm">
    //             <Typography variant="h5" align="center" sx={{ mt: 4 }}>
    //                 Flashcard Study
    //             </Typography>

    {/* <TextField
                    fullWidth
                    label="Search by title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ mt: 3 }}
                /> */}

    {/* <Typography align="center" sx={{ mt: 3 }}>
                    No flashcards found
                </Typography>
            </Container>
        );
    } */}

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                Flashcard Study
            </Typography>

            {/* Search */}
            {/* <TextField
                fullWidth
                label="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 3 }}
            /> */}
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Title</InputLabel>
                <Select
                    labelId="level-select-label"
                    id="level-select"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    autoWidth
                    label="Al"
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

            {/* Card */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 260,
                }}
            >
                <FlashCard
                    text={filteredFlashcards[index]}
                    flipped={flipped}
                    onClick={() => setFlipped(!flipped)}
                />
            </Paper>

            {/* Controls */}
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => {
                        setFlipped(false);
                        setIndex(
                            (index - 1 + filteredFlashcards.length) %
                            filteredFlashcards.length
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
                            (index + 1) % filteredFlashcards.length
                        );
                    }}
                />
            </Stack>
        </Container>
    );
};

export default FlashcardPage;
