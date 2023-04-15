from json import dumps
from utility.file.write_file import write_file
from utility.text_generator.trailing_comma import add_trailing_commas


def write_json(
        output_dir: str,
        json_obj: object | dict,
        is_trailing_commas: bool,
) -> None:
    write_file(output_dir=output_dir, data=dumps(
        json_obj,
        indent='\t',
    )) if not is_trailing_commas else write_file(output_dir=output_dir, data=add_trailing_commas(
        dumps(
            json_obj,
            indent='\t',
        )
    ))
