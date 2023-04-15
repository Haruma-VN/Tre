from utility.installer.github_api import github_api_call
from json import load
from re import compile as compile_regex
from collections.abc import Callable
from utility.installer.download import download_file
from typing import Any


def download_from_git(
    keyword: str,
    *path: str
) -> None:
    """
    Get download list
    """
    has_keyword: Callable = compile_regex(keyword).search
    with github_api_call("repos", *path) as response:
        assets: list[dict[str, Any]] = load(response)["assets"]
        for asset in assets:
            if has_keyword(asset["name"]):
                download_file(asset["browser_download_url"], asset["name"])
