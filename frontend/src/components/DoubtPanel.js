import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function AnswerList({ doubtId }) {
  const [answers, setAnswers] = useState([]);
  const [text, setText] = useState("");
  const { user } = useAuth();

  const load = async () => {
    const { data } = await api.get(`/answers/doubt/${doubtId}`);
    setAnswers(data);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doubtId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await api.post("/answers", { doubtId, text });
    setText("");
    load();
  };

  const upvote = async (id) => {
    await api.post(`/answers/${id}/upvote`);
    load();
  };

  return (
    <div className="answer-list">
      {answers.map((a) => (
        <div key={a._id} className="answer">
          <p>{a.text}</p>
          <div className="answer-meta">
            <span>— {a.answeredBy?.name || "anon"}</span>
            <button onClick={() => upvote(a._id)}>▲ {a.upvotes.length}</button>
          </div>
        </div>
      ))}
      {user ? (
        <form onSubmit={submit} className="inline-form">
          <input placeholder="Write an answer..." value={text} onChange={(e) => setText(e.target.value)} />
          <button type="submit">Post</button>
        </form>
      ) : (
        <p className="hint">Login to answer.</p>
      )}
    </div>
  );
}

export default function DoubtPanel({ noteId, blockId, doubts, onDoubtAdded }) {
  const [question, setQuestion] = useState("");
  const [openDoubtId, setOpenDoubtId] = useState(null);
  const { user } = useAuth();

  const blockDoubts = doubts.filter((d) => d.blockId === blockId);

  const askDoubt = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    await api.post("/doubts", { noteId, blockId, question });
    setQuestion("");
    onDoubtAdded();
  };

  return (
    <div className="doubt-panel">
      {blockDoubts.length === 0 && <p className="hint">No doubts yet on this line.</p>}
      {blockDoubts.map((d) => (
        <div key={d._id} className="doubt-item">
          <button className="doubt-question" onClick={() => setOpenDoubtId(openDoubtId === d._id ? null : d._id)}>
            ❓ {d.question} <span className="meta small">— {d.askedBy?.name}</span>
          </button>
          {openDoubtId === d._id && <AnswerList doubtId={d._id} />}
        </div>
      ))}
      {user ? (
        <form onSubmit={askDoubt} className="inline-form">
          <input placeholder="Ask a doubt about this line..." value={question} onChange={(e) => setQuestion(e.target.value)} />
          <button type="submit">Ask</button>
        </form>
      ) : (
        <p className="hint">Login to ask a doubt.</p>
      )}
    </div>
  );
}
