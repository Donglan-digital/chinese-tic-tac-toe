import gameLogo from "./assets/in-game-logo.png";
export default function Header() {
  return (
    <div className="container">
      <div className="logo">
        <img src={gameLogo} alt="game logo" />
      </div>
      <h1>Chinese Phrases Building Game</h1>
    </div>
  );
}
