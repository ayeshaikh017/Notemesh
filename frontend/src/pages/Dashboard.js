import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotes = async (query = "") => {
    setLoading(true);
    const { data } = await api.get("/notes", { params: query ? { q: query } : {} });
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNotes(q);
  };

  return (
    <div>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          placeholder="Search notes by title..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes yet. Be the first to add one!</p>
      ) : (
        <div className="note-grid">
          {notes.map((note) => (
            <Link to={`/notes/${note._id}`} key={note._id} className="card note-card">
              <h3>{note.title}</h3>
              <p className="meta">{note.subject} → {note.chapter} → {note.topic}</p>
              <p className="meta small">by {note.author?.name || "unknown"}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
