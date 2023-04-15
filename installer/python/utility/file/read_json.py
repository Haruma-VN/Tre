from json import loads
from utility.file.read_file import read_file
from typing import TypeVar, Callable, Any

T = TypeVar("T")


def read_json(
        input_file: str,
) -> T:
    return (loads(read_file(input_file)))
