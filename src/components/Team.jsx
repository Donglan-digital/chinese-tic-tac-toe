import { useState, useEffect } from "react";
import Winner from "./Winner";
import Score from "./Score";

export default function Team({
  side,
  isCurrentTurn,
  winner,
  isFirst,
  onGoFirst,
  score,
  currentTurn,
  resetSignal,
}) {
  const teamClass = side === "left" ? "blue" : "red";
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const handleGoClick = () => {
    onGoFirst(teamClass);
    if (timerId) {
      clearInterval(timerId);
    }
    setTimeLeft(15);
    const newTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(newTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerId(newTimer);
  };

  useEffect(() => {
    if (resetSignal === teamClass) return;
    if (timerId) clearInterval(timerId);
    setTimeLeft(null);
  }, [resetSignal]);

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  const buttonText =
    timeLeft === null ? "Go" : timeLeft > 0 ? timeLeft : "Time’s up!";

  return (
    <div className="team-card">
      <div className="team">
        <div className={`team-card ${isCurrentTurn ? "current-turn" : ""}`}>
          <span className={teamClass}>
            {teamClass === "blue" ? "蓝" : "红"} Team
          </span>
          <div>
            <button
              className={`go-first ${isFirst ? "active" : ""}`}
              title="This team goes first"
              onClick={handleGoClick}
              disabled={currentTurn}
            >
              {buttonText}
            </button>
          </div>
        </div>
        <Winner winner={winner} teamSide={teamClass} />
        <Score score={score} />
      </div>
    </div>
  );
}
