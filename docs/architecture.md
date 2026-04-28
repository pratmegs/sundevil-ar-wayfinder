# Architecture

The ASU McCord Hall Indoor AR Navigation MVP will combine browser camera input, OCR, a room-to-map lookup, graph pathfinding, and an AR-style overlay.

## Browser Camera

The React frontend will request camera access from the browser and display a live camera preview. Future code should keep camera access isolated in a hook so permissions, stream cleanup, and device handling remain easy to test.

## OCR Detection

Tesseract.js will run in the browser to detect text from room plaques visible in the camera feed. OCR processing should focus on stable text regions and normalize detected room numbers before matching them to map data.

## Room Plaque to Graph Node Mapping

Detected room plaque text will be mapped to a known graph node in the indoor map data. The mapping layer should keep OCR text normalization separate from the graph itself so field corrections can be made without changing pathfinding code.

## BFS Pathfinding

The MVP can use breadth-first search for simple unweighted hallway routing. Each node represents a meaningful indoor location, and each edge represents a navigable hallway segment or turn.

## AR-Style Overlay

The frontend will draw route guidance over the camera preview. The first version should use simple directional overlays and status text rather than full spatial AR tracking.
