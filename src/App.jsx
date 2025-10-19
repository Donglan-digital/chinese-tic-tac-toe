import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Difficulty from "./components/Difficulty";
import Team from "./components/Team";
import GameBoard from "./components/GameBoard";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [level, setLevel] = useState("");
  const [firstTeam, setFirstTeam] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [boardValues, setBoardValues] = useState(Array(9).fill(null));
  const [editingIndex, setEditingIndex] = useState(null);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ blue: 0, red: 0 });
  const [gameStopped, setGameStopped] = useState(false);
  const [resetSignal, setResetSignal] = useState(null);

  const handleCellClick = (index) => {
    if (!boardValues[index] && !winner && !gameStopped) {
      setEditingIndex(index);
    }
  };

  const handleCellChange = (index, value) => {
    if (/^[\u4e00-\u9fa5]?$/.test(value)) {
      const newBoard = [...boardValues];
      newBoard[index] = { char: value, team: currentTurn };
      setBoardValues(newBoard);
    }
  };

  const handleCellBlur = (index) => {
    setEditingIndex(null);
    setCurrentTurn(currentTurn === "blue" ? "red" : "blue");
  };

  useEffect(() => {
    const newWinner = checkWinner();
    if (newWinner && newWinner !== winner) {
      setWinner(newWinner);
      if (!gameStopped && (newWinner === "blue" || newWinner === "red")) {
        setScores((prevScores) => ({
          ...prevScores,
          [newWinner]: prevScores[newWinner] + 1,
        }));
      }
    }
  }, [boardValues]);

  const checkWinner = () => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        boardValues[a] &&
        boardValues[b] &&
        boardValues[c] &&
        boardValues[a].team === boardValues[b].team &&
        boardValues[b].team === boardValues[c].team
      ) {
        return boardValues[a].team;
      }
    }

    if (boardValues.every((cell) => cell !== null) && !winner) {
      return "draw";
    }

    return null;
  };

  const resetGame = () => {
    setBoardValues(Array(9).fill(null));
    setWinner(null);
    setEditingIndex(null);
    if (firstTeam) {
      setCurrentTurn(firstTeam);
    }
  };

  const handleNextRound = () => {
    resetGame();
    setWinner(null);
    setGameStopped(false);
  };

  const handleStop = () => {
    setGameStopped(true);
    if (scores.blue > scores.red) {
      setWinner("blue-final");
    } else if (scores.red > scores.blue) {
      setWinner("red-final");
    } else {
      setWinner("draw-final");
    }
  };

  const handleNewGame = () => {
    resetGame();
    setScores({ blue: 0, red: 0 });
    setWinner(null);
    setGameStopped(false);
    setFirstTeam(null);
    setCurrentTurn(null);
  };

  return (
    <div className="container">
      <Header />

      <div className="difficulty">
        <button
          className={level === "easy" ? "active" : ""}
          onClick={() => {
            setLevel("easy");
            setShowModal(true);
          }}
        >
          Easy
        </button>
        <button
          className={level === "hard" ? "active" : ""}
          onClick={() => {
            setLevel("hard");
            setShowModal(true);
          }}
        >
          Hard
        </button>
      </div>

      {showModal && (
        <Difficulty level={level} onClose={() => setShowModal(false)} />
      )}

      <div className="game-area">
        <div className="teams-and-gameboard-wrapper">
          <div className="teams-and-gameboard">
            <Team
              side="left"
              resetSignal={resetSignal}
              winner={
                winner === "blue"
                  ? "Winner!"
                  : winner === "blue-final"
                  ? "🏆 Final Winner!"
                  : winner === "draw" || winner === "draw-final"
                  ? "Draw"
                  : ""
              }
              onGoFirst={(team) => {
                setFirstTeam(team);
                setCurrentTurn(team);
                setResetSignal(team);
              }}
              isFirst={firstTeam === "blue"}
              isCurrentTurn={currentTurn === "blue"}
              score={scores.blue}
            />
            <div className="gameboard">
              <GameBoard
                currentTurn={currentTurn}
                boardValues={boardValues}
                editingIndex={editingIndex}
                onCellClick={handleCellClick}
                onCellChange={handleCellChange}
                onCellBlur={handleCellBlur}
              />
            </div>
            <Team
              side="right"
              resetSignal={resetSignal}
              winner={
                winner === "red"
                  ? "Winner!"
                  : winner === "red-final"
                  ? "🏆 Final Winner!"
                  : winner === "draw" || winner === "draw-final"
                  ? "Draw"
                  : ""
              }
              onGoFirst={(team) => {
                setFirstTeam(team);
                setCurrentTurn(team);
                setResetSignal(team);
              }}
              isFirst={firstTeam === "red"}
              isCurrentTurn={currentTurn === "red"}
              score={scores.red}
            />
          </div>
        </div>

        <div className="controls">
          <button onClick={handleNextRound}>Next Round</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleNewGame}>New Game</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
