import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateNote() {
  const [form, setForm] = useState({ title: "", subject: "", chapter: "", topic: "", content: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/notes", form);
      navigate(`/notes/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not create note");
    }
  };

  return (
    <div className="card form-card wide">
      <h2>New Note</h2>
      <p className="hint">
        Separate paragraphs with a blank line — each paragraph becomes its own block,
        which is what doubts get anchored to.
      </p>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <div className="row">
          <input name="subject" placeholder="Subject (e.g. DSA)" value={form.subject} onChange={handleChange} required />
          <input name="chapter" placeholder="Chapter (e.g. Trees)" value={form.chapter} onChange={handleChange} required />
          <input name="topic" placeholder="Topic (e.g. BST)" value={form.topic} onChange={handleChange} required />
        </div>
        <textarea
          name="content"
          rows={12}
          placeholder={"Write your notes here.\n\nLeave a blank line between paragraphs\n\nEach paragraph becomes a separate block."}
          value={form.content}
          onChange={handleChange}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Publish Note</button>
      </form>
    </div>
  );
}
