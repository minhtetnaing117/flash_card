import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FlashcardPage from "./pages/FlashcardPage";
import AddPage from "./pages/AddPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/" className="nav-link">Flashcards</Link>
        <Link to="/add" className="nav-link">Add Flashcard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<FlashcardPage />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
