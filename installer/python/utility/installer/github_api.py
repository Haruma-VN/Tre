from http.client import HTTPResponse
from urllib.request import urlopen


def github_api_call(
        *path: str,
) -> HTTPResponse:
    """
    Make GitHub API call with the specified path
    """
    url: str = f"https://api.github.com/{'/'.join(path)}"
    return urlopen(url)
