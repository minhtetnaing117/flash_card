import React from "react";
import "./FlashCard.css";

const FlashCard = ({ text, flipped, onClick }) => {
  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">{text.question}</div>
        <div className="card-back">{text.answer}</div>
      </div>
    </div>
  );
};

export default FlashCard;
