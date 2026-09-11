import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import DoubtPanel from "../components/DoubtPanel";
import HeatmapLegend, { heatmapStyle } from "../components/Heatmap";

export default function NoteView() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const [activeBlock, setActiveBlock] = useState(null);

  const loadAll = useCallback(async () => {
    const [noteRes, doubtsRes, heatmapRes] = await Promise.all([
      api.get(`/notes/${id}`),
      api.get(`/doubts/note/${id}`),
      api.get(`/notes/${id}/heatmap`),
    ]);
    setNote(noteRes.data);
    setDoubts(doubtsRes.data);
    setHeatmap(heatmapRes.data.heatmap);
  }, [id]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  if (!note) return <p>Loading...</p>;

  const intensityFor = (blockId) => {
    const entry = heatmap.find((h) => h.blockId === blockId);
    return entry ? entry.intensity : 0;
  };
  const countFor = (blockId) => {
    const entry = heatmap.find((h) => h.blockId === blockId);
    return entry ? entry.doubtCount : 0;
  };

  return (
    <div className="note-view">
      <h1>{note.title}</h1>
      <p className="meta">{note.subject} → {note.chapter} → {note.topic} · by {note.author?.name}</p>
      <HeatmapLegend />

      <div className="note-body">
        {note.blocks.map((block) => (
          <div key={block.blockId} className="block-row">
            <div
              className={`block ${activeBlock === block.blockId ? "active" : ""}`}
              style={heatmapStyle(intensityFor(block.blockId))}
              onClick={() => setActiveBlock(activeBlock === block.blockId ? null : block.blockId)}
            >
              <p>{block.content}</p>
              <span className="doubt-count">{countFor(block.blockId)} doubt(s) — click to discuss</span>
            </div>
            {activeBlock === block.blockId && (
              <DoubtPanel noteId={id} blockId={block.blockId} doubts={doubts} onDoubtAdded={loadAll} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
