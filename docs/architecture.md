# Architecture Overview

This MVP architecture targets browser-only sensing and guidance for indoor navigation.

## 1) Browser Camera

- Web frontend requests camera access.
- Live frames are sampled for text recognition opportunities.
- UX should communicate camera permissions and scanning status clearly.

## 2) OCR Detection

- Tesseract.js runs in-browser to extract text from captured frames.
- Text cleanup normalizes common plaque patterns (spacing, casing, punctuation).
- OCR confidence thresholds determine whether to accept or retry detection.

## 3) Room Plaque to Graph Node Mapping

- Recognized plaque text is mapped to canonical node IDs in indoor map data.
- Mapping may use exact matches first, then constrained fuzzy normalization.
- Resolved node becomes the current location estimate.

## 4) BFS Pathfinding

- Indoor map is modeled as an unweighted graph.
- BFS computes shortest hop path from current node to destination node.
- Output path is transformed into turn-by-turn step hints.

## 5) AR-Style Overlay

- Guidance arrows and textual hints are layered over camera view.
- Overlay updates when OCR confirms movement to new nodes.
- MVP keeps overlay simple and robust over visual complexity.
