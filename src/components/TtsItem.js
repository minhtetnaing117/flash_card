import React, { useEffect } from "react";
import { Paper, Typography } from "@mui/material";

/**
 * Preload voices once
 */
let cachedVoices = [];

const loadVoices = () =>
  new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      cachedVoices = voices;
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        cachedVoices = window.speechSynthesis.getVoices();
        resolve(cachedVoices);
      };
    }
  });

/**
 * Speak Japanese and Myanmar sequentially
 */
export const speakJapaneseAndMyanmar = async (japaneseText, myanmarText) => {
  if (!("speechSynthesis" in window)) return;

  const voices = cachedVoices.length ? cachedVoices : await loadVoices();

  // Japanese
  const jaUtterance = new SpeechSynthesisUtterance(japaneseText);
  const jaVoice =
    voices.find((v) => v.lang === "ja-JP") ||
    voices.find((v) => v.lang.startsWith("ja")) ||
    voices[0]; // fallback
  if (jaVoice) {
    jaUtterance.voice = jaVoice;
    jaUtterance.lang = jaVoice.lang;
  }
  jaUtterance.rate = 1;
  jaUtterance.pitch = 1;

  // Myanmar
  const myUtterance = new SpeechSynthesisUtterance(myanmarText);
  const myVoice =
    voices.find((v) => v.lang === "my-MM") ||
    voices.find((v) => v.lang.endsWith("my")) ||
    voices[0]; // fallback
  if (myVoice) {
    myUtterance.voice = myVoice;
    myUtterance.lang = myVoice.lang;
  }
  myUtterance.rate = 1;
  myUtterance.pitch = 1;

  // Speak Japanese first, then Myanmar
  await new Promise((resolve) => {
    jaUtterance.onend = () => {
      myUtterance.onend = resolve;
      window.speechSynthesis.speak(myUtterance);
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(jaUtterance);
  });
};

const TtsItem = ({ note }) => {
  useEffect(() => {
    loadVoices(); // preload voices
  }, []);

  if (!note?.question) return null;

  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        cursor: "pointer",
        "&:hover": { bgcolor: "grey.100" },
      }}
      onClick={() => speakJapaneseAndMyanmar(note.question, note.myanmar)}
    >
      <Typography fontWeight="bold">{note.question}</Typography>
      <Typography variant="body2" color="text.secondary">
        {note.myanmar} (Click to speak)
      </Typography>
    </Paper>
  );
};

export default TtsItem;
