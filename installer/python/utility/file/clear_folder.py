from glob import glob
from os.path import isdir, join as join_path
from shutil import rmtree
from os import remove


def clear_everything(
        folder_path: str,
) -> None:
    """
    Clear folder
    """
    all_files = glob(join_path(folder_path, '*'))
    for file in all_files:
        if file.endswith('.py') or file.startswith("installer"):
            continue
        if isdir(file):
            rmtree(file)
        else:
            remove(file)
