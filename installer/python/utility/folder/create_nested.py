from os import makedirs
from os.path import exists


def create_nested_folders(
        path: str,
) -> None:
    """
    If the path is not exists, create it
    """
    if not exists(path):
        makedirs(path)
