"use strict";
import { readline_normal } from "../../../readline/prompt/util.js";
import { Argument } from "../../toolkit_question.js";
import { Console } from "../../console.js";
import * as color from "../../../library/color/color.js";
import fs from "node:fs";

export default function DirectoryChecker(): string {
    let dir: string = readline_normal();
    while (dir !== '') {
        if (dir === "./") {
            Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execution_warning_log} \"./\" ${Argument.Tre.Packages.execute_error_not_valid_file_path}`));
            dir = readline_normal();
            continue;
        }
        if (dir[0] === "\"" && dir[dir.length - 1] === "\"") {
            dir = dir.slice(1, -1);
        }
        try {
            const stats = fs.statSync(dir);
            if (stats.isFile()) {
                return dir;
            } else {
                Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execute_error_log} ${dir} `));
                dir = readline_normal();
            }
        } catch (err) {
            Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execute_error_log} ${dir} ${Argument.Tre.Packages.execute_error_not_valid_directory_path}`));
            dir = readline_normal();
        }
    };
    return dir;
}