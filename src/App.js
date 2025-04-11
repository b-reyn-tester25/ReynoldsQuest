
import React, { useState } from "react";
import "./index.css";
import AvatarSelect from "./AvatarSelect";
import DailyQuest from "./DailyQuest";
import ProgressTracker from "./ProgressTracker";
import MapTracker from "./MapTracker";
import "./MapTracker.css";

export default function App() {
  const [player, setPlayer] = useState(null);

  const today = new Date().toISOString().split("T")[0];
const availableDates = Object.keys(localStorage).filter(
  (key) => key.match(/^2025-04-\d{2}$/) // only date-formatted keys
);

const playerProgress = {};
availableDates.forEach((date) => {
  const stored = localStorage.getItem(date);
  try {
    playerProgress[date] = JSON.parse(stored);
  } catch (err) {
    console.error(`Failed to parse data for ${date}:`, err);
  }
});

  return (
    <div className="app">
      <h1 className="title">🛡️ Welcome to ReynoldsQuest!</h1>
      {!player ? (
        <AvatarSelect setPlayer={setPlayer} />
      ) : (
        <>
          <h2>Hello, {player.name}!</h2>
          <DailyQuest player={player} />
          <ProgressTracker player={player} />
          <MapTracker playerProgress={playerProgress} />
        </>
      )}
    </div>
  );
}