from re import match, sub


def add_trailing_commas(
        json_data: str,
) -> str:
    """
    Scrapped JSON Module. Written in TS and shared for Python
    """
    data: str = json_data.split("\n")
    last_line: str = data.pop()
    modified_data: list[str] = []

    for line in data:
        if match(r"^\s*[\[{]|[,{]\s*$", line):
            modified_data.append(line)
        else:
            trimmed_line: str = line.strip()
            last_char: str = trimmed_line[-1]

            if last_char in [",", "{", "["]:
                modified_data.append(line)
            else:
                modified_data.append(f"{line},")

    if last_line and not match(r"^\s*[\]}]\s*$", last_line):
        modified_data.append(f"{last_line},")
    elif last_line:
        modified_data.append(last_line)

    result: str = "\n".join(modified_data)
    result: str = sub(r"({|\[)(\s*),(\s*)(}|])", r"\1\2\3\4", result)

    return result
