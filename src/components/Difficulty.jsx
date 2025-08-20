export default function Difficulty({ level, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>✨Game Instructions ({level === "easy" ? "Easy" : "Hard"} Mode)</h2>
        {level === "easy" ? (
          <ol>
            <li>Pick a Chinese character and place it in a box.</li>
            <li>
              Put another character in a box next to the first one to make a
              two-characte phrase:
            </li>
            <ul>
              <li>• side by side (left↔️right)</li>
              <li>• up and down (top↕️bottom)</li>
              <li>• diagonally (↘️↖️↙️↗️)</li>
            </ul>

            <li>
              First team to line up 3️⃣ boxes in a row/column/diagonal wins 🎉
            </li>
            <li>⚠️No repeated characters allowed.</li>
          </ol>
        ) : (
          <ol>
            <li>Pick a Chinese character and place it in a box.</li>
            <li>
              Put another character in a box next to the first one to make a
              two-characte phrase:
            </li>
            <ul>
              <li>• left to right (ONLY ➡️)</li>
              <li>• top to bottom (ONLY ⬇️)</li>
              <li>• top corner to bottom corner (ONLY ↘️↙️)</li>
            </ul>
            <li>
              First team to line up 3️⃣ boxes in a row/column/diagonal wins 🎉
            </li>
            <li>⚠️No repeated characters allowed.</li>
          </ol>
        )}

        <button className="close-btn" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
}
