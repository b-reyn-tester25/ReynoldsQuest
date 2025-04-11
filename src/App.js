
import React, { useState } from "react";
import "./index.css";
import AvatarSelect from "./AvatarSelect";
import DailyQuest from "./DailyQuest";
import ProgressTracker from "./ProgressTracker";
import MapTracker from "./MapTracker";
import "./MapTracker.css";
import MapTimeline from "./MapTimeline";
import "./MapTimeline.css";

export default function App() {
  const [player, setPlayer] = useState(null);
  const [justUnlocked, setJustUnlocked] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const availableDates = Object.keys(localStorage).filter(
    (key) => key.match(/^2025-04-\d{2}$/)
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

  const backgroundClass = !player
    ? "rainbow-bg"
    : player.name === "Jack"
    ? "jack-bg"
    : player.name === "Ryleigh"
    ? "ryleigh-bg"
    : "default-bg";

  return (
    <div className={`app ${backgroundClass}`}>
      <h1 className="title">🛡️ Welcome to ReynoldsQuest!</h1>
      {justUnlocked && (
        <div className="unlock-popup">
          🎉 {player.name} unlocked {justUnlocked}!
        </div>
      )}
      {!player ? (
        <AvatarSelect setPlayer={setPlayer} />
      ) : (
        <>
  <h2>Hello, {player.name}!</h2>
  <div className="main-layout">
    <div style={{ flex: 1 }}>
      <DailyQuest player={player} onComplete={(loc) => setJustUnlocked(loc)} />
      <ProgressTracker player={player} />
    </div>
    <MapTimeline playerProgress={playerProgress} />
  </div>
</>
      )}
    </div>
  );
}
