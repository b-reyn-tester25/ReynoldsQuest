
import React from "react";
import MAP_DATA from "./MapData";
import "./MapTimeline.css";

export default function MapTimeline({ playerProgress }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="timeline-container">
      <div className="timeline-line" />
      <ul className="timeline-list">
        {Object.entries(MAP_DATA).map(([date, { location, emoji }], index) => {
          const isUnlocked = playerProgress[date] && Object.keys(playerProgress[date]).length === 5;
          const isToday = today === date;
          return (
            <li key={date} className={`timeline-item ${isUnlocked ? "unlocked" : "locked"}`}>
              <div className="timeline-dot">
                {isUnlocked ? (
                  <span className="emoji reveal">{emoji}</span>
                ) : (
                  <span className="lock-icon">🔒</span>
                )}
              </div>
              <div className="timeline-label">
                {location}
                {isToday && !isUnlocked && <div className="today">(Today)</div>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
