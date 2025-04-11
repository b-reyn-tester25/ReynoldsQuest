
import React from "react";
import MAP_DATA from "./MapData";
import "./MapTracker.css";

export default function MapTracker({ playerProgress }) {
  const today = new Date().toISOString().split("T")[0];
  const unlockedDays = Object.keys(playerProgress).filter(
    (date) => Object.keys(playerProgress[date]).length === 5
  );

  return (
    <div className="map-tracker">
      <h2>🗺️ Your ReynoldsQuest Map</h2>
      <div className="map-grid">
        {Object.entries(MAP_DATA).map(([date, { location, emoji }], index) => {
          const unlocked = unlockedDays.includes(date);
          const isToday = today === date;
          return (
            <div key={date} className={`map-stop ${unlocked ? "unlocked" : "locked"}`}>
              <div className="emoji">{unlocked ? emoji : "🔒"}</div>
              <div className="label">{location}</div>
              {isToday && !unlocked && <div className="today">Today</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
