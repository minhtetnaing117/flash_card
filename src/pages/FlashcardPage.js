import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import FlashCard from "../components/FlashCard";

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
      <div className="page">
        <h2>Flashcard Study</h2>
        <p>No flashcards available</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="title">Flashcard Study</h2>

      <div className="card-wrapper">
        <FlashCard
          text={flashcards[index]}
          flipped={flipped}
          onClick={() => setFlipped(!flipped)}
        />
      </div>

      <div className="buttons">
        <button
          onClick={() => {
            setFlipped(false);
            setIndex((index - 1 + flashcards.length) % flashcards.length);
          }}
        >
          Previous
        </button>

        <span className="counter">
          {index + 1} / {flashcards.length}
        </span>

        <button
          onClick={() => {
            setFlipped(false);
            setIndex((index + 1) % flashcards.length);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardPage;
