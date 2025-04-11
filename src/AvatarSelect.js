
import React from "react";
import "./AvatarSelect.css";

const avatars = [
  { name: "Ryleigh", emoji: "🦄", theme: "ryleigh" },
  { name: "Jack", emoji: "🦕", theme: "jack" }
];

export default function AvatarSelect({ setPlayer }) {
  return (
    <div className="avatar-select">
      <p className="select-title">Choose Your Character:</p>
      <div className="avatar-buttons">
        {avatars.map((a) => (
          <button
            key={a.name}
            onClick={() => setPlayer(a)}
            className={`avatar-button ${a.theme}`}
          >
            <div className="avatar-emoji">{a.emoji}</div>
            <div className="avatar-name">{a.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
