"use strict";
import fs from "fs";
function outfile_fs_js(
    file_system_directory_output: string,
    file_system_data_output: any,
    file_system_is_output_directory: boolean = true,
): void {
    //#region filesystem
    const file_system_directory_output_as_list_string: Array<string> = file_system_directory_output
        .replace(/\\/g, '/').split("/");
    const file_system_directory_output_as_file_string: string = file_system_directory_output_as_list_string.pop() as string;
    const file_system_directory_output_as_folder_of_joined_strings: string = file_system_directory_output_as_list_string.join("/");
    if (!fs.existsSync(file_system_directory_output_as_folder_of_joined_strings)) {
        fs.mkdirSync(file_system_directory_output_as_folder_of_joined_strings, { recursive: true })
    }
    if (file_system_is_output_directory) {
        fs.writeFileSync(`${file_system_directory_output_as_folder_of_joined_strings}/${file_system_directory_output_as_file_string}`,
            file_system_data_output)
    }
    //#endregion
}

export default outfile_fs_js;