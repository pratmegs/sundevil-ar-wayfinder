export function findShortestPath(graph, startNode, destinationNode) {
  if (!graph[startNode] || !graph[destinationNode]) {
    return [];
  }

  const queue = [[startNode]];
  const visited = new Set([startNode]);

  while (queue.length > 0) {
    const path = queue.shift();
    const currentNode = path[path.length - 1];

    if (currentNode === destinationNode) {
      return path;
    }

    for (const neighbor of graph[currentNode] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }

  return [];
}

export function getNextInstruction(path, navigationInstructions) {
  if (path.length === 0) {
    return "Scan a real room plaque or sign to detect your current location.";
  }

  if (path.length === 1) {
    return navigationInstructions[path[0]] ?? "You have arrived";
  }

  const [currentNode, nextNode] = path;
  const instructionKey = `${currentNode}->${nextNode}`;

  return navigationInstructions[instructionKey] ?? "Continue to the next point.";
}
