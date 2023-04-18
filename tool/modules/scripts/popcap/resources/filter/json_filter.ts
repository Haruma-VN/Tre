"use strict";
import path from "node:path";
import { if_file_exists } from "../../../../library/fs/util.js";

function filter_json(list_of_items: Array<string>): Array<string> {
    const filter_jsons_file_in_directory: string[] = list_of_items
        .map((file) => {
            if (
                if_file_exists(file) &&
                path.parse(file).ext.toString().toLowerCase() === ".json"
            ) {
                return file;
            }
        })
        .filter((file) => file !== undefined)
        .map((file) => file as string);
    return filter_jsons_file_in_directory;
}

export default filter_json;
