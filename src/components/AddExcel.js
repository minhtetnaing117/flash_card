import React, { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "../supabaseClient";

import {
    Container,
    Typography,
    Button,
    Box,
    Paper,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

const AddExcel = () => {
    const [cards, setCards] = useState([]);

    // 1. Read Excel
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log("FILE SELECTED:", file.name);

        const reader = new FileReader();

        reader.onload = (evt) => {
            const data = new Uint8Array(evt.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                defval: "",
                raw: false,
            });

            console.log("RAW JSON:", jsonData);

            // Remove empty rows
            const filtered = jsonData.filter(row =>
                Object.values(row).some(v => v)
            );

            // Normalize headers
            // const normalized = filtered.map(row => ({
            //     question: (row.question || row.Question || "").toString().trim(),
            //     answer: (row.answer || row.Answer || "").toString().trim(),
            //     myanmar: (row.myanmar || row.Myanmar || row.Burmese || "").toString().trim(),
            // }));

            console.log("NORMALIZED:", filtered);
            setCards(filtered);
        };

        reader.readAsArrayBuffer(file);
    };

    // 2. Save to Supabase
    const handleSaveToSupabase = async () => {
        console.log("cards",cards.map(c=>JSON.stringify(c)).join("\n"));

        const cleanedCards = cards
            .map((c) => ({
                title: String(c.title ?? "").trim(),
                question: String(c.question ?? "").trim(),
                answer: String(c.answer ?? "").trim(),
                myanmar: String(c.myanmar ?? "").trim(),
            }))
            .filter(c => c.question && c.answer && c.myanmar);

        console.log("cleanedCards",cleanedCards);

        if (!cleanedCards.length) {
            alert("No valid rows to import");
            return;
        }

        const { data, error } = await supabase
            .from("flashcards")
            .insert(cleanedCards)
            .select();

        if (error) {
            console.error(error);
            alert(error.message);
            return;
        }

        alert(`Imported ${data.length} flashcards`);
        setCards([]);
    };


    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Add Flashcards (Excel)
            </Typography>

            {/* Upload */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Button variant="contained" component="label">
                    Upload Excel File
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        hidden
                        onChange={handleFileUpload}
                    />
                </Button>

                <Typography variant="body2" sx={{ mt: 2 }}>
                    Excel columns: <b>question | answer | myanmar</b>
                </Typography>
            </Paper>

            {/* Preview */}
            {cards.length > 0 && (
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Preview ({cards.length} cards)
                    </Typography>

                    <List>
                        {cards.map((card, index) => (
                            <ListItem key={index} divider>
                                <ListItemText
                                    primary={card.question}
                                    secondary={
                                        <>
                                            <div>Answer: {card.answer}</div>
                                            <div>Myanmar: {card.myanmar}</div>
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSaveToSupabase}
                        >
                            Save Flashcards
                        </Button>
                    </Box>
                </Paper>
            )}
        </Container>
    );
};

export default AddExcel;
