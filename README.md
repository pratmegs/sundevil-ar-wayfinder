# sundevil-ar-waypoint

MVP scaffold for **SunDevil AR Waypoint**, an indoor wayfinding project for ASU-style building navigation using browser OCR and AR-style route guidance.

## Project Goal

Build a web app that can:
- read room plaques with browser-based OCR,
- map recognized room/location text to nodes in an indoor graph,
- compute shortest routes (BFS for MVP), and
- render simple AR-style directional overlays.

This repository currently provides only a clean scaffold and configuration for implementation.

## High-Level Architecture

- **Frontend (React + Vite)** in `frontend/`
  - Browser UI, camera capture pipeline, OCR calls via Tesseract.js, routing views.
- **Python utilities (uv-managed)** at repo root and in `tools/`
  - Data and map validation helpers, docs/tooling scripts, and future preprocessing utilities.
- **Project docs** in `docs/`
  - Architecture notes, demo flow, field testing checklist.

## Why `uv` for Python

`uv` gives fast, reproducible Python dependency management and execution for:
- utility scripts,
- testing helpers,
- linting/formatting/type-checking,
- future preprocessing jobs.

## Why npm is still needed

The frontend is a JavaScript application built with Vite + React + Tesseract.js, so Node.js/npm remains necessary for frontend dependencies and dev/build workflows.

## Quick Setup

### Prerequisites

- Python 3.11+
- [uv](https://docs.astral.sh/uv/)
- Node.js 18+
- npm

### Python environment

```bash
uv sync
uv run pytest
uv run ruff check .
uv run black .
uv run mypy tools
```

### Frontend environment

```bash
cd frontend
npm install
npm run dev
npm run build
npm run preview
```

## Repository Layout

```text
frontend/                # React + Vite app scaffold
tools/                   # Python utility modules
data/raw/                # Source mapping assets and raw captures
data/processed/          # Cleaned/derived map assets
data/test_images/        # OCR testing images
docs/                    # Architecture/demo/testing docs
tests/                   # Python tests
scripts/                 # Automation and helper scripts
.github/workflows/       # CI workflow definitions
```

## Current Status

Scaffold only. No full application logic is implemented yet.
