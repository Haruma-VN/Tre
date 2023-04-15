from typing import Any


def red(
        *values: Any,
        sep: str = " ",
) -> str:
    """
    ANSI formats the values with a red foreground color
    sep: string inserted between values, default a space
    """
    return f"\x1b[31m{sep.join(map(str, values))}\x1b[39m"
