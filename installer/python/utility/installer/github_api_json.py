class GitHub_Api_Json():
    def __init__(this, assets: list[str]) -> None:
        this.assets = assets


class GitHub_Api_Member():
    def __init__(
            this,
            created_at: str,
            updated_at: str,
            browser_download_url: str,
            download_count: int,
            size: float
    ) -> None:

        this.created_at = created_at
        this.updated_at = updated_at
        this.browser_download_url = browser_download_url
        this.download_count = download_count
        this.size = size
