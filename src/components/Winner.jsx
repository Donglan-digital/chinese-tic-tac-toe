export default function Winner({ winner, teamSide }) {
  if (!winner) return null;

  let message = "";
  let color = "gold";

  if (winner === "blue-final" || winner === "red-final") {
    message = "🏆 Final Winner!";
    color = teamSide === "blue" ? "blue" : "red";
  } else if (winner === "draw" || winner === "draw-final") {
    message = "Draw!";
    color = "gold";
  } else if (winner === "blue" || winner === "red") {
    message = "Winner!";
    color = teamSide;
  } else {
    message = winner;
  }

  return (
    <div className={`winner show`} style={{ color, fontWeight: "bold" }}>
      {message}
    </div>
  );
}
