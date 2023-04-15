from os import system


def send_windows_notification(
    title: str,
    message: str,
    path: str,
) -> None:
    """
    Send notify to windows
    """
    script = f'''
    $Title = "{title}"
    $Text = "{message}"
    New-BurntToastNotification -Text $Text -AppLogo "{path}" -Title $Title
    '''
    system(f'powershell -command "{script}"')
