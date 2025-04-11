
import React from "react";

const avatars = [
  { name: "Ryleigh", emoji: "🦄" },
  { name: "Jack", emoji: "🦕" }
];

export default function AvatarSelect({ setPlayer }) {
  return (
    <div className="avatar-select">
      <p>Choose your character:</p>
      <div className="avatars">
        {avatars.map((a) => (
          <button key={a.name} onClick={() => setPlayer(a)}>
            <span style={{ fontSize: "2rem" }}>{a.emoji}</span>
            <br />
            {a.name}
          </button>
        ))}
      </div>
    </div>
  );
}
