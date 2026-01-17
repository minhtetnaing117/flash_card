import React, { useState } from "react";
import flashcards from "./data/flashcards";
import FlashCard from "./components/FlashCard";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((prev) =>
      prev === 0 ? flashcards.length - 1 : prev - 1
    );
  };

  return (
    <div className="app">
      <h1>Flash Card App</h1>

      <FlashCard
        text={flashcards[index]}
        flipped={flipped}
        onClick={() => setFlipped(!flipped)}
      />

      <div className="buttons">
        <button onClick={prevCard} style={{ marginTop: "30px" }}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>
    </div>
  );
}

export default App;
