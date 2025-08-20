import { useState } from "react";
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
}) {
  const teamClass = side === "left" ? "blue" : "red";

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
              onClick={() => onGoFirst(teamClass)}
              disabled={currentTurn}
            >
              Go
            </button>
          </div>
        </div>
        <Winner winner={winner} teamSide={teamClass} />
        <Score score={score} />
      </div>
    </div>
  );
}
