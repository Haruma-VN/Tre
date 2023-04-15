from zipfile import ZipFile


def uncompress_zip(
    zip_path: str,
    to_path: str,
) -> None:
    """
    Extract zip file
    """
    with ZipFile(zip_path) as zip_ref:
        zip_ref.extractall(to_path)
