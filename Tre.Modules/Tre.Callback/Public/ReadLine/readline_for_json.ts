"use strict";
import fs from "fs";
import { Console } from "../../console.js";
import { TreErrorMessage } from "../../../Tre.Debug/Tre.ErrorSystem.js";
export default function processFilePaths(executor_file_need_avoid: string): string {
    let filePath =  Console.ReadLine();
    while (filePath !== '') {
        if (filePath === './') {
            TreErrorMessage({ error: "Stopped", system: `"./" is not a valid file path.` }, `"./" is not a valid file path.`);
            filePath =  Console.ReadLine();
            continue;
        }
        if (filePath === executor_file_need_avoid) {
            TreErrorMessage({ error: "Stopped", system: `Cannot apply to the patch file is using ${executor_file_need_avoid}` }, `Cannot apply to the patch file is using ${executor_file_need_avoid}`);
            filePath =  Console.ReadLine();
            continue;
        }
        if (filePath[0] === '"' && filePath[filePath.length - 1] === '"') {
            filePath = filePath.slice(1, -1);
        }
        try {
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                TreErrorMessage({ error: "Stopped", system: `${filePath} is a directory, not a file.` }, `${filePath} is a directory, not a file.`);
                filePath =  Console.ReadLine();
                continue;
            }
            if (!stats.isFile() || !filePath.endsWith('.json')) {
                TreErrorMessage({ error: "Stopped", system: `${filePath} is not a valid .json file.` }, `${filePath} is not a valid .json file.`);
                filePath =  Console.ReadLine();
                continue;
            }
            break;
        } catch (err) {
            TreErrorMessage({ error: "Stopped", system: `Error: ${filePath} is not a valid file path.` }, `Error: ${filePath} is not a valid file path.`);
            filePath =  Console.ReadLine();
        }
    }
    return filePath;
}