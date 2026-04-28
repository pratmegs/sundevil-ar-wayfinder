# ASU McCord Hall Indoor AR Navigation MVP

This repository is a clean scaffold for an MVP that will help users navigate inside ASU McCord Hall using browser-based camera OCR and an AR-style directional overlay.

The full application is not implemented yet. This scaffold establishes the frontend, Python tooling, documentation, test layout, and CI structure needed for the next development phase.

## Project Goal

The MVP will use a phone or laptop browser camera to read room plaques with OCR, map the detected room number to an indoor navigation graph node, calculate a route to a selected destination, and display simple AR-style guidance over the camera view.

## Architecture

- `frontend/`: React + Vite browser app.
- `frontend/src/`: Placeholder React source structure for components, hooks, utilities, and app data.
- `tools/`: Python utilities for map validation, OCR notes, documentation helpers, and future preprocessing.
- `data/raw/`: Original field data and source map files.
- `data/processed/`: Cleaned map graph data and processed assets.
- `data/test_images/`: Field test images for OCR experiments.
- `docs/`: Architecture notes, demo plan, and field testing checklist.
- `tests/`: Python tests for utility code.
- `scripts/`: Project helper scripts added in future work.

## Why uv Is Used

`uv` provides fast, reproducible Python environment and dependency management. It is used for project utilities, documentation scripts, future data preprocessing, and testing helpers.

Common Python commands:

```bash
uv sync
uv run pytest
uv run ruff check .
uv run black .
uv run mypy tools
```

## Why npm Is Still Needed

The frontend is a browser application built with React and Vite. JavaScript dependencies such as `react`, `react-dom`, `vite`, and `tesseract.js` are managed with npm inside `frontend/`.

Common frontend commands:

```bash
cd frontend
npm install
npm run dev
npm run build
npm run preview
```

## Development Setup

1. Install Python 3.11 or newer.
2. Install `uv`.
3. Sync Python dependencies:

```bash
uv sync
```

4. Install frontend dependencies:

```bash
cd frontend
npm install
```

5. Start the frontend development server:

```bash
npm run dev
```

## Current Scope

This repository currently contains only the project scaffold. It intentionally does not include QR code support, fake plaque support, or manual location fallback controls.
