from utility.text_generator.localization import load_language as localization
from utility.file.read_json import read_json


def translator(
        json_key: str,
) -> str:
    """
    Return localization for each language.
    If not exists, will return the json key
    """
    translation = localization("English") if not read_json(
        "./settings/information.json") != None else localization((read_json("./settings/information.json")['language']))
    return translation[json_key] if translation != None else json_key
