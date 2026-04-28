"""Validation helpers for future indoor map graph data."""

from collections.abc import Mapping, Sequence
from typing import Any


def validate_map_graph(graph: Mapping[str, Any]) -> list[str]:
    """Return validation errors for a simple graph-like map structure.

    Expected future shape:
    - nodes: mapping of node id to node metadata
    - edges: sequence of objects with from/to node ids
    """
    errors: list[str] = []

    nodes = graph.get("nodes")
    edges = graph.get("edges")

    if not isinstance(nodes, Mapping):
        errors.append("Map graph must include a 'nodes' mapping.")
        return errors

    if not isinstance(edges, Sequence) or isinstance(edges, str):
        errors.append("Map graph must include an 'edges' sequence.")
        return errors

    for index, edge in enumerate(edges):
        if not isinstance(edge, Mapping):
            errors.append(f"Edge {index} must be a mapping.")
            continue

        start = edge.get("from")
        end = edge.get("to")

        if start not in nodes:
            errors.append(f"Edge {index} references unknown start node: {start!r}.")
        if end not in nodes:
            errors.append(f"Edge {index} references unknown end node: {end!r}.")

    return errors
