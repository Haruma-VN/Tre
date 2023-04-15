from typing import Any


def cyan(
        *values: Any,
        sep: str = " ",
) -> str:
    """
    ANSI formats the values with a cyan foreground color
    sep: string inserted between values, default a space
    """
    return f"\x1b[36m{sep.join(map(str, values))}\x1b[39m"
