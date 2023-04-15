from json import loads


def parse_json(
        data: str,
) -> dict:
    """
    JSON Parser
    """
    return loads(data)
