# Demo Plan

## 1) App Setup

- Launch the frontend and confirm camera permissions.
- Load base indoor graph and room mapping data.

## 2) Destination Selection

- Select a destination room/node in the UI.
- Display initial route state (awaiting location lock).

## 3) Camera Plaque Scan

- Point camera at a hallway room plaque.
- OCR detects text and resolves current node.

## 4) Path Update

- Run BFS from detected node to chosen destination.
- Render updated step guidance and directional overlay.

## 5) Final Arrival Screen

- Detect arrival when current node equals destination node.
- Show completion/arrival confirmation screen.
