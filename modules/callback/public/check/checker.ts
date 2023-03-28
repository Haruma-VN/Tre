"use strict";
import fs_js from "../../../library/fs/implement.js";
import localization from "../../localization.js";
function check_evaluate_system
    (
        file_system_input_as_str: string,
    ): string {
    if (!fs_js.check_path(file_system_input_as_str)) {
        throw new Error(`${localization("cannot_read_the_path")} ${fs_js.get_full_path(file_system_input_as_str)}`);
    }
    if (fs_js.is_file(file_system_input_as_str)) {
        return localization("local_machine_file");
    }
    else if (fs_js.is_directory(file_system_input_as_str)) {
        return localization("local_machine_folder");
    }
    else {
        throw new Error(localization("invalid_file_system"));
    }
}

export default check_evaluate_system;