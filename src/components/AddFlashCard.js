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
            console.warn("onAdd is not a function!", newCard);
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
                marginTop: "20px",
                maxWidth: "450px",
                margin: "0 auto 30px",
                padding: "16px",
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
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "16px", // prevents zoom on iOS
                    }}
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
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "16px", // prevents zoom on iOS
                    }}
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
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "16px", // prevents zoom on iOS
                    }}
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
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "16px", // prevents zoom on iOS
                    }}
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
