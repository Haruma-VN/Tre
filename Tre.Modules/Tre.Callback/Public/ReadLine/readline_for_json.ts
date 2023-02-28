"use strict";
import fs from "fs";
import { Console } from "../../console.js";
import { TreErrorMessage } from "../../../Tre.Debug/Tre.ErrorSystem.js";
import localization from "../../localization.js";
export default function processFilePaths(executor_file_need_avoid: string): string {
    let filePath =  Console.ReadLine();
    while (filePath !== '') {
        if (filePath === './') {
            TreErrorMessage({ error: `${localization("stopped")}`, system: `"./" ${localization("not_a_valid_file_path")}` }, `"./" ${localization("not_a_valid_file_path")}`);
            filePath =  Console.ReadLine();
            continue;
        }
        if (filePath === executor_file_need_avoid) {
            TreErrorMessage({ error: `${localization("stopped")}`, system: `${localization("cannot_apply_patch_file_is_using")} ${executor_file_need_avoid}` }, `${localization("cannot_apply_patch_file_is_using")} ${executor_file_need_avoid}`);
            filePath =  Console.ReadLine();
            continue;
        }
        if (filePath[0] === '"' && filePath[filePath.length - 1] === '"') {
            filePath = filePath.slice(1, -1);
        }
        try {
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                TreErrorMessage({ error: `${localization("stopped")}`, system: `${filePath} ${localization("is_a_directory_not_a_file")}` }, `${filePath} ${localization("is_a_directory_not_a_file")}`);
                filePath =  Console.ReadLine();
                continue;
            }
            if (!stats.isFile() || !filePath.toLowerCase().endsWith('.json')) {
                TreErrorMessage({ error: `${localization("stopped")}`, system: `${filePath} ${localization("is_a_directory_not_a_valid_json_file")}` }, `${filePath} ${localization("is_a_directory_not_a_valid_json_file")}`);
                filePath =  Console.ReadLine();
                continue;
            }
            break;
        } catch (err) {
            TreErrorMessage({ error: `${localization("stopped")}`, system: `${filePath} ${localization("not_a_valid_file_path")}` }, `${filePath} ${localization("not_a_valid_file_path")}`);
            filePath =  Console.ReadLine();
        }
    }
    return filePath;
}