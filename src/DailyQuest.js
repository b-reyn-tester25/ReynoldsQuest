
import React, { useState } from "react";

export default function DailyQuest({ player }) {
  const today = new Date().toISOString().split("T")[0];
  const [answered, setAnswered] = useState(0);

  const handleAnswer = () => {
    if (answered < 5) {
      setAnswered(answered + 1);
    }
  };

  return (
    <div className="daily-quest">
      <h3>🌈 Today's Quest ({today})</h3>
      {answered < 5 ? (
        <>
          <p>Answer Question {answered + 1}</p>
          <button onClick={handleAnswer}>✅ Simulate Correct Answer</button>
        </>
      ) : (
        <p>🎉 Great job! You've completed today's quest!</p>
      )}
    </div>
  );
}
