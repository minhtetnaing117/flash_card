import React from "react";
import { Paper, Typography } from "@mui/material";

const TtsItem = ({ note, onSelect, selected }) => {
  if (!note?.question) return null;

  return (
    <Paper
      sx={{
        p: 2,
        mb: 1,
        cursor: "pointer",
        bgcolor: selected ? "primary.light" : "background.paper",
        "&:hover": { bgcolor: "grey.100" },
      }}
      onClick={() => onSelect(note)}
    >
      <Typography fontWeight="bold">{note.question}</Typography>
      <Typography variant="body2" color="text.secondary">
        {note.myanmar} (Click to select/speak)
      </Typography>
    </Paper>
  );
};

export default TtsItem;
