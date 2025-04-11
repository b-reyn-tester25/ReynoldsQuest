
import React, { useState, useEffect } from "react";
import QUESTION_BANK from "./QuestionBank";
import MAP_DATA from "./MapData";

export default function DailyQuest({ player, onComplete }) {
  const today = new Date().toISOString().split("T")[0];
  const todaysQuestions = QUESTION_BANK[today]?.[player.name] || [];
  const [answers, setAnswers] = useState(() =>
    JSON.parse(localStorage.getItem(`${today}_${player.name}`) || "{}")
  );

  useEffect(() => {
    localStorage.setItem(`${today}_${player.name}`, JSON.stringify(answers));
  }, [answers, today, player.name]);

  const handleAnswer = (index, selected) => {
    if (answers[index]) return;
    const correct = todaysQuestions[index].answer === selected;
    const updated = { ...answers, [index]: { selected, correct } };
    setAnswers(updated);
    const complete = Object.keys(updated).length === 5;
    if (complete && onComplete) {
      const locationName = MAP_DATA[today]?.location || "a new area";
      onComplete(locationName);
    }
  };

  const resetQuiz = () => {
    localStorage.removeItem(`${today}_${player.name}`);
    setAnswers({});
  };

  return (
    <div className="daily-quest">
      <h3>🧠 {player.name}'s Daily Quest</h3>
      {todaysQuestions.length === 0 ? (
        <p>No questions found for today!</p>
      ) : (
        <>
          {todaysQuestions.map((q, i) => (
            <div key={i} className="quiz-card">
              <p>
                <strong>{i + 1}. {q.question}</strong>
              </p>
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(i, opt)}
                  disabled={!!answers[i]}
                  style={{
                    backgroundColor: answers[i]?.selected === opt
                      ? answers[i].correct ? "#d4edda" : "#f8d7da"
                      : "#f0f0f0",
                    margin: "4px",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                  }}
                >
                  {opt}
                </button>
              ))}
              {answers[i] && (
                <div className="explanation">
                  {answers[i].correct ? "✅ Correct!" : "❌ Try again next time!"}
                </div>
              )}
            </div>
          ))}
          {Object.keys(answers).length === 5 && (
            <p className="finished-message">🎉 Great job! You've completed today's quest!</p>
          )}
          <button onClick={resetQuiz} className="restart">🔁 Restart Today's Quest</button>
        </>
      )}
    </div>
  );
}
