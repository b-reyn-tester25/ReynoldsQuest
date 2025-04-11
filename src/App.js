
import React, { useState } from "react";
import "./index.css";
import AvatarSelect from "./AvatarSelect";
import DailyQuest from "./DailyQuest";
import ProgressTracker from "./ProgressTracker";

export default function App() {
  const [player, setPlayer] = useState(null);

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
        </>
      )}
    </div>
  );
}
