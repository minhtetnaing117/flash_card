import React from "react";
import { Paper, Typography, Divider } from "@mui/material";

const NoteItem = ({ note }) => {
    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" fontWeight="bold">
                {note.title}
            </Typography>

            <Divider sx={{ my: 1 }} />

            {note.content.split("\n").map((line, index) => (
                <Typography
                    key={index}
                    sx={{ whiteSpace: "pre-wrap" }}
                >
                    {line}
                </Typography>
            ))}

        </Paper>
    );
};

export default NoteItem;
