import React from "react";
import "./FlashCard.css"; // keep your flip styles here

const FlashCard = ({ text, flipped, onClick }) => {
  if (!text) return null; // prevent crash

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={onClick}>
      <div className="card-inner">
        {/* Front side */}
        <div className="card-front">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
              padding: "10px",
            }}
          >
            {text.question}
          </div>
        </div>

        {/* Back side */}
        <div className="card-back">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <p style={{ margin: "5px 0" }}>{text.answer}</p>
            <p style={{ margin: "5px 0" }}>{text.myanmar}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
