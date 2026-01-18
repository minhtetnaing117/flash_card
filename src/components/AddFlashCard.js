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
        <form
            onSubmit={handleSubmit}
            style={{
                marginTop: "30px",
                maxWidth: "450px",
                marginLeft: "40px",
                marginBottom: "30px",
                marginRight: "auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "15px",
                backgroundColor: "#fafafa"
            }}
        >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <label style={{ width: "150px" }}>Question</label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Kanji"
                    style={{ flex: 1, padding: "6px" }}
                />
            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <label style={{ width: "150px" }}>Answer</label>
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Romaji"
                    style={{ flex: 1, padding: "6px" }}
                />
            </div>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <label style={{ width: "150px" }}>Answer</label>
                <input
                    type="text"
                    value={myanmar}
                    onChange={(e) => setMyanmar(e.target.value)}
                    placeholder="Myanmar"
                    style={{ flex: 1, padding: "6px" }}
                />
            </div>

            <button
                type="submit"
                style={{
                    width: "100%",
                    padding: "10px",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
            >
                Add Flashcard
            </button>
        </form>

    );
};

export default AddFlashCard;
