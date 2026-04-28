# ASU McCord Hall Indoor AR Navigation Frontend

React + Vite frontend for an OCR-based indoor AR navigation proof of concept.

The app uses the browser camera and Tesseract.js to read real room plaques or signs visible through the camera. Detected text is normalized, mapped to a temporary graph node, routed to the selected destination with BFS, and shown as an AR-style instruction overlay on the camera feed.

## Setup

```bash
cd frontend
npm install
npm run dev
```

Then:

1. Open the local Vite URL in a browser.
2. Allow camera permission.
3. Select a destination.
4. Point the camera at real McCord Hall room plaques or signs.

## Current Data Status

The initial map data is placeholder configuration for development and testing only. The placeholder room numbers, graph nodes, and OCR text mappings must be replaced with real McCord Hall plaque and sign mappings after field testing.

No QR codes are used. No fake plaques are used. No manual location selection is used.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```
