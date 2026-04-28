function ArrowOverlay({ hasLocation, instruction, scanStatus }) {
  const shouldPointForward = hasLocation && scanStatus !== "Camera unavailable";

  return (
    <div className="arrow-overlay" aria-live="polite">
      <div className={shouldPointForward ? "arrow arrow-ready" : "arrow"}>
        <span aria-hidden="true">&uarr;</span>
      </div>
      <div className="overlay-instruction">
        <strong>{instruction}</strong>
        <span>{scanStatus}</span>
      </div>
    </div>
  );
}

export default ArrowOverlay;
