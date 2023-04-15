from utility.file.read_json import read_json
from utility.file.write_json import write_json


def change_toolkit_json(
        toolkit_file_path: str,
        language: str
) -> None:
    """
    language available: "English" | "Vietnamese" | "Chinese"
    """
    toolkit_json = read_json(toolkit_file_path)
    toolkit_json["language"] = language
    write_json(toolkit_file_path, toolkit_json, False)
