from requests import get, Response


def download_file(url: str, filepath: str) -> None:
    """
    Download file from url
    """
    response: Response = get(url, timeout=5, stream=True)
    with open(filepath, "wb") as file:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                file.write(chunk)
