export default function GameBoard({
  currentTurn,
  boardValues,
  editingIndex,
  onCellClick,
  onCellChange,
  onCellBlur,
}) {
  return (
    <div className="gameboard">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i + 1} className="board-cell">
          {editingIndex === i ? (
            <input
              type="text"
              maxLength="1"
              autoFocus
              value={boardValues[i]?.char || ""}
              onChange={(e) => onCellChange(i, e.target.value)}
              onBlur={() => onCellBlur(i)}
              onKeyDown={(e) => e.key === "Enter" && onCellBlur(i)}
              className="character-input"
            />
          ) : (
            <button
              onClick={() => onCellClick(i)}
              style={{
                fontSize: "40px",
                color: boardValues[i]
                  ? boardValues[i].team === "blue"
                    ? "blue"
                    : "red"
                  : "black",
                cursor: currentTurn ? "pointer" : "not-allowed",
                opacity: currentTurn ? 1 : 0.6,
              }}
              disabled={!currentTurn}
            >
              {boardValues[i]?.char || i + 1}
            </button>
          )}
        </div>
      ))}
      {!currentTurn && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "300%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 10,
            borderRadius: "10px",
            marginTop: "100%",
            marginLeft: "10%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "18px",
              padding: "10px 20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            Select a team to "Go" first!
          </div>
        </div>
      )}
    </div>
  );
}
