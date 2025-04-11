
import React from "react";

export default function ProgressTracker({ player }) {
  const totalCorrect = 25; // placeholder, can be dynamic later
  return (
    <div className="progress-tracker">
      <h4>⭐ Progress for {player.name}</h4>
      <p>Total Stars: {totalCorrect}</p>
    </div>
  );
}
