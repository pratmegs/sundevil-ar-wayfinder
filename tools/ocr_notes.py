"""Notes and helpers for future OCR experiments.

Frontend OCR will run in the browser with Tesseract.js. This module is reserved
for documenting test observations and future offline preprocessing helpers.
"""


def normalize_room_text(raw_text: str) -> str:
    """Normalize OCR output for future room plaque matching."""
    return " ".join(raw_text.strip().upper().split())
