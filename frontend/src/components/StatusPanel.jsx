function StatusPanel({
  cameraError,
  currentLocation,
  destination,
  displayNames,
  isProcessingScan,
  nextInstruction,
  normalizedText,
  ocrText,
  path,
  scanStatus,
}) {
  const pathLabel =
    path.length > 0
      ? path.map((nodeId) => displayNames[nodeId] ?? nodeId).join(" -> ")
      : "Waiting for a detected current location.";

  return (
    <div className="status-panel">
      <div className={`status-pill ${statusClass(scanStatus)}`}>
        <span className="status-dot" />
        {isProcessingScan ? "Scanning..." : scanStatus}
      </div>

      {cameraError ? <p className="error-text">{cameraError}</p> : null}

      <dl className="status-grid">
        <div>
          <dt>Detected OCR Text</dt>
          <dd>{ocrText || "Waiting for OCR text."}</dd>
        </div>
        <div>
          <dt>Normalized Text</dt>
          <dd>{normalizedText || "None yet."}</dd>
        </div>
        <div>
          <dt>Current Location</dt>
          <dd>{currentLocation}</dd>
        </div>
        <div>
          <dt>Selected Destination</dt>
          <dd>{destination}</dd>
        </div>
        <div>
          <dt>Computed Path</dt>
          <dd>{pathLabel}</dd>
        </div>
        <div>
          <dt>Next Instruction</dt>
          <dd>{nextInstruction}</dd>
        </div>
      </dl>
    </div>
  );
}

function statusClass(scanStatus) {
  if (scanStatus === "Location detected") {
    return "status-success";
  }

  if (scanStatus === "Camera unavailable") {
    return "status-error";
  }

  if (scanStatus === "No known plaque detected") {
    return "status-muted";
  }

  return "status-active";
}

export default StatusPanel;
