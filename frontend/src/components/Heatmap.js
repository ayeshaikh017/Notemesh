import React from "react";

// intensity 0..1 -> a red overlay whose opacity scales with confusion level.
export function heatmapStyle(intensity) {
  if (!intensity) return {};
  return { backgroundColor: `rgba(220, 38, 38, ${0.08 + intensity * 0.35})` };
}

export default function HeatmapLegend() {
  return (
    <div className="heatmap-legend">
      <span>Confusion heatmap:</span>
      <span className="swatch" style={{ backgroundColor: "rgba(220,38,38,0.08)" }} /> low
      <span className="swatch" style={{ backgroundColor: "rgba(220,38,38,0.25)" }} /> medium
      <span className="swatch" style={{ backgroundColor: "rgba(220,38,38,0.43)" }} /> high
    </div>
  );
}
