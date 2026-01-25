import React from "react";
import "./FlashCard.css"; // add flip styles here

const FlashCard = ({ text, flipped, onClick }) => {
  if (!text) return null; // avoid crash if text is undefined

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front" style={{ fontSize: "34px" }}>{text.question}</div>
        <div className="card-back" style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          padding: "12px",
        }}>
          <p >{text.answer}</p>
          <p >{text.myanmar}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;

