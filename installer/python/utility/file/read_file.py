def read_file(
        file_system_input: str,
) -> str:
    """
    Assert file path to open
    """
    try:
        with open(file_system_input, "r", encoding="utf-8") as file:
            return file.read()
    except Exception as bug:
        raise RuntimeError(f"Cannot open file, error: {bug}")
