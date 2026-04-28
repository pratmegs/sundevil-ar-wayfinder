"""Map validation utilities for indoor graph data.

Scaffold implementation only; richer validation logic will be added later.
"""

from collections.abc import Mapping


def validate_graph_structure(graph: Mapping[str, list[str]]) -> bool:
    """Basic graph validator for MVP scaffolding.

    Rules:
    - graph must be a mapping of node -> list of neighbor node ids
    - each key must be a non-empty string
    - each neighbor list entry must be a non-empty string
    """
    if not isinstance(graph, Mapping):
        return False

    for node, neighbors in graph.items():
        if not isinstance(node, str) or not node.strip():
            return False
        if not isinstance(neighbors, list):
            return False
        for neighbor in neighbors:
            if not isinstance(neighbor, str) or not neighbor.strip():
                return False

    return True
