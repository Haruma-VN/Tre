from typing import Any


def green(
        *values: Any,
        sep: str = " ",
) -> str:
    """
    ANSI formats the values with a green foreground color
    sep: string inserted between values, default a space
    """
    return f"\x1b[32m{sep.join(map(str, values))}\x1b[39m"
