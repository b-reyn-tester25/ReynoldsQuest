
import React, { useState, useEffect } from "react";
import QUESTION_BANK from "./QuestionBank";

export default function DailyQuest({ player }) {
  const today = new Date().toISOString().split("T")[0];
  const todaysQuestions = QUESTION_BANK[today]?.[player.name] || [];
  const [answers, setAnswers] = useState(() =>
    JSON.parse(localStorage.getItem(`${today}_${player.name}`) || "{}")
  );
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem(`${today}_${player.name}`, JSON.stringify(answers));
  }, [answers, today, player.name]);

  const handleAnswer = (index, selected) => {
    if (answers[index]) return;
    const correct = todaysQuestions[index].answer === selected;
    const updated = { ...answers, [index]: { selected, correct } };
    setAnswers(updated);
    if (correct) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1500);
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
