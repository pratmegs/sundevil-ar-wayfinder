import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArrowOverlay from "./components/ArrowOverlay.jsx";
import CameraView from "./components/CameraView.jsx";
import DestinationSelector from "./components/DestinationSelector.jsx";
import StatusPanel from "./components/StatusPanel.jsx";
import {
  destinationList,
  displayNames,
  graph,
  navigationInstructions,
  textToNodeMap,
} from "./data/mccordHallMap.js";
import { runOcr } from "./utils/ocr.js";
import { findShortestPath, getNextInstruction } from "./utils/pathfinding.js";
import { findMappedNode, normalizeOcrText } from "./utils/textNormalization.js";

const SCAN_INTERVAL_MS = 4000;
const LOCATION_DEBOUNCE_HITS = 2;

function App() {
  const [selectedDestination, setSelectedDestination] = useState(
    destinationList[0]?.id ?? "",
  );
  const [cameraStatus, setCameraStatus] = useState("idle");
  const [scanStatus, setScanStatus] = useState("Scanning...");
  const [cameraError, setCameraError] = useState("");
  const [ocrText, setOcrText] = useState("");
  const [normalizedText, setNormalizedText] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [candidateLocation, setCandidateLocation] = useState("");
  const [candidateHits, setCandidateHits] = useState(0);
  const [isProcessingScan, setIsProcessingScan] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanInProgressRef = useRef(false);

  const handleCameraError = useCallback((message) => {
    setCameraError(message);
    setCameraStatus("unavailable");
  }, []);

  const handleCameraReady = useCallback(() => {
    setCameraError("");
    setCameraStatus("ready");
  }, []);

  const path = useMemo(() => {
    if (!currentLocation || !selectedDestination) {
      return [];
    }

    return findShortestPath(graph, currentLocation, selectedDestination);
  }, [currentLocation, selectedDestination]);

  const nextInstruction = useMemo(
    () => getNextInstruction(path, navigationInstructions),
    [path],
  );

  const destinationName = displayNames[selectedDestination] ?? "Not selected";
  const currentLocationName = currentLocation
    ? displayNames[currentLocation]
    : "No known plaque detected";

  const updateDetectedLocation = useCallback(
    (detectedNode) => {
      if (!detectedNode) {
        setCandidateLocation("");
        setCandidateHits(0);
        setScanStatus("No known plaque detected");
        return;
      }

      if (detectedNode === currentLocation) {
        setCandidateLocation("");
        setCandidateHits(0);
        setScanStatus("Location detected");
        return;
      }

      setCandidateLocation((previousCandidate) => {
        if (previousCandidate !== detectedNode) {
          setCandidateHits(1);
          return detectedNode;
        }

        setCandidateHits((previousHits) => {
          const nextHits = previousHits + 1;

          if (nextHits >= LOCATION_DEBOUNCE_HITS) {
            setCurrentLocation(detectedNode);
            setScanStatus("Location detected");
            return 0;
          }

          setScanStatus("Scanning...");
          return nextHits;
        });

        return previousCandidate;
      });
    },
    [currentLocation],
  );

  const scanVideoFrame = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (
      scanInProgressRef.current ||
      cameraStatus !== "ready" ||
      !video ||
      !canvas ||
      video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      return;
    }

    scanInProgressRef.current = true;
    setIsProcessingScan(true);
    setScanStatus("Scanning...");

    try {
      const rawText = await runOcr(video, canvas);
      const normalized = normalizeOcrText(rawText);
      const detectedNode = findMappedNode(normalized, textToNodeMap);

      setOcrText(rawText.trim());
      setNormalizedText(normalized);
      updateDetectedLocation(detectedNode);
    } catch (error) {
      setScanStatus("No known plaque detected");
      setOcrText(error instanceof Error ? error.message : "OCR scan failed.");
    } finally {
      scanInProgressRef.current = false;
      setIsProcessingScan(false);
    }
  }, [cameraStatus, updateDetectedLocation]);

  useEffect(() => {
    if (cameraStatus === "unavailable") {
      setScanStatus("Camera unavailable");
      return undefined;
    }

    if (cameraStatus !== "ready") {
      setScanStatus("Scanning...");
      return undefined;
    }

    const timeoutId = window.setTimeout(scanVideoFrame, 600);
    const intervalId = window.setInterval(scanVideoFrame, SCAN_INTERVAL_MS);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [cameraStatus, scanVideoFrame]);

  return (
    <main className="app-shell">
      <section className="workspace">
        <div className="camera-stage">
          <CameraView
            ref={videoRef}
            cameraError={cameraError}
            onCameraError={handleCameraError}
            onCameraReady={handleCameraReady}
          />
          <ArrowOverlay
            instruction={nextInstruction}
            scanStatus={scanStatus}
            hasLocation={Boolean(currentLocation)}
          />
          <canvas ref={canvasRef} className="capture-canvas" />
        </div>

        <aside className="control-panel" aria-label="Navigation status">
          <div className="title-block">
            <p className="eyebrow">OCR AR Navigation MVP</p>
            <h1>ASU McCord Hall</h1>
            <p>
              Select a destination, allow camera access, and point the camera at
              real room plaques or signs.
            </p>
          </div>

          <DestinationSelector
            destinations={destinationList}
            selectedDestination={selectedDestination}
            onChange={setSelectedDestination}
          />

          <StatusPanel
            cameraError={cameraError}
            currentLocation={currentLocationName}
            destination={destinationName}
            isProcessingScan={isProcessingScan}
            nextInstruction={nextInstruction}
            normalizedText={normalizedText}
            ocrText={ocrText}
            path={path}
            scanStatus={scanStatus}
            displayNames={displayNames}
          />
        </aside>
      </section>
    </main>
  );
}

export default App;
