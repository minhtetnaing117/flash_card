import React from "react";
import { Paper, Typography } from "@mui/material";

// Check if the title indicates Kanji and the question contains Kanji characters
const isKanjiTitle = (title = "", text = "") =>
  title.toLowerCase().includes("kanji") && /[\u4E00-\u9FFF]/.test(text);

const TtsItem = ({ note, onSelect, selected }) => {
  if (!note?.question) return null;

  const showMyanmar = isKanjiTitle(note.title, note.question);

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

      {showMyanmar ? (
        <Typography variant="body2" color="text.secondary">
          {note.answer} <br /> {note.myanmar}
        </Typography>
      ) : (
        <Typography variant="body2" color="text.secondary">
          {note.myanmar}
        </Typography>
      )}

    </Paper>
  );
};

export default TtsItem;
