from tools.map_validator import validate_graph_structure


def test_validate_graph_structure_accepts_simple_graph() -> None:
    graph = {
        "ENGR_A": ["ENGR_B", "ENGR_C"],
        "ENGR_B": ["ENGR_A"],
    }
    assert validate_graph_structure(graph) is True


def test_validate_graph_structure_rejects_invalid_entries() -> None:
    graph = {
        "": ["ENGR_A"],
        "ENGR_A": [""],
    }
    assert validate_graph_structure(graph) is False
