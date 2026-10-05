# 📍 SunDevil AR Wayfinder

A browser-based indoor navigation system for ASU buildings using OCR-based room identification, graph routing, and AR-style visual guidance.

The project explores how a mobile camera can be used to estimate a user's indoor location without GPS by recognizing room plaques and mapping them to a building navigation graph.

---

## Problem

GPS works well outdoors but becomes unreliable inside large buildings.

Indoor navigation often requires expensive infrastructure such as:

- Bluetooth beacons
- dedicated positioning hardware
- pre-installed markers
- specialized mobile applications

SunDevil AR Wayfinder explores a lightweight alternative using existing room signage.

---

## How It Works

```text
Phone Camera
     ↓
Room Plaque Detection
     ↓
OCR Room Number Recognition
     ↓
Room → Graph Node Mapping
     ↓
Shortest Path Calculation
     ↓
Navigation Instructions
     ↓
AR-Style Direction Overlay
```

---

## Current Features

### Camera-Based Navigation Interface

The application provides a mobile-first camera interface designed for indoor navigation.

### OCR Room Identification

Room plaques can be analyzed using browser-based OCR to identify the user's approximate location.

### Indoor Waypoint Mapping

Recognized room numbers are mapped to predefined navigation nodes.

### Graph-Based Routing

The building layout is represented as a navigation graph.

Routes between locations can then be calculated using graph traversal and shortest-path logic.

### AR-Style Guidance

Directional instructions are displayed over the camera interface to simulate an AR navigation experience.

---

## Architecture

```text
React Frontend
      │
      ├── Camera Interface
      │
      ├── OCR Pipeline
      │
      ├── Room Detection
      │
      ├── Navigation Graph
      │
      └── AR Guidance UI
      │
      ▼
Processed Building Map Data
```

Python utilities are also included for:

- map validation
- preprocessing
- testing
- future OCR experiments

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Tesseract.js

### Navigation / Vision

- OCR
- graph algorithms
- indoor waypoint mapping
- visual localization concepts

### Python Tooling

- Python
- uv
- pytest
- Ruff
- Black
- MyPy

---

## Project Structure

```text
sundevil-ar-wayfinder/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── data/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
├── tools/
├── data/
│   ├── raw/
│   ├── processed/
│   └── test_images/
├── docs/
├── tests/
├── .github/
├── README.md
└── LICENSE
```

---

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The development server will start using Vite.

---

## Python Development Setup

Install `uv` and dependencies:

```bash
uv sync
```

Run tests:

```bash
uv run pytest
```

Run linting:

```bash
uv run ruff check .
```

---

## Current Status

The project currently includes:

- mobile navigation interface
- AR-style UI components
- OCR-based waypoint logic
- room-to-navigation-node mapping
- project testing and validation structure

The system is still an MVP and is being expanded toward more robust real-world indoor localization.

---

## Current Limitations

- OCR quality depends on lighting and plaque visibility
- indoor localization currently relies primarily on detected room signage
- the building graph must be manually constructed
- navigation does not currently perform full visual-inertial localization
- real-world navigation testing is still limited

---

## Future Work

- improve OCR robustness
- measure OCR localization accuracy
- add orientation estimation
- support multiple ASU buildings
- evaluate route success in real-world field tests
- investigate visual landmarks in addition to room plaques
- add more advanced AR positioning

---

## Author

Pratiksha Theodore
