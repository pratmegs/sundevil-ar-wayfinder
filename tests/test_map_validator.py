from tools.map_validator import validate_map_graph


def test_validate_map_graph_accepts_known_nodes() -> None:
    graph = {
        "nodes": {
            "room-101": {"label": "Room 101"},
            "hall-1": {"label": "Hallway 1"},
        },
        "edges": [{"from": "room-101", "to": "hall-1"}],
    }

    assert validate_map_graph(graph) == []


def test_validate_map_graph_reports_unknown_nodes() -> None:
    graph = {
        "nodes": {"room-101": {"label": "Room 101"}},
        "edges": [{"from": "room-101", "to": "missing-node"}],
    }

    assert validate_map_graph(graph) == [
        "Edge 0 references unknown end node: 'missing-node'."
    ]
