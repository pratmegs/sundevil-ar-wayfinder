export function normalizeOcrText(rawText) {
  return rawText
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function findMappedNode(normalizedText, textToNodeMap) {
  if (!normalizedText) {
    return "";
  }

  const tokens = normalizedText.split(" ");

  for (const [knownText, nodeId] of Object.entries(textToNodeMap)) {
    const normalizedKnownText = normalizeOcrText(knownText);

    if (
      tokens.includes(normalizedKnownText) ||
      normalizedText.includes(normalizedKnownText)
    ) {
      return nodeId;
    }
  }

  return "";
}
