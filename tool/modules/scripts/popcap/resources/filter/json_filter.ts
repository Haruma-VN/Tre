"use strict";
import fs_js from "../../../../library/fs/implement.js";

function filter_json(list_of_items: Array<string>): Array<string> {
    const filter_jsons_file_in_directory: string[] = list_of_items
        .map((file) => {
            if (
                fs_js.js_exists(file) &&
                fs_js.parse_fs(file).ext.toString().toLowerCase() === ".json"
            ) {
                return file;
            }
        })
        .filter(
            (file) => file !== undefined && file !== null && file !== void 0
        )
        .map((file) => file as string);
    return filter_jsons_file_in_directory;
}

export default filter_json;
