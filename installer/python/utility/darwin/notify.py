from os import system


def send_macos_notification(
        title: str,
        message: str,
) -> None:
    """
    Using to send notification to darwin (Macintosh)
    """
    script: str = f'''
    display notification "{message}" with title "{title}"
    '''
    system(f"osascript -e '{script}'")
