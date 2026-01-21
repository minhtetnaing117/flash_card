import React, { useState } from "react";

const AddFlashCard = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [myanmar, setMyanmar] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !title.trim() ||
            !question.trim() ||
            !answer.trim() ||
            !myanmar.trim()
        ) {
            alert("All fields are required!");
            return;
        }

        const newCard = {
            title: title.trim(),
            question: question.trim(),
            answer: answer.trim(),
            myanmar: myanmar.trim(),
        };

        // onAdd(newCard);
        if (typeof onAdd === "function") {
            onAdd(newCard);
        } else {
            console.warn("onAdd is not a function!",newCard);
        }

        setTitle("");
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
                backgroundColor: "#bb57e9",
            }}
        >
            {/* Title */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <label style={{ width: "150px" }}>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Category / Title"
                    style={{ flex: 1, padding: "6px" }}
                />
            </div>

            {/* Question */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <label style={{ width: "150px" }}>Question</label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Kanji / Word"
                    style={{ flex: 1, padding: "6px" }}
                />
            </div>

            {/* Answer */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                <label style={{ width: "150px" }}>Answer</label>
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Romaji / Meaning"
                    style={{ flex: 1, padding: "6px" }}
                />
            </div>

            {/* Myanmar */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <label style={{ width: "150px" }}>Myanmar</label>
                <input
                    type="text"
                    value={myanmar}
                    onChange={(e) => setMyanmar(e.target.value)}
                    placeholder="မြန်မာဘာသာ"
                    style={{ flex: 1, padding: "6px" }}
                />
            </div>

            <button
                type="submit"
                style={{
                    width: "100%",
                    padding: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
            >
                Add Flashcard
            </button>
        </form>
    );
};

export default AddFlashCard;
