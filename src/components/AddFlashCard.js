import React, { useState } from "react";

const AddFlashCard = ({ onAdd }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [myanmar, setMyanmar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer || !myanmar) return alert("All fields are required!");

    const newCard = { question, answer, myanmar };
    onAdd(newCard);

    setQuestion("");
    setAnswer("");
    setMyanmar("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <label>Question (Japanese): </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter Japanese word"
          style={{ width: "300px", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Answer (Romaji): </label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter Romaji"
          style={{ width: "300px", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Answer (Myanmar): </label>
        <input
          type="text"
          value={myanmar}
          onChange={(e) => setMyanmar(e.target.value)}
          placeholder="Enter Myanmar meaning"
          style={{ width: "300px", padding: "5px" }}
        />
      </div>

      <button type="submit" style={{ padding: "5px 15px" }}>
        Add Flashcard
      </button>
    </form>
  );
};

export default AddFlashCard;
