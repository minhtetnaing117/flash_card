import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import FlashCard from "./components/FlashCard";
import AddFlashCard from "./components/AddFlashCard";
import "./App.css";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch flashcards from Supabase
  useEffect(() => {
    const fetchFlashcards = async () => {
      const { data, error } = await supabase
        .from("flashcards")
        .select("*")
        .order("id", { ascending: true });

      if (error) console.error(error);
      else setFlashcards(data || []);

      setLoading(false);
    };

    fetchFlashcards();
  }, []);

  // Navigate next card
  const nextCard = () => {
    if (flashcards.length === 0) return;
    setFlipped(false);
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  // Navigate previous card
  const prevCard = () => {
    if (flashcards.length === 0) return;
    setFlipped(false);
    setIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  // Add new flashcard to Supabase and state
  const addFlashCard = async (card) => {
    try {
      const { data, error } = await supabase
        .from("flashcards")
        .insert([card])
        .select();

      if (error) throw error;

      setFlashcards((prev) => {
        const updated = [...prev, data[0]];
        setIndex(updated.length - 1); // show the new card immediately
        return updated;
      });

      setFlipped(false);
    } catch (error) {
      console.error("Error adding flashcard:", error.message);
    }
  };

  if (loading) return <p>Loading flashcards...</p>;

  return (
    <div className="app">
      <h1>Flash Card App</h1>

      {flashcards.length > 0 ? (
        <>
          <FlashCard
            text={flashcards[index]}
            flipped={flipped}
            onClick={() => setFlipped(!flipped)}
          />
          
          <div className="buttons" style={{ marginTop: "60px" }}>
            <button onClick={prevCard} style={{ marginRight: "10px" }}>
              Previous
            </button>
            <button onClick={nextCard}>Next</button>
          </div>
        </>
      ) : (
        <p>No flashcards available.</p>
      )}
      <div  style={{ marginTop: "60px" }}> 
        <AddFlashCard onAdd={addFlashCard} />
      </div>
      
    </div>
  );
}

export default App;
