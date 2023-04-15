from utility.file.read_json import read_json
from os.path import exists


def load_language(
        native_language: str,
) -> None or object:
    """
    Loads localization
    """
    filepath: str = f"./settings/localization/{native_language}.json"
    if not exists(filepath):
        return None
    try:
        return read_json(filepath)
    except Exception as bug:
        raise Exception(bug)
