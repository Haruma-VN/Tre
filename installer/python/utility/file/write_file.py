from typing import Any


def write_file(
        output_dir: str,
        data: Any
) -> None:
    try:
        with open(output_dir, "w") as file:
            file.write(data)
    except Exception as bug:
        raise RuntimeError(f"Cannot write file, error: {bug}")
